/* Contact page */

function PageContact() {
  return (
    <div className="page-fade">
      <PageHero
        title="Επικοινωνία"
        subtitle="Βρείτε μας στον Πειραιά και στο Ξηροκάμπι — απαντάμε σε κάθε ερώτηση"
      />

      {/* ── Specialized channels ── */}
      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            title="Εξειδικευμένα Κανάλια"
            subtitle="Επιλέξτε το τμήμα που σας αφορά για ταχύτερη απάντηση"
          />
          <div className="contact-info-grid">
            {CONTACT_CHANNELS.map(c => (
              <div key={c.value} className="contact-item reveal">
                <div className="ci-icon">{c.icon}</div>
                <h4>{c.label}</h4>
                <p>
                  <a href={'mailto:' + c.value}>{c.value}</a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Locations ── */}
      <section className="section">
        <div className="container">
          <SectionTitle
            title="Πού θα μας Βρείτε"
            subtitle="Δύο τοποθεσίες — έδρα στη Λακωνία, παράρτημα στον Πειραιά"
          />
          <div className="locations-grid">
            {LOCATIONS.map((l, i) => (
              <div key={l.label} className="location-card reveal" style={{ transitionDelay: (i * 100) + 'ms' }}>
                <div className="location-icon">📍</div>
                <h3>{l.label}</h3>
                <p className="location-address">{l.address}</p>
                <p className="location-meta">
                  <strong>Τηλέφωνο:</strong> <a href={'tel:' + l.phone.replace(/\s/g,'')}>{l.phone}</a>
                </p>
                <p className="location-meta">
                  <strong>Ώρες:</strong> {l.hours}
                </p>
              </div>
            ))}
          </div>

          <div className="map-wrap reveal" style={{ marginTop: '3rem' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50299.39!2d23.6297!3d37.9425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1bd36f2af3d0b%3A0xc4aa3d0e8f0d9a3a!2z0KDQtdC40YDQsNGPLCDQsNC70LXQutGB0LDQvdC00YDQuNGP!5e0!3m2!1sel!2sgr!4v1700000000000!5m2!1sel!2sgr"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Χάρτης — Σχολή Ξηροκαμπίου Πειραιάς">
            </iframe>
          </div>

          <div className="info-grid" style={{ marginTop: '2rem' }}>
            <div className="info-box reveal">
              <h4>🚇 Με Μετρό</h4>
              <p>Σταθμός: [Κοντινότερος Σταθμός Μετρό/ΗΣΑΠ]<br/>Απόσταση: ~X λεπτά πεζή</p>
            </div>
            <div className="info-box reveal">
              <h4>🚌 Με Λεωφορείο</h4>
              <p>Γραμμές: [Αριθμοί Γραμμών]<br/>Στάση: [Στάση]</p>
            </div>
            <div className="info-box reveal">
              <h4>🚗 Με Αυτοκίνητο</h4>
              <p>Πάρκινγκ διαθέσιμο στην [Οδό/Πλατεία]. Δωρεάν χώρος στάθμευσης [ημέρες/ώρες].</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Form ── */}
      <section className="section section-alt">
        <div className="container" style={{ maxWidth: 700 }}>
          <SectionTitle
            title="Στείλτε μας Μήνυμα"
            subtitle="Για ερωτήσεις σχετικά με τα προγράμματα, εγγραφές ή οποιοδήποτε άλλο θέμα."
          />
          <ContactForm />

          <div className="alt-contact reveal">
            <p>Προτιμάτε να μιλήσετε τηλεφωνικά;</p>
            <a href="tel:+302100000000" className="btn btn-secondary" style={{ marginTop: '0.75rem' }}>
              📞 +30 210 000 0000
            </a>
          </div>
        </div>
      </section>

      {/* ── Social ── */}
      <section className="section cta-section">
        <div className="container">
          <h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.2rem)', marginBottom: '0.75rem' }}>Ακολουθήστε μας</h2>
          <p style={{ opacity: 0.85, marginBottom: '2rem' }}>Μείνετε ενημερωμένοι για νέα, σεμινάρια και εκδηλώσεις</p>
          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://www.youtube.com/@giannisstathakos2816" target="_blank" rel="noopener"
               className="btn social-btn" style={{ background: '#ff0000', color: 'white', borderColor: '#ff0000' }}>
              <SocialIcon kind="yt" /> YouTube
            </a>
            <a href="https://facebook.com/PAGENAME" target="_blank" rel="noopener"
               className="btn social-btn" style={{ background: '#1877f2', color: 'white', borderColor: '#1877f2' }}>
              📘 Facebook
            </a>
            <a href="https://instagram.com/PROFILENAME" target="_blank" rel="noopener"
               className="btn social-btn" style={{ background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', color: 'white', borderColor: 'transparent' }}>
              📸 Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function SocialIcon({ kind }) {
  if (kind === 'yt') return (
    <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: 'white', marginRight: '0.4rem', verticalAlign: '-3px' }}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
  return null;
}

/* ── Contact form ──────────────────────────────────────── */
function ContactForm() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', subject:'', message:'' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const update = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = 'Συμπληρώστε το ονοματεπώνυμό σας';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = 'Μη έγκυρο email';
    if (!form.subject) er.subject = 'Επιλέξτε θέμα';
    if (!form.message.trim() || form.message.trim().length < 10) er.message = 'Γράψτε λίγα παραπάνω (≥10 χαρακτήρες)';
    return er;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;
    setStatus('sending');
    await new Promise(r => setTimeout(r, 1000));
    setStatus('success');
    setForm({ name:'', email:'', phone:'', subject:'', message:'' });
  };

  return (
    <form className="form-card reveal" onSubmit={onSubmit} noValidate>
      <div className="form-row">
        <Field label="Ονοματεπώνυμο *" id="cName"  value={form.name}  onChange={update('name')}  error={errors.name}  placeholder="Το όνομά σας" />
        <Field label="Email *"          id="cEmail" type="email" value={form.email} onChange={update('email')} error={errors.email} placeholder="email@example.com" />
      </div>
      <Field label="Τηλέφωνο" id="cPhone" type="tel" value={form.phone} onChange={update('phone')} placeholder="+30 69X XXX XXXX" />
      <SelectField label="Θέμα *" id="cSubject" value={form.subject} onChange={update('subject')} error={errors.subject}>
        <option value="" disabled>Επιλέξτε θέμα</option>
        {SUBJECTS.map(s => <option key={s.v} value={s.v}>{s.l}</option>)}
      </SelectField>
      <div className="form-group">
        <label htmlFor="cMessage">Μήνυμα *</label>
        <textarea id="cMessage" value={form.message} onChange={update('message')}
          placeholder="Γράψτε το μήνυμά σας εδώ..."
          className={errors.message ? 'invalid' : ''} />
        {errors.message && <span className="field-error">{errors.message}</span>}
      </div>
      <button type="submit" className={'btn btn-primary' + (status === 'sending' ? ' loading' : '')} style={{ width: '100%' }} disabled={status === 'sending'}>
        {status === 'sending' ? 'Αποστολή...' : 'Αποστολή Μηνύματος'}
      </button>
      {status === 'success' && (
        <div className="form-success" style={{ display: 'block' }}>
          ✓ Το μήνυμά σας στάλθηκε! Θα απαντήσουμε εντός 24 ωρών.
        </div>
      )}
    </form>
  );
}

Object.assign(window, { PageContact, ContactForm });
