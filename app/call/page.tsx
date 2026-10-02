import type { Metadata } from "next";
import { CallRoom } from "@/components/call-room";

export const metadata: Metadata = { title: "اتصالنا الخاص", description: "مكالمة صوت وفيديو خاصة بين قلبين." };

export default function CallPage() {
  return <main className="relative min-h-screen overflow-hidden px-2 pb-6 pt-24 sm:px-5 sm:pt-28"><div className="absolute -right-40 top-10 -z-10 size-[520px] rounded-full bg-[var(--pink)]/35 blur-3xl" /><div className="absolute -left-40 bottom-0 -z-10 size-[460px] rounded-full bg-[var(--orange)]/25 blur-3xl" /><CallRoom /></main>;
}
