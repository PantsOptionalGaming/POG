function initNav() {
  const current = location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });
}

window.addEventListener('DOMContentLoaded', initNav);
