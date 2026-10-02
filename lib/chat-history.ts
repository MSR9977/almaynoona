import "server-only";

import { GoogleGenAI } from "@google/genai";
import { ObjectId } from "mongodb";
import { getConversationsCollection, getMessagesCollection } from "@/lib/mongodb";
import type { ChatConversationDocument, ChatMessageDocument } from "@/lib/types";

export const CHAT_ROOM_ID = process.env.CHAT_ROOM_ID || "our-private-love-room";

const dayFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Bahrain",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function bahrainDayKey(date = new Date()) {
  const parts = dayFormatter.formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";
  return `${value("year")}-${value("month")}-${value("day")}`;
}

function defaultTitle(dayKey: string) {
  return `سوالف ${new Intl.DateTimeFormat("ar-BH", {
    timeZone: "Asia/Bahrain",
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(`${dayKey}T12:00:00+03:00`))}`;
}

export async function ensureDailyConversation(date = new Date()) {
  const conversations = await getConversationsCollection();
  const dayKey = bahrainDayKey(date);
  const now = new Date();
  const result = await conversations.findOneAndUpdate(
    { roomId: CHAT_ROOM_ID, dayKey, isDaily: true },
    {
      $setOnInsert: {
        roomId: CHAT_ROOM_ID,
        title: defaultTitle(dayKey),
        dayKey,
        isDaily: true,
        isFavorite: false,
        titleGenerated: false,
        messageCount: 0,
        createdAt: now,
        updatedAt: now,
      },
    },
    { upsert: true, returnDocument: "after" },
  );
  if (!result) throw new Error("DAILY_CONVERSATION_CREATE_FAILED");
  return result;
}

export async function migrateLegacyMessages() {
  const messages = await getMessagesCollection();
  const legacy = await messages
    .find({ roomId: CHAT_ROOM_ID, conversationId: { $exists: false } })
    .sort({ createdAt: 1 })
    .limit(500)
    .toArray();
  if (!legacy.length) return;

  const byDay = new Map<string, ChatMessageDocument[]>();
  for (const message of legacy) {
    const key = bahrainDayKey(message.createdAt);
    byDay.set(key, [...(byDay.get(key) ?? []), message]);
  }

  const conversations = await getConversationsCollection();
  for (const [dayKey, items] of byDay) {
    const first = items[0]?.createdAt ?? new Date();
    const last = items.at(-1)?.createdAt ?? first;
    const conversation = await conversations.findOneAndUpdate(
      { roomId: CHAT_ROOM_ID, dayKey, isDaily: true },
      {
        $setOnInsert: {
          roomId: CHAT_ROOM_ID,
          title: defaultTitle(dayKey),
          dayKey,
          isDaily: true,
          isFavorite: false,
          titleGenerated: false,
          messageCount: 0,
          createdAt: first,
          updatedAt: last,
        },
      },
      { upsert: true, returnDocument: "after" },
    );
    if (!conversation?._id) continue;
    const ids = items.flatMap((item) => (item._id ? [item._id] : []));
    const migration = await messages.updateMany(
      { _id: { $in: ids }, conversationId: { $exists: false } },
      { $set: { conversationId: conversation._id } },
    );
    await conversations.updateOne(
      { _id: conversation._id },
      { $inc: { messageCount: migration.modifiedCount }, $max: { updatedAt: last } },
    );
  }
}

export async function createConversation() {
  const now = new Date();
  const conversation: ChatConversationDocument = {
    roomId: CHAT_ROOM_ID,
    title: "محادثة جديدة",
    dayKey: bahrainDayKey(now),
    isDaily: false,
    isFavorite: false,
    titleGenerated: false,
    messageCount: 0,
    createdAt: now,
    updatedAt: now,
  };
  const collection = await getConversationsCollection();
  const result = await collection.insertOne(conversation);
  conversation._id = result.insertedId;
  return conversation;
}

export async function touchConversation(conversationId: ObjectId) {
  await (await getConversationsCollection()).updateOne(
    { _id: conversationId, roomId: CHAT_ROOM_ID },
    { $inc: { messageCount: 1 }, $set: { updatedAt: new Date() } },
  );
}

function configuredModel() {
  return (process.env.GEMINI_MODELS_STANDARD || process.env.GEMINI_MODELS || "gemini-2.5-flash")
    .split(",")[0]
    ?.trim() || "gemini-2.5-flash";
}

export async function generateConversationTitle(conversationId: ObjectId) {
  const conversations = await getConversationsCollection();
  const conversation = await conversations.findOne({
    _id: conversationId,
    roomId: CHAT_ROOM_ID,
    titleGenerated: false,
  });
  if (!conversation) return null;

  const messages = await getMessagesCollection();
  const firstSix = await messages
    .find({ conversationId, roomId: CHAT_ROOM_ID, clientId: { $ne: "smoon-ai" } })
    .sort({ createdAt: 1 })
    .limit(6)
    .toArray();
  if (firstSix.length < 6) return null;

  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) return null;
  const transcript = firstSix.map((item) => `${item.sender}: ${item.content || item.attachment?.name || "مرفق"}`).join("\n");
  const ai = new GoogleGenAI({ apiKey });
  const result = await ai.models.generateContent({
    model: configuredModel(),
    contents: `سمّ المحادثة التالية بعنوان عربي دافئ وواضح من 2 إلى 6 كلمات فقط. لا تستخدم علامات اقتباس ولا شرح.\n\n${transcript.slice(0, 6000)}`,
    config: { temperature: 0.25, maxOutputTokens: 80, thinkingConfig: { thinkingBudget: 0 } },
  });
  const title = result.text?.replace(/[\n\r"“”]/g, " ").replace(/\s+/g, " ").trim().slice(0, 80);
  if (!title) return null;
  await conversations.updateOne(
    { _id: conversationId, titleGenerated: false },
    { $set: { title, titleGenerated: true } },
  );
  return title;
}
