function loadComponent(containerId, url, callback) {
  return fetch(url)
    .then(res => res.text())
    .then(html => {
      document.getElementById(containerId).innerHTML = html;
      if (callback) callback();
    })
    .catch(err => console.error(`Failed to load ${url}:`, err));
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("nav-container", "components/nav.html", () => {
    // nav.js logic goes HERE
    const current = location.pathname.split("/").pop();
    document.querySelectorAll(".nav-links a").forEach(a => {
      if (a.getAttribute("href") === current) {
        a.classList.add("active");
      }
    });
  });

  await loadComponent("footer-container", "components/footer.html");
});
