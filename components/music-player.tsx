"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * غيّر بيانات الإهداء من هنا فقط.
 * - youtubeUrl: يقبل روابط watch / youtu.be / shorts / embed.
 * - id: غيّره كل مرة تسوي إهداء جديد عشان يشتغل تلقائياً مرة جديدة.
 * - إذا خليت enabled: false ما راح يظهر الإهداء ولا يشتغل تلقائياً.
 */
const dedication = {
  enabled: true,
  id: "gift-2026-10-02-01",
  from: "محمد",
  youtubeUrl: "https://www.youtube.com/watch?v=OXC9M3mrdmM",
  title: "لماح",
  artist: "عايض",
  message: "أهداك هالأغنية… جعلك تحيا ♥",
} as const;

function getYouTubeVideoId(url: string) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.split("/").filter(Boolean)[0] ?? "";
    }

    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname === "/watch") {
        return parsed.searchParams.get("v") ?? "";
      }

      const parts = parsed.pathname.split("/").filter(Boolean);
      const kind = parts[0];
      if (kind && ["embed", "shorts", "live"].includes(kind)) {
        return parts[1] ?? "";
      }
    }
  } catch {
    // يسمح أيضاً بوضع Video ID مباشرة بدل الرابط الكامل.
    if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) return url.trim();
  }

  return "";
}

