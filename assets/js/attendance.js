window.POG_PAGE = {
  async init() {
    console.log("Attendance init started");

    // Wait for table to exist
    const tbody = document.querySelector('#attendance-table tbody');
    if (!tbody) {
      console.error("Attendance table tbody not found!");
      return;
    }
    this.tbody = tbody;

    const url = 'https://script.google.com/macros/s/AKfycbzhZFL9S3ubFnsOsI1gHFDJ5A_l9bzGmOVHV-RM_NomsOFbOig81WDeGVjkTpZtQGMk8A/exec';
    console.log("Fetching attendance data from:", url);

    let data;
    try {
      data = await fetch(url).then(r => r.json());
    } catch (err) {
      console.error("Failed to fetch attendance data:", err);
      return;
    }

    if (!data || !data.players) {
      console.warn("No players data returned");
      return;
    }

    console.log("Players received:", data.players.length);
    this.players = data.players;

    this.renderTable(this.players);
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
  }
};
