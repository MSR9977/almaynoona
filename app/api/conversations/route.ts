import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";
import { requireAuthentication } from "@/lib/auth-request";
import { CHAT_ROOM_ID, createConversation, ensureDailyConversation, generateConversationTitle, migrateLegacyMessages } from "@/lib/chat-history";
import { getConversationsCollection, getMessagesCollection } from "@/lib/mongodb";
import { serializeConversation } from "@/lib/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const unauthorized = await requireAuthentication(request);
  if (unauthorized) return unauthorized;
  await migrateLegacyMessages();
  const today = await ensureDailyConversation();
  const collection = await getConversationsCollection();
  let conversations = await collection
    .find({ roomId: CHAT_ROOM_ID })
    .sort({ isFavorite: -1, updatedAt: -1 })
    .limit(200)
    .toArray();
  const actualCounts = await (await getMessagesCollection()).aggregate<{ _id: ObjectId; count: number }>([
    { $match: { roomId: CHAT_ROOM_ID, conversationId: { $exists: true } } },
    { $group: { _id: "$conversationId", count: { $sum: 1 } } },
  ]).toArray();
  const countMap = new Map(actualCounts.map((item) => [item._id.toHexString(), item.count]));
  const countRepairs = conversations.filter((item) => item._id && item.messageCount !== (countMap.get(item._id.toHexString()) ?? 0));
  if (countRepairs.length) {
    await collection.bulkWrite(countRepairs.map((item) => ({
      updateOne: {
        filter: { _id: item._id },
        update: { $set: { messageCount: countMap.get(item._id!.toHexString()) ?? 0 } },
      },
    })));
    conversations = await collection.find({ roomId: CHAT_ROOM_ID }).sort({ isFavorite: -1, updatedAt: -1 }).limit(200).toArray();
  }
  const untitled = conversations.filter((item) => !item.titleGenerated && item.messageCount >= 6 && item._id).slice(0, 3);
  if (untitled.length) {
    await Promise.allSettled(untitled.map((item) => generateConversationTitle(item._id!)));
    conversations = await collection.find({ roomId: CHAT_ROOM_ID }).sort({ isFavorite: -1, updatedAt: -1 }).limit(200).toArray();
  }
  return Response.json({ conversations: conversations.map(serializeConversation), todayId: today._id?.toHexString() });
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAuthentication(request);
  if (unauthorized) return unauthorized;
  const conversation = await createConversation();
  return Response.json({ conversation: serializeConversation(conversation) }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const unauthorized = await requireAuthentication(request);
  if (unauthorized) return unauthorized;
  const body = await request.json() as { id?: string; isFavorite?: boolean; title?: string };
  if (!body.id || !ObjectId.isValid(body.id)) return Response.json({ error: "المحادثة غير صالحة" }, { status: 400 });
  const updates: Record<string, unknown> = {};
  if (typeof body.isFavorite === "boolean") updates.isFavorite = body.isFavorite;
  if (typeof body.title === "string" && body.title.trim()) {
    updates.title = body.title.trim().slice(0, 80);
    updates.titleGenerated = true;
  }
  if (!Object.keys(updates).length) return Response.json({ error: "لا توجد تعديلات" }, { status: 400 });
  const conversation = await (await getConversationsCollection()).findOneAndUpdate(
    { _id: new ObjectId(body.id), roomId: CHAT_ROOM_ID },
    { $set: updates },
    { returnDocument: "after" },
  );
  if (!conversation) return Response.json({ error: "المحادثة غير موجودة" }, { status: 404 });
  return Response.json({ conversation: serializeConversation(conversation) });
}

export async function DELETE(request: NextRequest) {
  const unauthorized = await requireAuthentication(request);
  if (unauthorized) return unauthorized;
  const id = request.nextUrl.searchParams.get("id");
  if (!id || !ObjectId.isValid(id)) return Response.json({ error: "المحادثة غير صالحة" }, { status: 400 });
  const conversationId = new ObjectId(id);
  const conversations = await getConversationsCollection();
  const conversation = await conversations.findOne({ _id: conversationId, roomId: CHAT_ROOM_ID });
  if (!conversation) return Response.json({ error: "المحادثة غير موجودة" }, { status: 404 });
  await Promise.all([
    (await getMessagesCollection()).deleteMany({ roomId: CHAT_ROOM_ID, conversationId }),
    conversations.deleteOne({ _id: conversationId, roomId: CHAT_ROOM_ID }),
  ]);
  return Response.json({ ok: true });
}
