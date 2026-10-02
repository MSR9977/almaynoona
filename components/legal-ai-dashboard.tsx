"use client";

/* News artwork comes from Tavily results and has dynamic remote URLs. */
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Bot,
  Check,
  Copy,
  ExternalLink,
  FileSearch,
  FileText,
  Gavel,
  Globe2,
  History,
  Landmark,
  LoaderCircle,
  Menu,
  MessageSquarePlus,
  Moon,
  Newspaper,
  Paperclip,
  RefreshCw,
  Scale,
  Send,
  ShieldCheck,
  Sparkles,
  Sun,
  Trash2,
  X,
} from "lucide-react";

type Source = {
  citationId: string;
  title: string;
  url: string;
  snippet: string;
  official: boolean;
};

type Stage = { id: string; label: string; status: "done" | "skipped" | "running" };

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
  attachments?: Array<{ name: string; size: number; type: string }>;
  sources?: Source[];
  stages?: Stage[];
  model?: string;
  warning?: string;
};

type Conversation = {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: ChatMessage[];
};

type ApiResponse = {
  ok?: boolean;
  message?: string;
  answer?: string;
  model?: string;
  sources?: Source[];
  stages?: Stage[];
  researchWarning?: string;
};

type NewsItem = {
  title: string;
  url: string;
  summary: string;
  image?: string;
  favicon?: string;
  publishedAt?: string;
  source: string;
};

const STORAGE_KEY = "private-legal-ai-conversations-v1";
const THEME_KEY = "private-legal-ai-theme";
const MAX_FILES = 3;
const MAX_FILE_BYTES = 3 * 1024 * 1024;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;

const starters = [
  {
    icon: FileSearch,
    title: "تحليل ملف قضية",
    text: "حلّل المستند المرفق، استخرج الوقائع والطلبات والدفوع، ثم حدّد نقاط القوة والنواقص والأسئلة التي تحتاج جواباً.",
  },
  {
    icon: FileText,
    title: "صياغة مذكرة",
    text: "ساعدني في بناء مسودة مذكرة قانونية بحرينية مرتبة: الوقائع، الدفوع، الأسانيد، الطلبات، وما يلزم التحقق منه.",
  },
  {
    icon: Scale,
    title: "مراجعة عقد",
    text: "راجع العقد المرفق بنداً بنداً، وحدد المخاطر والثغرات والالتزامات غير المتوازنة واقترح صياغات بديلة.",
  },
  {
    icon: Landmark,
    title: "بحث قانوني بحريني",
    text: "ابحث في المصادر القانونية البحرينية عن المسألة التالية، وقدّم خلاصة موثّقة مع فصل النص النافذ عن التحليل.",
  },
];

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function newConversation(): Conversation {
  const now = Date.now();
  return { id: uid(), title: "محادثة قانونية جديدة", createdAt: now, updatedAt: now, messages: [] };
}

