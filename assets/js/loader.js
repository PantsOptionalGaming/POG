// Loader for footer and theme
document.addEventListener("DOMContentLoaded", () => {
  // Footer
  const footer = document.getElementById("footer-container");
  if (footer) {
    fetch("components/footer.html")
      .then(r => r.text())
      .then(html => footer.innerHTML = html)
      .catch(err => console.error("Footer load failed:", err));
  }

  // Initialize theme if you have theme.js functions
  if (typeof initTheme === "function") initTheme();
});
