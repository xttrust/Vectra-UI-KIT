# Vectra UI Kit — Pro Edition

> A professional, accessible, dark/light-theme UI kit built on Bootstrap 5.  
> No build tools. Drop in two files and go.

[![License: MIT](https://img.shields.io/badge/License-MIT-00c2cb.svg)](LICENSE)
[![Bootstrap 5.3](https://img.shields.io/badge/Bootstrap-5.3-7952b3.svg)](https://getbootstrap.com)

---

## ✨ Features

- **Dark & light themes** — toggle on the fly; preference persisted to `localStorage`
- **Working scroll spy** — IntersectionObserver-based, not Bootstrap's unreliable offset math
- **Working modals** — correct z-index stacking, backdrop blur, dark-mode close button
- **30+ components** — cards, buttons, badges, alerts, modals, tabs, accordion, timeline, steps, pricing, testimonials, FAB, and more
- **Full form library** — all input types, floating labels, input groups, password toggle, validation states
- **Auth page templates** — login, register, password recovery, profile settings
- **Accessible** — focus rings, ARIA attributes, keyboard nav, `prefers-reduced-motion` support
- **Anchor-safe navigation** — `scroll-margin-top` applied globally so anchors never hide under the fixed navbar
- **Zero build tools** — pure HTML, CSS, and vanilla JS; fully CDN-driven
- **MIT licensed** — free for commercial and personal use

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

All modern browsers. IE is not supported.

| Chrome | Firefox | Safari | Edge |
|--------|---------|--------|------|
| ✅ 90+ | ✅ 89+ | ✅ 15+ | ✅ 90+ |

---

## 🤝 Contributing

Pull requests and issues are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Commit your changes
4. Open a pull request against `main`

---

## 📄 License

[MIT](LICENSE) © 2025 [Florin Pinta (xttrust)](https://github.com/xttrust)
