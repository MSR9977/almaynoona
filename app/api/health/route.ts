import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { requireAuthentication } from "@/lib/auth-request";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 10;

export async function GET(request: NextRequest) {
  const unauthorized = await requireAuthentication(request);
  if (unauthorized) return unauthorized;
  const checkDatabase = request.nextUrl.searchParams.get("database") === "1";
  const base = {
    application: "habibat-dunyati",
    status: "ok",
    runtime: "nodejs",
    databaseConfigured: Boolean(process.env.MONGODB_URI),
    deployment: process.env.VERCEL_ENV || "local",
  };

  if (!checkDatabase) return NextResponse.json(base);

  try {
    const database = await getDatabase();
    await database.command({ ping: 1 });
    return NextResponse.json({ ...base, database: "connected" });
  } catch {
    return NextResponse.json(
      { ...base, status: "degraded", database: "unavailable" },
      { status: 503 },
    );
  }
}
