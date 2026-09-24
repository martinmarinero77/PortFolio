// 1. Recibimos la prop isDarkMode
function Footer({ isDarkMode }) {
    return (
        // 2. Fondo dinámico para el pie de página
        <footer className={`text-center py-4 mt-auto ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
            <div className="container">
                <p className="mb-0 fw-bold">
                    &copy; {new Date().getFullYear()} Martín Marinero. Todos los derechos reservados.
                </p>
                <p className="small text-secondary mt-1">
                    Hecho con React, Vite y Bootstrap 🚀
                </p>
            </div>
        </footer>
    );
}

export default Footer;
