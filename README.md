# Vectra UI Kit

**A professional-grade, fully free UI kit built on Bootstrap 5.**  
Dark & light themes, 30+ components, auth pages, a complete form library, full documentation, and a clean vanilla JS engine — all without a single build tool.

[![License: MIT](https://img.shields.io/badge/License-MIT-00c2cb.svg)](LICENSE)
[![Bootstrap 5.3](https://img.shields.io/badge/Bootstrap-5.3.3-7952b3.svg)](https://getbootstrap.com)
[![GitHub Stars](https://img.shields.io/github/stars/xttrust/Vectra-UI-KIT?style=flat&color=00c2cb)](https://github.com/xttrust/Vectra-UI-KIT/stargazers)

> 💡 **Pro quality, zero cost.** Vectra started as an internal design system and has been fully open-sourced under the MIT licence — free for personal and commercial use, forever.

---

## ✨ What's Included

### 🎨 Design System
- Full **dark and light theme** with one-click toggle — preference saved to `localStorage`
- 40+ **CSS custom properties** (`--v-*`) covering colour, radius, shadow, transitions, and typography
- **Inter** + **JetBrains Mono** font stack with zero config

### 🧩 30+ Components
Cards, buttons (5 variants), badges, alerts, modals (4 sizes), tabs, pills, accordion, tables, progress bars, spinners, pagination, breadcrumbs, timeline, steps, code blocks with copy, tooltips, testimonial slider (touch/swipe), pricing cards, stat counters, file upload drop zone, floating action button, offcanvas panel

### 📝 Complete Form Library
All HTML input types, floating labels, input groups, password show/hide toggle, checkboxes, radios, switches, range slider, validation states (`.is-valid` / `.is-invalid`), and full sample forms (contact, newsletter)

### 🔐 Auth Page Templates
- Login — email/password + social buttons + remember me
- Register — full fields + terms checkbox
- Password Recovery — email form with animated sent-confirmation state
- Profile — tabbed settings (personal info, password + 2FA, notifications, billing)

### 📚 Documentation & Utilities
- Docs page covering quick start, design tokens, theming, JS API, data attributes, accessibility, and customisation
- Utility class reference with live swatches (colours, flex, borders, shadows, sizing, display, dividers, labels)

### ♿ Accessibility
- Visible focus rings on all interactive elements
- `aria-label` on all icon-only controls
- All animations disabled under `prefers-reduced-motion: reduce`
- WCAG AA colour contrast in both themes
- Semantic landmarks (`<nav>`, `<main>`, `<header>`, `<footer>`)

### ⚙️ Engineering Highlights
- **IntersectionObserver scroll spy** — replaces Bootstrap's unreliable offset-based spy; tracks both top navbar and sidebar independently
- **Anchor-safe navigation** — `scroll-margin-top: var(--v-navbar-h)` applied globally so deep links never hide under the fixed navbar
- **Zero build tools** — pure HTML, CSS, and vanilla JS; fully CDN-driven, works straight from the file system

---

## 🚀 Quick Start

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My App</title>

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

  <!-- Bootstrap 5 -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" crossorigin="anonymous" />

  <!-- Font Awesome 6 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" crossorigin="anonymous" />

  <!-- AOS (optional) -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" crossorigin="anonymous" />

  <!-- Vectra -->
  <link rel="stylesheet" href="assets/css/vectra.css" />
</head>
<body>

  <!-- your content here -->

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js" crossorigin="anonymous"></script>
  <script src="assets/js/vectra.js"></script>
</body>
</html>
```

Set `data-theme="light"` on `<html>` for a light-mode start, or swap themes programmatically:

```js
Vectra.toggleTheme();
```

---

## 📁 File Structure

```
Vectra-UI-KIT/
├── index.html          Landing / showcase page
├── components.html     Full component catalog
├── forms.html          Form elements reference
├── utilities.html      Utility classes reference
├── docs.html           Documentation
├── LICENSE             MIT license
├── README.md           This file
├── auth/
│   ├── login.html
│   ├── register.html
│   ├── recover.html
│   └── profile.html
└── assets/
    ├── css/
    │   └── vectra.css  Design system (~900 lines)
    └── js/
        └── vectra.js   JS engine (~400 lines)
```

---

## 🎨 Theming

All visual values live as CSS custom properties (`--v-*`) on `:root`. Override any token in your own stylesheet loaded **after** `vectra.css`:

```css
/* Change the accent colour to violet */
:root {
  --v-accent:      #7c3aed;
  --v-accent-2:    #a78bfa;
  --v-accent-rgb:  124, 58, 237;
  --v-accent-soft: rgba(124, 58, 237, .1);
  --v-accent-grad: linear-gradient(135deg, #7c3aed, #a78bfa);
  --v-accent-glow: 0 0 0 3px rgba(124, 58, 237, .3);
}
```

---

## 🔧 JavaScript API

`vectra.js` auto-initialises on `DOMContentLoaded` and exposes `window.Vectra`:

| Method | Description |
|--------|-------------|
| `Vectra.toggleTheme()` | Switch between dark and light themes |
| `Vectra.initScrollSpy()` | Activate navbar scroll spy (`[data-scrollspy]`) |
| `Vectra.initSideNav()` | Activate sidebar scroll spy (`[data-sidenav]`) |
| `Vectra.initCounters()` | Animate `data-counter` numbers on scroll |
| `Vectra.initCopyButtons()` | Wire `.v-copy-btn` to clipboard |
| `Vectra.initSliders()` | Testimonial sliders with touch/swipe |
| `Vectra.initPasswordToggle()` | Show/hide password fields |
| `Vectra.initFileUpload()` | Drag-and-drop zones (`.v-drop-zone`) |
| `Vectra.initFAB()` | Floating Action Button expand/collapse |
| `Vectra.initCookieBanner()` | Cookie consent banner |

---

## ♿ Accessibility

- All interactive elements have visible focus rings (`--v-focus`)  
- Icon-only controls include `aria-label`  
- Transitions disabled when `prefers-reduced-motion: reduce` is active  
- Colour contrast meets WCAG AA in both themes  
- Semantic landmarks: `<nav aria-label>`, `<main>`, `<header>`, `<footer>`  
- Bootstrap's built-in keyboard nav for modals, dropdowns, tabs, accordion  

---

## 🌐 Browser Support

All evergreen browsers. Internet Explorer is not supported.

| Chrome | Firefox | Safari | Edge | Opera |
|--------|---------|--------|------|-------|
| ✅ 90+ | ✅ 89+ | ✅ 15+ | ✅ 90+ | ✅ 76+ |

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are all welcome!

1. **Fork** the repository
2. **Create** a feature branch — `git checkout -b feat/my-feature`
3. **Commit** your changes with a clear message
4. **Open a pull request** against `main`

For larger changes, please open an issue first to discuss the proposal.

---

## 🙏 Credits

Built and maintained by **[Florin Pinta (xttrust)](https://github.com/xttrust)**.

If you find Vectra UI Kit useful, consider:
- ⭐ Starring the repo on [GitHub](https://github.com/xttrust/Vectra-UI-KIT)
- 🐦 Sharing it with your network
- 🛒 Checking out premium products at [creativeigniter.com](https://creativeigniter.com)

---

## 📄 License

[MIT](LICENSE) © 2026 [Florin Pinta (xttrust)](https://github.com/xttrust)  
Free for personal and commercial use. No attribution required (though appreciated).
