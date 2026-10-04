function ContactModal({ isDarkMode, isOpen, onClose }) {

    // Si el modal no está abierto, no renderizamos nada
    if (!isOpen) return null;

    const bgCard = isDarkMode ? '#1e1e2e' : '#ffffff';
    const bgOverlay = 'rgba(0, 0, 0, 0.6)';

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('¡Mensaje enviado! (demo)');
        onClose();
    };

    return (
        // Overlay oscuro que cubre toda la pantalla
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0,
                background: bgOverlay,
                zIndex: 20000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
            }}
        >
            {/* La tarjeta del formulario — el onClick stopPropagation evita cerrar al hacer clic adentro */}
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: bgCard,
                    borderRadius: '16px',
                    padding: '2rem',
                    width: '100%',
                    maxWidth: '480px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                    position: 'relative',
                }}
            >
                {/* Botón cerrar */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute', top: '1rem', right: '1rem',
                        background: 'none', border: 'none',
                        fontSize: '1.5rem', cursor: 'pointer',
                        color: isDarkMode ? '#fff' : '#333',
                        lineHeight: 1,
                    }}
                    aria-label="Cerrar formulario de contacto"
                >
                    ✕
                </button>

                <h2 style={{ color: '#9a4f2f', marginBottom: '0.25rem', fontSize: '1.5rem' }}>
                    ¡Hablemos! 👋
                </h2>
                <p style={{ color: isDarkMode ? '#aaa' : '#666', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    Completá el formulario y te respondo a la brevedad.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label
                            htmlFor="contact-name"
                            style={{ color: isDarkMode ? '#ddd' : '#333', fontWeight: 600, fontSize: '0.85rem' }}
                        >
                            Nombre
                        </label>
                        <input
                            id="contact-name"
                            type="text"
                            required
                            placeholder="Tu nombre"
                            className={`form-control mt-1 ${isDarkMode ? 'dark-placeholder' : ''}`}
                            style={{ background: isDarkMode ? '#2a2a3e' : '#f8f9fa', color: isDarkMode ? '#fff' : '#333', border: '1px solid rgba(193,122,94,0.3)' }}
                        />
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="contact-email"
                            style={{ color: isDarkMode ? '#ddd' : '#333', fontWeight: 600, fontSize: '0.85rem' }}
                        >
                            Email
                        </label>
                        <input
                            id="contact-email"
                            type="email"
                            required
                            placeholder="tu@email.com"
                            className={`form-control mt-1 ${isDarkMode ? 'dark-placeholder' : ''}`}
                            style={{ background: isDarkMode ? '#2a2a3e' : '#f8f9fa', color: isDarkMode ? '#fff' : '#333', border: '1px solid rgba(193,122,94,0.3)' }}
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="contact-msg"
                            style={{ color: isDarkMode ? '#ddd' : '#333', fontWeight: 600, fontSize: '0.85rem' }}
                        >
                            Mensaje
                        </label>
                        <textarea
                            id="contact-msg"
                            required
                            rows={4}
                            placeholder="¿En qué puedo ayudarte?"
                            className={`form-control mt-1 ${isDarkMode ? 'dark-placeholder' : ''}`}
                            style={{ background: isDarkMode ? '#2a2a3e' : '#f8f9fa', color: isDarkMode ? '#fff' : '#333', border: '1px solid rgba(193,122,94,0.3)', resize: 'vertical' }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn w-100 fw-bold"
                        style={{ background: '#9a4f2f', color: '#fff', border: 'none', padding: '0.75rem', borderRadius: '10px' }}
                    >
                        Enviar mensaje ✉️
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ContactModal;
