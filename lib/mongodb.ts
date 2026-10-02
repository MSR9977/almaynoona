import "server-only";
import { promises as dns, setServers } from "node:dns";
import { Collection, Db, MongoClient } from "mongodb";
import type { ChatConversationDocument, ChatMessageDocument } from "@/lib/types";
import type { CallSignalDocument } from "@/lib/call-types";

const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB || "habibat_dunyati";

if (!uri) {
  throw new Error("MONGODB_URI is not configured");
}

const globalForMongo = globalThis as unknown as {
  mongoClientPromise?: Promise<MongoClient>;
  mongoIndexPromise?: Promise<string>;
  callIndexPromise?: Promise<unknown>;
  conversationIndexPromise?: Promise<unknown>;
  mongoDnsPromise?: Promise<void>;
};

async function ensureSrvResolution() {
  if (!uri?.startsWith("mongodb+srv://")) return;

  const hostname = new URL(uri).hostname;
  try {
    await dns.resolveSrv(`_mongodb._tcp.${hostname}`);
  } catch (error) {
    const code = error instanceof Error && "code" in error
      ? String((error as NodeJS.ErrnoException).code)
      : "";
    if (code !== "ECONNREFUSED" && code !== "ETIMEOUT" && code !== "ESERVFAIL") throw error;

    setServers(["1.1.1.1", "8.8.8.8"]);
    await dns.resolveSrv(`_mongodb._tcp.${hostname}`);
  }
}

function getClientPromise() {
  if (!globalForMongo.mongoClientPromise) {
    globalForMongo.mongoDnsPromise ??= ensureSrvResolution();
    globalForMongo.mongoClientPromise = globalForMongo.mongoDnsPromise
      .then(() => new MongoClient(uri as string, {
        serverSelectionTimeoutMS: 8_000,
        connectTimeoutMS: 8_000,
      }).connect())
      .catch((error) => {
        globalForMongo.mongoClientPromise = undefined;
        globalForMongo.mongoDnsPromise = undefined;
        throw error;
      });
  }
  return globalForMongo.mongoClientPromise;
}

export async function getDatabase(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(databaseName);
}

export async function getMessagesCollection(): Promise<Collection<ChatMessageDocument>> {
  const database = await getDatabase();
  const collection = database.collection<ChatMessageDocument>("messages");

  globalForMongo.mongoIndexPromise ??= collection.createIndex(
    { roomId: 1, conversationId: 1, createdAt: -1 },
    { name: "conversation_messages_by_time" },
  );
  await globalForMongo.mongoIndexPromise;
  return collection;
}

export async function getConversationsCollection(): Promise<Collection<ChatConversationDocument>> {
  const database = await getDatabase();
  const collection = database.collection<ChatConversationDocument>("chat_conversations");
  globalForMongo.conversationIndexPromise ??= Promise.all([
    collection.createIndex({ roomId: 1, updatedAt: -1 }, { name: "room_conversations" }),
    collection.createIndex(
      { roomId: 1, dayKey: 1, isDaily: 1 },
      { name: "one_daily_conversation", unique: true, partialFilterExpression: { isDaily: true } },
    ),
  ]);
  await globalForMongo.conversationIndexPromise;
  return collection;
}

export async function getCallSignalsCollection(): Promise<Collection<CallSignalDocument>> {
  const database = await getDatabase();
  const collection = database.collection<CallSignalDocument>("call_signals");
  globalForMongo.callIndexPromise ??= Promise.all([
    collection.createIndex({ roomId: 1, _id: 1 }, { name: "room_signals" }),
    collection.createIndex({ expireAt: 1 }, { name: "expire_call_signals", expireAfterSeconds: 0 }),
  ]);
  await globalForMongo.callIndexPromise;
  return collection;
}
