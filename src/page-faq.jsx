/* FAQ page */

function PageFAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="page-fade">
      <PageHero
        title="Συχνές Ερωτήσεις"
        subtitle="Ό,τι χρειάζεται να ξέρετε πριν εγγραφείτε — και λίγα ακόμη"
      />

      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <FAQItem
                key={i}
                q={f.q}
                a={f.a}
                open={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
                delay={i * 60}
              />
            ))}
          </div>

          <div className="join-cta reveal in" style={{ marginTop: '3rem' }}>
            <p>Δεν βρήκατε την απάντηση που ψάχνετε;</p>
            <a href="#/contact" className="btn btn-primary">Στείλτε μας μήνυμα</a>
          </div>
        </div>
      </section>
    </div>
  );
}

function FAQItem({ q, a, open, onToggle, delay }) {
  return (
    <article className={'faq-item reveal in' + (open ? ' open' : '')}>
      <button className="faq-q" onClick={onToggle} aria-expanded={open}>
        <span className="faq-q-text">{q}</span>
        <span className="faq-q-icon">{open ? '−' : '+'}</span>
      </button>
      <div className="faq-a-wrap">
        <p className="faq-a">{a}</p>
      </div>
    </article>
  );
}

Object.assign(window, { PageFAQ });
