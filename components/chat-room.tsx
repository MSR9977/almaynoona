"use client";

/* Dynamic chat images and GIFs are user data URLs/remote media, so next/image cannot know their dimensions. */
/* eslint-disable @next/next/no-img-element */

import { AnimatePresence, motion } from "motion/react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import type { ChatMessage, MessageKind } from "@/lib/types";

const emojis = ["❤️", "🥹", "😂", "😍", "😘", "🫶", "🌷", "✨", "🤍", "😴", "🙈", "🔥"];
const gifs = [
  { url: "https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif", label: "بوسة قطط" },
  { url: "https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif", label: "قلوب" },
  { url: "https://media.giphy.com/media/l4pTdcifPZLpDjL1e/giphy.gif", label: "أحبك" },
  { url: "https://media.giphy.com/media/3oriO6qJiXajN0TyDu/giphy.gif", label: "حضن" },
  { url: "https://media.giphy.com/media/VbawWIGNtKYwOFXF7U/giphy.gif", label: "احتفال" },
  { url: "https://media.giphy.com/media/9d3LQ6TdV2Flo8ODTU/giphy.gif", label: "حب" },
];

function makeId() {
  return typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
}

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.size > 10 * 1024 * 1024) { reject(new Error("الصورة أكبر من 10MB")); return; }
    const image = new window.Image();
    const objectUrl = URL.createObjectURL(file);
    image.onload = () => {
      const max = 1280;
      const scale = Math.min(1, max / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(image.width * scale);canvas.height = Math.round(image.height * scale);
      canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(objectUrl);
      const result = canvas.toDataURL("image/jpeg", .76);
      if (result.length > 2_700_000) reject(new Error("الصورة ما زالت كبيرة، اختاري صورة أصغر")); else resolve(result);
    };
    image.onerror = () => { URL.revokeObjectURL(objectUrl);reject(new Error("تعذر قراءة الصورة")); };
    image.src = objectUrl;
  });
}

