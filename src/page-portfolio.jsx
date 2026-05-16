/* Portfolio page */

function PagePortfolio({ onPlayVideo }) {
  const [cat, setCat] = useState('all');
  const visible = cat === 'all' ? VIDEOS : VIDEOS.filter(v => v.cat === cat);

  return (
    <div className="page-fade">
      <PageHero
        title="Portfolio & Πολυμέσα"
        subtitle="Μουσικές εκτελέσεις, δραστηριότητες μαθητών και στιγμές από τη ζωή της σχολής"
      />

      <section className="section">
        <div className="container">
          {/* Tabs */}
          <div className="gallery-tabs reveal">
            {VIDEO_CATEGORIES.map(c => (
              <button
                key={c.id}
                className={'gallery-tab' + (cat === c.id ? ' active' : '')}
                onClick={() => setCat(c.id)}>
                {c.label}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {visible.map((v, i) => (
              <div key={v.id + i} className="gallery-item reveal" style={{ transitionDelay: (i * 50) + 'ms' }}>
                <div className="gallery-yt" onClick={() => onPlayVideo(v.id)}>
                  <img
                    src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                    alt={v.caption}
                  />
                  <div className="gallery-yt-overlay">
                    <div className="gallery-play">
                      <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                </div>
                <div className="gallery-caption">{v.caption}</div>
              </div>
            ))}
          </div>

          {/* YouTube channel CTA */}
          <div className="yt-channel-cta reveal">
            <div className="yt-channel-icon">
              <svg viewBox="0 0 24 24" style={{ width: 56, height: 56, fill: '#ff0000' }}>
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <h3>Κανάλι YouTube: Γιάννης Σταθάκος</h3>
            <p>Ακολουθήστε για νέα βίντεο, μαθήματα αρχαίας λύρας και δραστηριότητες της σχολής.</p>
            <a href="https://www.youtube.com/@giannisstathakos2816"
               target="_blank" rel="noopener noreferrer"
               className="btn btn-primary"
               style={{ background: '#ff0000', borderColor: '#ff0000', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: 'white' }}>
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Επισκεφθείτε το Κανάλι
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { PagePortfolio });
