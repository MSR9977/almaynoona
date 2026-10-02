import type { ObjectId } from "mongodb";

export type MessageKind = "text" | "image" | "gif";

export interface ChatMessageDocument {
  _id?: ObjectId;
  roomId: string;
  clientId: string;
  sender: string;
  kind: MessageKind;
  content: string;
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  clientId: string;
  sender: string;
  kind: MessageKind;
  content: string;
  createdAt: string;
}

export function serializeMessage(message: ChatMessageDocument): ChatMessage {
  return {
    id: message._id?.toHexString() ?? "",
    clientId: message.clientId,
    sender: message.sender,
    kind: message.kind,
    content: message.content,
    createdAt: message.createdAt.toISOString(),
  };
}
