const apiKey = process.env.METERED_API_KEY?.trim();

if (!apiKey) {
  console.error("METERED_API_KEY is missing from .env.local");
  process.exit(1);
}

const endpoint = new URL("https://mssh2026.metered.live/api/v1/turn/credentials");
endpoint.searchParams.set("apiKey", apiKey);

const response = await fetch(endpoint, {
  headers: { accept: "application/json" },
  signal: AbortSignal.timeout(10_000),
});

if (!response.ok) {
  console.error(`Metered credential request failed with HTTP ${response.status}`);
  process.exit(1);
}

const payload = await response.json();
if (!Array.isArray(payload)) {
  console.error("Metered returned an unexpected response shape");
  process.exit(1);
}

const urls = payload.flatMap((entry) => {
  if (!entry || typeof entry !== "object") return [];
  return Array.isArray(entry.urls) ? entry.urls : [entry.urls];
}).filter((url) => typeof url === "string");

const credentialed = payload.filter((entry) =>
  entry && typeof entry === "object" && typeof entry.username === "string" && typeof entry.credential === "string",
).length;

console.log("Metered TURN check passed");
console.log(JSON.stringify({
  iceServers: payload.length,
  urls: urls.length,
  stun: urls.filter((url) => url.startsWith("stun:")).length,
  turn: urls.filter((url) => url.startsWith("turn:")).length,
  turns: urls.filter((url) => url.startsWith("turns:")).length,
  credentialed,
}, null, 2));
