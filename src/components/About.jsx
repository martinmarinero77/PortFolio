import { useState } from 'react';

function About({ isDarkMode }) {

    // ESTADO: guarda qué tarjeta está abierta. null = ningún modal visible.
    const [tarjetaAbierta, setTarjetaAbierta] = useState(null);

    // Datos de cada "blob" — los guardamos en un arreglo para usar .map()
    const tarjetas = [
        {
            id: 'sobre',
            icono: '👋',
            titulo: 'Sobre Mí',
            descripcion: 'Soy un desarrollador web apasionado por la tecnología y la creación de soluciones digitales. Actualmente cursando el 3er año de la Tecnicatura Universitaria en Desarrollo Web. Me encanta enfrentar nuevos desafíos y seguir aprendiendo todos los días.'
        },
        {
            id: 'educacion',
            icono: '🎓',
            titulo: 'Educación',
            descripcion: 'Tecnicatura Universitaria en Programación Web (2023 - 2026). Aprendiendo Front-End con React y Stvelte, Back-End con .NET, Laravel y bases de datos SQL. También completé varios cursos online sobre JavaScript moderno y diseño de interfaces.'
        },
        {
            id: 'experiencia',
            icono: '💼',
            titulo: 'Experiencia',
            descripcion: 'Proyectos Académicos (2024 - Actualidad): Actualizacion de dependencias y refactorizacion de codigo de un proyecto Antiguo usando Bootstrap y la API de Polygon.io. También trabajé en un sistema para un Instituto para chicos con "TEA" y en un sistema de turnos para complejos deportivos. Como hobby, desarrolle una app para gestionar alquileres en un salon de eventos, con un asistente de IA para Wsp.'
        }
    ];

    return (
        <section id="sobre-mi" className={`py-5 ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
            <div className="container py-5">

                {/* Título con acento de color */}
                <h2 className="text-center mb-5 display-5 fw-bold">
                    Sobre <span className="title-highlight">Mí</span>
                </h2>

                {/* Grilla de 3 blobs - usamos .map() sobre nuestro arreglo de tarjetas */}
                <div className="row g-4 justify-content-center mb-5">
                    {tarjetas.map((tarjeta) => (
                        <div key={tarjeta.id} className="col-md-4 d-flex justify-content-center">
                            {/*
                              onClick: al tocar la tarjeta, guardamos su id en el estado.
                              Eso activa el modal de esa tarjeta específica.
                            */}
                            <button
                                className="blob-card w-100"
                                onClick={() => setTarjetaAbierta(tarjeta.id)}
                            >
                                <span className="blob-icon">{tarjeta.icono}</span>
                                <span className="blob-title">{tarjeta.titulo}</span>
                            </button>
                        </div>
                    ))}
                </div>

                {/*
                  RENDERIZADO CONDICIONAL DEL MODAL:
                  Si `tarjetaAbierta` NO es null, React busca en el arreglo la tarjeta
                  que coincide y muestra el modal. Si es null, no renderiza nada.
                */}
                {tarjetaAbierta !== null && (() => {
                    const tarjeta = tarjetas.find(t => t.id === tarjetaAbierta);
                    return (
                        <div
                            className="modal-overlay"
                            onClick={() => setTarjetaAbierta(null)} // Al tocar el fondo → cierra
                        >
                            <div
                                className="modal-content-custom"
                                onClick={(e) => e.stopPropagation()} // Evita cerrar al tocar adentro
                            >
                                <button
                                    className="modal-close-btn"
                                    onClick={() => setTarjetaAbierta(null)}
                                >
                                    ×
                                </button>
                                <div className="text-center mb-4">
                                    <span style={{ fontSize: '3rem' }}>{tarjeta.icono}</span>
                                    <h3 className="fw-bold mt-2">{tarjeta.titulo}</h3>
                                </div>
                                <p className="lh-lg">{tarjeta.descripcion}</p>
                            </div>
                        </div>
                    );
                })()}

            </div>
        </section>
    );
}

export default About;
