import { useState } from 'react';

// Sub-componente para cada tarjeta de proyecto
function ProjectCard({ proyecto, isDarkMode }) {
    const categoriaIcono = {
        'Académico': '🎓',
        'Pasatiempo': '🎮',
    };

    const cardBg = isDarkMode
        ? 'rgba(255,255,255,0.04)'
        : 'rgba(255,255,255,0.9)';

    const cardBorder = isDarkMode
        ? '1px solid rgba(255,255,255,0.08)'
        : '1px solid rgba(193, 122, 94, 0.2)';

    return (
        <div className="col-md-6 col-lg-4">
            <div
                className="project-card h-100"
                style={{
                    backgroundColor: cardBg,
                    border: cardBorder,
                }}
            >
                {/* Franja de color superior */}
                <div className="project-card-accent"></div>

                <div className="project-card-body">
                    {/* Badge de categoría */}
                    <span className="project-badge">
                        {categoriaIcono[proyecto.categoria] || '📁'} {proyecto.categoria}
                    </span>

                    <h3 className={`project-title ${isDarkMode ? 'text-white' : 'text-dark'}`}>
                        {proyecto.titulo}
                    </h3>

                    <p className={`project-desc ${isDarkMode ? 'text-secondary' : 'text-muted'}`}>
                        {proyecto.descripcion}
                    </p>

                    {/* Botones de acción */}
                    <div className="project-actions">
                        <a href={proyecto.github || '#'} className="btn-project btn-project--outline">
                            <i className="devicon-github-original"></i> GitHub
                        </a>
                        <a href={proyecto.demo || '#'} className="btn-project btn-project--filled">
                            Ver Demo →
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Projects({ isDarkMode }) {
    const [filtroActivo, setFiltroActivo] = useState("All");

    const portfolio = [
        {
            id: 1,
            titulo: "E-Commerce Deportivo",
            categoria: "Académico",
            descripcion: "Tienda online con carrito de compras, filtros por categoría y diseño responsivo.",
        },
        {
            id: 2,
            titulo: "Sistema de Turnos",
            categoria: "Académico",
            descripcion: "Aplicación para gestión de turnos con panel de administración y base de datos.",
        },
        {
            id: 3,
            titulo: "App del Clima",
            categoria: "Pasatiempo",
            descripcion: "Consulta el clima en tiempo real usando una API pública con búsqueda por ciudad.",
        },
        {
            id: 4,
            titulo: "Clon de Netflix",
            categoria: "Pasatiempo",
            descripcion: "Interfaz visual inspirada en Netflix con catálogo de películas y trailers.",
        },
        {
            id: 5,
            titulo: "Calculadora Avanzada",
            categoria: "Académico",
            descripcion: "Calculadora con historial de operaciones, soporte de paréntesis y temas visuales.",
        },
        {
            id: 6,
            titulo: "Bot de Discord",
            categoria: "Pasatiempo",
            descripcion: "Bot personalizado para servidores de Discord con comandos y respuestas automáticas.",
        },
    ];

    const filtros = ["All", "Académico", "Pasatiempo"];
    const proyectosFiltrados = filtroActivo === "All"
        ? portfolio
        : portfolio.filter(p => p.categoria === filtroActivo);

    return (
        <section id="proyectos" className={`py-5 ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
            <div className="container py-5">
                <h2 className="text-center mb-2 display-5 fw-bold">Mis Proyectos</h2>
                <p className={`text-center mb-5 ${isDarkMode ? 'text-secondary' : 'text-muted'}`}>
                    Una selección de lo que construí durante la carrera y por cuenta propia.
                </p>

                {/* Botones de filtro modernos */}
                <div className="d-flex justify-content-center gap-2 mb-5 flex-wrap">
                    {filtros.map((filtro) => (
                        <button
                            key={filtro}
                            onClick={() => setFiltroActivo(filtro)}
                            className={`filter-btn ${filtroActivo === filtro ? 'filter-btn--active' : ''}`}
                        >
                            {filtro === 'All' ? '🗂 Todos' : filtro === 'Académico' ? '🎓 Académicos' : '🎮 Pasatiempos'}
                        </button>
                    ))}
                </div>

                {/* Grid de tarjetas */}
                <div className="row g-4">
                    {proyectosFiltrados.map((proyecto) => (
                        <ProjectCard
                            key={proyecto.id}
                            proyecto={proyecto}
                            isDarkMode={isDarkMode}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Projects;
