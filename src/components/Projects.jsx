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
            titulo: "Instituto de Salud Teassist",
            categoria: "Académico",
            descripcion: "Sistema para un Instituto de salud para chichos con 'TEA'. Con administracion de pacientes y Profesionales.",
        },
        {
            id: 2,
            titulo: "Sistema de Turnos en Complejos Deportivos",
            categoria: "Académico",
            descripcion: "Aplicación para gestión de turnos, con sistema de usuarios, para poder gestionar las reservas de los clientes y la posibilidad de formar una gran comunidad Deportiva.",
        },
        {
            id: 3,
            titulo: "Sistema de Empresa de Logística y mensajería ",
            categoria: "Académico",
            descripcion: "Sistema diseñado para brindar una gestión integral y centralizada de todas las etapas del servicio logístico, desde la recepción del pedido hasta la entrega final al destinatario.",
        },
        {
            id: 4,
            titulo: "Asistente Virtual para Salón de Eventos",
            categoria: "Pasatiempo",
            descripcion: "App para manejar un asistente de IA para Wsp de un salon de eventos y para poder gestionar las reservas de los clientes.",
        },
        {
            id: 5,
            titulo: "Simon-Says",
            categoria: "Pasatiempo",
            descripcion: "Juego para poder jugar al juego de memoria Simon. Con registro de puntajes.",
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
