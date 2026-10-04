/**
 * LlmAvatarAssistant.jsx — Rediseñado como chat de soporte con historial.
 */
import React, {
  useState, useRef, useEffect, useMemo, useCallback,
} from 'react';
import AvatarCanvas from './AvatarCanvas.jsx';
import { createLlmClient, normalizeLlmConfig } from './llmClient.js';
import { collectSections, findSectionReference, scrollToSection } from './sectionScanner.js';

// ── Error boundary para Three.js (sin cambios) ──
class AvatarErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { failed: false }; }
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error) {
    if (typeof console !== 'undefined') console.warn('AvatarCanvas error:', error?.message || error);
  }
  render() {
    if (this.state.failed) {
      return (
        <div className="chat-avatar-fallback">🤖</div>
      );
    }
    return this.props.children;
  }
}

const DEFAULT_CONFIG = {
  baseUrl: '/v1',
  apiKey: '',
  model: 'default',
  temperature: 0.7,
  defaultText: '¡Hola! Soy el asistente de este portfolio. ¿En qué te puedo ayudar?',
  modelUrl: 'models/robot.glb',
  side: 'right',
  corner: null,
  sectionDiscovery: 'auto',
  systemPrompt: 'Sos un asistente amigable integrado en esta página.',
  streaming: true,
};

export { DEFAULT_CONFIG };

