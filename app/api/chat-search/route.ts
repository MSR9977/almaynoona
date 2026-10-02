import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";
import { requireAuthentication } from "@/lib/auth-request";
import { expandSearchTerms } from "@/lib/chat-ai";
import { CHAT_ROOM_ID } from "@/lib/chat-history";
import { getConversationsCollection, getMessagesCollection } from "@/lib/mongodb";
import { serializeMessage } from "@/lib/types";

export const runtime = "nodejs";

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAuthentication(request);
  if (unauthorized) return unauthorized;
  const body = await request.json() as { query?: string };
  const query = String(body.query ?? "").trim().slice(0, 200);
  if (query.length < 2) return Response.json({ results: [] });
  const terms = await expandSearchTerms(query);
  const pattern = terms.map(escapeRegex).join("|");
  const messages = await (await getMessagesCollection()).find({
    roomId: CHAT_ROOM_ID,
    $or: [
      { content: { $regex: pattern, $options: "i" } },
      { "attachment.name": { $regex: pattern, $options: "i" } },
      { "sources.title": { $regex: pattern, $options: "i" } },
    ],
  }).sort({ createdAt: -1 }).limit(40).toArray();
  const ids = [...new Set(messages.flatMap((message) => message.conversationId ? [message.conversationId.toHexString()] : []))];
  const conversations = ids.length ? await (await getConversationsCollection()).find({ _id: { $in: ids.map((id) => new ObjectId(id)) } }).toArray() : [];
  const titles = new Map(conversations.flatMap((item) => item._id ? [[item._id.toHexString(), item.title] as const] : []));
  return Response.json({ results: messages.map((message) => ({
    ...serializeMessage(message),
    conversationTitle: message.conversationId ? titles.get(message.conversationId.toHexString()) ?? "محادثة" : "محادثة",
  })) });
}
