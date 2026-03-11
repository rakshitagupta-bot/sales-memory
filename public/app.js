document.addEventListener('DOMContentLoaded', function () {

  const form         = document.getElementById('signup-form');
  const submitBtn    = document.getElementById('submit-btn');
  const errorEl      = document.getElementById('form-error');
  const successPanel = document.getElementById('success-panel');
  const telegramLink = document.getElementById('telegram-link');
  const successName  = document.getElementById('success-name');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    errorEl.hidden = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Saving...';

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const company = document.getElementById('company').value.trim();

    if (!name || !email || !company) {
      showError('Please fill in all three fields.');
      resetBtn();
      return;
    }

    try {
      const res    = await fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company })
      });
      const result = await res.json();

      if (!res.ok) {
        showError(result.error || 'Something went wrong. Please try again.');
        resetBtn();
        return;
      }

      // Hide form, show success panel with Telegram link
      form.hidden            = true;
      const firstName        = name.split(' ')[0];
      successName.textContent = `${firstName}, you're in!`;
      telegramLink.href      = result.telegram_link;
      successPanel.hidden    = false;

    } catch (err) {
      showError('Could not connect. Please check your internet and try again.');
      resetBtn();
    }
  });

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.hidden = false;
  }

  function resetBtn() {
    submitBtn.disabled    = false;
    submitBtn.textContent = 'Get my Telegram link →';
  }

});
