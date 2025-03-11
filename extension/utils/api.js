export async function requestApi(path, text, filter) {
  const response = await fetch(`http://localhost:3000/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text, filter: filter }),
  });
  return response.json();
}
