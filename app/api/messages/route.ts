import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { requireAuthentication } from "@/lib/auth-request";
import { CHAT_ROOM_ID, ensureDailyConversation, generateConversationTitle, touchConversation } from "@/lib/chat-history";
import { getConversationsCollection, getMessagesCollection } from "@/lib/mongodb";
import { serializeMessage, type ChatAttachment, type ChatMessageDocument, type MessageKind } from "@/lib/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const allowedGifHosts = new Set(["media.giphy.com", "media.tenor.com"]);
const allowedFileTypes = new Set(["application/pdf", "text/plain", "text/markdown", "text/csv", "application/json", "image/jpeg", "image/png", "image/webp"]);
const recentPosts = new Map<string, number>();

function isValidAttachment(value: unknown): value is ChatAttachment {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<ChatAttachment>;
  return typeof item.name === "string" && item.name.length > 0 && item.name.length <= 180
    && typeof item.mimeType === "string" && allowedFileTypes.has(item.mimeType)
    && typeof item.size === "number" && item.size > 0 && item.size <= 3 * 1024 * 1024
    && typeof item.dataUrl === "string" && item.dataUrl.length <= 4_300_000
    && item.dataUrl.startsWith(`data:${item.mimeType};base64,`);
}

function isValidContent(kind: MessageKind, content: string, attachment?: unknown) {
  if (kind === "text") return content.length > 0 && content.length <= 4000;
  if (kind === "image") return /^data:image\/(jpeg|png|webp);base64,/i.test(content) && content.length <= 2_800_000;
  if (kind === "gif") {
    try {
      const url = new URL(content);
      return url.protocol === "https:" && allowedGifHosts.has(url.hostname) && content.length <= 500;
    } catch { return false; }
  }
  return kind === "file" && isValidAttachment(attachment);
}

async function resolveConversation(rawId: string | null) {
  if (rawId && ObjectId.isValid(rawId)) {
    const conversation = await (await getConversationsCollection()).findOne({ _id: new ObjectId(rawId), roomId: CHAT_ROOM_ID });
    if (conversation?._id) return conversation;
  }
  return ensureDailyConversation();
}

export async function GET(request: NextRequest) {
  const unauthorized = await requireAuthentication(request);
  if (unauthorized) return unauthorized;
  try {
    const conversation = await resolveConversation(request.nextUrl.searchParams.get("conversationId"));
    if (!conversation._id) throw new Error("CONVERSATION_NOT_FOUND");
    const collection = await getMessagesCollection();
    const after = request.nextUrl.searchParams.get("after");
    const query: { roomId: string; conversationId: ObjectId; _id?: { $gt: ObjectId } } = { roomId: CHAT_ROOM_ID, conversationId: conversation._id };
    if (after && ObjectId.isValid(after)) query._id = { $gt: new ObjectId(after) };
    const messages = await collection.find(query).sort({ _id: after ? 1 : -1 }).limit(after ? 100 : 200).toArray();
    if (!after) messages.reverse();
    return NextResponse.json({ conversationId: conversation._id.toHexString(), messages: messages.map(serializeMessage) });
  } catch (error) {
    console.error("[messages:get] MongoDB unavailable", error);
    return NextResponse.json({ error: "تعذر تحميل الرسائل الآن" }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAuthentication(request);
  if (unauthorized) return unauthorized;
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    const lastPost = recentPosts.get(ip) || 0;
    if (Date.now() - lastPost < 350) return NextResponse.json({ error: "تمهّل قليلاً قبل إرسال الرسالة التالية" }, { status: 429 });

    const body = (await request.json()) as Partial<ChatMessageDocument> & { conversationId?: string };
    const sender = typeof body.sender === "string" ? body.sender.trim().slice(0, 24) : "";
    const clientId = typeof body.clientId === "string" ? body.clientId.trim().slice(0, 80) : "";
    const kind = body.kind as MessageKind;
    const content = typeof body.content === "string" ? body.content.trim() : "";
    const conversation = await resolveConversation(body.conversationId ?? null);
    if (!conversation._id) throw new Error("CONVERSATION_NOT_FOUND");
    if (!sender || !clientId || !["text", "image", "gif", "file"].includes(kind) || !isValidContent(kind, content, body.attachment)) {
      return NextResponse.json({ error: "محتوى الرسالة غير صالح" }, { status: 400 });
    }

    const message: ChatMessageDocument = {
      roomId: CHAT_ROOM_ID,
      conversationId: conversation._id,
      sender,
      clientId,
      kind,
      content,
      attachment: kind === "file" ? body.attachment : undefined,
      createdAt: new Date(),
    };
    const collection = await getMessagesCollection();
    const result = await collection.insertOne(message);
    message._id = result.insertedId;
    await touchConversation(conversation._id);
    recentPosts.set(ip, Date.now());
    let generatedTitle: string | null = null;
    try { generatedTitle = await generateConversationTitle(conversation._id); }
    catch (error) { console.warn("[messages:title] title generation skipped", error); }
    return NextResponse.json({ message: serializeMessage(message), generatedTitle }, { status: 201 });
  } catch (error) {
    console.error("[messages:post] MongoDB unavailable", error);
    return NextResponse.json({ error: "تعذر إرسال الرسالة الآن" }, { status: 503 });
  }
}
