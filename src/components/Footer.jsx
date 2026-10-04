function Footer({ isDarkMode, onContactOpen }) {
    return (
        <footer id="footer" className={`py-5 mt-auto ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
            <div className="container">
                <div className="row align-items-center g-4">

                    {/* Columna izquierda: nombre y descripción */}
                    <div className="col-md-4 text-center text-md-start">
                        <p className="fw-bold mb-1" style={{ color: '#9a4f2f', fontSize: '1.1rem' }}>Martín Marinero</p>
                        <p className="small mb-0" style={{ color: isDarkMode ? '#aaa' : '#666' }}>
                            Desarrollador Web Front-End
                        </p>
                    </div>

                    {/* Columna centro: redes sociales */}
                    <div className="col-md-4 d-flex justify-content-center gap-3">
                        <a
                            href="https://github.com/Martinmarinero77"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-social-btn"
                            aria-label="GitHub de Martín Marinero"
                        >
                            <i className="devicon-github-original" style={{ fontSize: '1.5rem' }}></i>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/martin-marinero-aguilera/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-social-btn"
                            aria-label="LinkedIn de Martín Marinero"
                        >
                            <i className="devicon-linkedin-plain colored" style={{ fontSize: '1.5rem' }}></i>
                        </a>
                    </div>

                    {/* Columna derecha: botón de contacto */}
                    <div className="col-md-4 d-flex justify-content-center justify-content-md-end">
                        <button
                            onClick={onContactOpen}
                            className="btn fw-bold px-4 py-2 rounded-pill"
                            style={{ background: '#9a4f2f', color: '#fff', border: 'none' }}
                        >
                            Contáctame 📬
                        </button>
                    </div>
                </div>

                <hr style={{ borderColor: 'rgba(193,122,94,0.2)', margin: '2rem 0 1rem' }} />

                <p className="text-center small mb-0" style={{ color: isDarkMode ? '#666' : '#aaa' }}>
                    © {new Date().getFullYear()} Martín Marinero — Hecho con React, Vite y Bootstrap 🚀
                </p>
            </div>
        </footer>
    );
}

export default Footer;
