/* ==========================================================================
   UI KIT - Modern Dark/Cyan Theme Design System
   
   Author: Florin Pinta (xttrust)
   Website: https://creativeigniter.com
   GitHub: https://github.com/xttrust
   Email: xttrust@creativeigniter.com
   
   Description: Complete design system with variables, components & utilities
   Dependencies: Bootstrap 5.3+, Font Awesome 6+, AOS
   License: MIT
   ========================================================================== */
/* ========================================================================
   UI KIT - Core Interactions & Helpers (Restored + Enhanced)
   ======================================================================== */
(function(){
  'use strict';

  const UIK = {
    init(){
      try {
        this.cache();
        this.initTheme();
        this.bindEvents();
        this.initAOS();
  this.initSideNav(); // simple click-based active state
        this.activateCopyButtons();
        this.initCounters();
        this.initTestimonialSlider();
        this.initTooltipsPopovers();
        this.initFileUpload();
        this.initFab();
        this.initCookieBanner();
      } catch (e) {
        console.error('[UIK:init] Failed', e);
        // Fallback: reveal any AOS-hidden content if initialization breaks
        document.querySelectorAll('[data-aos]').forEach(el => el.removeAttribute('data-aos'));
      }
    },
    cache(){
      this.doc = document;
      this.body = document.body;
      this.backToTop = document.getElementById('backToTop');
      this.themeToggle = document.querySelector('[data-toggle="theme"]');
    },
    initTheme(){
      const saved = localStorage.getItem('uikit-theme');
      if (saved){
        this.body.setAttribute('data-theme', saved);
        if (saved === 'light') this.themeToggle?.classList.add('active');
      }
    },
    toggleTheme(){
      const current = this.body.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      this.body.setAttribute('data-theme', next);
      localStorage.setItem('uikit-theme', next);
      this.themeToggle?.classList.toggle('active', next === 'light');
    },
    bindEvents(){
      window.addEventListener('scroll', () => this.onScroll());
      this.themeToggle?.addEventListener('click', () => this.toggleTheme());
      this.backToTop?.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth'}));
    },
    onScroll(){
      const y = window.scrollY;
      if (this.backToTop){
        this.backToTop.classList.toggle('show', y > 400);
      }
      const nav = document.querySelector('.uk-navbar');
      if (nav) nav.classList.toggle('navbar-scrolled', y > 40);
      // FAB show/hide
      if (this.fab){
        if (y > 300) this.fab.classList.remove('hidden'); else this.fab.classList.add('hidden');
      }
    },
    initAOS(){
      if (window.AOS){
        AOS.init({
          offset:80,
            duration:700,
            easing:'ease-out-cubic',
            delay:40,
            once:false,
            mirror:false,
        });
      }
    },
    initSideNav(){
      const navIds = ['sideNav', 'formNav', 'utilityNav', 'docsNav'];
      navIds.forEach(navId => {
        const nav = document.getElementById(navId);
        if (!nav) return;
        const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
        const activate = link => {
          links.forEach(l => l.classList.toggle('active', l === link));
        };
        // Initial: if URL has hash match it; else first link
        const hash = window.location.hash;
        if (hash){
          const initial = links.find(l => l.getAttribute('href') === hash);
          if (initial) activate(initial); else activate(links[0]);
        } else activate(links[0]);
        nav.addEventListener('click', e => {
          const a = e.target.closest('a[href^="#"]');
          if (!a) return;
          activate(a);
          const target = document.querySelector(a.getAttribute('href'));
          if (target){
            e.preventDefault();
            // Use scrollIntoView with block:'start' for precise alignment with scroll-margin-top
            target.scrollIntoView({ behavior:'smooth', block:'start' });
            history.replaceState(null, '', a.getAttribute('href'));
          }
        });
      });
    },
    activateCopyButtons(){
      document.querySelectorAll('.code-block .copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const pre = btn.closest('.code-block');
          const code = pre.querySelector('code')?.innerText.trim();
          if (!code) return;
          navigator.clipboard.writeText(code).then(() => {
            btn.classList.add('copied');
            btn.textContent = 'Copied';
            setTimeout(()=>{ btn.classList.remove('copied'); btn.textContent='Copy';},1600);
          });
        });
      });
    },
    initCounters(){
      const counters = document.querySelectorAll('[data-counter]');
      if (!counters.length) return;
      const easeOut = t => 1 - Math.pow(1 - t, 3);
      const animate = el => {
        const end = parseInt(el.getAttribute('data-counter'),10) || 0;
        const dur = parseInt(el.getAttribute('data-counter-duration'),10) || 1400;
        const start = performance.now();
        const step = now => {
          const progress = Math.min(1, (now - start) / dur);
          el.textContent = Math.floor(easeOut(progress) * end).toLocaleString();
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting){
            animate(entry.target); io.unobserve(entry.target);
          }
        });
      }, { threshold:.5 });
      counters.forEach(c => io.observe(c));
    },
    initTestimonialSlider(){
      const slider = document.querySelector('.testimonial-slider');
      if (!slider) return;
      const track = slider.querySelector('.testimonial-track');
      if (!track) return;
      const cards = Array.from(track.children);
      let index = 0; let timer = null;
      const autoplayDelay = parseInt(slider.getAttribute('data-autoplay'),10) || 0;
      const setActive = i => {
        index = (i + cards.length) % cards.length;
        cards.forEach((c,idx) => c.classList.toggle('active', idx === index));
        track.style.transform = `translateX(-${index * 100}%)`;
      };
      const next = () => setActive(index + 1);
      const prev = () => setActive(index - 1);
      slider.querySelector('.t-next')?.addEventListener('click', () => { next(); restart(); });
      slider.querySelector('.t-prev')?.addEventListener('click', () => { prev(); restart(); });
      function restart(){
        if (!autoplayDelay) return; clearInterval(timer); timer = setInterval(next, autoplayDelay);
      }
      if (autoplayDelay){
        timer = setInterval(next, autoplayDelay);
        slider.addEventListener('mouseenter', () => clearInterval(timer));
        slider.addEventListener('mouseleave', () => restart());
      }
      // Accessibility
      slider.setAttribute('role','region');
      slider.setAttribute('aria-label','Testimonials');
      cards.forEach((card,i) => {
        card.setAttribute('role','group');
        card.setAttribute('aria-roledescription','slide');
        card.setAttribute('aria-label', `Slide ${i+1} of ${cards.length}`);
      });
      // Ensure track has transition if not set in markup
      if (!track.style.transition) track.style.transition = 'transform .6s cubic-bezier(.4,0,.2,1)';
      setActive(0);
    },
    initTooltipsPopovers(){
      if (typeof bootstrap === 'undefined') return;
      document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el, { container: 'body', customClass:'tooltip-uk' }));
      document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => new bootstrap.Popover(el, { container: 'body', trigger: 'focus', customClass:'popover-uk' }));
    },
    initFileUpload(){
      const wrappers = document.querySelectorAll('[data-file-upload]');
      wrappers.forEach(box => {
        const input = box.querySelector('.file-input');
        const labelText = box.querySelector('.file-label-text');
        if (!input) return;
        const update = () => {
          if (input.files && input.files.length){
            labelText.textContent = input.files.length === 1 ? input.files[0].name : `${input.files.length} files selected`;
          } else {
            labelText.textContent = 'Drop or select a file';
          }
        };
        input.addEventListener('change', update);
        ['dragenter','dragover'].forEach(ev => box.addEventListener(ev, e => { e.preventDefault(); e.stopPropagation(); box.classList.add('dragover'); }));
        ['dragleave','drop'].forEach(ev => box.addEventListener(ev, e => { e.preventDefault(); e.stopPropagation(); box.classList.remove('dragover'); }));
        box.addEventListener('drop', e => {
          if (e.dataTransfer?.files?.length){ input.files = e.dataTransfer.files; update(); }
        });
      });
    },
    initFab(){
      this.fab = document.querySelector('[data-fab]') || document.querySelector('.uk-fab');
      if (!this.fab) return;
      this.fab.setAttribute('aria-label','Primary Action');
      this.fab.classList.add('hidden');
    },
    initCookieBanner(){
      const key = 'uk-cookie-consent';
      if (localStorage.getItem(key)) return; // already accepted
      // Create banner dynamically so it doesn't interfere with page layout when not needed
      let banner = document.querySelector('.cookie-banner');
      if (!banner){
        banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.innerHTML = `<p><strong>Cookies:</strong> We use minimal analytics to improve the kit. <a href="#" class="text-decoration-underline">Learn more</a>.</p><div class="actions"><button class="btn btn-uk-soft btn-sm" data-action="reject">Reject</button><button class="btn btn-uk btn-sm" data-action="accept">Accept</button></div>`;
        document.body.appendChild(banner);
      }
      banner.querySelectorAll('button[data-action]')?.forEach(btn => {
        btn.addEventListener('click', e => {
          const action = btn.getAttribute('data-action');
            localStorage.setItem(key, action === 'accept' ? '1':'0');
            banner.classList.add('hide');
            setTimeout(()=> banner.remove(), 600);
        });
      });
    },
    enhanceAccordions(){
      document.querySelectorAll('.accordion-uk').forEach(acc => {
        acc.addEventListener('show.bs.collapse', e => {
          const item = e.target.closest('.accordion-item');
          item?.classList.add('active');
        });
        acc.addEventListener('hide.bs.collapse', e => {
          const item = e.target.closest('.accordion-item');
          item?.classList.remove('active');
        });
      });
    }
  };

  document.addEventListener('DOMContentLoaded', () => { UIK.init(); UIK.enhanceAccordions(); });
})();
