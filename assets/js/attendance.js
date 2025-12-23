// assets/js/attendance.js

async function fetchJSON(url) {
  const res = await fetch(url);
  return await res.json();
}

function sortByKey(array, key, ascending = true) {
  return array.sort((a, b) => {
    let valA = a[key], valB = b[key];
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();
    if (valA < valB) return ascending ? -1 : 1;
    if (valA > valB) return ascending ? 1 : -1;
    return 0;
  });
}

window.POG_PAGE = {
  players: [],
  currentSort: { key: null, ascending: true },

  async init() {
    const url = 'https://script.google.com/macros/s/AKfycbzhZFL9S3ubFnsOsI1gHFDJ5A_l9bzGmOVHV-RM_NomsOFbOig81WDeGVjkTpZtQGMk8A/exec';

    let data;
    try {
      data = await fetchJSON(url);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      return;
    }

    if (!data || !data.players) return;

    this.players = data.players;
    this.tbody = document.querySelector('#attendance-table tbody');

    this.renderTable(this.players);
    this.addSearch();
    this.addSorting();
  },

  renderTable(players) {
    this.tbody.innerHTML = players.map(p => `
      <tr>
        <td>${p.account}</td>
        <td>${p.rank}</td>
        <td>${p.totalXP}</td>
        <td>${p.quarterXP}</td>
        <td>${p.attendancePct.toFixed(2)}%</td>
        <td>${p.streak}</td>
        <td>${p.misses}</td>
        <td>${p.lastRaid}</td>
        <td>${p.status}</td>
        <td>${p.inactive ? "⚠️ INACTIVE" : ""}</td>
      </tr>
    `).join('');
  },

  addSearch() {
    const search = document.getElementById('search');
    search.addEventListener('input', e => {
      const val = e.target.value.toLowerCase();
      this.renderTable(
        this.players.filter(p => p.account.toLowerCase().includes(val))
      );
    });
  },

  addSorting() {
    document.querySelectorAll('#attendance-table th.sortable')
      .forEach(th => {
        th.addEventListener('click', () => {
          const key = th.dataset.key;
          const ascending = this.currentSort.key === key
            ? !this.currentSort.ascending
            : true;

          this.currentSort = { key, ascending };
          this.players = sortByKey(this.players, key, ascending);
          this.renderTable(this.players);
        });
      });
  }
};
