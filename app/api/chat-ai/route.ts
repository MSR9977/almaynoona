import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";
import { requireAuthentication } from "@/lib/auth-request";
import { generateChatAnswer, searchChatWeb } from "@/lib/chat-ai";
import { CHAT_ROOM_ID, generateConversationTitle, touchConversation } from "@/lib/chat-history";
import { getConversationsCollection, getMessagesCollection } from "@/lib/mongodb";
import { serializeMessage, type ChatMessageDocument } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const triggers = /#(?:ai|الذكاء[_\s-]*ال[اأإ]صطناعي|سمون|بحث|[اأإ]بحث)\b/giu;

export async function POST(request: NextRequest) {
  const unauthorized = await requireAuthentication(request);
  if (unauthorized) return unauthorized;
  try {
    const body = await request.json() as { conversationId?: string; prompt?: string; thinking?: boolean };
    if (!body.conversationId || !ObjectId.isValid(body.conversationId)) return Response.json({ error: "المحادثة غير صالحة" }, { status: 400 });
    const conversationId = new ObjectId(body.conversationId);
    const prompt = String(body.prompt ?? "").replace(triggers, "").trim().slice(0, 4000);
    if (!prompt) return Response.json({ error: "اكتب طلباً بعد وسم الذكاء الاصطناعي" }, { status: 400 });
    const conversation = await (await getConversationsCollection()).findOne({ _id: conversationId, roomId: CHAT_ROOM_ID });
    if (!conversation) return Response.json({ error: "المحادثة غير موجودة" }, { status: 404 });

    const messages = await getMessagesCollection();
    const history = await messages.find({ roomId: CHAT_ROOM_ID, conversationId }).sort({ createdAt: -1 }).limit(30).toArray();
    history.reverse();
    const { sources, images } = await searchChatWeb(prompt);
    const generated = await generateChatAnswer({ prompt, history, sources, thinking: Boolean(body.thinking) });
    const message: ChatMessageDocument = {
      roomId: CHAT_ROOM_ID,
      conversationId,
      clientId: "smoon-ai",
      sender: "سمون AI",
      kind: "text",
      content: generated.answer,
      sources,
      searchImages: images,
      aiMode: body.thinking ? "thinking" : "standard",
      createdAt: new Date(),
    };
    const inserted = await messages.insertOne(message);
    message._id = inserted.insertedId;
    await touchConversation(conversationId);
    try { await generateConversationTitle(conversationId); } catch { /* title can be retried after the next message */ }
    return Response.json({ message: serializeMessage(message), model: generated.model });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown error";
    if (detail === "GEMINI_API_KEY_MISSING") return Response.json({ error: "مفتاح Gemini غير مضبوط على الخادم" }, { status: 503 });
    console.error("[chat-ai] failed", error);
    return Response.json({ error: "تعذر على سمون إكمال الرد الآن" }, { status: 502 });
  }
}

