import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";
import { getCallSignalsCollection } from "@/lib/mongodb";
import { requireAuthentication } from "@/lib/auth-request";
import { serializeCallSignal } from "@/lib/call-types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

const roomId = process.env.CHAT_ROOM_ID || "our-private-love-room";
const encoder = new TextEncoder();

function delay(milliseconds: number, signal: AbortSignal) {
  return new Promise<void>((resolve) => {
    const timeout = setTimeout(resolve, milliseconds);
    signal.addEventListener("abort", () => { clearTimeout(timeout);resolve(); }, { once: true });
  });
}

export async function GET(request: NextRequest) {
  const unauthorized = await requireAuthentication(request);
  if (unauthorized) return unauthorized;
  const clientId = request.nextUrl.searchParams.get("clientId")?.slice(0, 80) || "";
  if (!clientId) return Response.json({ error: "معرّف الجهاز مطلوب" }, { status: 400 });
  const after = request.nextUrl.searchParams.get("after") || request.headers.get("last-event-id");
  let lastId = after && ObjectId.isValid(after) ? new ObjectId(after) : ObjectId.createFromTime(Math.floor(Date.now() / 1000) - 5);

  const stream = new ReadableStream({
    async start(controller) {
      const startedAt = Date.now();
      controller.enqueue(encoder.encode("retry: 800\n: connected\n\n"));
      try {
        const collection = await getCallSignalsCollection();
        while (!request.signal.aborted && Date.now() - startedAt < 52_000) {
          const signals = await collection.find({ roomId, _id: { $gt: lastId }, from: { $ne: clientId }, $or: [{ to: { $exists: false } }, { to: clientId }] }).sort({ _id: 1 }).limit(100).toArray();
          for (const signal of signals) {
            if (signal._id) lastId = signal._id;
            controller.enqueue(encoder.encode(`id: ${signal._id?.toHexString() || ""}\nevent: signal\ndata: ${JSON.stringify(serializeCallSignal(signal))}\n\n`));
          }
          controller.enqueue(encoder.encode(": heartbeat\n\n"));
          await delay(550, request.signal);
        }
      } catch {
        controller.enqueue(encoder.encode("event: reconnect\ndata: {}\n\n"));
      } finally {
        try { controller.close(); } catch { /* disconnected */ }
      }
    },
  });
  return new Response(stream, { headers: { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-cache, no-transform", "Connection": "keep-alive", "X-Accel-Buffering": "no" } });
}
