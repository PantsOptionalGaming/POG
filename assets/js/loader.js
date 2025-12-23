function loadFooter() {
  const footerContainer = document.getElementById('footer-container');
  if (!footerContainer) return;

  fetch('components/footer.html')
    .then(r => r.text())
    .then(html => footerContainer.innerHTML = html)
    .catch(err => console.error('Footer load failed:', err));
}

window.addEventListener('DOMContentLoaded', loadFooter);
