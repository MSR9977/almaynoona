import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, sessionConfig } from "@/lib/session";

export const runtime = "nodejs";

const attempts = new Map<string, { count: number; resetAt: number }>();

function safeEqual(input: string, expected: string) {
  const left = Buffer.from(input, "utf8");
  const right = Buffer.from(expected, "utf8");
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const attempt = attempts.get(ip);
  if (attempt && attempt.resetAt > now && attempt.count >= 8) {
    return NextResponse.json({ error: "محاولات كثيرة. انتظري 15 دقيقة ثم حاولي مرة ثانية." }, { status: 429 });
  }

  try {
    const body = await request.json() as { email?: string; password?: string };
    const expectedEmail = process.env.OUR_EMAIL || "";
    const expectedPassword = process.env.PASSWORD || "";
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const valid = expectedEmail && expectedPassword && safeEqual(email, expectedEmail.trim().toLowerCase()) && safeEqual(password, expectedPassword);

    if (!valid) {
      const current = attempt && attempt.resetAt > now ? attempt : { count: 0, resetAt: now + 15 * 60_000 };
      current.count += 1;
      attempts.set(ip, current);
      return NextResponse.json({ error: "البريد أو كلمة المرور غير صحيحة" }, { status: 401 });
    }

    attempts.delete(ip);
    const response = NextResponse.json({ success: true });
    response.cookies.set(sessionConfig.name, await createSessionToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: sessionConfig.maxAge,
      priority: "high",
    });
    return response;
  } catch {
    return NextResponse.json({ error: "تعذر تسجيل الدخول" }, { status: 400 });
  }
}
