export async function getLighthouseReport(lighthouseRequestUrl, bodyOptions) {
  const response = await fetch(lighthouseRequestUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyOptions),
  });
  return await response.json();
}
