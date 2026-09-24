import { useState } from 'react';

// 1. Recibimos la prop isDarkMode
function Projects({ isDarkMode }) {
    const [filtroActivo, setFiltroActivo] = useState("All");

    const portfolio = [
        { id: 1, titulo: "E-Commerce Deportivo", categoria: "Académico" },
        { id: 2, titulo: "Sistema de Turnos", categoria: "Académico" },
        { id: 3, titulo: "App del Clima", categoria: "Pasatiempo" },
        { id: 4, titulo: "Clon de Netflix", categoria: "Pasatiempo" },
        { id: 5, titulo: "Calculadora Avanzada", categoria: "Académico" },
        { id: 6, titulo: "Bot de Discord", categoria: "Pasatiempo" },
    ];

    const proyectosFiltrados = filtroActivo === "All"
        ? portfolio
        : portfolio.filter(proyecto => proyecto.categoria === filtroActivo);

    // 2. Variable dinámica para las tarjetas de proyectos
    const projectCardClass = `card h-100 shadow-sm border-0 card-hover ${isDarkMode ? 'bg-secondary text-white' : 'bg-white text-dark'}`;

    return (
        // 3. Fondo dinámico para la sección de proyectos
        <section id="proyectos" className={`py-5 ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
            <div className="container py-5">
                <h2 className="text-center mb-5 display-5 fw-bold">Mis Proyectos</h2>

                <div className="d-flex justify-content-center gap-3 mb-5 flex-wrap">
                    <button
                        onClick={() => setFiltroActivo("All")}
                        className={`btn ${filtroActivo === "All" ? 'btn-primary' : 'btn-outline-primary'}`}>
                        Todos
                    </button>
                    <button
                        onClick={() => setFiltroActivo("Académico")}
                        className={`btn ${filtroActivo === "Académico" ? 'btn-primary' : 'btn-outline-primary'}`}>
                        Académicos
                    </button>
                    <button
                        onClick={() => setFiltroActivo("Pasatiempo")}
                        className={`btn ${filtroActivo === "Pasatiempo" ? 'btn-primary' : 'btn-outline-primary'}`}>
                        Pasatiempos
                    </button>
                </div>

                <div className="row g-4">
                    {proyectosFiltrados.map((proyecto) => (
                        <div key={proyecto.id} className="col-md-6 col-lg-4">
                            {/* 4. Usamos nuestra variable dinámica */}
                            <div className={projectCardClass}>
                                <div className="card-body">
                                    <span className="badge bg-info text-dark mb-2">{proyecto.categoria}</span>
                                    <h4 className="card-title fw-bold">{proyecto.titulo}</h4>
                                    <p className="card-text">
                                        Breve descripción del proyecto utilizando React y Bootstrap 5.
                                    </p>
                                    <a href="#" className="btn btn-primary mt-3 w-100 rounded-pill shadow-sm">Ver Proyecto</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Projects;
