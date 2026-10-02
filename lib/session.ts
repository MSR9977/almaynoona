import "server-only";

const SESSION_COOKIE = "love_session";
const SESSION_SECONDS = 60 * 60 * 24 * 7;
const encoder = new TextEncoder();

function encode(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function decode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

async function getSigningKey() {
  const secret = process.env.AUTH_SECRET || [process.env.MONGODB_URI, process.env.OUR_EMAIL, process.env.PASSWORD].join("|");
  if (!process.env.OUR_EMAIL || !process.env.PASSWORD || secret.length < 24) {
    throw new Error("Authentication environment variables are not configured");
  }
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

export async function createSessionToken() {
  const payload = encode(JSON.stringify({ version: 1, expiresAt: Date.now() + SESSION_SECONDS * 1000 }));
  const key = await getSigningKey();
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return `${payload}.${Buffer.from(signature).toString("base64url")}`;
}

export async function verifySessionToken(token?: string | null) {
  if (!token) return false;
  try {
    const [payload, signature] = token.split(".");
    if (!payload || !signature) return false;
    const key = await getSigningKey();
    const valid = await crypto.subtle.verify("HMAC", key, Buffer.from(signature, "base64url"), encoder.encode(payload));
    if (!valid) return false;
    const data = JSON.parse(decode(payload)) as { version?: number; expiresAt?: number };
    return data.version === 1 && typeof data.expiresAt === "number" && data.expiresAt > Date.now();
  } catch {
    return false;
  }
}

export const sessionConfig = {
  name: SESSION_COOKIE,
  maxAge: SESSION_SECONDS,
};
