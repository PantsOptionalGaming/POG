function loadComponent(containerId, url) {
  return fetch(url)
    .then(res => res.text())
    .then(html => document.getElementById(containerId).innerHTML = html)
    .catch(err => console.error(`Failed to load ${url}:`, err));
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("nav-container", "components/nav.html");
  await loadComponent("footer-container", "components/footer.html");
});
