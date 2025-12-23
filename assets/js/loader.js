// loader.js
import { loadComponent } from './utils.js';
import { initTheme } from './theme.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Load nav first
  await loadComponent('nav-container', 'components/nav.html');
  
  // Now the table can safely load
  initTheme();
  window.POG_PAGE.init();

  // Load footer
  await loadComponent('footer-container', 'components/footer.html');
});
