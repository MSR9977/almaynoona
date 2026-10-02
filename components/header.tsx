"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BookHeart,
  Home,
  Landmark,
  LogOut,
  Menu,
  MessageCircleHeart,
  PhoneCall,
  Scale,
  X,
} from "lucide-react";

const links = [
  { href: "/", label: "البداية", icon: Home },
  { href: "/story", label: "حكايتنا", icon: BookHeart },
  { href: "/chat", label: "دردشتنا", icon: MessageCircleHeart },
  { href: "/bahrain-logos", label: "شعارات البحرين", icon: Landmark },
  { href: "/call", label: "اتصالنا", icon: PhoneCall },
  { href: "/legal-ai", label: "مكتبها الذكي", icon: Scale },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const legalPage = pathname === "/legal-ai";

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
    <header className={`fixed inset-x-0 top-0 z-[100] transition-all ${legalPage ? "h-18 border-b border-white/8 bg-[#07171b]/92 text-[#edf3ef] backdrop-blur-xl" : scrolled ? "glass h-18 border-b border-black/10" : "h-22"}`}>
      <div className="page-shell flex h-full items-center justify-between">
        <Link href="/" className="font-display relative z-20 flex items-center gap-2 text-xl font-bold" onClick={() => setOpen(false)}>
          <span className="grid size-8 -rotate-6 place-items-center rounded-full bg-[var(--berry)] text-xs text-white">♥</span>
          حبيبة دنيتي
        </Link>
        <button type="button" className={`relative z-20 grid size-10 place-items-center rounded-xl border lg:hidden ${legalPage ? "border-white/10 bg-white/5" : "border-black/8 bg-white/45"}`} onClick={() => setOpen((value) => !value)} aria-label={open ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={open}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        <button type="button" aria-label="إغلاق القائمة" onClick={() => setOpen(false)} className={`${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} fixed inset-0 top-18 z-0 bg-black/35 backdrop-blur-sm transition lg:hidden`} />
        <nav className={`${open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"} fixed inset-x-3 top-20 z-10 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-[1.75rem] border p-3 shadow-2xl transition duration-300 lg:pointer-events-auto lg:static lg:flex lg:max-h-none lg:translate-y-0 lg:flex-row lg:items-center lg:gap-1 lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none ${legalPage ? "border-white/10 bg-[#0b2025]/98" : "border-black/8 bg-[var(--paper)]/98"}`}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition lg:gap-1.5 lg:px-2.5 lg:py-2 lg:text-[10px] xl:text-xs ${pathname === link.href ? legalPage ? "bg-[#b89446]/15 text-[#e2c777]" : "bg-[var(--berry)]/9 text-[var(--berry)]" : legalPage ? "text-white/60 hover:bg-white/5 hover:text-white" : "text-black/55 hover:bg-black/4 hover:text-[var(--berry)]"}`}>
              <span className={`grid size-9 shrink-0 place-items-center rounded-xl lg:size-6 lg:bg-transparent ${pathname === link.href ? legalPage ? "bg-[#b89446]/15" : "bg-[var(--berry)]/9" : legalPage ? "bg-white/5" : "bg-black/4"}`}><link.icon size={16} /></span>
              <span>{link.label}</span>
            </Link>
          ))}
          <div className={`my-2 h-px lg:mx-1 lg:my-0 lg:h-7 lg:w-px ${legalPage ? "bg-white/8" : "bg-black/8"}`} />
          <Link href="/chat" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 rounded-xl bg-[var(--berry)] px-4 py-3 text-xs font-bold text-white shadow-lg shadow-rose-950/20 transition hover:-translate-y-0.5 lg:rounded-full lg:py-2.5"><MessageCircleHeart size={15} /> افتحي الجات</Link>
          <button type="button" onClick={logout} className={`mt-1 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-[10px] font-bold transition lg:mt-0 lg:w-auto lg:py-2 ${legalPage ? "text-white/40 hover:bg-white/5 hover:text-white" : "text-black/40 hover:bg-black/4 hover:text-[var(--berry)]"}`}><LogOut size={14} /> خروج</button>
        </nav>
      </div>
    </header>
  );
}
