import type { NextRequest } from "next/server";
import { sessionConfig, verifySessionToken } from "@/lib/session";

export async function isAuthenticated(request: NextRequest) {
  return verifySessionToken(request.cookies.get(sessionConfig.name)?.value);
}

export async function requireAuthentication(request: NextRequest) {
  return (await isAuthenticated(request))
    ? null
    : Response.json({ error: "يجب تسجيل الدخول أولاً" }, { status: 401 });
}
