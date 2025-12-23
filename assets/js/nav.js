function initNav() {
  const navContainer = document.getElementById('nav-container');
  if (!navContainer) return;

  fetch('components/nav.html')
    .then(r => r.text())
    .then(html => {
      navContainer.innerHTML = html;

      // Highlight active link
      const current = location.pathname.split('/').pop();
      document.querySelectorAll('.nav-links a').forEach(a => {
        if (a.getAttribute('href') === current) a.classList.add('active');
      });
    })
    .catch(err => console.error('Nav load failed:', err));
}

window.addEventListener('DOMContentLoaded', initNav);
