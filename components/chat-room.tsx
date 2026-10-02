"use client";

/* User uploads, GIFs, and search thumbnails have dynamic remote/data URLs. */
/* eslint-disable @next/next/no-img-element */

import { AnimatePresence, motion } from "motion/react";
import {
  Archive, Bot, Copy, ExternalLink, File, FileText,
  Heart, Image as ImageIcon, Link2, LoaderCircle, Menu, MessageCircle,
  MessageSquarePlus, Paperclip, Search, Send, Share2,
  Sparkles, Star, Trash2, X,
} from "lucide-react";
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { emojiGroups } from "@/lib/emoji-groups";
import type { ChatAttachment, ChatConversation, ChatMessage, MessageKind } from "@/lib/types";

interface GiphyMediaItem {
  id: string;
  title: string;
  previewUrl: string;
  shareUrl: string;
  analytics: { onload?: string; onclick?: string; onsent?: string };
}
interface GiphyImage { url?: string; webp?: string }
interface GiphyResult {
  id?: string;
  title?: string;
  alt_text?: string;
  images?: Record<string, GiphyImage>;
  analytics?: { onload?: { url?: string }; onclick?: { url?: string }; onsent?: { url?: string } };
}
type Drawer = "search" | "images" | "files" | "links" | "share" | null;
type LibraryLink = { title: string; url: string; snippet: string; favicon?: string; createdAt: string };
type SearchResult = ChatMessage & { conversationTitle: string };

const aiTrigger = /#(?:ai|الذكاء[_\s-]*ال[اأإ]صطناعي|سمون|بحث|[اأإ]بحث)\b/iu;
const dateFormat = new Intl.DateTimeFormat("ar-BH", { timeZone: "Asia/Bahrain", weekday: "long", day: "numeric", month: "long" });
const timeFormat = new Intl.DateTimeFormat("ar-BH", { timeZone: "Asia/Bahrain", hour: "2-digit", minute: "2-digit" });

function makeId() { return typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random()}` }
function dayKey(value: string) { return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Bahrain", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(value)) }
function fileSize(bytes: number) { return bytes < 1024 * 1024 ? `${Math.ceil(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB` }
function favicon(url: string, fallback?: string) {
  if (fallback) return fallback;
  try { return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(new URL(url).hostname)}&sz=64`; }
  catch { return ""; }
}

function registerGiphyAction(url: string | undefined, customerId: string) {
  if (!url) return;
  try {
    const ping = new URL(url);
    ping.searchParams.set("customer_id", customerId);
    ping.searchParams.set("ts", String(Date.now()));
    void fetch(ping, { mode: "no-cors", keepalive: true }).catch(() => undefined);
  } catch { /* Ignore malformed analytics URLs returned by a third party. */ }
}

function GiphyTile({ item, isSticker, customerId, onChoose }: {
  item: GiphyMediaItem;
  isSticker: boolean;
  customerId: string;
  onChoose: (item: GiphyMediaItem) => void;
}) {
  const tileRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tile = tileRef.current;
    if (!tile) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      registerGiphyAction(item.analytics.onload, customerId);
      observer.disconnect();
    }, { threshold: 0.55 });
    observer.observe(tile);
    return () => observer.disconnect();
  }, [customerId, item.analytics.onload]);

  return <button ref={tileRef} type="button" onClick={() => onChoose(item)} className="aspect-square overflow-hidden rounded-xl bg-[var(--cream)]">
    <img src={item.previewUrl} alt={item.title} loading="lazy" className={isSticker ? "h-full w-full object-contain" : "h-full w-full object-cover"} />
  </button>;
}

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.size > 10 * 1024 * 1024) return reject(new Error("الصورة أكبر من 10MB"));
    const image = new window.Image();
    const objectUrl = URL.createObjectURL(file);
    image.onload = () => {
      const scale = Math.min(1, 1280 / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);
      canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(objectUrl);
      const result = canvas.toDataURL("image/jpeg", 0.76);
      if (result.length > 2_700_000) reject(new Error("الصورة ما زالت كبيرة، اختاري صورة أصغر"));
      else resolve(result);
    };
    image.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error("تعذر قراءة الصورة")); };
    image.src = objectUrl;
  });
}

function readFile(file: File): Promise<ChatAttachment> {
  return new Promise((resolve, reject) => {
    if (file.size > 3 * 1024 * 1024) return reject(new Error("حجم الملف يجب ألا يتجاوز 3MB"));
    const reader = new FileReader();
    reader.onload = () => resolve({ name: file.name, mimeType: file.type || "text/plain", size: file.size, dataUrl: String(reader.result) });
    reader.onerror = () => reject(new Error("تعذر قراءة الملف"));
    reader.readAsDataURL(file);
  });
}

