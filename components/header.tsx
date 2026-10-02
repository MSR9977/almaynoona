"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "البداية" },
  { href: "/story", label: "حكايتنا" },
  { href: "/chat", label: "دردشتنا" },
  { href: "/call", label: "اتصالنا" },
  { href: "/legal-ai", label: "مكتبها الذكي" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "glass h-18 border-b border-black/10" : "h-22"}`}>
      <div className="page-shell flex h-full items-center justify-between">
        <Link href="/" className="font-display flex items-center gap-2 text-xl font-bold" onClick={() => setOpen(false)}>
          <span className="grid size-8 -rotate-6 place-items-center rounded-full bg-[var(--berry)] text-xs text-white">♥</span>
          حبيبة دنيتي
        </Link>
        <button type="button" className="relative z-20 grid size-11 place-items-center md:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={open}>
          <span className={`absolute h-0.5 w-6 bg-current transition ${open ? "rotate-45" : "-translate-y-1"}`} />
          <span className={`absolute h-0.5 w-6 bg-current transition ${open ? "-rotate-45" : "translate-y-1"}`} />
        </button>
        <nav className={`${open ? "translate-y-0" : "-translate-y-full"} fixed inset-0 flex flex-col items-center justify-center gap-8 bg-[var(--cream)] transition-transform duration-500 md:static md:translate-y-0 md:flex-row md:bg-transparent`}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className={`relative text-sm transition hover:text-[var(--berry)] max-md:font-display max-md:text-4xl ${pathname === link.href ? "text-[var(--berry)]" : ""}`}>
              {link.label}{pathname === link.href && <span className="absolute -bottom-2 right-0 h-0.5 w-full bg-[var(--berry)]" />}
            </Link>
          ))}
          <Link href="/chat" onClick={() => setOpen(false)} className="rounded-full bg-[var(--berry)] px-5 py-3 text-xs font-bold text-white shadow-lg shadow-rose-950/20 transition hover:-translate-y-1">افتحي الجات ♥</Link>
          <button type="button" onClick={logout} className="text-[10px] font-bold text-black/40 transition hover:text-[var(--berry)]">خروج</button>
        </nav>
      </div>
    </header>
  );
}
