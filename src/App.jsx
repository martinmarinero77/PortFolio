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
import { botConfig } from './config/botConfig';

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
              config={botConfig}
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
