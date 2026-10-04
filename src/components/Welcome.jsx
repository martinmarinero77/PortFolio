import Typewriter from 'typewriter-effect';
import heroImg from '../assets/hero.jpg';

function Welcome({ isDarkMode, onContactOpen }) {
    return (
        <section
            id="inicio"
            className={`py-5 min-vh-100 d-flex align-items-center position-relative overflow-hidden ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}
        >
            {/* Gradiente de ambiente (decorativo) */}
            <div className="hero-glow-bg"></div>

            <div className="container position-relative mt-4">
                <div className="row align-items-center g-5">

                    {/* ── Columna IZQUIERDA: Texto ── */}
                    <div className="col-lg-6 text-center text-lg-start">

                        <h1 className="display-3 fw-bold mb-2">
                            Hola, <span className="text-gradient">Bienvenido! 👋</span>
                        </h1>

                        {/* Efecto Typewriter de la librería npm */}
                        <div className="fs-4 fw-normal mb-4 text-secondary">
                            <Typewriter
                                options={{
                                    strings: [
                                        'Soy Martín Marinero.',
                                        'Desarrollador Web Front-End.',
                                        'Estudiante de Tecnicatura en Desarrollo Web.',
                                    ],
                                    autoStart: true,
                                    loop: true,
                                    delay: 50,
                                    deleteSpeed: 30,
                                }}
                            />
                        </div>

                        <p className="lead mb-2">
                            Un gusto que estés por acá. Soy un apasionado por la tecnología
                            y la creación de soluciones digitales.
                        </p>
                        <p className="lead mb-5 text-secondary">
                            Si te interesa saber lo que hago o mis proyectos,
                            ¡navegá por la web!
                        </p>

                        <button
                            onClick={onContactOpen}
                            className="btn btn-lg px-5 py-3 rounded-pill shadow-lg fw-bold"
                            style={{ backgroundColor: '#c17a5e', color: 'white', border: 'none' }}
                        >
                            Contáctame 📬
                        </button>
                    </div>

                    {/* ── Columna DERECHA: Imagen ── */}
                    <div className="col-lg-6 d-flex justify-content-center">
                        <img
                            src={heroImg}
                            alt="Foto de perfil de Martín Marinero"
                            className="hero-img"
                        />
                    </div>

                </div>
            </div>
        </section >
    );
}

export default Welcome;
