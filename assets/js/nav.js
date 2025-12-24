// assets/js/loader.js

function loadComponent(containerId, url, onLoad) {
  return fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load ${url}`);
      return res.text();
    })
    .then(html => {
      const container = document.getElementById(containerId);
      if (!container) return;
      container.innerHTML = html;
      if (typeof onLoad === "function") onLoad();
    })
    .catch(err => console.error(err));
}

document.addEventListener("DOMContentLoaded", async () => {
  // Load NAV first, then apply active state
  await loadComponent("nav-container", "components/nav.html", () => {
    const current = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(a => {
      const href = a.getAttribute("href");
      if (href === current) {
        a.classList.add("active");
      }
    });
  });

  // Load footer
  await loadComponent("footer-container", "components/footer.html");
});
