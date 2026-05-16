/* Schedule page */

function PageSchedule() {
  /* Legend filter — toggle lesson types */
  const allTypes = LESSON_TYPES.map(t => t.id);
  const [activeTypes, setActiveTypes] = useState(allTypes);

  const toggleType = (id) => {
    setActiveTypes(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };
  const isActive = (id) => activeTypes.includes(id);

  return (
    <div className="page-fade">
      <PageHero
        title="Πρόγραμμα Λειτουργίας"
        subtitle="Εβδομαδιαίο πρόγραμμα μαθημάτων — Παράρτημα Πειραιά"
        alt={true}
      />

      {/* ── Weekly schedule ── */}
      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            title="Εβδομαδιαίο Πρόγραμμα"
            subtitle="Πατήστε στις ετικέτες παρακάτω για να φιλτράρετε ανά κατηγορία"
          />

          {/* Interactive legend */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }} className="reveal">
            {LESSON_TYPES.map(t => (
              <button
                key={t.id}
                className={'lesson legend-btn ' + t.cls + (isActive(t.id) ? '' : ' off')}
                onClick={() => toggleType(t.id)}
                aria-pressed={isActive(t.id)}>
                {t.label}
              </button>
            ))}
          </div>

          <div className="schedule-wrap reveal">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Ώρα</th>
                  {DAYS.map(d => <th key={d}>{d}</th>)}
                </tr>
              </thead>
              <tbody>
                {SCHEDULE.map(([time, row]) => (
                  <tr key={time}>
                    <td className="time-col">{time}</td>
                    {row.map((cell, i) => (
                      <td key={i}>
                        {cell ? (
                          <span className={
                            'lesson lesson-' + cell.t +
                            (isActive(cell.t) ? '' : ' dim')
                          }>{cell.l}</span>
                        ) : '–'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ color: 'var(--ink-light)', fontSize: '0.82rem', textAlign: 'center', marginTop: '1rem', fontStyle: 'italic' }}>
            * Το πρόγραμμα ενδέχεται να τροποποιηθεί. Επικοινωνήστε μαζί μας για επιβεβαίωση.
          </p>
        </div>
      </section>

      {/* ── Workshops & seminars (renamed from "events") ── */}
      <section className="section">
        <div className="container">
          <SectionTitle
            title="Εργαστήρια & Σεμινάρια"
            subtitle="Εντατικά εργαστήρια με ξεχωριστή εγγραφή — εκτός εβδομαδιαίου προγράμματος"
          />
          <div className="workshops-grid">
            {WORKSHOPS.map((w, i) => (
              <article key={w.title} className="workshop-card reveal" style={{ transitionDelay: (i * 80) + 'ms' }}>
                <div className="workshop-head">
                  <div className="workshop-icon">{w.icon}</div>
                  <div className="workshop-when">{w.when}</div>
                </div>
                <h4>{w.title}</h4>
                <p>{w.desc}</p>
                <dl className="workshop-meta">
                  <div><dt>Διάρκεια</dt><dd>{w.duration}</dd></div>
                  <div><dt>Κόστος</dt><dd>{w.cost}</dd></div>
                  <div><dt>Διδάσκων</dt><dd>{w.tutor}</dd></div>
                  <div><dt>Προθεσμία</dt><dd>{w.deadline}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking form ── */}
      <section className="section section-alt">
        <div className="container" style={{ maxWidth: 760 }}>
          <SectionTitle
            title="Εκδήλωση Ενδιαφέροντος / Κράτηση Θέσης"
            subtitle="Συμπληρώστε τη φόρμα και θα επικοινωνήσουμε μαζί σας για επιβεβαίωση."
          />
          <BookingForm />
        </div>
      </section>
    </div>
  );
}

/* ── Booking form ───────────────────────────────────────── */
function BookingForm() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    program: '', ageGroup: '', experience: 'beginner', message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const update = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const er = {};
    if (!form.firstName.trim()) er.firstName = 'Συμπληρώστε το όνομα';
    if (!form.lastName.trim())  er.lastName  = 'Συμπληρώστε το επώνυμο';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = 'Μη έγκυρο email';
    if (!form.program)  er.program  = 'Επιλέξτε πρόγραμμα';
    if (!form.ageGroup) er.ageGroup = 'Επιλέξτε ηλικιακή ομάδα';
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
    setForm({ firstName:'', lastName:'', email:'', phone:'', program:'', ageGroup:'', experience:'beginner', message:'' });
  };

  return (
    <form className="form-card reveal" onSubmit={onSubmit} noValidate>
      <div className="form-row">
        <Field label="Όνομα *" id="firstName" value={form.firstName} onChange={update('firstName')} error={errors.firstName} placeholder="π.χ. Μαρία" />
        <Field label="Επώνυμο *" id="lastName"  value={form.lastName}  onChange={update('lastName')}  error={errors.lastName}  placeholder="π.χ. Παπαδοπούλου" />
      </div>
      <div className="form-row">
        <Field label="Email *"     id="email" type="email" value={form.email} onChange={update('email')} error={errors.email} placeholder="email@example.com" />
        <Field label="Τηλέφωνο"    id="phone" type="tel"  value={form.phone} onChange={update('phone')} placeholder="+30 69X XXX XXXX" />
      </div>
      <div className="form-row">
        <SelectField label="Πρόγραμμα Ενδιαφέροντος *" id="program" value={form.program} onChange={update('program')} error={errors.program}>
          <option value="" disabled>Επιλέξτε πρόγραμμα</option>
          {PROGRAMS.map(p => <option key={p.title} value={p.title}>{p.title}</option>)}
        </SelectField>
        <SelectField label="Ηλικιακή Ομάδα *" id="ageGroup" value={form.ageGroup} onChange={update('ageGroup')} error={errors.ageGroup}>
          <option value="" disabled>Επιλέξτε ηλικία</option>
          <option value="children">Παιδιά (4–12 ετών)</option>
          <option value="teens">Έφηβοι (13–18 ετών)</option>
          <option value="adults">Ενήλικες (18–65)</option>
          <option value="seniors">Τρίτη Ηλικία (65+)</option>
        </SelectField>
      </div>
      <SelectField label="Επίπεδο εμπειρίας" id="experience" value={form.experience} onChange={update('experience')}>
        <option value="beginner">Αρχάριος — Καμία εμπειρία</option>
        <option value="intermediate">Μέσο επίπεδο</option>
        <option value="advanced">Προχωρημένος</option>
      </SelectField>
      <div className="form-group">
        <label htmlFor="message">Σχόλια / Ερωτήσεις</label>
        <textarea id="message" value={form.message} onChange={update('message')} placeholder="Οποιαδήποτε επιπλέον πληροφορία ή ερώτηση..." />
      </div>
      <button type="submit" className={'btn btn-primary' + (status === 'sending' ? ' loading' : '')} style={{ width: '100%' }} disabled={status === 'sending'}>
        {status === 'sending' ? 'Αποστολή...' : 'Αποστολή Αίτησης'}
      </button>
      {status === 'success' && (
        <div className="form-success" style={{ display: 'block' }}>
          ✓ Η αίτησή σας στάλθηκε επιτυχώς! Θα επικοινωνήσουμε σύντομα.
        </div>
      )}
    </form>
  );
}

/* ── Field helpers ──────────────────────────────────────── */
function Field({ label, id, type = 'text', value, onChange, error, placeholder }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type} id={id} value={value} onChange={onChange}
        placeholder={placeholder}
        className={error ? 'invalid' : ''}
      />
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}

function SelectField({ label, id, value, onChange, error, children }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={onChange} className={error ? 'invalid' : ''}>
        {children}
      </select>
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}

Object.assign(window, { PageSchedule, BookingForm, Field, SelectField });