export function ChatRoom() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [name, setName] = useState("");
  const [clientId, setClientId] = useState("");
  const [draft, setDraft] = useState("");
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [picker, setPicker] = useState<"emoji" | "gif" | null>(null);
  const [notice, setNotice] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const addMessage = useCallback((message: ChatMessage) => {
    setMessages((current) => current.some((item) => item.id === message.id) ? current : [...current, message].slice(-100));
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const storedId = localStorage.getItem("love-chat-device") || makeId();
      localStorage.setItem("love-chat-device", storedId);
      setClientId(storedId);
      setName(localStorage.getItem("love-chat-name") || "");
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let source: EventSource | null = null;
    let poll: ReturnType<typeof setInterval> | null = null;
    let cancelled = false;

    async function begin() {
      try {
        const response = await fetch("/api/messages", { cache: "no-store" });
        if (!response.ok) throw new Error();
        const data = await response.json() as { messages: ChatMessage[] };
        if (cancelled) return;
        setMessages(data.messages);
        setLoading(false);
        const lastId = data.messages.at(-1)?.id || "";

        if ("EventSource" in window) {
          source = new EventSource(`/api/messages/stream?after=${encodeURIComponent(lastId)}`);
          source.onopen = () => setConnected(true);
          source.addEventListener("message", (event) => addMessage(JSON.parse((event as MessageEvent).data) as ChatMessage));
          source.onerror = () => setConnected(false);
        } else {
          let after = lastId;
          poll = setInterval(async () => {
            const result = await fetch(`/api/messages?after=${after}`, { cache: "no-store" });
            if (!result.ok) return;
            const body = await result.json() as { messages: ChatMessage[] };
            body.messages.forEach(addMessage);
            after = body.messages.at(-1)?.id || after;
            setConnected(true);
          }, 1800);
        }
      } catch {
        setLoading(false);setNotice("تعذر الاتصال بقاعدة البيانات. تأكدي من إعداد MONGODB_URI.");
      }
    }
    void begin();
    return () => { cancelled = true;source?.close();if (poll) clearInterval(poll); };
  }, [addMessage]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  function chooseName(value: string) {
    const clean = value.trim().slice(0, 24);
    if (!clean) return;
    localStorage.setItem("love-chat-name", clean);setName(clean);
  }

  async function send(kind: MessageKind, content: string) {
    if (!name || !clientId || !content.trim() || sending) return;
    if (!connected) {
      setNotice("الدردشة غير متصلة حالياً. انتظري لحظة ثم حاولي مرة ثانية.");
      return;
    }
    setSending(true);setNotice("");
    try {
      const response = await fetch("/api/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sender: name, clientId, kind, content }) });
      const data = await response.json() as { message?: ChatMessage; error?: string };
      if (!response.ok || !data.message) throw new Error(data.error || "تعذر الإرسال");
      addMessage(data.message);setDraft("");setPicker(null);
    } catch (error) { setNotice(error instanceof Error ? error.message : "تعذر الإرسال"); }
    finally { setSending(false); }
  }

  function submit(event: FormEvent) { event.preventDefault();void send("text", draft); }
  async function upload(file?: File) {
    if (!file) return;
    setNotice("جاري تجهيز الصورة…");
    try { const image = await compressImage(file);setNotice("");await send("image", image); }
    catch (error) { setNotice(error instanceof Error ? error.message : "تعذر تجهيز الصورة"); }
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="relative mx-auto flex h-[min(780px,calc(100vh-8rem))] min-h-[620px] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-black/10 bg-[var(--paper)] soft-shadow">
      <aside className="hidden w-64 shrink-0 flex-col bg-[var(--berry)] p-6 text-white md:flex"><div className="mb-10"><span className="grid size-12 place-items-center rounded-full bg-white/10 text-xl">♥</span><h2 className="mt-4 font-display text-3xl font-bold">مكاننا الخاص</h2><p className="mt-2 text-[10px] leading-6 text-white/50">رسائل محفوظة في MongoDB وتوصل لحظياً بين أجهزتكم.</p></div><div className="mt-auto rounded-2xl bg-white/10 p-4"><div className="flex items-center gap-2 text-xs"><span className={`size-2 rounded-full ${connected ? "bg-emerald-300" : "bg-amber-300"}`} />{connected ? "متصل الآن" : "جاري الاتصال"}</div><p className="mt-2 text-[9px] leading-5 text-white/45">بدون تسجيل دخول. أي شخص يملك رابط الموقع يقدر يدخل الغرفة.</p></div></aside>
      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-black/8 px-4 py-4 sm:px-6"><div><h1 className="font-display text-2xl font-bold">دردشتنا الحية</h1><div className="mt-1 flex items-center gap-2 text-[9px] text-black/40 md:hidden"><span className={`size-2 rounded-full ${connected ? "bg-emerald-500" : "bg-amber-400"}`} />{connected ? "متصل" : "جاري الاتصال"}</div></div>{name && <button onClick={() => setName("")} className="rounded-full bg-[var(--berry)]/8 px-4 py-2 text-[10px] font-bold text-[var(--berry)]">{name} ✎</button>}</header>
        <div className="chat-scrollbar flex-1 overflow-y-auto bg-[linear-gradient(rgba(255,250,246,.93),rgba(255,250,246,.93)),radial-gradient(rgba(141,36,73,.14)_1px,transparent_1px)] bg-[size:auto,18px_18px] px-3 py-5 sm:px-6">
          {loading && <div className="grid h-full place-items-center"><span className="animate-heart text-4xl text-[var(--berry)]">♥</span></div>}
          {!loading && messages.length === 0 && <div className="grid h-full place-items-center text-center"><div><span className="text-5xl">💌</span><h3 className="mt-4 font-display text-3xl font-bold">ابدؤوا أول سالفة</h3><p className="mt-2 text-[10px] text-black/40">أول رسالة هنا تنتظر واحد منكم.</p></div></div>}
          <div className="space-y-3">
            {messages.map((message) => { const mine = message.clientId === clientId;return <motion.article key={message.id} initial={{ opacity: 0, y: 10, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className={`flex ${mine ? "justify-start" : "justify-end"}`}><div className={`max-w-[82%] sm:max-w-[68%] ${mine ? "items-start" : "items-end"}`}><div className="mb-1 px-2 text-[9px] text-black/35">{message.sender}</div><div className={`overflow-hidden rounded-2xl ${mine ? "rounded-tr-sm bg-[var(--berry)] text-white" : "rounded-tl-sm border border-black/8 bg-white"}`}>{message.kind === "text" ? <p className="whitespace-pre-wrap px-4 py-3 text-xs leading-6">{message.content}</p> : <img src={message.content} alt={message.kind === "gif" ? "صورة GIF مرسلة" : "صورة مرسلة"} className="max-h-80 w-full object-contain" />}</div><time className="mt-1 block px-2 text-[8px] text-black/30">{new Intl.DateTimeFormat("ar-BH",{hour:"2-digit",minute:"2-digit"}).format(new Date(message.createdAt))}</time></div></motion.article>; })}
          </div><div ref={bottomRef} />
        </div>
        {notice && <p className="bg-amber-50 px-5 py-2 text-center text-[10px] text-amber-800">{notice}</p>}
        <AnimatePresence>{picker && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="border-t border-black/8 bg-white p-3">{picker === "emoji" ? <div className="grid grid-cols-6 gap-2 sm:grid-cols-12">{emojis.map((emoji)=><button key={emoji} onClick={()=>setDraft((text)=>text+emoji)} className="grid size-10 place-items-center rounded-xl text-xl hover:bg-[var(--cream)]">{emoji}</button>)}</div> : <div className="grid max-h-52 grid-cols-3 gap-2 overflow-y-auto sm:grid-cols-6">{gifs.map((gif)=><button key={gif.url} onClick={()=>void send("gif",gif.url)} className="aspect-square overflow-hidden rounded-xl bg-[var(--cream)]"><img src={gif.url} alt={gif.label} className="h-full w-full object-cover" /></button>)}</div>}</motion.div>}</AnimatePresence>
        <form onSubmit={submit} className="flex items-end gap-1.5 border-t border-black/8 bg-white p-3 sm:gap-2 sm:p-4"><input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(event)=>void upload(event.target.files?.[0])} /><button type="button" disabled={!connected} onClick={()=>fileRef.current?.click()} className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--cream)] text-lg disabled:opacity-35" aria-label="إرسال صورة">＋</button><button type="button" disabled={!connected} onClick={()=>setPicker((value)=>value==="emoji"?null:"emoji")} className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--cream)] disabled:opacity-35" aria-label="اختيار إيموجي">☺</button><button type="button" disabled={!connected} onClick={()=>setPicker((value)=>value==="gif"?null:"gif")} className="grid h-10 shrink-0 place-items-center rounded-full bg-[var(--cream)] px-2 text-[9px] font-black disabled:opacity-35">GIF</button><textarea value={draft} disabled={!connected} onChange={(event)=>setDraft(event.target.value)} onKeyDown={(event)=>{if(event.key==="Enter"&&!event.shiftKey){event.preventDefault();event.currentTarget.form?.requestSubmit()}}} rows={1} maxLength={1000} placeholder={connected ? "اكتبي شيء حلو…" : "جاري الاتصال بالدردشة…"} className="max-h-28 min-h-10 flex-1 resize-none rounded-2xl bg-[var(--cream)] px-4 py-3 text-xs outline-none placeholder:text-black/30 focus:ring-2 focus:ring-[var(--pink)] disabled:opacity-60" /><button type="submit" disabled={!connected||!draft.trim()||sending} className="grid size-11 shrink-0 place-items-center rounded-full bg-[var(--berry)] text-lg text-white disabled:opacity-40" aria-label="إرسال">↑</button></form>
      </section>

      <AnimatePresence>{!name && clientId && <motion.div className="absolute inset-0 z-20 grid place-items-center bg-[#241b25]/75 p-5 backdrop-blur-xl" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><motion.div initial={{scale:.94,y:20}} animate={{scale:1,y:0}} className="grid-dots w-full max-w-md rounded-[2rem] bg-[var(--cream)] p-7 text-center soft-shadow"><span className="animate-heart mx-auto grid size-16 place-items-center rounded-full bg-[var(--berry)] text-2xl text-white">♥</span><h2 className="mt-5 font-display text-4xl font-bold">من معانا الحين؟</h2><p className="mt-2 text-[10px] leading-6 text-black/45">اختاري اسمك فقط—هذا مو تسجيل دخول.</p><div className="mt-6 grid grid-cols-2 gap-3"><button onClick={()=>chooseName("babe")} className="rounded-2xl bg-[var(--berry)] px-4 py-4 text-sm font-bold text-white">أنا babe</button><button onClick={()=>chooseName("حبيبتي")} className="rounded-2xl bg-[var(--pink)] px-4 py-4 text-sm font-bold text-[var(--berry-dark)]">أنا حبيبته</button></div><form className="mt-3 flex gap-2" onSubmit={(event)=>{event.preventDefault();const form=new FormData(event.currentTarget);chooseName(String(form.get("guest")||""))}}><input name="guest" maxLength={24} placeholder="أو اكتبي اسمك" className="min-w-0 flex-1 rounded-full border border-black/10 bg-white px-4 text-xs outline-none" /><button className="rounded-full border border-[var(--berry)] px-4 text-xs font-bold text-[var(--berry)]">دخول</button></form></motion.div></motion.div>}</AnimatePresence>
    </div>
  );
}
