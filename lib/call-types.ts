import type { ObjectId } from "mongodb";

export type CallSignalType = "presence" | "presence_ack" | "offer" | "answer" | "ice" | "hangup" | "decline";

export interface CallSignalDocument {
  _id?: ObjectId;
  roomId: string;
  from: string;
  to?: string;
  type: CallSignalType;
  payload: Record<string, unknown>;
  createdAt: Date;
  expireAt: Date;
}

export interface CallSignal {
  id: string;
  from: string;
  to?: string;
  type: CallSignalType;
  payload: Record<string, unknown>;
  createdAt: string;
}

export function serializeCallSignal(signal: CallSignalDocument): CallSignal {
  return {
    id: signal._id?.toHexString() || "",
    from: signal.from,
    to: signal.to,
    type: signal.type,
    payload: signal.payload,
    createdAt: signal.createdAt.toISOString(),
  };
}
