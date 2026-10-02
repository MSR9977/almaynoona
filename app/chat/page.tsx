import type { Metadata } from "next";
import { ChatRoom } from "@/components/chat-room";

export const metadata: Metadata = { title: "دردشتنا الحية", description: "دردشة خاصة مباشرة بين قلبين." };

export default function ChatPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-2 pb-5 pt-24 sm:px-5 sm:pt-28">
      <div className="absolute -right-40 top-10 -z-10 size-[500px] rounded-full bg-[var(--pink)]/35 blur-3xl" />
      <div className="absolute -left-40 bottom-0 -z-10 size-[450px] rounded-full bg-[var(--orange)]/20 blur-3xl" />
      <ChatRoom />
    </main>
  );
}
