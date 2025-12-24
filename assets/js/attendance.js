// assets/js/attendance.js

const SHEETS_URL = "https://script.google.com/macros/s/AKfycbzhZFL9S3ubFnsOsI1gHFDJ5A_l9bzGmOVHV-RM_NomsOFbOig81WDeGVjkTpZtQGMk8A/exec
";

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Network error");
  return await res.json();
}

function sortByKey(array, key, ascending = true) {
  return [...array].sort((a, b) => {
    let A = a[key] ?? "";
    let B = b[key] ?? "";

    if (typeof A === "string") A = A.toLowerCase();
    if (typeof B === "string") B = B.toLowerCase();

    if (A < B) return ascending ? -1 : 1;
    if (A > B) return ascending ? 1 : -1;
    return 0;
  });
}

window.POG_PAGE = {
  players: [],
  currentSort: { key: null, ascending: true },
  tbody: null,

  async init() {
    this.tbody = document.querySelector("#attendance-table tbody");

    try {
      const data = await fetchJSON(SHEETS_URL);

      if (!data || !Array.isArray(data.players)) {
        throw new Error("Invalid data format");
      }

      this.players = data.players;
      this.renderTable(this.players);
      this.bindSearch();
      this.bindSorting();

    } catch (err) {
      console.error("Attendance load failed:", err);
      this.tbody.innerHTML = `
        <tr>
          <td colspan="10">⚠️ Failed to load attendance data</td>
        </tr>
      `;
    }
  },

  renderTable(players) {
    if (!players.length) {
      this.tbody.innerHTML = `
        <tr>
          <td colspan="10">No results</td>
        </tr>
      `;
      return;
    }

    this.tbody.innerHTML = players.map(p => `
      <tr>
        <td>${p.account ?? ""}</td>
        <td>${p.rank ?? ""}</td>
        <td class="${p.totalXP < 0 ? 'xp-negative' : ''}">
          ${p.totalXP ?? 0}
        </td>
        <td class="${p.quarterXP < 0 ? 'xp-negative' : ''}">
          ${p.quarterXP ?? 0}
        </td>
        <td>${(p.attendancePct ?? 0).toFixed(2)}%</td>
        <td>${p.streak ?? 0}</td>
        <td>${p.misses ?? 0}</td>
        <td>${p.lastRaid ?? "-"}</td>
        <td>${p.status ?? ""}</td>
        <td class="${p.inactive ? 'inactive-warning' : ''}">
          ${p.inactive ? "⚠️ INACTIVE" : ""}
        </td>
      </tr>
    `).join("");
  },

  bindSearch() {
    const search = document.getElementById("search");
    search.addEventListener("input", e => {
      const val = e.target.value.toLowerCase();
      const filtered = this.players.filter(p =>
        (p.account ?? "").toLowerCase().includes(val)
      );
      this.renderTable(filtered);
    });
  },

  bindSorting() {
    document
      .querySelectorAll("#attendance-table th.sortable")
      .forEach(th => {
        th.addEventListener("click", () => {
          const key = th.dataset.key;
          const asc =
            this.currentSort.key === key
              ? !this.currentSort.ascending
              : true;

          this.players = sortByKey(this.players, key, asc);
          this.currentSort = { key, ascending: asc };
          this.renderTable(this.players);
        });
      });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  window.POG_PAGE.init();
});