export default function LlmAvatarAssistant({ config = {}, isDarkMode = true, onScrollToSection, onSend }) {
  const cfg = useMemo(() => ({ ...DEFAULT_CONFIG, ...config }), [config]);

  const [input, setInput] = useState('');
  // CAMBIO CLAVE: en lugar de un string, ahora tenemos un ARREGLO de mensajes
  const [messages, setMessages] = useState([
    { role: 'assistant', text: cfg.defaultText, id: 0 }
  ]);
  // streamingText guarda el texto parcial que llega mientras la IA escribe
  const [streamingText, setStreamingText] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const chatBodyRef = useRef(null);
  const clientRef = useRef(null);
  const sectionsRef = useRef([]);
  const msgIdRef = useRef(1);

  // Inicializar el cliente LLM
  useEffect(() => {
    const res = normalizeLlmConfig(cfg);
    if (!res.ok) { setError(res.error); clientRef.current = null; return; }
    clientRef.current = createLlmClient({
      baseUrl: res.value.baseUrl,
      apiKey: res.value.apiKey,
      model: res.value.model,
      timeoutMs: cfg.timeoutMs,
      extra: { temperature: res.value.temperature },
    });
    setError('');
  }, [cfg]);

  // Descubrir secciones de la página
  useEffect(() => {
    const list = collectSections(document, cfg.sectionDiscovery === 'auto' ? null : cfg.sectionDiscovery);
    sectionsRef.current = list;
  }, [cfg.sectionDiscovery]);

  // Auto-scroll al último mensaje
  useEffect(() => {
    const el = chatBodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, streamingText]);

  const performScroll = useCallback((section) => {
    const ok = scrollToSection(section.id, { behavior: 'smooth', offset: 64 });
    if (onScrollToSection && ok) onScrollToSection(section);
  }, [onScrollToSection]);

  const ask = useCallback(async (text) => {
    const q = (text ?? input).trim();
    if (!q || busy) return;
    const client = clientRef.current;
    if (!client) { setError('El asistente no está configurado.'); return; }

    // 1. Agregar el mensaje del USUARIO al historial
    const userMsg = { role: 'user', text: q, id: msgIdRef.current++ };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setError('');
    setBusy(true);
    setStreamingText('');

    // 2. Construir los mensajes para la API
    const pageContext = sectionsRef.current.map((s) => `- ${s.title} (id: ${s.id})`).join('\n');
    const apiMessages = [
      { role: 'system', content: cfg.systemPrompt + (pageContext ? `\n\nSecciones de la página:\n${pageContext}` : '') },
      { role: 'user', content: q },
    ];

    let full = '';
    try {
      if (cfg.streaming) {
        // Durante el streaming, actualizamos streamingText (texto parcial)
        full = await client.chatStream(apiMessages, (token, cur) => setStreamingText(cur));
      } else {
        full = await client.chat(apiMessages);
      }
      if (!full) full = '(sin respuesta)';

      // 3. Al terminar, agregar el mensaje del ASISTENTE al historial y limpiar el streaming
      const ref = findSectionReference(full, sectionsRef.current);
      const assistantMsg = { role: 'assistant', text: full, id: msgIdRef.current++, sectionRef: ref?.section };
      setMessages(prev => [...prev, assistantMsg]);
      setStreamingText('');

      if (ref) performScroll(ref.section);
      if (onSend) onSend(q, full);
    } catch (err) {
      setError(err?.message || 'Error al contactar el modelo.');
      setStreamingText('');
    } finally {
      setBusy(false);
    }
  }, [input, busy, cfg, performScroll, onSend]);

  const submit = (e) => { if (e) e.preventDefault(); ask(); };

  return (
    <div className={`chat-widget ${isDarkMode ? '' : 'chat-widget--light'}`} data-testid="lav-root" role="region" aria-label="AI assistant">

      {/* ── Encabezado del chat ── */}
      <div className="chat-header">
        {/* Avatar 3D pequeño en el header */}
        <div className="chat-header-avatar">
          <AvatarErrorBoundary>
            <AvatarCanvas
              modelUrl={cfg.modelUrl}
              thinking={busy}
              autoFit={{ maxFraction: 0.85 }}
              onReady={() => { }}
              onError={() => { }}
            />
          </AvatarErrorBoundary>
        </div>
        <div className="chat-header-info">
          <span className="chat-header-name">Asistente IA</span>
          <span className={`chat-header-status ${busy ? 'typing' : 'online'}`}>
            {busy ? 'Escribiendo...' : 'En línea'}
          </span>
        </div>
      </div>

      {/* ── Cuerpo: historial de mensajes ── */}
      <div className="chat-body" ref={chatBodyRef} data-testid="lav-bubble" aria-live="polite">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message chat-message--${msg.role}`}>
            <div className="chat-bubble">
              {/* Si el mensaje del asistente tiene una sección referenciada, la resaltamos */}
              {msg.role === 'assistant' && msg.sectionRef
                ? renderWithSectionLink(msg.text, msg.sectionRef, performScroll)
                : msg.text
              }
            </div>
          </div>
        ))}

        {/* Texto parcial mientras la IA escribe (streaming) */}
        {busy && streamingText && (
          <div className="chat-message chat-message--assistant">
            <div className="chat-bubble chat-bubble--streaming">
              {streamingText}
              <span className="chat-cursor">▋</span>
            </div>
          </div>
        )}

        {/* Indicador de "pensando" si no llegó texto aún */}
        {busy && !streamingText && (
          <div className="chat-message chat-message--assistant">
            <div className="chat-bubble chat-bubble--thinking">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )}
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="chat-error" data-testid="lav-error" role="alert">⚠ {error}</div>
      )}

      {/* ── Input de escritura ── */}
      <form className="chat-input-row" onSubmit={submit}>
        <input
          className="chat-input"
          data-testid="lav-input"
          value={input}
          placeholder="Preguntá sobre este portfolio..."
          onChange={(e) => setInput(e.target.value)}
          disabled={busy}
          aria-label="Pregunta al asistente"
        />
        <button
          className="chat-send-btn"
          data-testid="lav-send"
          type="submit"
          disabled={busy || !input.trim()}
          aria-label="Enviar"
        >
          ➤
        </button>
      </form>
    </div>
  );
}

// ── Función auxiliar para resaltar el link de la sección ──
function renderWithSectionLink(text, section, performScroll) {
  const lower = text.toLowerCase();
  const titleLower = (section.title || '').toLowerCase();
  const at = titleLower ? lower.indexOf(titleLower) : -1;
  if (at === -1) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, at)}
      <span
        className="chat-section-link"
        data-testid="lav-section-link"
        onClick={() => performScroll(section)}
        title={`Ir a ${section.title}`}
      >
        {text.slice(at, at + section.title.length)}
      </span>
      {text.slice(at + section.title.length)}
    </span>
  );
}
