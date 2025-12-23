// Dynamic nav loader (no modules)
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("nav-container");
  if (!nav) return;

  fetch("components/nav.html")
    .then(r => r.text())
    .then(html => {
      nav.innerHTML = html;

      // Highlight active link
      const current = location.pathname.split("/").pop();
      document.querySelectorAll(".nav-links a").forEach(a => {
        if (a.getAttribute("href") === current) a.classList.add("active");
      });
    })
    .catch(err => console.error("Header load failed:", err));
});
