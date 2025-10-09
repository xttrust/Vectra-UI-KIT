#  Vectra UI Kit

## A Premium, Production-Ready Design System

**Modern  Responsive  Accessible  Free Forever**

[!  📁 docs/
    📁 img/            # Documentation screenshots
  📄 LICENSE             # MIT License
```

---

## 🎨 Component Library

### Layout & Structure

| Component | Status | Description |
|-----------|--------|-------------|
| Navbar (Sticky/Transparent) | ✅ | Responsive navigation with blur effects |
| Hero Sections | ✅ | Gradient, centered, split, minimal variants |
| Cards & Panels | ✅ | Glass, accent, outline, elevated styles |
| Grid System | ✅ | Bootstrap 5 grid with custom utilities |
| Footer | ✅ | Multi-column footer with social links |

### Navigation & Menus

| Component | Status | Description |
|-----------|--------|-------------|
| Top Navigation | ✅ | Responsive collapse with theme toggle |
| Sidebar Navigation | ✅ | Scrollspy-enabled catalog navigation |
| Breadcrumbs | ✅ | Themed breadcrumb navigation |
| Tabs | ✅ | Styled tabs with active state |
| Pagination | ✅ | Page navigation component |
| Accordion | ✅ | Collapsible content panels |
| Offcanvas | ✅ | Slide-in side panels |

### Content & Display

| Component | Status | Description |
|-----------|--------|-------------|
| Typography | ✅ | Heading styles, text utilities, gradient text |
| Testimonials | ✅ | Slider with autoplay and ARIA |
| Carousel | ✅ | Image carousel with controls |
| Modals | ✅ | Dialog boxes with backdrop |
| Tooltips & Popovers | ✅ | Contextual overlays |
| Progress Bars | ✅ | Animated progress indicators |
| Timeline | ✅ | Vertical timeline component |
| Badges | ✅ | Status and label badges |
| Alerts | ✅ | Notification messages |

### Forms & Input

| Component | Status | Description |
|-----------|--------|-------------|
| Text Inputs | ✅ | Standard and floating label variants |
| Select Dropdowns | ✅ | Styled select elements |
| Checkboxes & Radios | ✅ | Custom styled form controls |
| Switches | ✅ | Toggle switches |
| Range Sliders | ✅ | Styled range inputs |
| File Upload | ✅ | Custom file input styling |
| Multi-Step Forms | ✅ | Wizard with progress indicators |
| Auth Panels | ✅ | Login, register, password recovery |
| Form Validation | ✅ | Error and success states |

### SaaS & Marketing

| Component | Status | Description |
|-----------|--------|-------------|
| Pricing Tables | ✅ | Feature comparison and plan cards |
| Product Cards | ✅ | E-commerce ready product displays |
| Team Section | ✅ | Team member cards with social links |
| FAQ Section | ✅ | Accordion-style frequently asked questions |
| CTA Sections | ✅ | Call-to-action blocks |
| Newsletter Forms | ✅ | Email subscription forms |
| Stats/Counters | ✅ | Animated statistics display |
| Logo Grid | ✅ | Client/partner logo showcase |
| Gallery | ✅ | Image grid layouts |
| Blog Cards | ✅ | Article preview cards |
| Cookie Banner | ✅ | GDPR compliance notice |
| Floating Action Button | ✅ | FAB for quick actions |
| Share Buttons | ✅ | Social media sharing |

---

## 🎯 Design System

### Color Palette

**Dark Theme:**

- Background: `#0A0F1E` (Deep navy)
- Surface: `#0F1828` (Dark slate)
- Text: `#E2E8F0` (Light gray)
- Accent: `#00ADB5` → `#56DFCF` (Teal/cyan gradient)

**Light Theme:**

- Background: `#FAFBFC` (Off-white)
- Surface: `#FFFFFF` (Pure white)
- Text: `#0F172A` (Deep slate)
- Accent: `#0ABAB5` → `#ADEED9` (Teal gradient with pink highlights)

### Typography

- **Headings**: Inter (700-800 weight)
- **Body**: Inter (400-500 weight)
- **Code**: Fira Code

### Spacing Scale

`0.25rem` · `0.5rem` · `0.75rem` · `1rem` · `1.5rem` · `2rem` · `3rem` · `4rem` · `6rem`

### Border Radius

- `xs`: 4px
- `sm`: 6px
- `md`: 8px (default)
- `lg`: 12px
- `xl`: 16px
- `pill`: 999px

---

## 💡 Usage Examples

### Theme Toggle

```html
<button id="themeToggle" class="btn btn-icon">
  <i class="fas fa-moon"></i>
</button>
```

The theme automatically persists to localStorage and applies on page load.

### Component Example - Card

```html
<div class="uk-card uk-card-glass">
  <div class="uk-card-body">
    <h5 class="uk-card-title">Card Title</h5>
    <p class="uk-card-text">Card content goes here.</p>
    <a href="#" class="btn btn-accent">Learn More</a>
  </div>
</div>
```

### Component Example - Hero Section

```html
<section class="hero gradient-bg">
  <div class="container">
    <div class="hero-content text-center">
      <h1 class="hero-title">Welcome to Vectra UI</h1>
      <p class="hero-subtitle">Build faster with premium components</p>
      <a href="#" class="btn btn-accent btn-lg">Get Started</a>
    </div>
  </div>
</section>
```

---

## 🔧 Customization

### Changing Colors

Override CSS custom properties in your own stylesheet:

```css
:root {
  --uk-accent: #FF6B6B;        /* Your brand color */
  --uk-accent-alt: #FFE66D;    /* Secondary color */
  --uk-radius-md: 16px;        /* Border radius */
}
```

### Custom Theme

Create a custom theme by adding a data attribute:

```html
<html data-theme="custom">
```

```css
[data-theme="custom"] {
  --uk-bg: #yourColor;
  --uk-text: #yourColor;
  /* ... other variables */
}
```

---

## 🚀 JavaScript Features

The optional `ui-kit.js` file provides:

- **Theme Toggle** - Persistent dark/light mode switching
- **Back to Top** - Smooth scroll to top button
- **Code Copy** - One-click code snippet copying
- **Stat Counters** - Animated number counting
- **Testimonial Slider** - Auto-playing testimonial carousel
- **Sidebar Navigation** - Smooth scrolling and active states
- **AOS Integration** - Scroll-triggered animations

**Progressive Enhancement**: The site works perfectly without JavaScript!

---

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ IE11 (not supported - requires modern CSS features)

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**You are free to:**

- ✅ Use commercially
- ✅ Modify and adapt
- ✅ Distribute
- ✅ Use privately

**No attribution required** - but appreciated! ⭐

---

## 👨‍💻 Author

**Florin Pinta** ([@xttrust](https://github.com/xttrust))

---

## 🙏 Acknowledgments

- [Bootstrap](https://getbootstrap.com/) - Component framework
- [Font Awesome](https://fontawesome.com/) - Icon library
- [AOS](https://michalsnik.github.io/aos/) - Animate on scroll library
- [Inter](https://rsms.me/inter/) - Typography

---

## 🌟 Show Your Support

If you find this project useful, please consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs and issues
- 💡 Suggesting new features
- 📢 Sharing with others
- ☕ [Buy me a coffee](https://github.com/sponsors/xttrust) (optional)

---

**🚀 Built with ❤️ by [Florin Pinta](https://github.com/xttrust)**

**[⬆ Back to Top](#-vectra-ui-kit)**cense: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3+-purple.svg)](https://getbootstrap.com/)
[![Theme](https://img.shields.io/badge/Theme-Dark%20%2F%20Light-00ADB5.svg)](#features)

[Live Demo](https://xttrust.github.io/Vectra-UI-KIT/)  [Components](#component-library)  [Documentation](docs.html)  [Report Bug](https://github.com/xttrust/Vectra-UI-KIT/issues)

---

##  Preview

###  Dark Theme

![Home Hero Dark](docs/img/home-hero-dark.png)

*Sleek dark theme with vibrant teal/cyan accents*

###  Light Theme

![Home Hero Light](docs/img/home-hero.png)

*Clean light theme with premium slate tones*

###  Components Showcase

![Components Catalog](docs/img/components-catalog-dark.png)

*50+ production-ready components*

![Core Components](docs/img/core-components-dark.png)

*Cards, forms, buttons, and more*

---

##  Features

Vectra UI is a fast, portable design system built with HTML, CSS (design tokens), and Bootstrap 5. It delivers a polished dark/cyan aesthetic, accessible components, marketing sections, form flows, and a layer of vanilla JavaScript. **No build steps required**copy the components you need and ship.

###  Key Highlights

- ** Dual Theme System** - Beautiful dark & light modes with smooth transitions
- ** Zero Build Required** - Pure HTML, CSS, and vanilla JavaScript
- ** 50+ Components** - Production-ready UI primitives and complex patterns
- ** Design Tokens** - CSS variables for easy customization
- ** Accessibility First** - WCAG compliant with semantic HTML and ARIA labels
- ** Fully Responsive** - Mobile-first design that works everywhere
- ** Bootstrap 5.3+ Powered** - Built on the world's most popular framework
- ** Rich Animations** - AOS (Animate On Scroll) integration
- ** Production Ready** - Used in real-world SaaS applications

###  Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern features (Grid, Flexbox, Custom Properties)
- **Bootstrap 5.3+** - Component framework
- **Font Awesome 6+** - Icon library
- **AOS** - Scroll animations
- **Vanilla JavaScript** - No framework dependencies

---

##  Quick Start

### Option 1: Clone the Repository

```bash
git clone https://github.com/xttrust/Vectra-UI-KIT.git
cd Vectra-UI-KIT
```

Open `index.html` in your browser - that's it! No build process required.

### Option 2: Download ZIP

[Download the latest release](https://github.com/xttrust/Vectra-UI-KIT/archive/refs/heads/main.zip) and extract it.

### Option 3: Use Individual Components

Copy/paste component blocks from:

- `components.html` - UI primitives and complex components
- `sections.html` - Marketing and landing sections
- `forms.html` - Auth, contact, and multi-step form patterns
- `pricing.html` - Pricing tables and plan displays

---

##  Project Structure

```text
Vectra-UI-KIT/
  index.html          # Landing page & overview
  components.html     # Complete component catalog
  sections.html       # Marketing section library
  forms.html          # Form patterns & authentication
  pricing.html        # Pricing tables & plans
  utilities.html      # Utility classes reference
  docs.html           # Documentation & guides
  assets/
     css/
       ui-kit.css     # Core styles (design tokens + components)
       auth.css       # Authentication page styles
     js/
       ui-kit.js      # Interactive enhancements
     img/            # Demo images
  auth/
    login.html         # Login page
    register.html      # Registration page
    recover.html       # Password recovery
    profile.html       # User profile
  docs/
     img/            # Documentation screenshots
  LICENSE             # MIT License
```
