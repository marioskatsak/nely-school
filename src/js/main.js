/* ============================================================
   Σχολή Ξηροκαμπίου — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile Navigation ──────────────────────────────────── */
  const toggle   = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close when a link is clicked
    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
      })
    );
  }

  /* ── Active Nav Link ────────────────────────────────────── */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* ── YouTube Lazy Load ──────────────────────────────────── */
  document.querySelectorAll('.yt-thumbnail').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const card     = thumb.closest('.yt-card, .gallery-item');
      const wrap     = card.querySelector('.yt-iframe-wrap');
      const videoId  = thumb.dataset.videoId;
      if (!wrap || !videoId) return;

      thumb.style.display = 'none';
      wrap.classList.add('active');
      wrap.innerHTML = `<iframe
        src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1"
        allow="autoplay; encrypted-media; fullscreen"
        allowfullscreen
        loading="lazy"
      ></iframe>`;
    });
  });

  /* Gallery YouTube items */
  document.querySelectorAll('.gallery-yt').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const item    = thumb.closest('.gallery-item');
      const videoId = thumb.dataset.videoId;
      if (!videoId) return;

      item.style.paddingBottom = '56.25%';
      item.style.position = 'relative';
      item.innerHTML = `<iframe
        style="position:absolute;inset:0;width:100%;height:100%;border:none"
        src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0"
        allow="autoplay; encrypted-media; fullscreen"
        allowfullscreen
        loading="lazy"
      ></iframe>`;
    });
  });

  /* ── Age Filter ─────────────────────────────────────────── */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const programCards = document.querySelectorAll('.program-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      programCards.forEach(card => {
        const ages = card.dataset.ages || '';
        card.classList.toggle('hidden', filter !== 'all' && !ages.split(',').includes(filter));
      });
    });
  });

  /* ── Gallery Category Tabs ──────────────────────────────── */
  const galleryTabs  = document.querySelectorAll('.gallery-tab');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const cat = tab.dataset.category;

      galleryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      galleryItems.forEach(item => {
        item.classList.toggle('hidden', cat !== 'all' && item.dataset.category !== cat);
      });
    });
  });

  /* ── Generic Form Handler ───────────────────────────────── */
  function setupForm(formId, successMsg) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const successEl = form.querySelector('.form-success');
      const orig = btn.textContent;

      btn.textContent = 'Αποστολή...';
      btn.disabled = true;

      // Replace action URL with your Formspree endpoint or backend
      const action = form.action;
      let sent = false;

      if (action && action !== '#') {
        try {
          const res = await fetch(action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
          });
          sent = res.ok;
        } catch (_) { sent = false; }
      } else {
        // Demo mode — simulate 1s delay
        await new Promise(r => setTimeout(r, 1000));
        sent = true;
      }

      if (sent) {
        form.reset();
        if (successEl) { successEl.style.display = 'block'; }
        else { alert(successMsg); }
      } else {
        alert('Υπήρξε κάποιο πρόβλημα. Δοκιμάστε ξανά ή επικοινωνήστε τηλεφωνικά.');
      }

      btn.textContent = orig;
      btn.disabled = false;
    });
  }

  setupForm('bookingForm',  'Η αίτηση εκδήλωσης ενδιαφέροντος στάλθηκε! Θα επικοινωνήσουμε σύντομα.');
  setupForm('contactForm',  'Το μήνυμά σας στάλθηκε! Θα απαντήσουμε σύντομα.');

});
