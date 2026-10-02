import { NextRequest, NextResponse } from "next/server";
import { getCallSignalsCollection } from "@/lib/mongodb";
import { requireAuthentication } from "@/lib/auth-request";
import { serializeCallSignal, type CallSignalDocument, type CallSignalType } from "@/lib/call-types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const roomId = process.env.CHAT_ROOM_ID || "our-private-love-room";
const signalTypes: CallSignalType[] = ["presence", "presence_ack", "offer", "answer", "ice", "hangup", "decline"];

export async function POST(request: NextRequest) {
  const unauthorized = await requireAuthentication(request);
  if (unauthorized) return unauthorized;
  try {
    const body = await request.json() as Partial<CallSignalDocument>;
    const from = typeof body.from === "string" ? body.from.slice(0, 80) : "";
    const to = typeof body.to === "string" ? body.to.slice(0, 80) : undefined;
    const type = body.type as CallSignalType;
    const payload = body.payload && typeof body.payload === "object" && !Array.isArray(body.payload) ? body.payload : {};
    if (!from || !signalTypes.includes(type) || JSON.stringify(payload).length > 60_000) {
      return NextResponse.json({ error: "إشارة اتصال غير صالحة" }, { status: 400 });
    }
    const now = new Date();
    const signal: CallSignalDocument = { roomId, from, type, payload, createdAt: now, expireAt: new Date(now.getTime() + 5 * 60_000) };
    if (to) signal.to = to;
    const collection = await getCallSignalsCollection();
    const result = await collection.insertOne(signal);
    signal._id = result.insertedId;
    return NextResponse.json({ signal: serializeCallSignal(signal) }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "تعذر إرسال إشارة الاتصال" }, { status: 503 });
  }
}
