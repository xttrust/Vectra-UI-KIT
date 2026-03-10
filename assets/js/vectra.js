/*!
 * Vectra UI Kit — JavaScript Engine
 * Version: 2.0.0
 * Author: Florin Pinta (xttrust)
 * License: MIT
 * GitHub: https://github.com/xttrust/Vectra-UI-KIT
 */
(function () {
  'use strict';

  /* ================================================================
     VECTRA — Core Application Object
     ================================================================ */
  const Vectra = {

    /* ── Init ───────────────────────────────────────────────────── */
    init() {
      this.initTheme();
      this.initNavbar();
      this.initScrollSpy();
      this.initSideNav();
      this.initBackToTop();
      this.initCopyButtons();
      this.initCounters();
      this.initSliders();
      this.initFileUpload();
      this.initFAB();
      this.initCookieBanner();
      this.initAOS();
      this.initBootstrapComponents();
      this.initPasswordToggle();
    },

    /* ── Theme ──────────────────────────────────────────────────── */
    initTheme() {
      const saved = localStorage.getItem('vectra-theme') || 'dark';
      document.documentElement.setAttribute('data-theme', saved);

      document.querySelectorAll('[data-toggle="theme"]').forEach(btn => {
        this._updateThemeIcon(btn, saved);
        btn.addEventListener('click', () => this.toggleTheme(btn));
      });
    },

    toggleTheme(btn) {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('vectra-theme', next);
      document.querySelectorAll('[data-toggle="theme"]').forEach(b => this._updateThemeIcon(b, next));
    },

    _updateThemeIcon(btn, theme) {
      const icon = btn.querySelector('i');
      if (!icon) return;
      icon.className = theme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
      btn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    },

    /* ── Navbar ─────────────────────────────────────────────────── */
    initNavbar() {
      const nav = document.querySelector('.v-navbar');
      if (!nav) return;

      const onScroll = () => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    },

    /* ── Scroll Spy (IntersectionObserver) ──────────────────────── */
    /*
     * Tracks sections on the page and highlights the corresponding
     * nav link. Uses IntersectionObserver so it is reliable regardless
     * of section height, fixed offsets, or dynamic content.
     *
     * Usage: add data-scrollspy to your <nav> element.
     * Nav links must have href="#section-id".
     */
    initScrollSpy() {
      const navEl = document.querySelector('[data-scrollspy]');
      if (!navEl) return;

      const links = Array.from(navEl.querySelectorAll('a[href^="#"]'));
      if (!links.length) return;

      const sectionMap = new Map();
      links.forEach(link => {
        const id = link.getAttribute('href').slice(1);
        const section = document.getElementById(id);
        if (section) sectionMap.set(section, link);
      });

      if (!sectionMap.size) return;

      // Track which sections are currently visible and pick the topmost
      const visible = new Set();

      const activate = (link) => {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      };

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            visible.add(entry.target);
          } else {
            visible.delete(entry.target);
          }
        });

        // Pick the section closest to the top of the viewport
        let best = null;
        let bestTop = Infinity;
        visible.forEach(section => {
          const top = section.getBoundingClientRect().top;
          if (Math.abs(top) < bestTop) {
            bestTop = Math.abs(top);
            best = section;
          }
        });

        if (best && sectionMap.has(best)) {
          activate(sectionMap.get(best));
        }
      }, {
        // A section is "active" when it occupies the middle 60% of the viewport
        rootMargin: '-15% 0px -60% 0px',
        threshold: 0,
      });

      sectionMap.forEach((link, section) => observer.observe(section));
    },

    /* ── Side Nav Scroll Spy ─────────────────────────────────────── */
    /*
     * The sidebar navigation (components/docs/forms pages) uses the
     * same IntersectionObserver approach. Attach [data-sidenav] to
     * the <nav> element.
     */
    initSideNav() {
      document.querySelectorAll('[data-sidenav]').forEach(navEl => {
        const links = Array.from(navEl.querySelectorAll('a[href^="#"]'));
        if (!links.length) return;

        const sectionMap = new Map();
        links.forEach(link => {
          const id = link.getAttribute('href').slice(1);
          const section = document.getElementById(id);
          if (section) sectionMap.set(section, link);
        });

        if (!sectionMap.size) return;

        const visible = new Set();

        const activate = (link) => {
          links.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
          // Scroll active link into view inside the sidebar
          link.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        };

        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) visible.add(entry.target);
            else visible.delete(entry.target);
          });

          let best = null;
          let bestTop = Infinity;
          visible.forEach(section => {
            const top = Math.abs(section.getBoundingClientRect().top);
            if (top < bestTop) { bestTop = top; best = section; }
          });

          if (best && sectionMap.has(best)) activate(sectionMap.get(best));
        }, {
          rootMargin: '-10% 0px -65% 0px',
          threshold: 0,
        });

        sectionMap.forEach((link, section) => observer.observe(section));

        // Click: smooth scroll + immediate active state
        navEl.addEventListener('click', e => {
          const a = e.target.closest('a[href^="#"]');
          if (!a) return;
          e.preventDefault();
          const target = document.querySelector(a.getAttribute('href'));
          if (target) {
            // Smooth scroll accounting for the fixed navbar height
            const navbarH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--v-navbar-h') || '68');
            const y = target.getBoundingClientRect().top + window.scrollY - navbarH - 16;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
          links.forEach(l => l.classList.remove('active'));
          a.classList.add('active');
          history.replaceState(null, '', a.getAttribute('href'));
        });
      });
    },

    /* ── Back To Top ─────────────────────────────────────────────── */
    initBackToTop() {
      const btn = document.getElementById('backToTop');
      if (!btn) return;

      window.addEventListener('scroll', () => {
        btn.classList.toggle('show', window.scrollY > 400);
      }, { passive: true });

      btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    },

    /* ── Copy Buttons ────────────────────────────────────────────── */
    initCopyButtons() {
      document.querySelectorAll('.v-copy-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const block = btn.closest('.v-code-block');
          if (!block) return;
          const code = block.querySelector('code')?.innerText?.trim();
          if (!code) return;

          try {
            await navigator.clipboard.writeText(code);
          } catch {
            // Fallback for older browsers or non-HTTPS
            const ta = document.createElement('textarea');
            ta.value = code;
            ta.style.cssText = 'position:fixed;opacity:0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
          }

          const original = btn.textContent;
          btn.textContent = 'Copied!';
          btn.classList.add('copied');
          setTimeout(() => { btn.textContent = original; btn.classList.remove('copied'); }, 2000);
        });
      });
    },

    /* ── Animated Counters ───────────────────────────────────────── */
    initCounters() {
      const counters = document.querySelectorAll('[data-counter]');
      if (!counters.length) return;

      const easeOut = t => 1 - Math.pow(1 - t, 3);

      const animate = el => {
        const end = parseFloat(el.dataset.counter) || 0;
        const dur = parseInt(el.dataset.counterDuration) || 1400;
        const decimals = (el.dataset.counter.includes('.')) ? el.dataset.counter.split('.')[1].length : 0;
        const start = performance.now();

        const step = now => {
          const p = Math.min(1, (now - start) / dur);
          const value = easeOut(p) * end;
          el.textContent = decimals ? value.toFixed(decimals) : Math.floor(value).toLocaleString();
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };

      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); }
        });
      }, { threshold: 0.4 });

      counters.forEach(c => io.observe(c));
    },

    /* ── Testimonial Sliders ─────────────────────────────────────── */
    initSliders() {
      document.querySelectorAll('.v-testimonial-slider').forEach(slider => {
        const track  = slider.querySelector('.v-testimonial-track');
        const dots   = slider.querySelectorAll('.v-slider-dot');
        const prevBtn = slider.querySelector('[data-slider-prev]');
        const nextBtn = slider.querySelector('[data-slider-next]');
        if (!track) return;

        const cards = track.children.length;
        if (cards < 2) return;

        let current = 0;
        let timer = null;
        const delay = parseInt(slider.dataset.autoplay) || 0;

        const go = i => {
          current = ((i % cards) + cards) % cards;
          track.style.transform = `translateX(-${current * 100}%)`;
          dots.forEach((d, idx) => d.classList.toggle('active', idx === current));
        };

        prevBtn?.addEventListener('click', () => { go(current - 1); restart(); });
        nextBtn?.addEventListener('click', () => { go(current + 1); restart(); });
        dots.forEach((d, i) => d.addEventListener('click', () => { go(i); restart(); }));

        // Touch / swipe support
        let touchX = 0;
        slider.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
        slider.addEventListener('touchend',   e => {
          const diff = touchX - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 40) { go(diff > 0 ? current + 1 : current - 1); restart(); }
        });

        function restart() {
          clearInterval(timer);
          if (delay) timer = setInterval(() => go(current + 1), delay);
        }

        if (delay) {
          timer = setInterval(() => go(current + 1), delay);
          slider.addEventListener('mouseenter', () => clearInterval(timer));
          slider.addEventListener('mouseleave', () => restart());
        }

        go(0);
      });
    },

    /* ── File Upload Drop Zone ───────────────────────────────────── */
    initFileUpload() {
      document.querySelectorAll('.v-drop-zone').forEach(zone => {
        const input   = zone.querySelector('input[type="file"]');
        const display = zone.querySelector('[data-file-label]');
        if (!input) return;

        const update = () => {
          if (!display) return;
          if (input.files?.length) {
            display.textContent = input.files.length === 1
              ? input.files[0].name
              : `${input.files.length} files selected`;
          } else {
            display.textContent = zone.dataset.placeholder || 'Drop files here or click to browse';
          }
        };

        input.addEventListener('change', update);

        zone.addEventListener('dragover', e  => { e.preventDefault(); zone.classList.add('drag-over'); });
        zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
        zone.addEventListener('drop', e => {
          e.preventDefault();
          zone.classList.remove('drag-over');
          if (e.dataTransfer.files.length) {
            // DataTransfer is read-only; we need to keep the files reference
            // Display file names from the drop
            const names = Array.from(e.dataTransfer.files).map(f => f.name);
            if (display) display.textContent = names.length === 1 ? names[0] : `${names.length} files selected`;
          }
        });
      });
    },

    /* ── FAB (Floating Action Button) ─────────────────────────────── */
    initFAB() {
      document.querySelectorAll('[data-fab-toggle]').forEach(btn => {
        const group = btn.closest('.v-fab-group');
        if (!group) return;
        btn.addEventListener('click', () => group.classList.toggle('v-fab-expand'));
      });
    },

    /* ── Cookie Banner ───────────────────────────────────────────── */
    initCookieBanner() {
      const banner = document.querySelector('.v-cookie-banner');
      if (!banner) return;
      if (localStorage.getItem('vectra-cookies-accepted')) return;

      // Reveal after short delay
      setTimeout(() => banner.classList.add('show'), 1200);

      banner.querySelectorAll('[data-cookie-accept], [data-cookie-decline]').forEach(btn => {
        btn.addEventListener('click', () => {
          if (btn.dataset.cookieAccept !== undefined) localStorage.setItem('vectra-cookies-accepted', '1');
          banner.classList.remove('show');
          setTimeout(() => banner.remove(), 600);
        });
      });
    },

    /* ── AOS (Animate On Scroll) ─────────────────────────────────── */
    initAOS() {
      if (typeof AOS === 'undefined') return;
      AOS.init({
        duration: 650,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60,
        disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      });
    },

    /* ── Bootstrap JS Component Init ─────────────────────────────── */
    initBootstrapComponents() {
      if (typeof bootstrap === 'undefined') return;

      // Tooltips
      document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
        new bootstrap.Tooltip(el, { trigger: 'hover focus', container: 'body' });
      });

      // Popovers
      document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => {
        new bootstrap.Popover(el, { trigger: 'focus', container: 'body' });
      });
    },

    /* ── Password Toggle ─────────────────────────────────────────── */
    initPasswordToggle() {
      document.querySelectorAll('[data-pw-toggle]').forEach(btn => {
        const targetId = btn.dataset.pwToggle;
        const input = targetId
          ? document.getElementById(targetId)
          : btn.closest('.v-input-icon-wrap')?.querySelector('input');
        if (!input) return;

        btn.addEventListener('click', () => {
          const visible = input.type === 'text';
          input.type = visible ? 'password' : 'text';
          const icon = btn.querySelector('i');
          if (icon) icon.className = visible ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash';
          btn.setAttribute('aria-label', visible ? 'Show password' : 'Hide password');
        });
      });
    },

  };

  /* ── Boot ─────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Vectra.init());
  } else {
    Vectra.init();
  }

  // Expose globally for optional manual use
  window.Vectra = Vectra;
})();
