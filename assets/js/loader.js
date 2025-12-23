// Load Nav & Footer
function loadComponent(containerId, url) {
  return fetch(url)
    .then(r => r.text())
    .then(html => {
      document.getElementById(containerId).innerHTML = html;
    })
    .catch(err => console.error(`${containerId} load failed:`, err));
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadComponent('nav-container', 'components/nav.html');
  await loadComponent('footer-container', 'components/footer.html');
});