export function ChatRoom() {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [activeId, setActiveId] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [name, setName] = useState("");
  const [clientId, setClientId] = useState("");
  const [draft, setDraft] = useState("");
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [aiWorking, setAiWorking] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [drawer, setDrawer] = useState<Drawer>(null);
  const [picker, setPicker] = useState<"emoji" | "gif" | "sticker" | null>(null);
  const [emojiGroupId, setEmojiGroupId] = useState(emojiGroups[0]?.id ?? "");
  const [emojiSearch, setEmojiSearch] = useState("");
  const [mediaQuery, setMediaQuery] = useState("");
  const [mediaItems, setMediaItems] = useState<GiphyMediaItem[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [libraryItems, setLibraryItems] = useState<Array<ChatMessage | LibraryLink>>([]);
  const [notice, setNotice] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const active = conversations.find((item) => item.id === activeId);
  const activeEmojiGroup = emojiGroups.find((group) => group.id === emojiGroupId) ?? emojiGroups[0];
  const visibleEmojis = emojiSearch.trim()
    ? emojiGroups.flatMap((group) => group.emojis).filter((emoji) => emoji.includes(emojiSearch.trim()))
    : (activeEmojiGroup?.emojis ?? []);

  const addMessage = useCallback((message: ChatMessage) => {
    setMessages((current) => current.some((item) => item.id === message.id) ? current : [...current, message].slice(-250));
  }, []);

  const refreshConversations = useCallback(async (preferredId?: string) => {
    const response = await fetch("/api/conversations", { cache: "no-store" });
    if (!response.ok) throw new Error("تعذر تحميل سجل المحادثات");
    const data = await response.json() as { conversations: ChatConversation[]; todayId: string };
    setConversations(data.conversations);
    const fromUrl = new URLSearchParams(window.location.search).get("conversation");
    setActiveId((current) => preferredId || (fromUrl && data.conversations.some((item) => item.id === fromUrl) ? fromUrl : current || data.todayId));
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const storedId = localStorage.getItem("love-chat-device") || makeId();
      localStorage.setItem("love-chat-device", storedId);
      setClientId(storedId);
      setName(localStorage.getItem("love-chat-name") || "");
      refreshConversations().catch(() => setNotice("تعذر الاتصال بقاعدة البيانات. تأكد من إعداد MONGODB_URI."));
    }, 0);
    return () => window.clearTimeout(timer);
  }, [refreshConversations]);

  useEffect(() => {
    if (!activeId) return;
    let source: EventSource | null = null;
    let cancelled = false;
    const stateTimer = window.setTimeout(() => { setLoading(true); setConnected(false); }, 0);
    fetch(`/api/messages?conversationId=${encodeURIComponent(activeId)}`, { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error();
        const data = await response.json() as { messages: ChatMessage[] };
        if (cancelled) return;
        setMessages(data.messages);
        const after = data.messages.at(-1)?.id ?? "";
        source = new EventSource(`/api/messages/stream?conversationId=${encodeURIComponent(activeId)}&after=${encodeURIComponent(after)}`);
        source.onopen = () => setConnected(true);
        source.addEventListener("message", (event) => addMessage(JSON.parse((event as MessageEvent).data) as ChatMessage));
        source.onerror = () => setConnected(false);
      })
      .catch(() => setNotice("تعذر تحميل هذه المحادثة الآن"))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; window.clearTimeout(stateTimer); source?.close(); };
  }, [activeId, addMessage]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, aiWorking]);

  useEffect(() => {
    if (picker !== "gif" && picker !== "sticker") return;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setMediaLoading(true);
      try {
        const apiKey = process.env.NEXT_PUBLIC_GIPHY_API_KEY;
        if (!apiKey) throw new Error("أضف NEXT_PUBLIC_GIPHY_API_KEY إلى إعدادات الموقع لتفعيل GIPHY.");
        const contentType = picker === "sticker" ? "stickers" : "gifs";
        const query = mediaQuery.trim().slice(0, 50);
        const endpoint = query ? `https://api.giphy.com/v1/${contentType}/search` : `https://api.giphy.com/v1/${contentType}/trending`;
        const params = new URLSearchParams({
          api_key: apiKey,
          limit: "21",
          rating: "pg",
          country_code: "BH",
          customer_id: clientId,
          bundle: "messaging_non_clips",
        });
        if (query) { params.set("q", query); params.set("lang", "ar"); }
        if (picker === "sticker") params.set("remove_low_contrast", "true");
        const response = await fetch(`${endpoint}?${params}`, { signal: controller.signal, cache: "no-store" });
        const data = await response.json() as { data?: GiphyResult[]; meta?: { msg?: string } };
        if (!response.ok) throw new Error(data.meta?.msg || "تعذر تحميل نتائج GIPHY");
        const results = (data.data ?? []).flatMap<GiphyMediaItem>((result) => {
          const previewUrl = result.images?.fixed_width_small?.webp
            || result.images?.fixed_width?.webp
            || result.images?.fixed_width?.url;
          const shareUrl = result.images?.downsized?.url
            || result.images?.original?.webp
            || result.images?.original?.url
            || previewUrl;
          if (!result.id || !previewUrl || !shareUrl) return [];
          return [{
            id: result.id,
            title: result.alt_text || result.title || "GIF من GIPHY",
            previewUrl,
            shareUrl,
            analytics: {
              onload: result.analytics?.onload?.url,
              onclick: result.analytics?.onclick?.url,
              onsent: result.analytics?.onsent?.url,
            },
          }];
        });
        setMediaItems(results);
      } catch (error) { if (!controller.signal.aborted) setNotice(error instanceof Error ? error.message : "تعذر تحميل الوسائط"); }
      finally { if (!controller.signal.aborted) setMediaLoading(false); }
    }, 250);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [clientId, mediaQuery, picker]);

  useEffect(() => {
    if (!searchQuery.trim() || drawer !== "search") return;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setSearching(true);
      try {
        const response = await fetch("/api/chat-search", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: searchQuery }), signal: controller.signal });
        const data = await response.json() as { results?: SearchResult[] };
        if (response.ok) setSearchResults(data.results ?? []);
      } finally { if (!controller.signal.aborted) setSearching(false); }
    }, 450);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [searchQuery, drawer]);

  async function openLibrary(type: Exclude<Drawer, "search" | "share" | null>) {
    setDrawer(type);
    setLibraryItems([]);
    const response = await fetch(`/api/chat-library?type=${type}`, { cache: "no-store" });
    const data = await response.json() as { items?: Array<ChatMessage | LibraryLink> };
    if (response.ok) setLibraryItems(data.items ?? []);
  }

  function chooseName(value: string) {
    const clean = value.trim().slice(0, 24);
    if (!clean) return;
    localStorage.setItem("love-chat-name", clean);
    setName(clean);
  }

  async function askAi(prompt: string) {
    setAiWorking(true);
    try {
      const response = await fetch("/api/chat-ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ conversationId: activeId, prompt, thinking }) });
      const data = await response.json() as { message?: ChatMessage; error?: string };
      if (!response.ok || !data.message) throw new Error(data.error || "تعذر استلام رد سمون");
      addMessage(data.message);
      await refreshConversations(activeId);
    } catch (error) { setNotice(error instanceof Error ? error.message : "تعذر استلام رد سمون"); }
    finally { setAiWorking(false); }
  }

  async function send(kind: MessageKind, content: string, attachment?: ChatAttachment) {
    if (!name || !clientId || !activeId || sending || (kind !== "file" && !content.trim())) return false;
    setSending(true); setNotice("");
    try {
      const response = await fetch("/api/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sender: name, clientId, conversationId: activeId, kind, content, attachment }) });
      const data = await response.json() as { message?: ChatMessage; error?: string };
      if (!response.ok || !data.message) throw new Error(data.error || "تعذر الإرسال");
      addMessage(data.message);
      setDraft(""); setPicker(null);
      await refreshConversations(activeId);
      if (kind === "text" && aiTrigger.test(content)) await askAi(content);
      return true;
    } catch (error) { setNotice(error instanceof Error ? error.message : "تعذر الإرسال"); return false; }
    finally { setSending(false); }
  }

  async function chooseGiphy(item: GiphyMediaItem) {
    registerGiphyAction(item.analytics.onclick, clientId);
    if (await send("gif", item.shareUrl)) registerGiphyAction(item.analytics.onsent, clientId);
  }

  function submit(event: FormEvent) { event.preventDefault(); void send("text", draft); }

  async function upload(file?: File) {
    if (!file) return;
    setNotice("جاري تجهيز المرفق…");
    try {
      if (file.type.startsWith("image/")) await send("image", await compressImage(file));
      else await send("file", file.name, await readFile(file));
      setNotice("");
    } catch (error) { setNotice(error instanceof Error ? error.message : "تعذر تجهيز المرفق"); }
    if (fileRef.current) fileRef.current.value = "";
  }

  async function startConversation() {
    const response = await fetch("/api/conversations", { method: "POST" });
    const data = await response.json() as { conversation?: ChatConversation };
    if (data.conversation) { setConversations((current) => [data.conversation!, ...current]); setActiveId(data.conversation.id); setSidebarOpen(false); }
  }

  async function toggleFavorite(conversation: ChatConversation) {
    const response = await fetch("/api/conversations", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: conversation.id, isFavorite: !conversation.isFavorite }) });
    if (response.ok) await refreshConversations(activeId);
  }

  async function deleteConversation(conversation: ChatConversation) {
    if (!window.confirm(`حذف «${conversation.title}» بكل رسائلها ومرفقاتها؟`)) return;
    const response = await fetch(`/api/conversations?id=${encodeURIComponent(conversation.id)}`, { method: "DELETE" });
    if (response.ok) { setMessages([]); setActiveId(""); await refreshConversations(); }
  }

  const shareUrl = useMemo(() => typeof window === "undefined" || !activeId ? "" : `${window.location.origin}${window.location.pathname}?conversation=${activeId}`, [activeId]);
  async function nativeShare() {
    if (navigator.share) await navigator.share({ title: active?.title, text: "شاركني هذه المحادثة", url: shareUrl });
    else { await navigator.clipboard.writeText(shareUrl); setNotice("تم نسخ رابط المحادثة"); }
  }

  return (
    <div dir="rtl" className="relative mx-auto flex h-[min(850px,calc(100vh-7rem))] min-h-[650px] w-full max-w-[1480px] overflow-hidden rounded-[2rem] border border-black/10 bg-[var(--paper)] shadow-[0_28px_90px_rgba(96,36,60,.18)]">
      <AnimatePresence>{sidebarOpen && <motion.button aria-label="إغلاق السجل" className="absolute inset-0 z-30 bg-black/40 md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSidebarOpen(false)} />}</AnimatePresence>
      <aside className={`${sidebarOpen ? "translate-x-0" : "translate-x-full"} absolute inset-y-0 right-0 z-40 flex w-[310px] flex-col border-l border-black/8 bg-[#fffaf6]/98 transition-transform md:static md:z-auto md:translate-x-0`}>
        <div className="border-b border-black/8 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div><p className="text-[9px] font-black tracking-[.25em] text-[var(--berry)]/55">OUR MEMORY</p><h2 className="font-display text-2xl font-bold">سوالفنا اليومية</h2></div>
            <button className="grid size-9 place-items-center rounded-xl bg-black/5 md:hidden" onClick={() => setSidebarOpen(false)}><X size={16} /></button>
          </div>
          <button onClick={() => void startConversation()} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--berry)] px-4 py-3 text-xs font-bold text-white"><MessageSquarePlus size={16} /> محادثة جديدة</button>
          <button onClick={() => setDrawer("search")} className="mt-2 flex w-full items-center gap-2 rounded-xl border border-black/8 bg-white px-3 py-2.5 text-right text-[10px] text-black/40"><Search size={15} /> ابحث بذكاء في كل سوالفنا</button>
        </div>
        <div className="chat-scrollbar flex-1 overflow-y-auto p-3">
          {conversations.map((conversation) => (
            <div key={conversation.id} className={`group mb-1 flex items-center rounded-xl border ${conversation.id === activeId ? "border-[var(--berry)]/20 bg-[var(--berry)]/8" : "border-transparent hover:bg-black/[.025]"}`}>
              <button onClick={() => { setActiveId(conversation.id); setSidebarOpen(false); }} className="min-w-0 flex-1 px-3 py-3 text-right">
                <span className="flex items-center gap-1.5 truncate text-xs font-bold text-black/75">{conversation.isFavorite && <Star size={11} className="fill-amber-400 text-amber-400" />}{conversation.title}</span>
                <span className="mt-1 block text-[9px] text-black/35">{dateFormat.format(new Date(conversation.updatedAt))} · {conversation.messageCount} رسالة</span>
              </button>
              <button onClick={() => void toggleFavorite(conversation)} className="grid size-7 place-items-center text-black/25 opacity-0 group-hover:opacity-100" aria-label="مفضلة"><Star size={13} /></button>
              <button onClick={() => void deleteConversation(conversation)} className="ml-1 grid size-7 place-items-center text-black/25 opacity-0 hover:text-red-500 group-hover:opacity-100" aria-label="حذف"><Trash2 size={13} /></button>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1 border-t border-black/8 p-3">
          <button onClick={() => void openLibrary("images")} className="grid place-items-center gap-1 rounded-xl p-2 text-[8px] text-black/45 hover:bg-black/5"><ImageIcon size={17} />الصور</button>
          <button onClick={() => void openLibrary("files")} className="grid place-items-center gap-1 rounded-xl p-2 text-[8px] text-black/45 hover:bg-black/5"><Archive size={17} />الملفات</button>
          <button onClick={() => void openLibrary("links")} className="grid place-items-center gap-1 rounded-xl p-2 text-[8px] text-black/45 hover:bg-black/5"><Link2 size={17} />الروابط</button>
        </div>
      </aside>

      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex min-h-17 items-center justify-between border-b border-black/8 bg-white/75 px-3 backdrop-blur-xl sm:px-5">
          <div className="flex min-w-0 items-center gap-2">
            <button onClick={() => setSidebarOpen(true)} className="grid size-9 place-items-center rounded-xl bg-black/5 md:hidden"><Menu size={17} /></button>
            <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--berry)] text-white"><Heart size={16} fill="currentColor" /></div>
            <div className="min-w-0"><h1 className="truncate text-sm font-bold">{active?.title ?? "دردشتنا"}</h1><p className="mt-0.5 flex items-center gap-1.5 text-[8px] text-black/35"><span className={`size-1.5 rounded-full ${connected ? "bg-emerald-500" : "bg-amber-400"}`} />{connected ? "متصلين الآن" : "جاري الاتصال"}</p></div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setDrawer("search")} className="grid size-9 place-items-center rounded-xl hover:bg-black/5" aria-label="بحث"><Search size={16} /></button>
            <button onClick={() => setDrawer("share")} className="grid size-9 place-items-center rounded-xl hover:bg-black/5" aria-label="مشاركة"><Share2 size={16} /></button>
            {name && <button onClick={() => setName("")} className="hidden rounded-full bg-[var(--berry)]/8 px-3 py-2 text-[9px] font-bold text-[var(--berry)] sm:block">{name} ✎</button>}
          </div>
        </header>

        <div className="chat-scrollbar flex-1 overflow-y-auto bg-[linear-gradient(rgba(255,250,246,.92),rgba(255,250,246,.92)),radial-gradient(rgba(141,36,73,.12)_1px,transparent_1px)] bg-[size:auto,18px_18px] px-3 py-5 sm:px-7">
          {loading ? <div className="grid h-full place-items-center"><LoaderCircle className="animate-spin text-[var(--berry)]" size={28} /></div> : !messages.length ? <div className="grid h-full place-items-center text-center"><div><span className="text-5xl">💌</span><h3 className="mt-4 font-display text-3xl font-bold">ابدؤوا أول سالفة</h3><p className="mt-2 text-[10px] text-black/40">اكتبوا بشكل طبيعي، ونادوا سمون بوسم #ai وقت ما تحتاجونه.</p></div></div> : null}
          <div className="space-y-3">
            {messages.map((message, messageIndex) => {
              const mine = message.clientId === clientId;
              const isAi = message.clientId === "smoon-ai";
              const currentDay = dayKey(message.createdAt);
              const showDay = messageIndex === 0 || currentDay !== dayKey(messages[messageIndex - 1].createdAt);
              return <div key={message.id}>
                {showDay && <div className="my-6 flex items-center gap-3"><span className="h-px flex-1 bg-black/7" /><time className="rounded-full bg-white px-3 py-1 text-[8px] text-black/35">{dateFormat.format(new Date(message.createdAt))}</time><span className="h-px flex-1 bg-black/7" /></div>}
                <motion.article initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex ${isAi || mine ? "justify-start" : "justify-end"}`}>
                  <div className={`${isAi ? "w-full max-w-3xl" : "max-w-[86%] sm:max-w-[70%]"}`}>
                    <div className="mb-1 flex items-center gap-1.5 px-2 text-[9px] text-black/35">{isAi && <Bot size={11} />}{message.sender}{isAi && <span className="rounded-full bg-[var(--berry)]/8 px-2 py-0.5 text-[7px] text-[var(--berry)]">{message.aiMode === "thinking" ? "تفكير موسّع" : "بحث مباشر"}</span>}</div>
                    <div className={`overflow-hidden rounded-2xl ${isAi ? "border border-[var(--berry)]/12 bg-white p-5 shadow-sm" : mine ? "rounded-tr-sm bg-[var(--berry)] text-white" : "rounded-tl-sm border border-black/8 bg-white"}`}>
                      {message.kind === "text" && isAi ? <div className="chat-markdown text-xs leading-7"><ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer" className="font-bold text-[var(--berry)] underline">{children}</a> }}>{message.content}</ReactMarkdown></div>
                        : message.kind === "text" ? <p className="whitespace-pre-wrap px-4 py-3 text-xs leading-6">{message.content}</p>
                        : message.kind === "file" && message.attachment ? <a href={message.attachment.dataUrl} download={message.attachment.name} target="_blank" rel="noreferrer" className="flex min-w-56 items-center gap-3 px-4 py-3"><span className="grid size-10 place-items-center rounded-xl bg-black/8"><FileText size={19} /></span><span className="min-w-0"><strong className="block truncate text-xs">{message.attachment.name}</strong><small className="text-[8px] opacity-55">{fileSize(message.attachment.size)}</small></span></a>
                        : <img src={message.content} alt={message.kind === "gif" ? "GIF مرسل" : "صورة مرسلة"} className="max-h-96 w-full object-contain" />}
                      {!!message.searchImages?.length && <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{message.searchImages.slice(0, 4).map((url) => <a key={url} href={url} target="_blank" rel="noreferrer" className="aspect-video overflow-hidden rounded-xl bg-black/5"><img src={url} alt="صورة من نتائج البحث" className="h-full w-full object-cover" loading="lazy" /></a>)}</div>}
                    </div>
                    {!!message.sources?.length && <div className="mt-2 grid gap-2 sm:grid-cols-2">{message.sources.map((source, index) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl border border-black/7 bg-white/75 p-2.5 text-[9px] hover:border-[var(--berry)]/20"><img src={favicon(source.url, source.favicon)} alt="" className="size-5 rounded" /><span className="line-clamp-2 flex-1 text-black/60">[{index + 1}] {source.title}</span><ExternalLink size={10} className="text-black/25" /></a>)}</div>}
                    <time className="mt-1 block px-2 text-[8px] text-black/30">{timeFormat.format(new Date(message.createdAt))}</time>
                  </div>
                </motion.article>
              </div>;
            })}
            {aiWorking && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3"><div className="grid size-9 place-items-center rounded-xl bg-[var(--berry)] text-white"><Bot size={17} /></div><div className="rounded-2xl border border-[var(--berry)]/10 bg-white p-4 text-[10px] text-black/45 shadow-sm"><p className="flex items-center gap-2 font-bold text-[var(--berry)]"><LoaderCircle className="animate-spin" size={13} /> سمون يبحث ويفهم السياق…</p><p className="mt-2">بحث Tavily عميق · ترتيب المصادر · صياغة Markdown</p></div></motion.div>}
          </div><div ref={bottomRef} />
        </div>
        {notice && <button onClick={() => setNotice("")} className="bg-amber-50 px-5 py-2 text-center text-[10px] text-amber-800">{notice}</button>}

        <AnimatePresence>{picker && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="border-t border-black/8 bg-white p-3">
          <div className="mb-3 flex gap-2">{([ ["emoji", "إيموجي"], ["gif", "GIF"], ["sticker", "ستيكرز"] ] as const).map(([kind, label]) => <button key={kind} onClick={() => setPicker(kind)} className={`rounded-full px-4 py-2 text-[10px] font-bold ${picker === kind ? "bg-[var(--berry)] text-white" : "bg-[var(--cream)] text-black/60"}`}>{label}</button>)}</div>
          {picker === "emoji" ? <><input value={emojiSearch} onChange={(event) => setEmojiSearch(event.target.value)} placeholder="ابحث عن إيموجي" className="mb-3 w-full rounded-xl bg-[var(--cream)] px-4 py-2 text-xs outline-none" /><div className="chat-scrollbar mb-3 flex gap-2 overflow-x-auto">{emojiGroups.map((group) => <button key={group.id} onClick={() => setEmojiGroupId(group.id)} className={`shrink-0 rounded-full px-3 py-2 text-[9px] ${emojiGroupId === group.id ? "bg-[var(--pink)]" : "bg-[var(--cream)]"}`}>{group.title}</button>)}</div><div className="chat-scrollbar grid max-h-48 grid-cols-8 overflow-y-auto sm:grid-cols-12">{visibleEmojis.map((emoji, index) => <button key={`${emoji}-${index}`} onClick={() => setDraft((text) => text + emoji)} className="grid aspect-square place-items-center rounded-xl text-xl hover:bg-[var(--cream)]">{emoji}</button>)}</div></>
            : <><div className="relative mb-3"><Search className="absolute right-3 top-1/2 -translate-y-1/2 text-black/30" size={15} /><input value={mediaQuery} onChange={(event) => setMediaQuery(event.target.value)} placeholder="ابحث في GIPHY…" aria-label="البحث في GIPHY" className="w-full rounded-xl bg-[var(--cream)] py-2 pr-10 pl-4 text-xs outline-none" /></div>{mediaLoading ? <p className="py-8 text-center text-xs text-black/40">جاري البحث في GIPHY…</p> : <><div className="chat-scrollbar grid max-h-52 grid-cols-4 gap-2 overflow-y-auto sm:grid-cols-7">{mediaItems.map((item) => <GiphyTile key={item.id} item={item} isSticker={picker === "sticker"} customerId={clientId} onChoose={(selected) => void chooseGiphy(selected)} />)}</div>{!mediaItems.length && <p className="py-6 text-center text-[10px] text-black/40">لا توجد نتائج مطابقة.</p>}<a href="https://giphy.com" target="_blank" rel="noreferrer" className="mt-3 block text-center text-[9px] font-black tracking-[0.18em] text-black/55">POWERED BY GIPHY</a></>}</>}
        </motion.div>}</AnimatePresence>

        <form onSubmit={submit} className="border-t border-black/8 bg-white p-3 sm:p-4">
          <div className="mb-2 flex items-center justify-between px-1"><button type="button" onClick={() => setThinking((value) => !value)} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[8px] font-bold ${thinking ? "bg-violet-100 text-violet-700" : "bg-black/5 text-black/40"}`}><Sparkles size={11} /> التفكير {thinking ? "مفعّل" : "سريع"}</button><span className="text-[8px] text-black/30">#ai · #سمون · #بحث · #أبحث</span></div>
          <div className="flex items-end gap-1.5"><input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,application/pdf,text/plain,text/markdown,text/csv,application/json" className="hidden" onChange={(event) => void upload(event.target.files?.[0])} /><button type="button" disabled={!connected} onClick={() => fileRef.current?.click()} className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--cream)] disabled:opacity-35" aria-label="إرفاق ملف"><Paperclip size={17} /></button><button type="button" disabled={!connected} onClick={() => setPicker((value) => value === "emoji" ? null : "emoji")} className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--cream)] text-lg disabled:opacity-35" aria-label="إيموجي">☺</button><button type="button" disabled={!connected} onClick={() => setPicker((value) => value === "gif" ? null : "gif")} className="grid h-10 shrink-0 place-items-center rounded-full bg-[var(--cream)] px-2 text-[8px] font-black disabled:opacity-35">GIF</button><textarea value={draft} disabled={!connected || aiWorking} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} rows={1} maxLength={4000} placeholder={connected ? "اكتب شيء… أو نادِ #ai" : "جاري الاتصال…"} className="max-h-28 min-h-10 flex-1 resize-none rounded-2xl bg-[var(--cream)] px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-[var(--pink)]" /><button type="submit" disabled={!connected || !draft.trim() || sending || aiWorking} className="grid size-11 shrink-0 place-items-center rounded-full bg-[var(--berry)] text-white disabled:opacity-35" aria-label="إرسال">{sending ? <LoaderCircle className="animate-spin" size={16} /> : <Send size={16} />}</button></div>
        </form>
      </section>

      <AnimatePresence>{drawer && <><motion.button className="absolute inset-0 z-40 bg-black/30" aria-label="إغلاق" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawer(null)} /><motion.aside initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 28, stiffness: 300 }} className="absolute inset-y-0 left-0 z-50 flex w-[min(390px,92%)] flex-col border-r border-black/8 bg-[#fffaf6] shadow-2xl">
        <header className="flex items-center justify-between border-b border-black/8 p-4"><div className="flex items-center gap-2 text-sm font-bold">{drawer === "search" ? <Search size={17} /> : drawer === "images" ? <ImageIcon size={17} /> : drawer === "files" ? <File size={17} /> : drawer === "links" ? <Link2 size={17} /> : <Share2 size={17} />}{drawer === "search" ? "البحث الذكي" : drawer === "images" ? "مكتبة الصور" : drawer === "files" ? "الملفات المرفقة" : drawer === "links" ? "الروابط المستخدمة" : "مشاركة المحادثة"}</div><button onClick={() => setDrawer(null)} className="grid size-9 place-items-center rounded-xl bg-black/5"><X size={16} /></button></header>
        <div className="chat-scrollbar flex-1 overflow-y-auto p-4">
          {drawer === "search" && <><div className="relative"><Search className="absolute right-3 top-3 text-black/30" size={15} /><input autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="اسم، كلمة، موضوع، ملف أو رابط…" className="w-full rounded-xl border border-black/8 bg-white py-3 pr-10 pl-3 text-xs outline-none focus:border-[var(--berry)]/30" /></div>{searching && <p className="py-4 text-center text-[9px] text-black/35">Gemini يوسّع كلمات البحث…</p>}<div className="mt-3 space-y-2">{searchResults.map((item) => <button key={item.id} onClick={() => { setActiveId(item.conversationId); setDrawer(null); }} className="w-full rounded-xl border border-black/7 bg-white p-3 text-right"><strong className="block text-[9px] text-[var(--berry)]">{item.conversationTitle}</strong><span className="mt-1 line-clamp-3 block text-[10px] leading-5 text-black/55">{item.content || item.attachment?.name}</span></button>)}</div></>}
          {drawer === "images" && <div className="grid grid-cols-2 gap-2">{libraryItems.map((item) => "kind" in item && <button key={item.id} onClick={() => { setActiveId(item.conversationId); setDrawer(null); }} className="aspect-square overflow-hidden rounded-xl bg-white"><img src={item.content} alt="صورة من المحادثة" className="h-full w-full object-cover" /></button>)}</div>}
          {drawer === "files" && <div className="space-y-2">{libraryItems.map((item) => "kind" in item && item.attachment && <a key={item.id} href={item.attachment.dataUrl} download={item.attachment.name} className="flex items-center gap-3 rounded-xl border border-black/7 bg-white p-3"><FileText size={18} className="text-[var(--berry)]" /><span className="min-w-0 flex-1"><strong className="block truncate text-[10px]">{item.attachment.name}</strong><small className="text-[8px] text-black/35">{fileSize(item.attachment.size)}</small></span></a>)}</div>}
          {drawer === "links" && <div className="space-y-2">{libraryItems.map((item, index) => !("kind" in item) && <a key={`${item.url}-${index}`} href={item.url} target="_blank" rel="noreferrer" className="flex gap-3 rounded-xl border border-black/7 bg-white p-3"><img src={favicon(item.url, item.favicon)} alt="" className="mt-0.5 size-6 rounded" /><span className="min-w-0"><strong className="line-clamp-2 text-[10px] leading-5">{item.title}</strong><small className="mt-1 block truncate text-[8px] text-black/35">{item.url}</small></span></a>)}</div>}
          {drawer === "share" && <div className="py-6 text-center"><div className="mx-auto grid size-16 place-items-center rounded-2xl bg-[var(--berry)]/8 text-[var(--berry)]"><Share2 size={26} /></div><h3 className="mt-4 font-display text-2xl font-bold">شاركوا السالفة</h3><p className="mt-2 text-[10px] leading-5 text-black/40">الرابط يفتح المحادثة المحددة داخل الموقع المحمي.</p><div className="mt-6 flex justify-center gap-3"><button title="مشاركة" aria-label="مشاركة" onClick={() => void nativeShare()} className="grid size-12 place-items-center rounded-2xl bg-[var(--berry)] text-white"><Share2 size={20} /></button><a title="واتساب" aria-label="واتساب" href={`https://wa.me/?text=${encodeURIComponent(`${active?.title ?? "محادثة"} ${shareUrl}`)}`} target="_blank" rel="noreferrer" className="grid size-12 place-items-center rounded-2xl bg-[#25D366] text-white"><MessageCircle size={21} /></a><a title="تلغرام" aria-label="تلغرام" href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(active?.title ?? "محادثة")}`} target="_blank" rel="noreferrer" className="grid size-12 place-items-center rounded-2xl bg-[#229ED9] text-white"><Send size={20} /></a><button title="نسخ الرابط" aria-label="نسخ الرابط" onClick={() => { void navigator.clipboard.writeText(shareUrl); setNotice("تم نسخ رابط المحادثة"); }} className="grid size-12 place-items-center rounded-2xl bg-black/7 text-black/55"><Copy size={20} /></button></div></div>}
          {drawer !== "search" && drawer !== "share" && !libraryItems.length && <p className="py-16 text-center text-[10px] text-black/35">لا يوجد محتوى هنا حتى الآن.</p>}
        </div>
      </motion.aside></>}</AnimatePresence>

      <AnimatePresence>{!name && clientId && <motion.div className="absolute inset-0 z-[70] grid place-items-center bg-[#241b25]/75 p-5 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div initial={{ scale: .94, y: 20 }} animate={{ scale: 1, y: 0 }} className="grid-dots w-full max-w-md rounded-[2rem] bg-[var(--cream)] p-7 text-center shadow-2xl"><span className="animate-heart mx-auto grid size-16 place-items-center rounded-full bg-[var(--berry)] text-2xl text-white">♥</span><h2 className="mt-5 font-display text-4xl font-bold">من معانا الحين؟</h2><p className="mt-2 text-[10px] leading-6 text-black/45">اختار اسمك فقط—هذا مو تسجيل دخول.</p><div className="mt-6 grid grid-cols-2 gap-3"><button onClick={() => chooseName("الشيخ محمد")} className="rounded-2xl bg-[var(--berry)] px-4 py-4 text-sm font-bold text-white">أنا الشيخ محمد</button><button onClick={() => chooseName("حبيبته")} className="rounded-2xl bg-[var(--pink)] px-4 py-4 text-sm font-bold text-[var(--berry-dark)]">أنا حبيبته</button></div><form className="mt-3 flex gap-2" onSubmit={(event) => { event.preventDefault(); chooseName(String(new FormData(event.currentTarget).get("guest") || "")); }}><input name="guest" maxLength={24} placeholder="أو اكتب النك نيم…" className="min-w-0 flex-1 rounded-full border border-black/10 bg-white px-4 text-xs outline-none" /><button className="rounded-full border border-[var(--berry)] px-4 text-xs font-bold text-[var(--berry)]">دخول</button></form></motion.div></motion.div>}</AnimatePresence>
    </div>
  );
}
