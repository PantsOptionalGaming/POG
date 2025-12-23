// loader.js
import { loadComponent } from './utils.js';
import { initTheme } from './theme.js';
import { initNav } from './nav.js';

document.addEventListener('DOMContentLoaded', async () => {
  await loadComponent('nav-container', 'components/nav.html');
  await loadComponent('footer-container', 'components/footer.html');

  initTheme();
  initNav();

  // ✅ SAFE page hook
  if (window.POG_PAGE && typeof window.POG_PAGE.init === 'function') {
    window.POG_PAGE.init();
  }
});
