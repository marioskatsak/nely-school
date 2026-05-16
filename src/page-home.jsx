/* Home page */

function PageHome({ onPlayVideo }) {
  const [spot, setSpot] = useState(0);

  /* Rotate spotlight every 6s */
  useEffect(() => {
    const t = setInterval(() => setSpot(s => (s + 1) % SPOTLIGHTS.length), 6500);
    return () => clearInterval(t);
  }, []);

  const current = SPOTLIGHTS[spot];

  return (
    <div className="page-fade">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-badge">Παράρτημα Πειραιά · Κοιν.Σ.Επ.</span>
            <h1 className="hero-wordmark">
              <Wordmark size="xl" />
            </h1>
            <p className="hero-tagline">
              <em>Σχολή Ξηροκαμπίου</em> — τώρα στον Πειραιά
            </p>
            <p className="hero-subtitle">
              Μουσική, χοροθεραπεία και εικαστικά μέσα από την ελληνική παράδοση — μια κοινότητα δημιουργίας για κάθε ηλικία.
            </p>

            <div className="hero-btns">
              <a href="#/programs" className="btn btn-primary">Τα Προγράμματά μας</a>
              <a href="#/contact" className="btn btn-outline">Επικοινωνία</a>
            </div>

            {/* Spotlight */}
            <div className="hero-spotlight">
              <div className="spotlight-eyebrow">{current.eyebrow}</div>
              <div className="spotlight-title">{current.title}</div>
              <div className="spotlight-text">{current.text}</div>
              <div className="spotlight-actions">
                <a href={current.href} className="btn btn-secondary">{current.cta}</a>
                <div className="spotlight-dots">
                  {SPOTLIGHTS.map((_, i) => (
                    <button
                      key={i}
                      className={'spot-dot' + (i === spot ? ' on' : '')}
                      onClick={() => setSpot(i)}
                      aria-label={'Spotlight ' + (i + 1)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hero — self-hosted video */}
          <div className="hero-image">
            <div className="hero-video hero-video-native">
              <video
                src="video.mp4"
                poster="poster.jpg"
                controls
                preload="metadata"
                playsInline>
                Το πρόγραμμα περιήγησής σας δεν υποστηρίζει βίντεο HTML5.
              </video>
              <div className="hero-video-meta">
                <div className="hero-video-eyebrow">Παρουσίαση</div>
                <div className="hero-video-title">Νέα Λύρα — Παράρτημα Πειραιά</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Six pillars ── */}
      <section className="section">
        <div className="container">
          <SectionTitle
            title="Τι Κάνουμε"
            subtitle="Έξι ρόλοι που ορίζουν την καθημερινή δραστηριότητα της σχολής"
          />
          <div className="pillars-grid">
            {PILLARS.map((p, i) => (
              <div key={p.verb} className="pillar-card reveal" style={{ transitionDelay: (i * 80) + 'ms' }}>
                <div className="pillar-icon">{p.icon}</div>
                <h3 className="pillar-verb">{p.verb}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── YouTube preview ── */}
      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            title="Δείτε μας σε Δράση"
            subtitle="Επιλεγμένα βίντεο από το κανάλι του Γιάννη Σταθάκου στο YouTube"
          />
          <div className="youtube-grid">
            {HOME_VIDEOS.map(v => (
              <YouTubeCard
                key={v.id + v.title}
                videoId={v.id}
                title={v.title}
                subtitle={v.subtitle}
                onPlay={onPlayVideo}
              />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a href="#/portfolio" className="btn btn-secondary">Όλο το Portfolio</a>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="section" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container">
          <StatsStrip />
        </div>
      </section>

      {/* ── CTA ── */}
      <CTASection
        title="Ξεκινήστε την Καλλιτεχνική σας Πορεία"
        text="Εκδηλώστε ενδιαφέρον σήμερα και ανακαλύψτε το πρόγραμμα που ταιριάζει στην ηλικία και τα ενδιαφέροντά σας. Προσφέρουμε δωρεάν δοκιμαστικό μάθημα."
        primary={{ label: 'Εγγραφή / Κράτηση Θέσης', href: '#/schedule' }}
        secondary={{ label: 'Επικοινωνία', href: '#/contact' }}
      />
    </div>
  );
}

/* Stats strip with animated counts */
function StatsStrip() {
  const ref = useRef(null);
  const [start, setStart] = useState(false);
  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) { setStart(true); return; }
    const io = new IntersectionObserver(
      ents => { if (ents[0].isIntersecting) { setStart(true); io.disconnect(); } },
      { threshold: 0.3 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="home-stats reveal">
      {STATS.map((s, i) => <HomeStat key={i} stat={s} start={start} delay={i * 80} />)}
    </div>
  );
}

function HomeStat({ stat, start, delay }) {
  const v = useCountUp(stat.num, 1500 + delay, start);
  return (
    <div className="home-stat">
      <div className="home-stat-num">{v}{stat.suffix}</div>
      <div className="home-stat-label">{stat.label}</div>
    </div>
  );
}

Object.assign(window, { PageHome });
