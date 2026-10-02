"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();setLoading(true);setError("");
    const data = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: data.get("email"), password: data.get("password") }) });
    const result = await response.json() as { error?: string };
    if (!response.ok) { setError(result.error || "تعذر تسجيل الدخول");setLoading(false);return; }
    const next = new URLSearchParams(window.location.search).get("next");
    router.replace(next?.startsWith("/") && !next.startsWith("//") ? next : "/");router.refresh();
  }

  return <motion.section initial={{ opacity: 0, y: 24, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="grid-dots relative z-10 w-full max-w-md rounded-[2rem] bg-[var(--cream)] p-7 text-center soft-shadow sm:p-10"><div className="animate-heart mx-auto grid size-20 place-items-center rounded-full bg-[var(--berry)] text-3xl text-white shadow-[8px_8px_0_var(--pink)]">♥</div><p className="eyebrow mt-7 justify-center">مكاننا الخاص</p><h1 className="display-title mt-4 text-5xl font-bold sm:text-6xl">الدخول إلى<br /><span className="text-[var(--berry)]">عالمنا</span></h1><p className="mx-auto mt-4 max-w-xs text-[10px] leading-6 text-black/45">هذا الموقع خاص فينا. دخّلي البيانات اللي نعرفها بس إحنا.</p><form onSubmit={submit} className="mt-7 space-y-3 text-right"><label className="block"><span className="mb-2 block text-[10px] font-bold text-black/45">البريد الإلكتروني</span><input name="email" type="email" required autoComplete="email" className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[var(--pink)] focus:ring-4 focus:ring-[var(--pink)]/20" /></label><label className="block"><span className="mb-2 block text-[10px] font-bold text-black/45">كلمة المرور</span><span className="relative block"><input name="password" type={visible ? "text" : "password"} required autoComplete="current-password" className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3.5 pl-14 text-sm outline-none transition focus:border-[var(--pink)] focus:ring-4 focus:ring-[var(--pink)]/20" /><button type="button" onClick={() => setVisible((value) => !value)} className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[var(--berry)]">{visible ? "إخفاء" : "إظهار"}</button></span></label>{error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-center text-[10px] font-bold text-red-700">{error}</p>}<button disabled={loading} className="mt-2 w-full rounded-2xl bg-[var(--berry)] px-5 py-4 text-sm font-bold text-white shadow-xl shadow-rose-950/20 transition hover:-translate-y-1 disabled:opacity-50">{loading ? "جاري الدخول…" : "افتحي عالمنا ♥"}</button></form><p className="mt-5 text-[9px] text-black/30">جلسة خاصة ومشفّرة • تبقى صالحة لمدة 7 أيام</p></motion.section>;
}
