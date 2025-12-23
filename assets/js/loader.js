// assets/js/loader.js

import { loadComponent } from './utils.js';
import { initTheme } from './theme.js';
import { initNav } from './nav.js';

async function initPage() {
  // Load nav first
  await loadComponent('nav-container', 'components/nav.html');
  initNav(); // highlight active link

  // Load footer
  await loadComponent('footer-container', 'components/footer.html');

  // Apply theme
  initTheme();

  // Now run page-specific scripts
  if (window.POG_PAGE && typeof window.POG_PAGE.init === 'function') {
    window.POG_PAGE.init();
  }
}

// Wait for DOM
document.addEventListener('DOMContentLoaded', initPage);
