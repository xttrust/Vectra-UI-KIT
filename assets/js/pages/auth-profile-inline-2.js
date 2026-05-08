// Simple tab switching for profile page
    const navLinks = document.querySelectorAll('[data-tab-target]');
    const tabs = document.querySelectorAll('#tab-profile,#tab-security,#tab-notifications,#tab-billing');

    navLinks.forEach(link => {
      link.addEventListener('click', function () {
        const target = this.getAttribute('data-tab-target');
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        tabs.forEach(t => { t.style.display = t.id === target ? '' : 'none'; });
      });
    });
