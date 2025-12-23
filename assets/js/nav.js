// assets/js/nav.js
// Handles loading the header + nav highlighting

document.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.getElementById("nav-container");
  if (!navContainer) return;

  // Load header HTML
  fetch("partials/header.html")
    .then(res => {
      if (!res.ok) throw new Error("Failed to load header");
      return res.text();
    })
    .then(html => {
      navContainer.innerHTML = html;
      highlightActiveNav();
    })
    .catch(err => {
      console.error("Header load failed:", err);
    });
});

function highlightActiveNav() {
  const currentPage = location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });
}
