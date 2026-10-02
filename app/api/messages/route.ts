import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getMessagesCollection } from "@/lib/mongodb";
import { serializeMessage, type ChatMessageDocument, type MessageKind } from "@/lib/types";
import { requireAuthentication } from "@/lib/auth-request";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const roomId = process.env.CHAT_ROOM_ID || "our-private-love-room";
const allowedGifHosts = new Set(["media.giphy.com", "media.tenor.com"]);
const recentPosts = new Map<string, number>();

function isValidContent(kind: MessageKind, content: string) {
  if (kind === "text") return content.length > 0 && content.length <= 1000;
  if (kind === "image") {
    return /^data:image\/(jpeg|png|webp);base64,/i.test(content) && content.length <= 2_800_000;
  }
  if (kind === "gif") {
    try {
      const url = new URL(content);
      return url.protocol === "https:" && allowedGifHosts.has(url.hostname) && content.length <= 500;
    } catch {
      return false;
    }
  }
  return false;
}

export async function GET(request: NextRequest) {
  const unauthorized = await requireAuthentication(request);
  if (unauthorized) return unauthorized;
  try {
    const collection = await getMessagesCollection();
    const after = request.nextUrl.searchParams.get("after");
    const query: { roomId: string; _id?: { $gt: ObjectId } } = { roomId };

    if (after && ObjectId.isValid(after)) query._id = { $gt: new ObjectId(after) };

    const messages = await collection
      .find(query)
      .sort({ _id: after ? 1 : -1 })
      .limit(after ? 100 : 60)
      .toArray();

    if (!after) messages.reverse();
    return NextResponse.json({ messages: messages.map(serializeMessage) });
  } catch (error) {
    console.error("[messages:get] MongoDB unavailable", {
      name: error instanceof Error ? error.name : "UnknownError",
      code: error instanceof Error && "code" in error ? String((error as NodeJS.ErrnoException).code) : "unknown",
    });
    return NextResponse.json({ error: "تعذر تحميل الرسائل الآن" }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAuthentication(request);
  if (unauthorized) return unauthorized;
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    const lastPost = recentPosts.get(ip) || 0;
    if (Date.now() - lastPost < 450) {
      return NextResponse.json({ error: "تمهّل قليلاً قبل إرسال الرسالة التالية" }, { status: 429 });
    }

    const body = (await request.json()) as Partial<ChatMessageDocument>;
    const sender = typeof body.sender === "string" ? body.sender.trim().slice(0, 24) : "";
    const clientId = typeof body.clientId === "string" ? body.clientId.trim().slice(0, 80) : "";
    const kind = body.kind as MessageKind;
    const content = typeof body.content === "string" ? body.content.trim() : "";

    if (!sender || !clientId || !["text", "image", "gif"].includes(kind) || !isValidContent(kind, content)) {
      return NextResponse.json({ error: "محتوى الرسالة غير صالح" }, { status: 400 });
    }

    const message: ChatMessageDocument = {
      roomId,
      sender,
      clientId,
      kind,
      content,
      createdAt: new Date(),
    };
    const collection = await getMessagesCollection();
    const result = await collection.insertOne(message);
    message._id = result.insertedId;
    recentPosts.set(ip, Date.now());

    return NextResponse.json({ message: serializeMessage(message) }, { status: 201 });
  } catch (error) {
    console.error("[messages:post] MongoDB unavailable", {
      name: error instanceof Error ? error.name : "UnknownError",
      code: error instanceof Error && "code" in error ? String((error as NodeJS.ErrnoException).code) : "unknown",
    });
    return NextResponse.json({ error: "تعذر إرسال الرسالة الآن" }, { status: 503 });
  }
}
