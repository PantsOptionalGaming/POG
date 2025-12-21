import { fetchJSON } from './sheets.js';

window.POG_PAGE = {
  async init() {
    const url = 'PASTE_YOUR_PUBLISHED_URL_HERE'; // Your Google Apps Script URL
    const data = await fetchJSON(url);
    if (!data) return;

    const tbody = document.querySelector('#attendance-table tbody');
    tbody.innerHTML = data.players.map(p => `
      <tr>
        <td>${p.account}</td>
        <td>${p.status}</td>
        <td>${p.totalXP}</td>
        <td>${p.attendancePct.toFixed(1)}%</td>
        <td>${p.streak}</td>
      </tr>
    `).join('');

    // Simple search by account name
    const search = document.getElementById('search');
    search.addEventListener('input', e => {
      const val = e.target.value.toLowerCase();
      tbody.querySelectorAll('tr').forEach(tr => {
        const account = tr.children[0].textContent.toLowerCase();
        tr.style.display = account.includes(val) ? '' : 'none';
      });
    });
  }
};
