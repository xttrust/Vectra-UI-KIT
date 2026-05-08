// Demo: show confirmation state on submit
    document.getElementById('recover-form').addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('recover-email').value.trim();
      if (!email) return;
      document.getElementById('sent-email').textContent = email;
      document.getElementById('state-request').style.display = 'none';
      document.getElementById('state-sent').style.display = '';
      document.getElementById('back-to-login').style.display = 'none';
    });
    document.getElementById('resend-btn').addEventListener('click', function () {
      this.textContent = 'Sent!';
      this.disabled = true;
    });
