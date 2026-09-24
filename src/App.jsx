import { useState } from 'react'
import './App.css'
import './avatar.css'
import { Navbar } from './components/Navbar'
import Welcome from './components/Welcome'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Footer from './components/Footer'
import LlmAvatarAssistant from './components/LlmAvatarAssistant';

function App() {
  // 1. Creamos nuestro estado global. Por defecto, arrancamos en Modo Oscuro (true).
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isChatOpen, setIsChatOpen] = useState(false) //


  // 2. Esta función invierte el valor (si es true pasa a false, si es false a true)
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  // 3. Pasamos `isDarkMode` a TODOS los componentes a través de PROPS.
  // Al Navbar también le pasamos la función `toggleTheme` para que el botón pueda activarla.
  return (
    <div className="portfolio-container">
      {/* Componentes pasandole props */}
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main>
        <Welcome isDarkMode={isDarkMode} />
        <About isDarkMode={isDarkMode} />
        <Skills isDarkMode={isDarkMode} />
        <Projects isDarkMode={isDarkMode} />
        {/* === BOTÓN FLOTANTE DEL BOT === */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="btn btn-primary rounded-circle shadow-lg d-flex align-items-center justify-content-center"
          style={{
            position: 'fixed',
            bottom: isChatOpen ? '390px' : '30px', // Si está abierto, sube el botón
            right: '30px',
            right: '30px',
            width: '60px',
            height: '60px',
            zIndex: 10000,
            fontSize: '1.5rem',
            backgroundColor: '#c17a5e',
            border: 'none'
          }}
        >
          {isChatOpen ? '✖️' : '🤖'}
        </button>

        {/* === AVATAR IA (Se oculta si isChatOpen es false) === */}
        <div style={{ display: isChatOpen ? 'block' : 'none' }}>
          <LlmAvatarAssistant
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
        </div>
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div >
  )
}

export default App
