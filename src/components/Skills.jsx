import Typewriter from 'typewriter-effect';

// ─── Componente HIJO nivel 2: un chip individual de tecnología ───
// Recibe el nombre e ícono de una sola tech y la dibuja
function TechChip({ nombre, icono, isDarkMode }) {
  const chipClass = isDarkMode
    ? 'tech-chip bg-secondary bg-opacity-50 text-white'
    : 'tech-chip bg-white text-dark border';
  return (
    <div className={chipClass}>
      <i className={icono}></i>
      <span>{nombre}</span>
    </div>
  );
}

// ─── Componente HIJO nivel 1: una tarjeta de categoría ───
// Recibe los datos de UNA categoría y dibuja sus TechChips
function SkillCategory({ emoji, titulo, techs, isDarkMode }) {
  return (
    <div className="col-lg-4">
      <div
        className="skills-category-card h-100"
        style={{
          backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : '#ffffff',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        <p className="category-title">{emoji} {titulo}</p>
        <div className="d-flex flex-wrap gap-2 justify-content-center">
          {/* Por cada tech del arreglo, renderizamos un TechChip */}
          {techs.map((tech) => (
            <TechChip
              key={tech.nombre}
              nombre={tech.nombre}
              icono={tech.icono}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Componente PADRE: la sección completa ───
function Skills({ isDarkMode }) {
  const categorias = [
    {
      id: 'frontend', emoji: '🎨', titulo: 'Front-End',
      techs: [
        { nombre: 'HTML5', icono: 'devicon-html5-plain colored' },
        { nombre: 'CSS3', icono: 'devicon-css3-plain colored' },
        { nombre: 'JavaScript', icono: 'devicon-javascript-plain colored' },
        { nombre: 'Bootstrap', icono: 'devicon-bootstrap-plain colored' },
        { nombre: 'Tailwind', icono: 'devicon-tailwindcss-plain colored' },
        { nombre: 'React', icono: 'devicon-react-original colored' },
      ]
    },
    {
      id: 'backend', emoji: '⚙️', titulo: 'Back-End',
      techs: [
        { nombre: 'PHP', icono: 'devicon-php-plain colored' },
        { nombre: 'Laravel', icono: 'devicon-laravel-plain colored' },
        { nombre: 'Java', icono: 'devicon-java-plain colored' },
        { nombre: 'C', icono: 'devicon-c-plain colored' },
        { nombre: 'C#', icono: 'devicon-csharp-plain colored' },
        { nombre: '.NET', icono: 'devicon-dotnetcore-plain colored' },
        { nombre: 'Python', icono: 'devicon-python-plain colored' },
      ]
    },
    {
      id: 'databases', emoji: '🗄️', titulo: 'Bases de Datos y Mobile',
      techs: [
        { nombre: 'MySQL', icono: 'devicon-mysql-plain colored' },
        { nombre: 'PostgreSQL', icono: 'devicon-postgresql-plain colored' },
        { nombre: 'SQLite', icono: 'devicon-sqlite-plain colored' },
        { nombre: 'Flutter', icono: 'devicon-flutter-plain colored' },
        { nombre: 'Firebase', icono: 'devicon-firebase-plain colored' },
      ]
    },
  ];

  return (
    <section id="tecnologias" className={`py-5 ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <div className="container py-5">
        <h2 className="text-center mb-4 display-5 fw-bold">Habilidades y Tecnologías</h2>

        <div className={`text-center lead mb-5 fs-3 ${isDarkMode ? 'text-warning' : ''}`}
          style={isDarkMode ? {} : { color: '#7a5c00' }}>
          <Typewriter
            options={{
              strings: [
                'Me especializo en el desarrollo Front-End.',
                'Creo interfaces modernas con React.',
                'Soluciono problemas mediante código.'
              ],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 30
            }}
          />
        </div>

        {/* Por cada categoría, renderizamos un SkillCategory */}
        <div className="row g-3">
          {categorias.map((cat) => (
            <SkillCategory
              key={cat.id}
              emoji={cat.emoji}
              titulo={cat.titulo}
              techs={cat.techs}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Skills;
