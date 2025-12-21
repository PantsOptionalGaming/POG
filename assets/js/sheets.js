export async function fetchJSON(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    const json = await res.json();
    return json;
  } catch (err) {
    console.error('Sheets fetch error:', err);
    return null;
  }
}
