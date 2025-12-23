async function loadComponent(containerId, path) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const res = await fetch(path);
    const html = await res.text();
    container.innerHTML = html;
  } catch (err) {
    console.error(`Failed to load ${path}:`, err);
  }
}

// Run everything in order
document.addEventListener('DOMContentLoaded', async () => {
  await loadComponent('nav-container', 'components/nav.html');
  await loadComponent('footer-container', 'components/footer.html');

  // Highlight active nav after loading
  const current = location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });

  // Now initialize Attendance
  if (window.POG_PAGE && window.POG_PAGE.init) {
    window.POG_PAGE.init();
  }
});
