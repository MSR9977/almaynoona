import type { Metadata } from "next";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = { title: "الدخول إلى عالمنا", robots: { index: false, follow: false } };

export default function LoginPage() {
  return <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#241b25] p-4"><div className="absolute -right-24 -top-24 size-96 rounded-full bg-[var(--berry)]/60 blur-3xl" /><div className="absolute -bottom-32 -left-20 size-[420px] rounded-full bg-[var(--orange)]/35 blur-3xl" /><LoginForm /></main>;
}
