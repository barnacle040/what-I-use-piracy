/* ════════════════════════════════════════════════════════
   PIRACY RESOURCES — script.js
   Vanilla JS · No dependencies · requestAnimationFrame canvas
   ════════════════════════════════════════════════════════ */

'use strict';

// ─── CANVAS PARTICLE BACKGROUND ──────────────────────────────────────────────
(function initCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles, animId;

  const PARTICLE_COUNT = 90;
  const isLight = () => document.documentElement.getAttribute('data-theme') === 'light';

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randBetween(a, b) { return a + Math.random() * (b - a); }

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: randBetween(0.4, 1.6),
      vx: randBetween(-0.18, 0.18),
      vy: randBetween(-0.22, -0.06),
      alpha: randBetween(0.1, 0.6),
      pulse: Math.random() * Math.PI * 2,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    const light = isLight();
    const baseColor = light ? '0, 122, 77' : '0, 255, 157';

    particles.forEach(p => {
      p.x  += p.vx;
      p.y  += p.vy;
      p.pulse += 0.012;
      const alpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));

      // Wrap
      if (p.x < -5)  p.x = W + 5;
      if (p.x > W+5) p.x = -5;
      if (p.y < -5)  p.y = H + 5;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${baseColor}, ${alpha})`;
      ctx.fill();
    });

    // Draw thin connecting lines for nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
          const a = (1 - dist / 100) * 0.08;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${baseColor}, ${a})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    animId = requestAnimationFrame(draw);
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); }, 150);
  });

  init();
  draw();
})();


// ─── NAV: SCROLL & ACTIVE ────────────────────────────────────────────────────
(function initNav() {
  const nav     = document.getElementById('site-nav');
  const btt     = document.getElementById('back-to-top');
  const links   = document.querySelectorAll('.nav-link[data-section]');
  const sections = document.querySelectorAll('.resource-section[id]');

  // Scroll state
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Scrolled class on nav
        nav.classList.toggle('scrolled', scrollY > 40);

        // Back to top
        btt.classList.toggle('visible', scrollY > 400);

        // Active nav link
        let current = '';
        sections.forEach(sec => {
          const top = sec.offsetTop - 90;
          if (scrollY >= top) current = sec.id;
        });
        links.forEach(link => {
          link.classList.toggle('active', link.dataset.section === current);
        });

        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Back to top click
  btt.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


// ─── NAV: MOBILE HAMBURGER ───────────────────────────────────────────────────
(function initMobileNav() {
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks  = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('mobile-open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  // Close on link click
  navLinks.addEventListener('click', e => {
    if (e.target.closest('.nav-link')) {
      navLinks.classList.remove('mobile-open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!e.target.closest('.site-nav')) {
      navLinks.classList.remove('mobile-open');
      hamburger.classList.remove('open');
    }
  });
})();


// ─── THEME TOGGLE ────────────────────────────────────────────────────────────
(function initTheme() {
  const btn  = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  if (stored) root.setAttribute('data-theme', stored);

  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    btn.setAttribute('aria-label', next === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
  });
})();


// ─── SECTION EXPAND / COLLAPSE ───────────────────────────────────────────────
(function initSections() {
  const headers = document.querySelectorAll('.section-header');

  headers.forEach(header => {
    const sectionId = header.dataset.toggle;
    const body      = document.getElementById(sectionId + '-body');
    const btn       = header.querySelector('.section-toggle');
    if (!body || !btn) return;

    header.addEventListener('click', () => {
      const isCollapsed = body.classList.contains('collapsed');
      body.classList.toggle('collapsed', !isCollapsed);
      btn.setAttribute('aria-expanded', isCollapsed ? 'true' : 'false');
    });
  });

  // Global expand / collapse (header hero button too)
  function expandAll() {
    headers.forEach(h => {
      const id   = h.dataset.toggle;
      const body = document.getElementById(id + '-body');
      const btn  = h.querySelector('.section-toggle');
      if (body && btn) {
        body.classList.remove('collapsed');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  }
  function collapseAll() {
    headers.forEach(h => {
      const id   = h.dataset.toggle;
      const body = document.getElementById(id + '-body');
      const btn  = h.querySelector('.section-toggle');
      if (body && btn) {
        body.classList.add('collapsed');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  document.getElementById('expand-all')?.addEventListener('click', expandAll);
  document.getElementById('collapse-all')?.addEventListener('click', collapseAll);
  document.getElementById('expand-all-hero')?.addEventListener('click', expandAll);
})();


// ─── SEARCH ──────────────────────────────────────────────────────────────────
(function initSearch() {
  const overlay  = document.getElementById('search-overlay');
  const input    = document.getElementById('search-input');
  const results  = document.getElementById('search-results');
  const openBtn  = document.getElementById('search-toggle');

  // Build search index from cards
  const cards = Array.from(document.querySelectorAll('.tool-card[data-search]'));
  const index = cards.map(card => {
    const section = card.closest('.resource-section');
    return {
      name:    card.querySelector('.card-name')?.textContent.trim() || '',
      desc:    card.querySelector('.card-desc')?.textContent.trim() || '',
      keywords: (card.dataset.search || '').toLowerCase(),
      section: section?.querySelector('.section-title')?.textContent.trim() || '',
      link:    card.querySelector('.card-link')?.href || null,
      el:      card,
    };
  });

  function openSearch() {
    overlay.classList.add('open');
    input.focus();
    input.select();
  }
  function closeSearch() {
    overlay.classList.remove('open');
    input.value = '';
    results.innerHTML = '';
  }

  openBtn.addEventListener('click', openSearch);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });

  // Render results
  function search(q) {
    const query = q.trim().toLowerCase();
    results.innerHTML = '';
    if (!query) return;

    const hits = index.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.keywords.includes(query) ||
      item.desc.toLowerCase().includes(query) ||
      item.section.toLowerCase().includes(query)
    ).slice(0, 8);

    if (!hits.length) {
      results.innerHTML = `<p class="search-empty">No results for "<strong>${escapeHtml(q)}</strong>"</p>`;
      return;
    }

    hits.forEach(item => {
      const el = document.createElement('a');
      el.className = 'search-result-item';
      el.href = item.link || '#' + item.el.closest('.resource-section')?.id;
      if (item.link) el.target = '_blank';
      el.rel = 'noopener';
      el.setAttribute('role', 'option');
      el.innerHTML = `
        <span class="result-name">${highlightMatch(item.name, query)}</span>
        <span class="result-section">${escapeHtml(item.section)}</span>
      `;
      el.addEventListener('click', () => {
        if (!item.link) {
          // Scroll to card
          item.el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          item.el.style.transition = 'box-shadow 0.3s';
          item.el.style.boxShadow  = '0 0 0 2px var(--accent)';
          setTimeout(() => { item.el.style.boxShadow = ''; }, 1500);
        }
        closeSearch();
      });
      results.appendChild(el);
    });
  }

  input.addEventListener('input', e => search(e.target.value));

  function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  function highlightMatch(str, q) {
    const i = str.toLowerCase().indexOf(q);
    if (i === -1) return escapeHtml(str);
    return escapeHtml(str.slice(0, i)) +
           `<mark style="background:var(--accent-dim);color:var(--accent);border-radius:2px;">${escapeHtml(str.slice(i, i + q.length))}</mark>` +
           escapeHtml(str.slice(i + q.length));
  }
})();


// ─── KEYBOARD SHORTCUTS ──────────────────────────────────────────────────────
(function initKeyboard() {
  const overlay       = document.getElementById('search-overlay');
  const shortcutsPanel = document.getElementById('shortcuts-panel');
  const input         = document.getElementById('search-input');

  document.addEventListener('keydown', e => {
    const tag = document.activeElement.tagName.toLowerCase();
    const typing = (tag === 'input' || tag === 'textarea');

    // Ctrl+K → open search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (overlay.classList.contains('open')) {
        overlay.classList.remove('open');
      } else {
        overlay.classList.add('open');
        input.focus();
      }
      return;
    }

    // Ctrl+E → expand all, Ctrl+Shift+E → collapse all
    if ((e.ctrlKey || e.metaKey) && e.key === 'e' && !typing) {
      e.preventDefault();
      if (e.shiftKey) {
        document.getElementById('collapse-all')?.click();
      } else {
        document.getElementById('expand-all')?.click();
      }
      return;
    }

    // Esc → close overlays
    if (e.key === 'Escape') {
      overlay.classList.remove('open');
      shortcutsPanel.classList.remove('open');
      return;
    }

    // ? → toggle shortcuts
    if (e.key === '?' && !typing) {
      shortcutsPanel.classList.toggle('open');
      return;
    }
  });
})();


// ─── SHORTCUTS PANEL ─────────────────────────────────────────────────────────
(function initShortcuts() {
  const panel   = document.getElementById('shortcuts-panel');
  const openBtn = document.getElementById('show-shortcuts-btn');
  const closeBtn = document.getElementById('shortcuts-close');

  openBtn?.addEventListener('click', () => panel.classList.toggle('open'));
  closeBtn?.addEventListener('click', () => panel.classList.remove('open'));

  document.addEventListener('click', e => {
    if (!e.target.closest('#shortcuts-panel') && !e.target.closest('#show-shortcuts-btn')) {
      panel.classList.remove('open');
    }
  });
})();


// ─── COPY BUTTONS ────────────────────────────────────────────────────────────
(function initCopy() {
  document.querySelectorAll('.copy-btn[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        btn.classList.add('copied');
        const orig = btn.innerHTML;
        btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = orig;
        }, 1800);
      } catch {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = btn.dataset.copy;
        ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
    });
  });
})();


// ─── SCROLL REVEAL ───────────────────────────────────────────────────────────
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  els.forEach((el, i) => {
    el.style.transitionDelay = `${i * 60}ms`;
    io.observe(el);
  });
})();


// ─── HERO STAT COUNTER ───────────────────────────────────────────────────────
(function initCounters() {
  const counters = [
    { id: 'stat-tools', target: 45 },
    { id: 'stat-safe',  target: 32 },
  ];
  counters.forEach(({ id, target }) => {
    const el = document.getElementById(id);
    if (!el) return;
    let start = null;
    const duration = 1400;
    function step(ts) {
      if (!start) start = ts;
      const pct = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - pct, 3);
      el.textContent = Math.round(eased * target);
      if (pct < 1) requestAnimationFrame(step);
    }
    // Start when hero is visible (slight delay for drama)
    setTimeout(() => requestAnimationFrame(step), 600);
  });
})();
