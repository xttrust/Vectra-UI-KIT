# Vectra UI — Modern Dark/Cyan UI Kit

Vectra UI is a fast, portable design system built with HTML, CSS (design tokens), and Bootstrap 5. It delivers a polished dark/cyan aesthetic, accessible components, marketing sections, form flows, and a tiny layer of optional vanilla JS. No build steps—copy the pages or blocks you need and ship.

---

## Quick Start

Open `index.html` in your browser. Copy/paste component blocks from `components.html`, marketing sections from `sections.html`, or form patterns from `forms.html` into your project. Optional JS (`assets/js/ui-kit.js`) adds theme toggle, code-copy, counters, testimonial slider, and smooth scrolling for sidebar links.

---

## Project Structure

```text
.
  README.md
  index.html          # Landing / Overview
  components.html     # Component catalog (UI primitives + complex)
  sections.html       # Marketing / landing section library
  forms.html          # Auth + contact + newsletter + multi-step patterns
  pricing.html        # Pricing tables & plan teasers
  utilities.html      # Utility classes + design tokens
  docs.html           # How to use & extend (guide)
  assets/
    css/
      ui-kit.css      # Core: tokens, base, components, sections
      auth.css        # Auth/profile page styles
    js/
      ui-kit.js       # Progressive enhancements (optional)
    img/              # Placeholder / demo imagery (optional)
```

---

## Highlights

* Pure HTML + Bootstrap 5 components (no custom build pipeline)
* CSS variables for color, spacing, radius, elevation, motion
* Dark/Light themes via `[data-theme]` attribute + localStorage persistence
* Layered design tokens → components → section utilities
* Accessible markup emphasis (headings, focus rings, aria roles where meaningful)
* Progressive enhancement: page still works if JS fails
* Small, composable utilities instead of deeply nested overrides

---

## Component & Section Coverage

Legend: ✅ Implemented | 🧩 Planned / simple to add | ⏳ Future / optional | (blank = not targeted yet)

### Layout & Structure
| Item | Status | Notes |
|------|--------|-------|
| Header / Navbar (sticky / transparent) | ✅ | `.uk-navbar` with blur + scroll state |
| Hero (gradient, centered, split, minimal) | ✅ | Variants in `sections.html` & `index.html` |
| Reusable cards / panels | ✅ | `.uk-card` variants (glass, accent, outline, elevated) |

### Navigation & Menus
| Item | Status | Notes |
|------|--------|-------|
| Top navigation bar | ✅ | Responsive collapse |
| Sidebar (catalog) | ✅ | `.uk-side-nav` click-activated |
| Breadcrumbs, Pagination, Tabs, Accordion | ✅ | Themed Bootstrap components |
| Offcanvas / Mega menu | ✅ | Demos included |

### Content Presentation
| Item | Status | Notes |
|------|--------|-------|
| Typography / text utilities | ✅ | Base type + dim/alt tokens |
| Testimonials | ✅ | Custom slider with ARIA roles |
| Carousel | ✅ | Themed Bootstrap carousel |
| Modals, Tooltips, Popovers | ✅ | Styled surfaces |
| Progress / Timeline | ✅ | `.progress-uk` + `.timeline` |

### Forms & Input
| Item | Status | Notes |
|------|--------|-------|
| Auth (login/register/reset) | ✅ | Panels + states |
| Contact / Newsletter | ✅ | Patterns included |
| Multi‑step / wizard | ✅ | `steps` + example |
| Range / Spinners (showcase) | 🧩 | Styling ready |

### SaaS / Marketing
| Item | Status | Notes |
|------|--------|-------|
| Pricing tables & teaser | ✅ | `pricing.html` |
| Comparison table | 🧩 | Example in catalog |
| Product cards | ✅ | E‑commerce ready |
| Logos, CTA, FAQ, Newsletter | ✅ | Section library

---

## Utilities & Design Tokens

Core tokens defined in `assets/css/ui-kit.css`:

* Colors, gradients, accent glow
* Typography stacks & heading weights
* Radii (xs → pill) & elevation scale
* Transitions & motion helpers
* Spacing helpers: `.px-gutter`, `.mt-6`, `.py-6`, width constraints (`.max-w-*`)
* Effects: glass (`.uk-card-glass`, `.glass`), gradient text (`.gradient-text`), elevation hover (`.uk-elevate-hover`), outline/hover, fade/scale animations
* Marketing utilities: `.feature-grid`, `.logo-grid`, `.overlap-row`, `.pricing-teaser`, `.cta-wide`, `.newsletter-slim`, `.contact-grid`

---

## JavaScript (Optional Layer)

`assets/js/ui-kit.js` adds:

* Theme toggle (persisted)
* Back‑to‑top reveal
* Copy‑to‑clipboard for code blocks
* KPI / stat counters (IntersectionObserver)
* Testimonial slider (translate track + autoplay)
* Sidebar click → smooth scroll + active state
* AOS init with defensive fallback

The site renders without JS (progressive enhancement by design).

---

## Theming & Customization

Override `--uk-accent` and related tokens to rebrand. You can also scope themes using an attribute on `<body>` or `<html>`.

---

## License

MIT. See `LICENSE`.

---

## Credit

Originally authored by Florin Pinta (xttrust). Rebranded and customized as “Vectra UI”.

---

## Happy shipping. 🚀
