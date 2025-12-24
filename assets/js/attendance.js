// assets/js/attendance.js

const SHEETS_URL = "GOOGLE_SHEETS_WEB_APP_URL_HERE"; // Replace with your Web App URL

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
  tbody: null,

  async init() {
    try {
      const data = await fetchJSON(SHEETS_URL);
      if (!data.players) throw new Error("No players returned");

      this.players = data.players;
      this.tbody = document.querySelector("#attendance-table tbody");
      this.renderTable(this.players);
      this.addSearch();
      this.addSorting();
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  },

  renderTable(players) {
    this.tbody.innerHTML = players.map(p => `
      <tr>
        <td>${p.account}</td>
        <td>${p.rank}</td>
        <td class="${p.totalXP < 0 ? 'xp-negative' : ''}">${p.totalXP}</td>
        <td class="${p.quarterXP < 0 ? 'xp-negative' : ''}">${p.quarterXP}</td>
        <td>${p.attendancePct.toFixed(2)}%</td>
        <td>${p.streak}</td>
        <td>${p.misses}</td>
        <td>${p.lastRaid}</td>
        <td>${p.status}</td>
        <td class="${p.inactive ? 'inactive-warning' : ''}">${p.inactive ? "⚠️ INACTIVE" : ""}</td>
      </tr>
    `).join('');
  },

  addSearch() {
    const search = document.getElementById("search");
    search.addEventListener("input", e => {
      const val = e.target.value.toLowerCase();
      const filtered = this.players.filter(p => p.account.toLowerCase().includes(val));
      this.renderTable(filtered);
    });
  },

  addSorting() {
    const headers = document.querySelectorAll("#attendance-table th.sortable");
    headers.forEach(th => {
      th.addEventListener("click", () => {
        const key = th.dataset.key;
        let ascending = true;
        if (this.currentSort.key === key) ascending = !this.currentSort.ascending;

        this.players = sortByKey(this.players, key, ascending);
        this.currentSort = { key, ascending };
        this.renderTable(this.players);
      });
    });
  }
};

window.addEventListener("DOMContentLoaded", () => window.POG_PAGE.init());
