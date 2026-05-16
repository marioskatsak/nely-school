/* Programs page */

function PagePrograms() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all'
    ? PROGRAMS
    : PROGRAMS.filter(p => p.ages.includes(filter));

  return (
    <div className="page-fade">
      <PageHero
        title="Προγράμματα Σπουδών"
        subtitle="Βρείτε το πρόγραμμα που ταιριάζει στην ηλικία και τα ενδιαφέροντά σας"
      />

      <section className="section">
        <div className="container">
          {/* Filter bar */}
          <div className="filter-bar reveal">
            {AGE_FILTERS.map(f => (
              <button
                key={f.id}
                className={'filter-btn' + (filter === f.id ? ' active' : '')}
                onClick={() => setFilter(f.id)}>
                {f.label}
              </button>
            ))}
          </div>

          <div style={{ textAlign: 'center', color: 'var(--ink-light)', fontSize: '0.85rem', fontStyle: 'italic', marginBottom: '2rem' }}>
            Προβολή <strong>{filtered.length}</strong> {filtered.length === 1 ? 'προγράμματος' : 'προγραμμάτων'}
          </div>

          <div className="programs-grid">
            {filtered.map((p, i) => (
              <div key={p.title} className="program-card reveal" data-color={p.color} style={{ transitionDelay: (i * 60) + 'ms' }}>
                <div className="program-icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="age-tags">
                  {p.ages.map(a => (
                    <span key={a} className={'age-tag tag-' + a}>{AGE_LABELS[a]}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }} className="reveal">
            <p style={{ color: 'var(--ink-light)', marginBottom: '1.25rem', fontStyle: 'italic' }}>
              Θέλετε να ξεκινήσετε; Κλείστε θέση ή εκδηλώστε ενδιαφέρον σήμερα.
            </p>
            <a href="#/schedule" className="btn btn-primary">Κράτηση Θέσης</a>
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { PagePrograms });