export function MusicPlayer() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const videoId = useMemo(
    () => (dedication.enabled ? getYouTubeVideoId(dedication.youtubeUrl) : ""),
    [],
  );

  const storageKey = dedication.enabled
    ? `love-song-dedication:${dedication.id}:${videoId}`
    : "";

  useEffect(() => {
    if (!dedication.enabled || !videoId || !storageKey) return;

    const alreadyOpened = sessionStorage.getItem(storageKey) === "yes";

    if (!alreadyOpened) {
      // نسجلها قبل التشغيل حتى لا يعاد الإهداء بسبب re-render أو التنقل الداخلي.
      sessionStorage.setItem(storageKey, "yes");
      setAutoplay(true);
      setPlaying(true);
      setShowToast(true);

      const toastTimer = window.setTimeout(() => setShowToast(false), 7200);
      return () => window.clearTimeout(toastTimer);
    }
  }, [storageKey, videoId]);

  function sendCommand(command: "playVideo" | "pauseVideo") {
    frameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: command, args: [] }),
      "https://www.youtube.com",
    );
  }

  useEffect(() => {
    if (!autoplay) return;

    // بعض المتصفحات تمنع الصوت التلقائي. أول تفاعل عادي مع الصفحة
    // يحاول تشغيل الإهداء بدون مطالبة المستخدم بالضغط على زر Play.
    const resumeGiftOnFirstInteraction = () => {
      sendCommand("playVideo");
      window.removeEventListener("pointerdown", resumeGiftOnFirstInteraction);
      window.removeEventListener("keydown", resumeGiftOnFirstInteraction);
    };

    window.addEventListener("pointerdown", resumeGiftOnFirstInteraction, { once: true });
    window.addEventListener("keydown", resumeGiftOnFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", resumeGiftOnFirstInteraction);
      window.removeEventListener("keydown", resumeGiftOnFirstInteraction);
    };
  }, [autoplay]);

  function togglePlayback() {
    const next = !playing;
    setPlaying(next);
    sendCommand(next ? "playVideo" : "pauseVideo");
  }

  if (!dedication.enabled || !videoId) return null;

  const embedUrl =
    `https://www.youtube.com/embed/${videoId}` +
    `?autoplay=${autoplay ? 1 : 0}` +
    "&loop=0&enablejsapi=1&playsinline=1&rel=0&modestbranding=1";

  return (
    <>
      {showToast && (
        <div
          className="dedication-toast fixed left-1/2 top-20 z-[110] w-[min(92vw,440px)] -translate-x-1/2 overflow-hidden rounded-[1.6rem] border border-white/50 bg-[rgba(255,250,246,.92)] p-1 shadow-[0_24px_80px_rgba(100,21,48,.28)] backdrop-blur-xl"
          role="status"
          aria-live="polite"
        >
          <div className="relative overflow-hidden rounded-[1.35rem] bg-[linear-gradient(135deg,rgba(238,170,192,.36),rgba(255,250,246,.96)_45%,rgba(244,200,77,.18))] px-5 py-4">
            <div className="pointer-events-none absolute -left-7 -top-8 size-24 rounded-full bg-[var(--pink)]/30 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-10 right-6 size-24 rounded-full bg-[var(--yellow)]/25 blur-2xl" />

            <div className="relative flex items-center gap-4 text-right">
              <div className="dedication-disc grid size-14 shrink-0 place-items-center rounded-full bg-[#241b25] text-2xl text-[var(--pink)] shadow-lg ring-4 ring-white/60">
                ♪
              </div>

              <div className="min-w-0 flex-1">
                <p className="mb-1 text-[10px] font-bold text-[var(--berry)]/70">
                  إهداء وصل لك الحين ♥
                </p>
                <p className="text-sm font-black leading-7 text-[#241b25]">
                  <span className="text-[var(--berry)]">{dedication.from}</span>{" "}
                  {dedication.message}
                </p>
                <p className="mt-1 truncate text-[10px] text-black/45">
                  {dedication.title} • {dedication.artist}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowToast(false)}
                className="grid size-8 shrink-0 place-items-center rounded-full bg-black/5 text-sm text-black/40 transition hover:bg-black/10 hover:text-black/70"
                aria-label="إغلاق الإشعار"
              >
                ×
              </button>
            </div>
          </div>
          <span className="dedication-toast-progress block h-1 origin-right rounded-full bg-[linear-gradient(90deg,var(--pink),var(--berry),var(--orange))]" />
        </div>
      )}

      <aside
        className={`fixed bottom-4 left-4 z-40 overflow-hidden rounded-2xl bg-[#241b25] text-white shadow-2xl transition-all duration-500 ${
          expanded ? "w-[min(360px,calc(100vw-2rem))]" : "w-64"
        }`}
      >
        <div
          className={`overflow-hidden transition-all duration-500 ${
            expanded ? "h-48" : "h-0"
          }`}
        >
          <iframe
            key={`${videoId}-${autoplay ? "auto" : "manual"}`}
            ref={frameRef}
            className="h-full w-full"
            src={embedUrl}
            title={`${dedication.artist} - ${dedication.title}`}
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            onLoad={() => {
              if (autoplay) {
                // محاولة إضافية بعد تحميل YouTube. المتصفح قد يمنع الصوت التلقائي حسب سياسته.
                window.setTimeout(() => sendCommand("playVideo"), 250);
              }
            }}
          />
        </div>

        <div className="flex items-center gap-3 p-3">
          <button
            type="button"
            onClick={togglePlayback}
            className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--pink)] text-[var(--berry-dark)] transition hover:scale-105"
            aria-label={playing ? "إيقاف الأغنية" : "تشغيل الأغنية"}
          >
            {playing ? "Ⅱ" : "▶"}
          </button>

          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="min-w-0 flex-1 text-right"
            aria-label="إظهار فيديو الأغنية"
          >
            <span className="mb-0.5 block truncate text-[9px] font-bold text-[var(--pink)]">
              إهداء من {dedication.from}
            </span>
            <strong className="block truncate font-display text-lg">
              {dedication.title}
            </strong>
            <span className="block truncate text-[10px] text-white/50">
              {dedication.artist} • {playing ? "الآن تُعرض" : "متوقفة"}
            </span>
          </button>

          <div className="flex h-5 items-end gap-0.5" aria-hidden="true">
            {[0, 1, 2].map((bar) => (
              <i
                key={bar}
                className="w-0.5 bg-[var(--pink)]"
                style={{
                  animation: playing
                    ? `music-bars .7s ${bar * 0.15}s ease-in-out infinite`
                    : "none",
                  height: "30%",
                }}
              />
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
