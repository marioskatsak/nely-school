/* About page */

function PageAbout() {
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
    <div className="page-fade">
      <PageHero
        title="Η Σχολή μας"
        subtitle="Ιστορικό, φιλοσοφία και η ομάδα που κάνει τη διαφορά">
        <div ref={ref} className="stats-row" style={{ maxWidth: 700, margin: '2.5rem auto 0' }}>
          {STATS.map((s, i) => <StatBox key={i} stat={s} start={start} delay={i * 100} />)}
        </div>
      </PageHero>

      {/* Goals & Dreams */}
      <section className="section">
        <div className="container">
          <SectionTitle
            title="Στόχοι & Όνειρα"
            subtitle="Η προσπάθειά μας — με δικά μας λόγια"
          />
          <div className="prose reveal" style={{ maxWidth: 760, margin: '0 auto' }}>
            <p>Στόχος της προσπάθειάς μας είναι ο χώρος μας να γίνει ένα φυτώριο δημιουργίας. Με εργαλεία τη μουσική, τον χορό, την κατασκευή οργάνων και ό,τι άλλο, να εκπαιδευτούμε στη συνεργασία και στην ταπεινότητα. Την ταπεινότητα όχι με την έννοια της υποταγής, αλλά «Δεν υπάρχει άνθρωπος που να μην ξέρει τίποτα και που να τα ξέρει όλα».</p>
            <p>Όνειρό μας είναι, μαθαίνοντας να διαχειριζόμαστε τον ελεύθερο μας χρόνο, να αρχίσουμε σιγά σιγά να αυτοδιαχειριζόμαστε και τη ζωή μας.</p>
          </div>
        </div>
      </section>

      {/* History + Philosophy */}
      <section className="section section-alt">
        <div className="container">
          <div className="about-grid">
            <div>
              <SectionTitle title="Ιστορικό & Εξέλιξη" lyre={false} left={true} />
              <div className="timeline">
                {TIMELINE.map((t, i) => (
                  <div key={t.year} className="timeline-item reveal" style={{ transitionDelay: (i * 80) + 'ms' }}>
                    <div className="timeline-dot"></div>
                    <div className="timeline-year">{t.year}</div>
                    <h4>{t.title}</h4>
                    <p>{t.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionTitle title="Φιλοσοφία & Προσέγγιση" lyre={false} left={true} />
              <div className="prose">
                {PHILOSOPHY.map((p, i) => (
                  <p key={i} className="reveal" style={{ transitionDelay: (i * 60) + 'ms' }}>{p}</p>
                ))}
              </div>
              <div className="info-grid" style={{ gridTemplateColumns: '1fr 1fr', marginTop: '2rem' }}>
                {VALUES.map(v => (
                  <div key={v.title} className="info-box reveal">
                    <h4>{v.icon} {v.title}</h4>
                    <p>{v.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <SectionTitle
            title="Η Ομάδα μας"
            subtitle="Έμπειροι εκπαιδευτές με πάθος για την τέχνη και την εκπαίδευση"
          />
          <div className="team-grid">
            {TEAM.map((m, i) => (
              <div key={m.name} className="team-card reveal" style={{ transitionDelay: (i * 80) + 'ms' }}>
                <div className="team-avatar">{m.avatar}</div>
                <div className="team-info">
                  <h3>{m.name}</h3>
                  <div className="team-role">{m.role}</div>
                  <p>{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="join-cta reveal">
            <p>Ενδιαφέρεστε να συνεργαστείτε μαζί μας ως εκπαιδευτής;</p>
            <a href="#/contact" className="btn btn-secondary">Επικοινωνήστε μαζί μας</a>
          </div>
        </div>
      </section>

      {/* Partnerships / Funding */}
      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            title="Συνεργασίες & Στήριξη"
            subtitle="Λειτουργούμε ως Κοιν.Σ.Επ. — με ευρωπαϊκή και εθνική στήριξη"
          />
          <div className="partnerships-grid">
            {PARTNERSHIPS.map((p, i) => (
              <div key={p.title} className="partnership-card reveal" style={{ transitionDelay: (i * 80) + 'ms' }}>
                <div className="partnership-flag">{p.flag}</div>
                <h4>{p.title}</h4>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }} className="reveal">
            <a href="#/contact" className="btn btn-primary">Στηρίξτε τη Σχολή</a>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatBox({ stat, start, delay }) {
  const v = useCountUp(stat.num, 1500 + delay, start);
  return (
    <div className="stat-box">
      <span className="stat-number">{v}{stat.suffix}</span>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}

Object.assign(window, { PageAbout });
