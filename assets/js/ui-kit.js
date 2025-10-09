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
        this.enhanceAccessibility();
      } catch (e) {
        console.error('[UIK:init] Failed', e);
        // Fallback: reveal any AOS-hidden content if initialization breaks
        document.querySelectorAll('[data-aos]').forEach(el => el.removeAttribute('data-aos'));
      }
    },
    cache(){
      this.doc = document;
      this.html = document.documentElement;
      this.body = document.body;
      this.backToTop = document.getElementById('backToTop');
      this.themeToggle = document.querySelector('[data-toggle="theme"]');
    },
    initTheme(){
      const saved = localStorage.getItem('uikit-theme');
      if (saved){
        this.html.setAttribute('data-theme', saved);
        if (saved === 'light') this.themeToggle?.classList.add('active');
      }
    },
    toggleTheme(){
      const current = this.html.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      this.html.setAttribute('data-theme', next);
      localStorage.setItem('uikit-theme', next);
      this.themeToggle?.classList.toggle('active', next === 'light');
    },
    bindEvents(){
      // Throttled scroll handler for better performance
      let scrollTimeout;
      window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
          scrollTimeout = setTimeout(() => {
            this.onScroll();
            scrollTimeout = null;
          }, 16); // ~60fps
        }
      });
      
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
        try {
          AOS.init({
            offset:80,
            duration:700,
            easing:'ease-out-cubic',
            delay:40,
            once:false,
            mirror:false,
            disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          });
        } catch (e) {
          console.warn('[UIK:aos] Failed to initialize AOS:', e);
        }
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
        btn.addEventListener('click', async () => {
          try {
            const pre = btn.closest('.code-block');
            const code = pre.querySelector('code')?.innerText.trim();
            if (!code) return;
            
            await navigator.clipboard.writeText(code);
            btn.classList.add('copied');
            btn.textContent = 'Copied';
            setTimeout(()=>{ 
              btn.classList.remove('copied'); 
              btn.textContent='Copy';
            },1600);
          } catch (e) {
            console.warn('[UIK:copy] Failed to copy text:', e);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = code;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            btn.textContent = 'Copied';
            setTimeout(()=>{ btn.textContent='Copy';},1600);
          }
        });
      });
    },
    initCounters(){
      const counters = document.querySelectorAll('[data-counter]');
      if (!counters.length) return;
      
      try {
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
              animate(entry.target); 
              io.unobserve(entry.target);
            }
          });
        }, { threshold:.5 });
        counters.forEach(c => io.observe(c));
      } catch (e) {
        console.warn('[UIK:counters] Failed to initialize counters:', e);
        // Fallback: show final values immediately
        counters.forEach(c => {
          const end = parseInt(c.getAttribute('data-counter'),10) || 0;
          c.textContent = end.toLocaleString();
        });
      }
    },
    initTestimonialSlider(){
      const slider = document.querySelector('.testimonial-slider');
      if (!slider) return;
      
      try {
        const track = slider.querySelector('.testimonial-track');
        if (!track) return;
        const cards = Array.from(track.children);
        if (!cards.length) return;
        
        let index = 0; let timer = null;
        const autoplayDelay = parseInt(slider.getAttribute('data-autoplay'),10) || 0;
        const setActive = i => {
          index = (i + cards.length) % cards.length;
          cards.forEach((c,idx) => c.classList.toggle('active', idx === index));
          track.style.transform = `translateX(-${index * 100}%)`;
        };
        const next = () => setActive(index + 1);
        const prev = () => setActive(index - 1);
        
        // Event listeners with error handling
        const nextBtn = slider.querySelector('.t-next');
        const prevBtn = slider.querySelector('.t-prev');
        
        if (nextBtn) {
          nextBtn.addEventListener('click', () => { next(); restart(); });
        }
        if (prevBtn) {
          prevBtn.addEventListener('click', () => { prev(); restart(); });
        }
        
        function restart(){
          if (!autoplayDelay) return; 
          clearInterval(timer); 
          timer = setInterval(next, autoplayDelay);
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
      } catch (e) {
        console.warn('[UIK:testimonial] Failed to initialize testimonial slider:', e);
      }
    },
    initTooltipsPopovers(){
      if (typeof bootstrap === 'undefined') return;
      
      try {
        document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
          try {
            new bootstrap.Tooltip(el, { container: 'body', customClass:'tooltip-uk' });
          } catch (e) {
            console.warn('[UIK:tooltip] Failed to initialize tooltip:', e);
          }
        });
        document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => {
          try {
            new bootstrap.Popover(el, { container: 'body', trigger: 'focus', customClass:'popover-uk' });
          } catch (e) {
            console.warn('[UIK:popover] Failed to initialize popover:', e);
          }
        });
      } catch (e) {
        console.warn('[UIK:tooltips] Failed to initialize tooltips/popovers:', e);
      }
    },
    initFileUpload(){
      const wrappers = document.querySelectorAll('[data-file-upload]');
      wrappers.forEach(box => {
        try {
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
          
          // Drag and drop handlers
          ['dragenter','dragover'].forEach(ev => {
            box.addEventListener(ev, e => { 
              e.preventDefault(); 
              e.stopPropagation(); 
              box.classList.add('dragover'); 
            });
          });
          
          ['dragleave','drop'].forEach(ev => {
            box.addEventListener(ev, e => { 
              e.preventDefault(); 
              e.stopPropagation(); 
              box.classList.remove('dragover'); 
            });
          });
          
          box.addEventListener('drop', e => {
            if (e.dataTransfer?.files?.length){ 
              input.files = e.dataTransfer.files; 
              update(); 
            }
          });
        } catch (e) {
          console.warn('[UIK:file-upload] Failed to initialize file upload:', e);
        }
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
      
      try {
        // Create banner dynamically so it doesn't interfere with page layout when not needed
        let banner = document.querySelector('.cookie-banner');
        if (!banner){
          banner = document.createElement('div');
          banner.className = 'cookie-banner';
          banner.setAttribute('role', 'dialog');
          banner.setAttribute('aria-labelledby', 'cookie-title');
          banner.innerHTML = `
            <p id="cookie-title"><strong>Cookies:</strong> We use minimal analytics to improve the kit. 
            <a href="#" class="text-decoration-underline" aria-label="Learn more about our cookie policy">Learn more</a>.</p>
            <div class="actions">
              <button class="btn btn-uk-soft btn-sm" data-action="reject" aria-label="Reject cookies">Reject</button>
              <button class="btn btn-uk btn-sm" data-action="accept" aria-label="Accept cookies">Accept</button>
            </div>`;
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
      } catch (e) {
        console.warn('[UIK:cookie] Failed to initialize cookie banner:', e);
      }
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
    },
    enhanceAccessibility(){
      try {
        // Add missing ARIA labels to interactive elements
        document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])').forEach(btn => {
          if (!btn.textContent.trim() && !btn.querySelector('i')) {
            btn.setAttribute('aria-label', 'Button');
          }
        });
        
        // Ensure all images have alt attributes
        document.querySelectorAll('img:not([alt])').forEach(img => {
          img.setAttribute('alt', 'Image');
        });
        
        // Add role attributes where needed
        document.querySelectorAll('.testimonial-slider').forEach(slider => {
          if (!slider.getAttribute('role')) {
            slider.setAttribute('role', 'region');
            slider.setAttribute('aria-label', 'Testimonials carousel');
          }
        });
        
        // Improve focus management for modals
        document.querySelectorAll('.modal').forEach(modal => {
          modal.addEventListener('shown.bs.modal', () => {
            const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            focusable?.focus();
          });
        });
        
        // Add keyboard navigation for custom components
        document.querySelectorAll('.uk-fab').forEach(fab => {
          fab.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              fab.click();
            }
          });
        });
        
        // Improve form accessibility
        document.querySelectorAll('form').forEach(form => {
          const inputs = form.querySelectorAll('input, select, textarea');
          inputs.forEach((input, index) => {
            if (!input.id) {
              input.id = `input-${index}`;
            }
            const label = form.querySelector(`label[for="${input.id}"]`);
            if (!label && input.placeholder) {
              input.setAttribute('aria-label', input.placeholder);
            }
          });
        });
        
      } catch (e) {
        console.warn('[UIK:accessibility] Failed to enhance accessibility:', e);
      }
    }
  };

  document.addEventListener('DOMContentLoaded', () => { UIK.init(); UIK.enhanceAccordions(); });
})();
