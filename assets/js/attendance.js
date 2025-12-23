// assets/js/attendance.js

// Replace with your deployed Google Sheets Web App URL
const SHEETS_URL = "https://script.google.com/macros/s/AKfycbzhZFL9S3ubFnsOsI1gHFDJ5A_l9bzGmOVHV-RM_NomsOFbOig81WDeGVjkTpZtQGMk8A/exec";

async function fetchJSON(url) {
  const res = await fetch(url);
  return await res.json();
}

// Simple sorting
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
    let data;
    try {
      data = await fetchJSON(SHEETS_URL);
      if (!data.players) throw new Error("No players returned");
    } catch (err) {
      console.error("Failed to fetch data:", err);
      return;
    }

    this.players = data.players;
    this.tbody = document.querySelector("#attendance-table tbody");
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
