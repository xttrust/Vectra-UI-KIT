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
      this.initCustomizer();
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

    /* ── Color Customizer ────────────────────────────────────────── */
    initCustomizer() {
      const STORAGE_KEY = 'vectra-custom-colors';

      // ── Preset themes ──────────────────────────────────────────────
      const PRESETS = {
        'dark-teal': {
          name: 'Dark Teal', theme: 'dark',
          accent: '#00c2cb', accent2: '#38f9d7',
          bg: '#111318', bg2: '#171b23',
          surface: '#1a1f2e', surface2: '#1f2638',
          text: '#e2e8f0', text2: '#94a3b8', text3: '#627086',
          navbar: '#13171f',
        },
        'light': {
          name: 'Light', theme: 'light',
          accent: '#008f98', accent2: '#00c2cb',
          bg: '#f4f7fb', bg2: '#edf1f7',
          surface: '#ffffff', surface2: '#f1f5fb',
          text: '#0f172a', text2: '#334155', text3: '#64748b',
          navbar: '#ffffff',
        },
        'ocean': {
          name: 'Ocean Blue', theme: 'dark',
          accent: '#3b82f6', accent2: '#60a5fa',
          bg: '#0d1117', bg2: '#13191f',
          surface: '#161d27', surface2: '#1c2533',
          text: '#e2e8f0', text2: '#94a3b8', text3: '#627086',
          navbar: '#0f1923',
        },
        'midnight': {
          name: 'Midnight Purple', theme: 'dark',
          accent: '#8b5cf6', accent2: '#a78bfa',
          bg: '#0e0e1a', bg2: '#131320',
          surface: '#181826', surface2: '#1d1d2e',
          text: '#e2e8f0', text2: '#94a3b8', text3: '#627086',
          navbar: '#111122',
        },
        'amber': {
          name: 'Warm Amber', theme: 'dark',
          accent: '#f59e0b', accent2: '#fbbf24',
          bg: '#111318', bg2: '#171b23',
          surface: '#1a1f2e', surface2: '#1f2638',
          text: '#e2e8f0', text2: '#94a3b8', text3: '#627086',
          navbar: '#13171f',
        },
      };

      // ── Helpers ────────────────────────────────────────────────────
      const hexToRgb = hex => {
        const r = parseInt(hex.slice(1,3),16);
        const g = parseInt(hex.slice(3,5),16);
        const b = parseInt(hex.slice(5,7),16);
        return [r, g, b];
      };

      const applyColors = colors => {
        const root = document.documentElement;
        const [ar, ag, ab] = hexToRgb(colors.accent);
        root.style.setProperty('--v-accent',       colors.accent);
        root.style.setProperty('--v-accent-2',     colors.accent2);
        root.style.setProperty('--v-accent-rgb',   `${ar}, ${ag}, ${ab}`);
        root.style.setProperty('--v-accent-soft',  `rgba(${ar},${ag},${ab},.1)`);
        root.style.setProperty('--v-accent-grad',  `linear-gradient(135deg,${colors.accent} 0%,${colors.accent2} 100%)`);
        root.style.setProperty('--v-accent-glow',  `0 0 0 3px rgba(${ar},${ag},${ab},.3), 0 0 24px -4px rgba(${ar},${ag},${ab},.25)`);
        root.style.setProperty('--v-focus',        `0 0 0 3px rgba(${ar},${ag},${ab},.3)`);
        root.style.setProperty('--v-bg',           colors.bg);
        root.style.setProperty('--v-bg-2',         colors.bg2);
        root.style.setProperty('--v-surface',      colors.surface);
        root.style.setProperty('--v-surface-2',    colors.surface2);
        root.style.setProperty('--v-text',         colors.text);
        root.style.setProperty('--v-text-2',       colors.text2);
        root.style.setProperty('--v-text-3',       colors.text3);
        root.style.setProperty('--v-navbar-bg',    colors.navbar || colors.surface);
        if (colors.theme) root.setAttribute('data-theme', colors.theme);
      };

      const resetColors = () => {
        const root = document.documentElement;
        const props = ['--v-accent','--v-accent-2','--v-accent-rgb','--v-accent-soft',
          '--v-accent-grad','--v-accent-glow','--v-focus','--v-bg','--v-bg-2',
          '--v-surface','--v-surface-2','--v-text','--v-text-2','--v-text-3','--v-navbar-bg'];
        props.forEach(p => root.style.removeProperty(p));
        localStorage.removeItem(STORAGE_KEY);
        const saved = localStorage.getItem('vectra-theme') || 'dark';
        root.setAttribute('data-theme', saved);
      };

      const saveColors = colors => localStorage.setItem(STORAGE_KEY, JSON.stringify(colors));

      const getCurrentColors = () => {
        const s = getComputedStyle(document.documentElement);
        return {
          accent:  s.getPropertyValue('--v-accent').trim(),
          accent2: s.getPropertyValue('--v-accent-2').trim(),
          bg:      s.getPropertyValue('--v-bg').trim(),
          bg2:     s.getPropertyValue('--v-bg-2').trim(),
          surface: s.getPropertyValue('--v-surface').trim(),
          surface2:s.getPropertyValue('--v-surface-2').trim(),
          text:    s.getPropertyValue('--v-text').trim(),
          text2:   s.getPropertyValue('--v-text-2').trim(),
          text3:   s.getPropertyValue('--v-text-3').trim(),
          navbar:  s.getPropertyValue('--v-navbar-bg').trim() || s.getPropertyValue('--v-surface').trim(),
        };
      };

      // ── Build HTML ────────────────────────────────────────────────
      const swatchHtml = Object.entries(PRESETS).map(([key, p]) =>
        `<button class="v-cust-swatch" data-preset="${key}" title="${p.name}" style="background:${p.accent}" aria-label="${p.name} theme"></button>`
      ).join('');

      const colorRows = [
        { id: 'c-accent',  label: 'Accent',     prop: 'accent'  },
        { id: 'c-bg',      label: 'Background',  prop: 'bg'      },
        { id: 'c-surface', label: 'Surface',      prop: 'surface' },
        { id: 'c-text',    label: 'Text',         prop: 'text'    },
        { id: 'c-navbar',  label: 'Navbar',       prop: 'navbar'  },
      ];

      const rowsHtml = colorRows.map(r => `
        <div class="v-cust-row">
          <label for="${r.id}">${r.label}</label>
          <div class="v-cust-color-wrap">
            <div class="v-cust-color-preview">
              <input type="color" id="${r.id}" data-prop="${r.prop}" />
            </div>
            <span class="v-cust-hex" id="${r.id}-hex">#000000</span>
          </div>
        </div>`).join('');

      document.body.insertAdjacentHTML('beforeend', `
        <button id="v-customizer-btn" aria-label="Open color customizer" title="Customize colors">
          <i class="fa-solid fa-palette" aria-hidden="true"></i>
        </button>
        <div id="v-customizer-overlay" aria-hidden="true"></div>
        <div id="v-customizer-panel" role="dialog" aria-modal="true" aria-label="Color customizer">
          <div class="v-cust-head">
            <span><i class="fa-solid fa-palette me-2" aria-hidden="true"></i>Customizer</span>
            <button id="v-customizer-close" aria-label="Close customizer"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="v-cust-body">
            <div class="v-cust-section">
              <span class="v-cust-section-label">Preset Themes</span>
              <div class="v-cust-presets">${swatchHtml}</div>
            </div>
            <div class="v-cust-section">
              <span class="v-cust-section-label">Custom Colors</span>
              ${rowsHtml}
            </div>
          </div>
          <div class="v-cust-footer">
            <button id="v-customizer-reset" class="v-btn v-btn-ghost v-btn-sm w-100 justify-content-center">
              <i class="fa-solid fa-rotate-left me-1" aria-hidden="true"></i> Reset to Default
            </button>
          </div>
        </div>`);

      // ── Wire up UI ────────────────────────────────────────────────
      const btn      = document.getElementById('v-customizer-btn');
      const panel    = document.getElementById('v-customizer-panel');
      const overlay  = document.getElementById('v-customizer-overlay');
      const closeBtn = document.getElementById('v-customizer-close');
      const resetBtn = document.getElementById('v-customizer-reset');

      const openPanel = () => {
        panel.classList.add('open');
        overlay.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        updateInputs();
      };
      const closePanel = () => {
        panel.classList.remove('open');
        overlay.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      };

      btn.addEventListener('click', () => panel.classList.contains('open') ? closePanel() : openPanel());
      overlay.addEventListener('click', closePanel);
      closeBtn.addEventListener('click', closePanel);

      // Preset swatches
      panel.querySelectorAll('.v-cust-swatch').forEach(swatch => {
        swatch.addEventListener('click', () => {
          const preset = PRESETS[swatch.dataset.preset];
          if (!preset) return;
          applyColors(preset);
          saveColors(preset);
          panel.querySelectorAll('.v-cust-swatch').forEach(s => s.classList.remove('active'));
          swatch.classList.add('active');
          updateInputs();
          // sync theme toggle icons
          document.querySelectorAll('[data-toggle="theme"]').forEach(b => this._updateThemeIcon(b, preset.theme));
        });
      });

      // Color inputs
      colorRows.forEach(row => {
        const input = document.getElementById(row.id);
        const hex   = document.getElementById(`${row.id}-hex`);
        if (!input) return;

        input.addEventListener('input', () => {
          const curr = getCurrentColors();
          curr[row.prop] = input.value;
          // For accent, also update accent2 (lighter variant)
          if (row.prop === 'accent') {
            curr.accent2 = lightenHex(input.value, 30);
          }
          // For bg, update bg2
          if (row.prop === 'bg') curr.bg2 = lightenHex(input.value, 8);
          // For surface, update surface2
          if (row.prop === 'surface') curr.surface2 = lightenHex(input.value, 6);
          // For text, update text2/text3
          if (row.prop === 'text') {
            curr.text2 = blendWithBg(input.value, curr.bg, 0.55);
            curr.text3 = blendWithBg(input.value, curr.bg, 0.35);
          }
          curr.theme = null; // don't force theme switch on manual change
          applyColors(curr);
          saveColors(curr);
          if (hex) hex.textContent = input.value;
          panel.querySelectorAll('.v-cust-swatch').forEach(s => s.classList.remove('active'));
        });
      });

      resetBtn.addEventListener('click', () => {
        resetColors();
        updateInputs();
        panel.querySelectorAll('.v-cust-swatch').forEach(s => s.classList.remove('active'));
        const theme = localStorage.getItem('vectra-theme') || 'dark';
        document.querySelectorAll('[data-toggle="theme"]').forEach(b => this._updateThemeIcon(b, theme));
      });

      // ── Color helpers ─────────────────────────────────────────────
      const lightenHex = (hex, amount) => {
        let [r,g,b] = hexToRgb(hex);
        r = Math.min(255, r + amount); g = Math.min(255, g + amount); b = Math.min(255, b + amount);
        return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
      };

      const blendWithBg = (fg, bg, ratio) => {
        const [fr,fg2,fb] = hexToRgb(fg); const [br,bg2,bb] = hexToRgb(bg);
        const r = Math.round(fr*ratio + br*(1-ratio));
        const g = Math.round(fg2*ratio + bg2*(1-ratio));
        const b2 = Math.round(fb*ratio + bb*(1-ratio));
        return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b2.toString(16).padStart(2,'0')}`;
      };

      const updateInputs = () => {
        const curr = getCurrentColors();
        colorRows.forEach(row => {
          const input = document.getElementById(row.id);
          const hex   = document.getElementById(`${row.id}-hex`);
          if (!input) return;
          const val = curr[row.prop] || '#000000';
          // Only set if it's a valid 6-char hex
          const clean = val.trim().replace(/\s/g,'');
          if (/^#[0-9a-fA-F]{6}$/.test(clean)) {
            input.value = clean;
            if (hex) hex.textContent = clean;
          }
        });
      };

      // ── Load saved on init ────────────────────────────────────────
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const colors = JSON.parse(saved);
          applyColors(colors);
          // Mark matching preset as active
          Object.entries(PRESETS).forEach(([key, p]) => {
            if (p.accent === colors.accent && p.bg === colors.bg) {
              panel.querySelectorAll(`.v-cust-swatch[data-preset="${key}"]`)
                   .forEach(s => s.classList.add('active'));
            }
          });
        } catch(e) { /* ignore corrupt data */ }
      }
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
