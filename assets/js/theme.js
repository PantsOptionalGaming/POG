export function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('pog-theme');
  if (saved) document.documentElement.dataset.theme = saved;
  else document.documentElement.dataset.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  toggle?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('pog-theme', next);
  });
}