function fileSize(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.ceil(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function formatDate(value: number) {
  return new Intl.DateTimeFormat("ar-BH", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(value);
}

function formatNewsDate(value?: string) {
  if (!value) return "خلال هذا الأسبوع";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("ar-BH", { timeZone: "Asia/Bahrain", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(date);
}

function loadStoredConversations() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (Array.isArray(parsed)) return parsed as Conversation[];
  } catch {
    // A broken browser-only draft must not block the legal workspace.
  }
  return [];
}

export function LegalAiDashboard() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [webSearch, setWebSearch] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copiedId, setCopiedId] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [newsOpen, setNewsOpen] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsError, setNewsError] = useState("");
  const [newsUpdatedAt, setNewsUpdatedAt] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = loadStoredConversations();
    const initial = stored.length ? stored : [newConversation()];
    // This one-time client hydration reads a browser-only workspace draft.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConversations(initial);
    setActiveId(initial[0].id);
    setTheme(localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark");
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations.slice(0, 20)));
  }, [conversations, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme, hydrated]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [conversations, activeId, sending]);

  const active = useMemo(
    () => conversations.find((conversation) => conversation.id === activeId) ?? conversations[0],
    [activeId, conversations],
  );

  function startNewConversation() {
    const created = newConversation();
    setConversations((current) => [created, ...current]);
    setActiveId(created.id);
    setMessage("");
    setFiles([]);
    setError("");
    setSidebarOpen(false);
  }

  function deleteConversation(id: string) {
    setConversations((current) => {
      const next = current.filter((conversation) => conversation.id !== id);
      if (id === activeId) {
        const replacement = next[0] ?? newConversation();
        setActiveId(replacement.id);
        return next.length ? next : [replacement];
      }
      return next;
    });
  }

  function updateActive(updater: (conversation: Conversation) => Conversation) {
    setConversations((current) => current.map((conversation) => conversation.id === activeId ? updater(conversation) : conversation));
  }

  function chooseFiles(selected: FileList | null) {
    if (!selected) return;
    const incoming = Array.from(selected);
    const next = [...files, ...incoming].slice(0, MAX_FILES);
    if (next.some((file) => file.size > MAX_FILE_BYTES)) {
      setError("حجم الملف الواحد يجب ألا يتجاوز 3MB.");
      return;
    }
    if (next.reduce((sum, file) => sum + file.size, 0) > MAX_TOTAL_BYTES) {
      setError("مجموع المرفقات يجب ألا يتجاوز 4MB حتى تعمل على Vercel.");
      return;
    }
    setError("");
    setFiles(next);
    if (fileInput.current) fileInput.current.value = "";
  }

  async function submit(override?: string) {
    const text = (override ?? message).trim();
    if (sending || (!text && files.length === 0) || !active) return;

    const userMessage: ChatMessage = {
      id: uid(),
      role: "user",
      content: text || "حلّل المرفقات المضافة.",
      createdAt: Date.now(),
      attachments: files.map((file) => ({ name: file.name, size: file.size, type: file.type })),
    };
    const history = active.messages.slice(-10).map(({ role, content }) => ({ role, content }));
    const title = active.messages.length === 0 ? userMessage.content.slice(0, 44) : active.title;
    updateActive((conversation) => ({
      ...conversation,
      title,
      updatedAt: Date.now(),
      messages: [...conversation.messages, userMessage],
    }));
    setMessage("");
    const submittedFiles = files;
    setFiles([]);
    setSending(true);
    setError("");

    try {
      const body = new FormData();
      body.set("message", userMessage.content);
      body.set("history", JSON.stringify(history));
      body.set("webSearch", String(webSearch));
      submittedFiles.forEach((file) => body.append("files", file));
      const response = await fetch("/api/legal-ai", { method: "POST", body });
      const payload = await response.json() as ApiResponse;
      if (!response.ok || !payload.ok || !payload.answer) throw new Error(payload.message || "تعذر استلام الإجابة.");

      const assistantMessage: ChatMessage = {
        id: uid(),
        role: "assistant",
        content: payload.answer,
        createdAt: Date.now(),
        sources: payload.sources,
        stages: payload.stages,
        model: payload.model,
        warning: payload.researchWarning,
      };
      updateActive((conversation) => ({
        ...conversation,
        updatedAt: Date.now(),
        messages: [...conversation.messages, assistantMessage],
      }));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "تعذر إكمال الطلب.");
    } finally {
      setSending(false);
    }
  }

  async function copyAnswer(item: ChatMessage) {
    await navigator.clipboard.writeText(item.content);
    setCopiedId(item.id);
    window.setTimeout(() => setCopiedId(""), 1500);
  }

  async function loadNews(force = false) {
    if (newsLoading || (!force && news.length)) return;
    setNewsLoading(true);
    setNewsError("");
    try {
      const response = await fetch(`/api/bahrain-news${force ? `?refresh=${Date.now()}` : ""}`, { cache: "no-store" });
      const payload = await response.json() as { ok?: boolean; message?: string; items?: NewsItem[]; updatedAt?: string };
      if (!response.ok || !payload.ok) throw new Error(payload.message || "تعذر جلب الأخبار.");
      setNews(payload.items ?? []);
      setNewsUpdatedAt(payload.updatedAt ?? new Date().toISOString());
    } catch (reason) {
      setNewsError(reason instanceof Error ? reason.message : "تعذر جلب أخبار البحرين.");
    } finally {
      setNewsLoading(false);
    }
  }

  function showNews() {
    setNewsOpen(true);
    void loadNews();
  }

  return (
    <main dir="rtl" className={`legal-workspace min-h-screen pt-18 transition-colors duration-300 ${theme === "light" ? "legal-light bg-[#f4efe6] text-[#182d31]" : "bg-[#07171b] text-[#edf3ef]"}`}>
      <div className="relative isolate min-h-[calc(100vh-4.5rem)] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_85%_0%,rgba(184,147,70,.17),transparent_30%),radial-gradient(circle_at_10%_90%,rgba(22,101,92,.18),transparent_34%)]" />
        <div className="relative mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-[1540px]">
          <AnimatePresence>
            {sidebarOpen && (
              <motion.button
                aria-label="إغلاق سجل المحادثات"
                className="fixed inset-0 z-30 bg-black/65 lg:hidden"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
              />
            )}
          </AnimatePresence>

          <aside className={`${sidebarOpen ? "translate-x-0" : "translate-x-full"} fixed inset-y-0 right-0 z-40 flex w-[min(310px,88vw)] flex-col border-l pt-18 transition-transform lg:static lg:z-auto lg:w-[310px] lg:translate-x-0 lg:pt-0 ${theme === "light" ? "border-black/8 bg-[#fffaf2]/98" : "border-white/8 bg-[#0b2025]/98"}`}>
            <div className={`border-b p-5 ${theme === "light" ? "border-black/8" : "border-white/8"}`}>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold tracking-[.28em] text-[#c7a85b]">LEGAL WORKSPACE</p>
                  <h2 className="mt-1 font-display text-2xl">مكتبها الذكي</h2>
                </div>
                <button className={`grid size-9 place-items-center rounded-xl border lg:hidden ${theme === "light" ? "border-black/10" : "border-white/10"}`} onClick={() => setSidebarOpen(false)} aria-label="إغلاق"><X size={17} /></button>
              </div>
              <button onClick={startNewConversation} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#b89446] px-4 py-3 text-sm font-bold text-[#08191d] transition hover:bg-[#d0b15e]">
                <MessageSquarePlus size={17} /> محادثة جديدة
              </button>
            </div>

            <div className="chat-scrollbar flex-1 overflow-y-auto p-3">
              <div className={`mb-3 flex items-center gap-2 px-2 text-[11px] font-bold ${theme === "light" ? "text-black/45" : "text-white/45"}`}><History size={14} /> السجل الخاص</div>
              <div className="space-y-1.5">
                {conversations.map((conversation) => (
                  <div key={conversation.id} className={`group flex items-center rounded-xl border transition ${conversation.id === activeId ? "border-[#b89446]/35 bg-[#b89446]/10" : theme === "light" ? "border-transparent hover:bg-black/4" : "border-transparent hover:bg-white/4"}`}>
                    <button onClick={() => { setActiveId(conversation.id); setSidebarOpen(false); }} className="min-w-0 flex-1 px-3 py-3 text-right">
                      <span className={`block truncate text-xs font-bold ${theme === "light" ? "text-black/75" : "text-white/85"}`}>{conversation.title}</span>
                      <span className={`mt-1 block text-[9px] ${theme === "light" ? "text-black/35" : "text-white/35"}`}>{formatDate(conversation.updatedAt)}</span>
                    </button>
                    <button onClick={() => deleteConversation(conversation.id)} className="ml-2 grid size-8 shrink-0 place-items-center rounded-lg text-white/20 opacity-0 transition hover:bg-red-500/10 hover:text-red-300 group-hover:opacity-100" aria-label="حذف المحادثة"><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
            </div>

            <div className={`border-t p-4 ${theme === "light" ? "border-black/8" : "border-white/8"}`}>
              <div className="rounded-xl border border-emerald-300/12 bg-emerald-300/5 p-3 text-[10px] leading-5 text-emerald-100/65">
                <div className="mb-1 flex items-center gap-2 font-bold text-emerald-200"><ShieldCheck size={14} /> مساحة خاصة</div>
                المحادثات محفوظة في هذا المتصفح، والطلب يمر من خلال جلسة دخول الموقع المحمية.
              </div>
            </div>
          </aside>

          <section className="flex min-w-0 flex-1 flex-col">
            <header className={`sticky top-18 z-20 flex min-h-18 items-center justify-between border-b px-3 backdrop-blur-xl sm:px-4 md:px-7 ${theme === "light" ? "border-black/8 bg-[#f4efe6]/90" : "border-white/8 bg-[#07171b]/88"}`}>
              <div className="flex items-center gap-3">
                <button onClick={() => setSidebarOpen(true)} className={`grid size-10 place-items-center rounded-xl border lg:hidden ${theme === "light" ? "border-black/10" : "border-white/10"}`} aria-label="سجل المحادثات"><Menu size={19} /></button>
                <div className="grid size-10 place-items-center rounded-xl border border-[#b89446]/35 bg-[#b89446]/10 text-[#d3b665]"><Gavel size={19} /></div>
                <div>
                  <h1 className="text-sm font-bold md:text-base">المساعد القانوني البحريني</h1>
                  <p className={`mt-0.5 hidden text-[9px] sm:block md:text-[10px] ${theme === "light" ? "text-black/45" : "text-white/40"}`}>تحليل ملفات · بحث موثّق · صياغة قانونية</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={showNews} className={`grid size-9 place-items-center rounded-xl border transition ${theme === "light" ? "border-black/8 bg-white/60 text-[#8a6c2f]" : "border-white/10 bg-white/5 text-[#d7ba6a]"}`} aria-label="آخر أخبار البحرين" title="آخر أخبار البحرين"><Newspaper size={17} /></button>
                <button onClick={() => setTheme((current) => current === "dark" ? "light" : "dark")} className={`grid size-9 place-items-center rounded-xl border transition ${theme === "light" ? "border-black/8 bg-white/60 text-[#8a6c2f]" : "border-white/10 bg-white/5 text-[#d7ba6a]"}`} aria-label={theme === "dark" ? "تشغيل الوضع النهاري" : "تشغيل الوضع الليلي"} title={theme === "dark" ? "الوضع النهاري" : "الوضع الليلي"}>{theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}</button>
                <div className="hidden items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/5 px-3 py-1.5 text-[10px] text-emerald-500 sm:flex">
                  <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#6ee7b7]" /> متصل
                </div>
              </div>
            </header>

            <div className="chat-scrollbar flex-1 overflow-y-auto px-3 pb-52 pt-7 md:px-7">
              <div className="mx-auto max-w-4xl">
                {!active?.messages.length ? (
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="py-6 md:py-12">
                    <div className="mx-auto mb-9 max-w-2xl text-center">
                      <div className="mx-auto mb-5 grid size-16 place-items-center rounded-2xl border border-[#b89446]/30 bg-gradient-to-br from-[#b89446]/20 to-transparent text-[#d7ba6a] shadow-[0_22px_70px_rgba(184,148,70,.12)]"><Scale size={30} /></div>
                      <p className="mb-2 text-[10px] font-bold tracking-[.3em] text-[#c7a85b]">PRIVATE LEGAL INTELLIGENCE</p>
                      <h2 className="font-display text-4xl leading-tight md:text-5xl">مساحتك القانونية الذكية</h2>
                      <p className={`mx-auto mt-4 max-w-xl text-xs leading-7 md:text-sm ${theme === "light" ? "text-black/50" : "text-white/45"}`}>ارفعي ملف القضية أو ابدئي بسؤال. المساعد يرتب الوقائع، يبحث عن المصادر، ويصوغ مسودة عملية مع حدود واضحة لما يحتاج مراجعتك المهنية.</p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {starters.map((starter, index) => (
                        <motion.button key={starter.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 * index }} onClick={() => setMessage(starter.text)} className={`group rounded-2xl border p-5 text-right transition hover:-translate-y-1 hover:border-[#b89446]/35 hover:bg-[#b89446]/7 ${theme === "light" ? "border-black/8 bg-white/65" : "border-white/8 bg-white/[.035]"}`}>
                          <span className={`mb-4 grid size-10 place-items-center rounded-xl text-[#cbae61] transition group-hover:bg-[#b89446]/15 ${theme === "light" ? "bg-black/4" : "bg-white/5"}`}><starter.icon size={19} /></span>
                          <strong className="block text-sm">{starter.title}</strong>
                          <span className={`mt-2 block text-[11px] leading-6 ${theme === "light" ? "text-black/45" : "text-white/40"}`}>{starter.text}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <div className="space-y-8">
                    {active.messages.map((item) => (
                      <motion.article key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={item.role === "user" ? "mr-auto max-w-[88%] md:max-w-[72%]" : "max-w-full"}>
                        {item.role === "user" ? (
                          <div className={`rounded-2xl rounded-tl-sm border border-[#b89446]/25 px-5 py-4 text-sm leading-7 shadow-xl shadow-black/10 ${theme === "light" ? "bg-[#e8d5ae] text-[#24363a]" : "bg-[#153138] text-white/90"}`}>
                            <p className="whitespace-pre-wrap">{item.content}</p>
                            {!!item.attachments?.length && <div className="mt-3 flex flex-wrap gap-2">{item.attachments.map((file) => <span key={file.name} className="flex items-center gap-1.5 rounded-lg bg-black/18 px-2.5 py-1.5 text-[9px] text-white/55"><Paperclip size={11} />{file.name} · {fileSize(file.size)}</span>)}</div>}
                          </div>
                        ) : (
                          <div className="grid gap-4 md:grid-cols-[46px_1fr]">
                            <div className="grid size-11 place-items-center rounded-xl border border-[#b89446]/30 bg-[#b89446]/10 text-[#d7ba6a]"><Bot size={21} /></div>
                            <div className="min-w-0">
                              {!!item.stages?.length && (
                                <div className="mb-4 flex flex-wrap gap-2">{item.stages.map((stage) => <span key={stage.id} className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] ${theme === "light" ? "border-black/8 bg-white/55 text-black/45" : "border-white/8 bg-white/[.035] text-white/45"}`}><Check size={10} className={stage.status === "done" ? "text-emerald-500" : theme === "light" ? "text-black/25" : "text-white/25"} />{stage.label}</span>)}</div>
                              )}
                              {item.warning && <div className="mb-4 rounded-xl border border-amber-300/20 bg-amber-300/5 p-3 text-[10px] text-amber-100/70">{item.warning}</div>}
                              <div className={`legal-markdown rounded-2xl border px-5 py-6 shadow-2xl shadow-black/15 md:px-8 ${theme === "light" ? "border-black/8 bg-white/75" : "border-white/8 bg-[#0b2025]"}`}>
                                <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                                  a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer" className="text-[#e0c472] underline decoration-[#b89446]/35 underline-offset-4">{children}</a>,
                                }}>{item.content}</ReactMarkdown>
                              </div>
                              {!!item.sources?.length && (
                                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                                  {item.sources.map((source) => (
                                    <a key={source.citationId} href={source.url} target="_blank" rel="noreferrer" className={`group rounded-xl border p-3 transition hover:border-[#b89446]/30 ${theme === "light" ? "border-black/8 bg-white/65" : "border-white/8 bg-white/[.025]"}`}>
                                      <div className="flex items-start gap-2">
                                        <span className={`rounded-md px-1.5 py-1 text-[8px] font-bold ${source.official ? "bg-emerald-300/10 text-emerald-200" : "bg-[#b89446]/12 text-[#d9bd6c]"}`}>{source.citationId}</span>
                                        <div className="min-w-0 flex-1"><strong className={`line-clamp-2 block text-[10px] leading-5 ${theme === "light" ? "text-black/70" : "text-white/75"}`}>{source.title}</strong><span className={`mt-1 flex items-center gap-1 text-[8px] ${theme === "light" ? "text-black/35" : "text-white/30"}`}>{source.official ? "مصدر بحريني رسمي" : "مصدر ويب"}<ExternalLink size={9} /></span></div>
                                      </div>
                                    </a>
                                  ))}
                                </div>
                              )}
                              <div className={`mt-3 flex items-center gap-3 text-[9px] ${theme === "light" ? "text-black/30" : "text-white/25"}`}>
                                <button onClick={() => copyAnswer(item)} className="flex items-center gap-1 transition hover:text-white/65">{copiedId === item.id ? <Check size={12} /> : <Copy size={12} />}{copiedId === item.id ? "تم النسخ" : "نسخ الإجابة"}</button>
                                {item.model && <span>النموذج: {item.model}</span>}
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.article>
                    ))}
                    {sending && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-4 md:grid-cols-[46px_1fr]">
                        <div className="grid size-11 place-items-center rounded-xl border border-[#b89446]/30 bg-[#b89446]/10 text-[#d7ba6a]"><LoaderCircle className="animate-spin" size={21} /></div>
                        <div className={`rounded-2xl border p-5 ${theme === "light" ? "border-black/8 bg-white/70" : "border-white/8 bg-[#0b2025]"}`}>
                          <div className="mb-3 flex items-center gap-2 text-xs font-bold"><Sparkles size={15} className="text-[#d7ba6a]" /> جاري بناء التحليل القانوني</div>
                          <div className={`space-y-2 text-[10px] ${theme === "light" ? "text-black/45" : "text-white/40"}`}><p>قراءة الطلب والمستندات…</p><p>{webSearch ? "البحث عن المصادر القانونية ذات الصلة…" : "البحث الخارجي متوقف لهذه الجولة…"}</p><p>صياغة الإجابة ومراجعة الاستشهادات…</p></div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={endRef} />
                  </div>
                )}
              </div>
            </div>

            <div className={`fixed inset-x-0 bottom-0 z-20 border-t p-3 backdrop-blur-2xl lg:right-[310px] md:p-5 ${theme === "light" ? "border-black/8 bg-[#f4efe6]/94" : "border-white/8 bg-[#07171b]/92"}`}>
              <div className="mx-auto max-w-4xl">
                <AnimatePresence>
                  {!!files.length && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-2 flex flex-wrap gap-2">
                      {files.map((file, index) => <span key={`${file.name}-${index}`} className={`flex items-center gap-2 rounded-lg border border-[#b89446]/20 px-2.5 py-1.5 text-[9px] ${theme === "light" ? "bg-white/75 text-black/60" : "bg-[#10282e] text-white/60"}`}><FileText size={12} className="text-[#d1b363]" /><span className="max-w-40 truncate">{file.name}</span><span className={theme === "light" ? "text-black/30" : "text-white/25"}>{fileSize(file.size)}</span><button onClick={() => setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index))} className={theme === "light" ? "text-black/30 hover:text-red-500" : "text-white/30 hover:text-red-300"}><X size={11} /></button></span>)}
                    </motion.div>
                  )}
                </AnimatePresence>
                {error && <div className="mb-2 rounded-xl border border-red-300/20 bg-red-400/8 px-3 py-2 text-[10px] text-red-100">{error}</div>}
                <div className={`rounded-2xl border p-2 shadow-[0_20px_60px_rgba(0,0,0,.18)] focus-within:border-[#b89446]/35 ${theme === "light" ? "border-black/10 bg-white/85" : "border-white/10 bg-[#0c2227]"}`}>
                  <textarea value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void submit(); } }} rows={2} placeholder="اكتبي السؤال القانوني أو ارفعي ملف القضية…" className={`block max-h-36 min-h-14 w-full resize-none bg-transparent px-3 py-2 text-sm leading-6 outline-none ${theme === "light" ? "text-[#182d31] placeholder:text-black/30" : "text-white placeholder:text-white/25"}`} />
                  <div className={`flex items-center justify-between gap-3 border-t px-1 pt-2 ${theme === "light" ? "border-black/6" : "border-white/6"}`}>
                    <div className="flex items-center gap-1">
                      <input ref={fileInput} type="file" multiple accept=".pdf,.txt,.md,.csv,.json,image/jpeg,image/png,image/webp" className="hidden" onChange={(event) => chooseFiles(event.target.files)} />
                      <button onClick={() => fileInput.current?.click()} disabled={sending || files.length >= MAX_FILES} className={`grid size-9 place-items-center rounded-xl transition disabled:opacity-30 ${theme === "light" ? "text-black/45 hover:bg-black/5 hover:text-black" : "text-white/45 hover:bg-white/5 hover:text-white"}`} aria-label="إرفاق ملف"><Paperclip size={17} /></button>
                      <button onClick={() => setWebSearch((value) => !value)} className={`flex h-9 items-center gap-1.5 rounded-xl px-2.5 text-[9px] font-bold transition ${webSearch ? "bg-[#b89446]/12 text-[#9b772e]" : theme === "light" ? "text-black/35 hover:bg-black/5" : "text-white/35 hover:bg-white/5"}`}><Globe2 size={15} /> بحث الويب</button>
                    </div>
                    <button onClick={() => void submit()} disabled={sending || (!message.trim() && files.length === 0)} className="grid size-10 place-items-center rounded-xl bg-[#b89446] text-[#07171b] transition hover:bg-[#d2b45f] disabled:cursor-not-allowed disabled:opacity-30" aria-label="إرسال">{sending ? <LoaderCircle className="animate-spin" size={17} /> : <Send size={17} />}</button>
                  </div>
                </div>
                <p className={`mt-2 text-center text-[8px] ${theme === "light" ? "text-black/30" : "text-white/25"}`}>مساعد للبحث والصياغة، وليس بديلاً عن مراجعة المحامية للنص النافذ وملف الدعوى. PDF والصور والنصوص · حتى 4MB إجمالاً.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <AnimatePresence>
        {newsOpen && (
          <motion.div className="fixed inset-0 z-[120] bg-black/65 p-2 backdrop-blur-lg sm:p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.section initial={{ opacity: 0, y: 24, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: .98 }} className={`mx-auto flex h-full max-w-6xl flex-col overflow-hidden rounded-[1.75rem] border shadow-2xl ${theme === "light" ? "border-black/10 bg-[#f8f3ea] text-[#182d31]" : "border-white/10 bg-[#07171b] text-[#edf3ef]"}`}>
              <header className={`flex items-center justify-between gap-3 border-b px-4 py-4 sm:px-6 ${theme === "light" ? "border-black/8" : "border-white/8"}`}>
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#b89446] text-[#07171b]"><Newspaper size={21} /></span>
                  <div className="min-w-0"><h2 className="truncate font-display text-2xl font-bold sm:text-3xl">آخر أخبار البحرين</h2><p className={`mt-1 text-[8px] sm:text-[9px] ${theme === "light" ? "text-black/40" : "text-white/40"}`}>بحث حي بالصور من Tavily · افتحي الخبر من مصدره الأصلي</p></div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => void loadNews(true)} disabled={newsLoading} className={`grid size-10 place-items-center rounded-xl border disabled:opacity-40 ${theme === "light" ? "border-black/8 bg-white/65" : "border-white/10 bg-white/5"}`} aria-label="تحديث الأخبار" title="تحديث الأخبار"><RefreshCw className={newsLoading ? "animate-spin" : ""} size={17} /></button>
                  <button onClick={() => setNewsOpen(false)} className={`grid size-10 place-items-center rounded-xl border ${theme === "light" ? "border-black/8 bg-white/65" : "border-white/10 bg-white/5"}`} aria-label="إغلاق الأخبار"><X size={18} /></button>
                </div>
              </header>
              <div className="chat-scrollbar flex-1 overflow-y-auto p-3 sm:p-6">
                {newsLoading && !news.length && <div className="grid min-h-72 place-items-center text-center"><div><LoaderCircle className="mx-auto animate-spin text-[#b89446]" size={30} /><p className={`mt-4 text-[10px] ${theme === "light" ? "text-black/45" : "text-white/45"}`}>جاري جمع أحدث أخبار البحرين وصورها…</p></div></div>}
                {newsError && <div className="mx-auto mt-8 max-w-lg rounded-2xl border border-red-400/20 bg-red-400/8 p-5 text-center text-xs text-red-500">{newsError}<button onClick={() => void loadNews(true)} className="mx-auto mt-3 block rounded-xl bg-red-500 px-4 py-2 text-[10px] font-bold text-white">إعادة المحاولة</button></div>}
                {!!news.length && <>
                  <div className="mb-4 flex items-center justify-between px-1"><p className={`text-[9px] ${theme === "light" ? "text-black/40" : "text-white/40"}`}>{news.length} أخبار حديثة</p>{newsUpdatedAt && <time className={`text-[8px] ${theme === "light" ? "text-black/30" : "text-white/30"}`}>آخر تحديث: {formatNewsDate(newsUpdatedAt)}</time>}</div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {news.map((item, index) => (
                      <motion.a key={item.url} href={item.url} target="_blank" rel="noreferrer" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * .04, .3) }} className={`group overflow-hidden rounded-2xl border transition hover:-translate-y-1 hover:border-[#b89446]/45 ${theme === "light" ? "border-black/8 bg-white/75 shadow-lg shadow-black/5" : "border-white/8 bg-[#0b2025]"}`}>
                        <div className={`relative aspect-[16/9] overflow-hidden ${theme === "light" ? "bg-[#e9dfcf]" : "bg-[#10282e]"}`}>
                          {item.image ? <img src={item.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="grid h-full place-items-center text-[#b89446]"><Landmark size={34} /></div>}
                          <span className="absolute bottom-2 right-2 rounded-lg bg-black/65 px-2 py-1 text-[8px] text-white backdrop-blur">{item.source}</span>
                        </div>
                        <div className="p-4">
                          <div className="mb-2 flex items-center gap-2">
                            {item.favicon && <img src={item.favicon} alt="" className="size-4 rounded" />}
                            <time className={`text-[8px] ${theme === "light" ? "text-black/35" : "text-white/35"}`}>{formatNewsDate(item.publishedAt)}</time>
                          </div>
                          <h3 className="line-clamp-3 text-sm font-bold leading-7 transition group-hover:text-[#b89446]">{item.title}</h3>
                          <p className={`mt-2 line-clamp-3 text-[10px] leading-6 ${theme === "light" ? "text-black/50" : "text-white/45"}`}>{item.summary}</p>
                          <span className="mt-4 flex items-center gap-1 text-[9px] font-bold text-[#b89446]">قراءة الخبر <ExternalLink size={10} /></span>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </>}
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
