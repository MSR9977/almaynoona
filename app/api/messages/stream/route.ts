import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";
import { getMessagesCollection } from "@/lib/mongodb";
import { serializeMessage } from "@/lib/types";
import { requireAuthentication } from "@/lib/auth-request";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

const roomId = process.env.CHAT_ROOM_ID || "our-private-love-room";
const encoder = new TextEncoder();

function delay(milliseconds: number, signal: AbortSignal) {
  return new Promise<void>((resolve) => {
    const timeout = setTimeout(resolve, milliseconds);
    signal.addEventListener("abort", () => {
      clearTimeout(timeout);
      resolve();
    }, { once: true });
  });
}

export async function GET(request: NextRequest) {
  const unauthorized = await requireAuthentication(request);
  if (unauthorized) return unauthorized;
  const requestedLastId = request.nextUrl.searchParams.get("after");
  let lastId = requestedLastId && ObjectId.isValid(requestedLastId)
    ? new ObjectId(requestedLastId)
    : ObjectId.createFromTime(Math.floor(Date.now() / 1000) - 2);

  const stream = new ReadableStream({
    async start(controller) {
      const startedAt = Date.now();
      controller.enqueue(encoder.encode("retry: 1000\n: connected\n\n"));

      try {
        const collection = await getMessagesCollection();
        while (!request.signal.aborted && Date.now() - startedAt < 52_000) {
          const messages = await collection
            .find({ roomId, _id: { $gt: lastId } })
            .sort({ _id: 1 })
            .limit(100)
            .toArray();

          for (const message of messages) {
            if (message._id) lastId = message._id;
            controller.enqueue(encoder.encode(`event: message\ndata: ${JSON.stringify(serializeMessage(message))}\n\n`));
          }

          controller.enqueue(encoder.encode(": heartbeat\n\n"));
          await delay(750, request.signal);
        }
      } catch {
        controller.enqueue(encoder.encode("event: reconnect\ndata: {}\n\n"));
      } finally {
        try { controller.close(); } catch { /* client disconnected */ }
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
