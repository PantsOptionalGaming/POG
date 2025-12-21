export async function loadComponent(id, path) {
  const res = await fetch(path);
  document.getElementById(id).innerHTML = await res.text();
}
