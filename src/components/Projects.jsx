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
                    {/* Imagen del proyecto */}
                    {proyecto.imagen && (
                        <div style={{ overflow: 'hidden', borderRadius: '8px 8px 0 0', height: '180px' }}>
                            <img
                                src={proyecto.imagen}
                                alt={proyecto.titulo}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    transition: 'transform 0.3s ease'
                                }}
                                onMouseOver={e => e.target.style.transform = 'scale(1.5)'}
                                onMouseOut={e => e.target.style.transform = 'scale(1.0)'}
                            />
                        </div>
                    )}

                    {/* Badge de categoría */}
                    <span className="project-badge">
                        {categoriaIcono[proyecto.categoria] || '📁'} {proyecto.categoria}
                    </span>

                    <h3 className={`project-title ${isDarkMode ? 'text-white' : 'text-dark'}`}>
                        {proyecto.titulo}
                    </h3>

                    <p className={`project-desc ${isDarkMode ? 'text-white' : 'text-muted'}`}>
                        {proyecto.descripcion}
                    </p>

                    {/* Botones de acción */}
                    <div className="project-actions">
                        {proyecto.github && (
                            <a href={proyecto.github} className="btn-project btn-project--outline" target="_blank" rel="noreferrer">
                                <i className="devicon-github-original"></i> GitHub
                            </a>
                        )}
                        {proyecto.demo && (
                            <a href={proyecto.demo} className="btn-project btn-project--filled" target="_blank" rel="noreferrer">
                                Ver Demo →
                            </a>
                        )}
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
            imagen: "/images/teassist.gif",
            github: "https://github.com/martinmarinero77/Teassist",
            demo: "https://teassist-qu92xqqsx-martinmarinero77-3827.vercel.app/",
        },
        {
            id: 2,
            titulo: "Sistema de Turnos en Complejos Deportivos",
            categoria: "Académico",
            descripcion: "Aplicación para gestión de turnos, con sistema de usuarios, para poder gestionar las reservas de los clientes y la posibilidad de formar una gran comunidad Deportiva.",
            imagen: "/images/PlayTime.gif",
            github: "https://github.com/martinmarinero77/playtime-java",
        },
        {
            id: 3,
            titulo: "Sistema de Empresa de Logística y mensajería ",
            categoria: "Académico",
            descripcion: "Sistema diseñado para brindar una gestión integral y centralizada de todas las etapas del servicio logístico, desde la recepción del pedido hasta la entrega final al destinatario.",
            imagen: "/images/logistica.gif",
            github: "https://github.com/martinmarinero77/LogiPack",
        },
        {
            id: 4,
            titulo: "Asistente Virtual para Salón de Eventos",
            categoria: "Pasatiempo",
            descripcion: "App para manejar un asistente de IA para Wsp de un salon de eventos y para poder gestionar las reservas de los clientes.",
            imagen: "/images/asistente.gif",
        },
        {
            id: 5,
            titulo: "Simon-Says",
            categoria: "Pasatiempo",
            descripcion: "Juego para poder jugar al juego de memoria Simon. Con registro de puntajes.",
            imagen: "/images/simon.gif",
            github: "https://github.com/martinmarinero77/SimonSays",
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
                <p className={`text-center mb-5 ${isDarkMode ? 'text-white' : 'text-muted'}`}>
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
