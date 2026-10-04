import { useState, lazy, Suspense } from 'react'
import './App.css'
import './avatar.css'
import { Navbar } from './components/Navbar'
import Welcome from './components/Welcome'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Footer from './components/Footer'
import ContactModal from './components/ContactModal';
const LlmAvatarAssistant = lazy(() => import('./components/LlmAvatarAssistant'));
const TERRACOTA = '#c17a5e'

function App() {
  // 1. Creamos nuestro estado global. Por defecto, arrancamos en Modo Oscuro (true).
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)



  // 2. Esta función invierte el valor (si es true pasa a false, si es false a true)
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev)
  }

  // 3. Pasamos `isDarkMode` a TODOS los componentes a través de PROPS.
  // Al Navbar también le pasamos la función `toggleTheme` para que el botón pueda activarla.
  return (
    <div className="portfolio-container">
      {/* ── Skip Link de accesibilidad (visible solo al hacer Tab) ── */}
      <a href="#inicio" className="visually-hidden-focusable skip-link">
        Saltar al contenido principal
      </a>
      {/* Componentes pasandole props */}
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main>
        <Welcome isDarkMode={isDarkMode}
          onContactOpen={() => setIsContactOpen(true)} />
        <About isDarkMode={isDarkMode} />
        <Skills isDarkMode={isDarkMode} />
        <Projects isDarkMode={isDarkMode} />
        {/* === BOTÓN FLOTANTE DEL BOT === */}
        <button
          onClick={() => setIsChatOpen(prev => !prev)}
          className="btn btn-primary rounded-circle shadow-lg d-flex align-items-center justify-content-center"
          style={{
            position: 'fixed',
            bottom: isChatOpen ? '460px' : '30px', // Si está abierto, sube el botón
            right: '30px',
            width: '60px',
            height: '60px',
            zIndex: 10000,
            fontSize: '1.5rem',
            backgroundColor: TERRACOTA,
            border: 'none'
          }}
        >
          {isChatOpen ? '✖️' : '🤖'}
        </button>

        {/* === AVATAR IA (Se oculta si isChatOpen es false) === */}
        <div style={{ display: isChatOpen ? 'block' : 'none' }}>
          <Suspense fallback={<div style={{ color: 'white', padding: '1rem' }}>Cargando asistente...</div>}>
            <LlmAvatarAssistant
              isDarkMode={isDarkMode}
              config={{
                baseUrl: 'http://127.0.0.1:8080/v1',
                apiKey: '',
                model: 'LFM2.5-350M-Q8_0',
                defaultText: '¡Hola! Soy tu asistente IA. ¿Qué querés saber sobre este portfolio?',
                modelUrl: '/models/robot.glb',
                // Modificamos un poco la posición para que no tape el botón
                corner: 'bottom-right',
                systemPrompt:
                  `Sos el asistente virtual de Martín. Respondé siempre en español, de forma muy breve (1 oración). No inventes datos. 
                Si el usuario te pregunta por algo específico, usá ESTAS frases exactas para que el sistema active el scroll automático a la sección correspondiente:
                - Si te preguntan por estudios, vida o quién es Martín -> Respondé: "Te llevo a la sección Sobre Mí."
                - Si te preguntan quién es el dueño del portfolio, cómo se llama, o de quién es esta página -> Respondé: "El dueño de este portfolio es Martín, un desarrollador Front-End."
                - Si te preguntan por conocimientos, lenguajes, herramientas, frontend o backend -> Respondé: "Podés ver todo eso en Habilidades y Tecnologías."
                - Si te preguntan por trabajos, portafolio o qué hizo -> Respondé: "Te invito a ver Mis Proyectos."
                - Si no entendés la pregunta -> Respondé: "Solo puedo responder cosas sobre el portfolio de Martín."`
              }}
            />
          </Suspense>
        </div>
      </main>
      <Footer isDarkMode={isDarkMode} onContactOpen={() => setIsContactOpen(true)} />
      <ContactModal
        isDarkMode={isDarkMode}
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div >
  )
}

export default App
