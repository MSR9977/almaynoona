import { NextRequest, NextResponse } from "next/server";
import { requireAuthentication } from "@/lib/auth-request";

export const runtime = "nodejs";

function validIceUrl(value: unknown): value is string {
  return typeof value === "string" && /^(?:stun|turn|turns):/i.test(value);
}

function normalizeIceServers(value: unknown): RTCIceServer[] {
  if (!Array.isArray(value)) return [];

  return value.slice(0, 12).flatMap((entry) => {
    if (!entry || typeof entry !== "object") return [];
    const candidate = entry as Record<string, unknown>;
    const urls = Array.isArray(candidate.urls)
      ? candidate.urls.filter(validIceUrl)
      : validIceUrl(candidate.urls) ? candidate.urls : [];
    if ((Array.isArray(urls) && urls.length === 0) || urls === "") return [];

    const server: RTCIceServer = { urls };
    if (typeof candidate.username === "string") server.username = candidate.username;
    if (typeof candidate.credential === "string") server.credential = candidate.credential;
    return [server];
  });
}

async function meteredIceServers(signal: AbortSignal) {
  const apiKey = process.env.METERED_API_KEY?.trim();
  if (!apiKey) return [];

  const endpoint = new URL("https://mssh2026.metered.live/api/v1/turn/credentials");
  endpoint.searchParams.set("apiKey", apiKey);
  const response = await fetch(endpoint, { cache: "no-store", signal });
  if (!response.ok) throw new Error(`Metered HTTP ${response.status}`);
  return normalizeIceServers(await response.json());
}

export async function GET(request: NextRequest) {
  const unauthorized = await requireAuthentication(request);
  if (unauthorized) return unauthorized;

  let iceServers: RTCIceServer[] = [];
  let source: "metered-dynamic" | "static-fallback" | "stun-only" = "stun-only";
  try {
    iceServers = await meteredIceServers(request.signal);
    if (iceServers.length) source = "metered-dynamic";
  } catch {
    // A temporary Metered API failure must not prevent the call room from opening.
  }

  if (!iceServers.length) {
    iceServers = [{ urls: ["stun:stun.l.google.com:19302", "stun:stun.cloudflare.com:3478"] }];
    if (process.env.TURN_URL && process.env.TURN_USERNAME && process.env.TURN_CREDENTIAL) {
      iceServers.push({
        urls: process.env.TURN_URL.split(",").map((value) => value.trim()).filter(validIceUrl),
        username: process.env.TURN_USERNAME,
        credential: process.env.TURN_CREDENTIAL,
      });
      source = "static-fallback";
    }
  }

  const turnConfigured = iceServers.some((server) => {
    const urls = Array.isArray(server.urls) ? server.urls : [server.urls];
    return urls.some((url) => /^turns?:/i.test(url));
  });
  return NextResponse.json(
    { iceServers, turnConfigured, source },
    { headers: { "Cache-Control": "private, no-store, max-age=0" } },
  );
}
