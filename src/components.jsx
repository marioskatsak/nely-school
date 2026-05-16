/* ============================================================
   Shared components — Nav, Footer, SectionTitle, YouTube modal,
   Reveal, ScrollProgress, hooks
   ============================================================ */

const { useState, useEffect, useRef, useCallback } = React;

/* ── Hook: route from hash ─────────────────────────────── */
function useHashRoute() {
  const [path, setPath] = useState(() => {
    const h = window.location.hash.replace(/^#/, '');
    return h || '/';
  });
  useEffect(() => {
    const onChange = () => {
      const h = window.location.hash.replace(/^#/, '') || '/';
      setPath(h);
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return path;
}

/* ── Hook: reveal on scroll ────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

/* ── Hook: count up ────────────────────────────────────── */
function useCountUp(target, durationMs = 1600, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, start]);
  return value;
}

/* ── Scroll progress bar ───────────────────────────────── */
function ScrollProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setW(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: w + '%' }} />;
}

/* ── Brand wordmark ────────────────────────────────────── */
/* ΝΕα ΛΥρα — the capitals spell NELY (matching the domain).   */
function Wordmark({ size = 'md', className = '' }) {
  return (
    <span className={'wordmark wordmark-' + size + (className ? ' ' + className : '')}>
      <span className="wm-cap">ΝΕ</span><span className="wm-low">α</span>
      <span className="wm-space"> </span>
      <span className="wm-cap">ΛΥ</span><span className="wm-low">ρα</span>
    </span>
  );
}

/* ── Navigation ────────────────────────────────────────── */
function Nav({ path }) {
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [path]);
  return (
    <nav>
      <div className="nav-container">
        <a href="#/" className="nav-logo">
          <Wordmark size="sm" />
        </a>
        <ul className={'nav-links' + (open ? ' open' : '')}>
          {NAV_ITEMS.map(item => (
            <li key={item.path}>
              <a href={'#' + item.path} className={path === item.path ? 'active' : ''}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className={'nav-toggle' + (open ? ' open' : '')}
          aria-label="Μενού"
          onClick={() => setOpen(o => !o)}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}

/* ── Footer ────────────────────────────────────────────── */
function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-col">
            <span className="footer-logo"><Wordmark size="md" className="footer-wm" /></span>
            <p style={{ marginTop: '1rem' }}>Καλλιτεχνική σχολή στον Πειραιά. Μουσική, χοροθεραπεία και εικαστικές τέχνες για όλες τις ηλικίες — μια κοινότητα δημιουργίας με ρίζες στη Λακωνία.</p>
            <p style={{ marginTop: '1rem', fontSize: '0.75rem', opacity: 0.6 }}>
              <strong>Βιώσιμη Ανάπτυξη Κοιν.Σ.Επ.</strong> · Πρώην Σχολή Ξηροκαμπίου
            </p>
          </div>

          <div className="footer-col">
            <h4>Σύνδεσμοι</h4>
            <ul>
              {NAV_ITEMS.map(i => (
                <li key={i.path}><a href={'#' + i.path}>{i.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Έδρα — Λακωνία</h4>
            <p>
              Ξηροκάμπι, Λακωνία 23054<br/>
              <a href="tel:+302731000000" style={{ color: 'rgba(255,255,255,.65)' }}>+30 273 100 0000</a>
            </p>
          </div>

          <div className="footer-col">
            <h4>Παράρτημα Πειραιά</h4>
            <p>
              Πειραιάς, Αττική<br/>
              <a href="tel:+302100000000" style={{ color: 'rgba(255,255,255,.65)' }}>+30 210 000 0000</a><br/>
              <a href="mailto:info@nely.gr" style={{ color: 'rgba(255,255,255,.65)' }}>info@nely.gr</a>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Νέα Λύρα — Παράρτημα Πειραιά · Κοιν.Σ.Επ. · Όλα τα δικαιώματα διατηρούνται.</p>
        </div>
      </div>
    </footer>
  );
}

/* ── Section title ─────────────────────────────────────── */
function SectionTitle({ title, subtitle, lyre = true, left = false, className = '' }) {
  return (
    <div className={'section-title reveal ' + (lyre ? '' : 'no-lyre ') + className} style={left ? { textAlign: 'left' } : {}}>
      <h2>{title}</h2>
      <div className="divider" style={left ? { margin: '0.75rem 0' } : {}}>
        {lyre && <span className="divider-lyre">🪕</span>}
      </div>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

/* ── Page hero ─────────────────────────────────────────── */
function PageHero({ title, subtitle, alt = false, children }) {
  return (
    <div className={'page-hero' + (alt ? ' page-hero-alt' : '')} style={alt ? { background: 'linear-gradient(135deg,var(--primary),var(--primary-light))' } : {}}>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
      {children}
    </div>
  );
}

/* ── YouTube modal ─────────────────────────────────────── */
function YouTubeModal({ videoId, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!videoId) return null;
  return (
    <div className="yt-modal-backdrop" onClick={onClose}>
      <div className="yt-modal" onClick={e => e.stopPropagation()}>
        <button className="yt-modal-close" onClick={onClose} aria-label="Κλείσιμο">×</button>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  );
}

/* ── YouTube thumbnail card (opens modal) ──────────────── */
function YouTubeCard({ videoId, title, subtitle, onPlay }) {
  const [thumbSrc, setThumbSrc] = useState(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
  return (
    <div className="yt-card reveal">
      <div className="yt-thumbnail" onClick={() => onPlay(videoId)}>
        <img
          src={thumbSrc}
          alt={title}
          onError={() => setThumbSrc(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`)}
        />
        <div className="yt-overlay">
          <div className="yt-play-btn">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
      </div>
      <div className="yt-info">
        <h4>{title}</h4>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  );
}

/* ── CTA section ───────────────────────────────────────── */
function CTASection({ title, text, primary, secondary }) {
  return (
    <section className="section cta-section">
      <div className="container">
        <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 800, marginBottom: '1rem' }}>{title}</h2>
        {text && <p style={{ fontSize: '1.05rem', opacity: 0.85, maxWidth: 520, margin: '0 auto 2rem' }}>{text}</p>}
        <div className="hero-btns">
          {primary &&  <a href={primary.href}  className="btn btn-primary">{primary.label}</a>}
          {secondary && <a href={secondary.href} className="btn btn-outline">{secondary.label}</a>}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  useHashRoute, useReveal, useCountUp,
  ScrollProgress, Nav, Footer, SectionTitle, PageHero,
  YouTubeModal, YouTubeCard, CTASection, Wordmark,
});
