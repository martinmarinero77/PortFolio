// 1. Desestructuramos las props que nos mandó App.jsx
export const Navbar = ({ isDarkMode, toggleTheme }) => {
    return (
        <nav className={`navbar navbar-expand-lg fixed-top ${isDarkMode ? 'navbar-dark glass-navbar' : 'navbar-light bg-white shadow-sm'}`}>
            <div className="container">
                <a className="navbar-brand fw-bold" href="#inicio">
                    Martín Marinero
                </a>

                {/* Botón hamburguesa para celulares */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="#inicio">Inicio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#sobre-mi">Sobre mí</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#tecnologias">Tecnologías</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#proyectos">Proyectos</a>
                        </li>
                    </ul>

                    {/* 2. Nuestro botón para cambiar de tema */}
                    <button
                        onClick={toggleTheme}
                        className={`btn ms-lg-3 rounded-pill px-3 fw-bold ${isDarkMode ? 'btn-light text-dark' : 'btn-dark text-white'}`}
                    >
                        {isDarkMode ? '☀️ Claro' : '🌙 Oscuro'}
                    </button>

                </div>
            </div>
        </nav>
    );
};
