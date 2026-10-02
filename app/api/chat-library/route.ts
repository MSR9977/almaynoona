import { NextRequest } from "next/server";
import { requireAuthentication } from "@/lib/auth-request";
import { CHAT_ROOM_ID } from "@/lib/chat-history";
import { getMessagesCollection } from "@/lib/mongodb";
import { serializeMessage, type ChatMessageDocument } from "@/lib/types";
import type { Filter } from "mongodb";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const unauthorized = await requireAuthentication(request);
  if (unauthorized) return unauthorized;
  const type = request.nextUrl.searchParams.get("type") ?? "images";
  const query: Filter<ChatMessageDocument> = type === "files"
    ? { roomId: CHAT_ROOM_ID, kind: "file" }
    : type === "links"
      ? { roomId: CHAT_ROOM_ID, "sources.0": { $exists: true } }
      : { roomId: CHAT_ROOM_ID, kind: { $in: ["image", "gif"] } };
  const messages = await (await getMessagesCollection()).find(query).sort({ createdAt: -1 }).limit(200).toArray();
  if (type === "links") {
    const links = messages.flatMap((message) => (message.sources ?? []).map((source) => ({ ...source, messageId: message._id?.toHexString(), conversationId: message.conversationId?.toHexString(), createdAt: message.createdAt.toISOString() })));
    return Response.json({ items: links });
  }
  return Response.json({ items: messages.map(serializeMessage) });
}
