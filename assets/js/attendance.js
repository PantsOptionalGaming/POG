// assets/js/attendance.js

// Simple fetch helper
async function fetchJSON(url) {
  const res = await fetch(url);
  return await res.json();
}

window.POG_PAGE = {
  async init() {
    const url = 'https://script.google.com/macros/s/AKfycbzhZFL9S3ubFnsOsI1gHFDJ5A_l9bzGmOVHV-RM_NomsOFbOig81WDeGVjkTpZtQGMk8A/exec'; 
    console.log("Fetching attendance data from:", url);

    let data;
    try {
      data = await fetchJSON(url);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      return;
    }

    if (!data || !data.players) {
      console.warn("No players data returned");
      return;
    }

    console.log("Players received:", data.players.length);

    const tbody = document.querySelector('#attendance-table tbody');
    if (!tbody) {
      console.error("Attendance table tbody not found!");
      return;
    }

    // Populate table
    tbody.innerHTML = data.players.map(p => `
      <tr>
        <td>${p.account}</td>
        <td>${p.status}</td>
        <td>${p.totalXP}</td>
        <td>${p.attendancePct.toFixed(1)}%</td>
        <td>${p.streak}</td>
        <td>${p.misses}</td>
        <td>${p.lastRaid}</td>
      </tr>
    `).join('');

    // Search functionality
    const search = document.getElementById('search');
    search.addEventListener('input', e => {
      const val = e.target.value.toLowerCase();
      tbody.querySelectorAll('tr').forEach(tr => {
        const account = tr.children[0].textContent.toLowerCase();
        tr.style.display = account.includes(val) ? '' : 'none';
      });
    });

    console.log("Attendance table populated!");
  }
};

// Run init when page is loaded
window.addEventListener('DOMContentLoaded', () => window.POG_PAGE.init());

