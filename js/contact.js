(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name    = (form.querySelector('[name="name"]').value || '').trim();
    var phone   = (form.querySelector('[name="phone"]').value || '').trim();
    var email   = (form.querySelector('[name="email"]').value || '').trim();
    var message = (form.querySelector('[name="message"]').value || '').trim();

    // Build a readable WhatsApp message
    var lines = ['Hi Matt, new enquiry from your website:'];
    lines.push('');
    lines.push('Name: ' + (name || '—'));
    if (phone)   lines.push('Phone: ' + phone);
    if (email)   lines.push('Email: ' + email);
    if (message) lines.push('');
    if (message) lines.push(message);

    var waUrl = 'https://wa.me/447969359683?text=' + encodeURIComponent(lines.join('\n'));
    window.open(waUrl, '_blank', 'noopener');

    // Also submit to Netlify Forms as a backup record
    var data = new FormData(form);
    fetch('/', { method: 'POST', body: data })
      .catch(function () { /* silent — WhatsApp is the primary channel */ });

    // Give feedback and reset
    var btn = form.querySelector('.contact__submit');
    var original = btn.textContent;
    btn.textContent = 'Opening WhatsApp…';
    btn.disabled = true;
    form.reset();

    setTimeout(function () {
      btn.textContent = original;
      btn.disabled = false;
    }, 3000);
  });
})();
