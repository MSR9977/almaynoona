import type { ObjectId } from "mongodb";

export type MessageKind = "text" | "image" | "gif" | "file";

export interface ChatAttachment {
  name: string;
  mimeType: string;
  size: number;
  dataUrl: string;
}

export interface ChatSource {
  title: string;
  url: string;
  snippet: string;
  favicon?: string;
}

export interface ChatMessageDocument {
  _id?: ObjectId;
  roomId: string;
  conversationId?: ObjectId;
  clientId: string;
  sender: string;
  kind: MessageKind;
  content: string;
  attachment?: ChatAttachment;
  sources?: ChatSource[];
  searchImages?: string[];
  aiMode?: "standard" | "thinking";
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  clientId: string;
  sender: string;
  kind: MessageKind;
  content: string;
  attachment?: ChatAttachment;
  sources?: ChatSource[];
  searchImages?: string[];
  aiMode?: "standard" | "thinking";
  createdAt: string;
}

export interface ChatConversationDocument {
  _id?: ObjectId;
  roomId: string;
  title: string;
  dayKey: string;
  isDaily: boolean;
  isFavorite: boolean;
  titleGenerated: boolean;
  messageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatConversation {
  id: string;
  title: string;
  dayKey: string;
  isDaily: boolean;
  isFavorite: boolean;
  messageCount: number;
  createdAt: string;
  updatedAt: string;
}

export function serializeMessage(message: ChatMessageDocument): ChatMessage {
  return {
    id: message._id?.toHexString() ?? "",
    conversationId: message.conversationId?.toHexString() ?? "",
    clientId: message.clientId,
    sender: message.sender,
    kind: message.kind,
    content: message.content,
    attachment: message.attachment,
    sources: message.sources,
    searchImages: message.searchImages,
    aiMode: message.aiMode,
    createdAt: message.createdAt.toISOString(),
  };
}

export function serializeConversation(conversation: ChatConversationDocument): ChatConversation {
  return {
    id: conversation._id?.toHexString() ?? "",
    title: conversation.title,
    dayKey: conversation.dayKey,
    isDaily: conversation.isDaily,
    isFavorite: conversation.isFavorite,
    messageCount: conversation.messageCount,
    createdAt: conversation.createdAt.toISOString(),
    updatedAt: conversation.updatedAt.toISOString(),
  };
}
