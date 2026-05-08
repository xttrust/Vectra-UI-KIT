(function () {
      var theme = 'dark';

      try {
        var storedTheme = localStorage.getItem('vectra-theme');
        if (storedTheme === 'light' || storedTheme === 'dark') {
          theme = storedTheme;
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
          theme = 'light';
        }
      } catch (error) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
          theme = 'light';
        }
      }

      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.style.colorScheme = theme;
    })();
