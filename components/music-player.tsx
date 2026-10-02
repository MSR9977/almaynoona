"use client";

import { useEffect, useRef, useState } from "react";

const videoId = "OXC9M3mrdmM";

export function MusicPlayer() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [welcoming, setWelcoming] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setWelcoming(sessionStorage.getItem("love-welcome-opened") !== "yes");
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  function sendCommand(command: "playVideo" | "pauseVideo") {
    frameRef.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func: command, args: [] }), "https://www.youtube.com");
  }

  function enterWithMusic() {
    sessionStorage.setItem("love-welcome-opened", "yes");
    setWelcoming(false);
    setPlaying(true);
    sendCommand("playVideo");
  }

  function togglePlayback() {
    const next = !playing;
    setPlaying(next);
    sendCommand(next ? "playVideo" : "pauseVideo");
  }

  return (
    <>
      {welcoming && (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-[#241b25]/90 p-5 backdrop-blur-xl">
          <div className="grid-dots relative w-full max-w-xl overflow-hidden rounded-[2rem] bg-[var(--cream)] px-6 py-14 text-center soft-shadow">
            <div className="animate-heart mx-auto mb-5 grid size-20 place-items-center rounded-full bg-[var(--berry)] text-3xl text-white shadow-[8px_8px_0_var(--pink)]">♥</div>
            <p className="eyebrow mb-5 justify-center before:block">مفاجأة صغيرة لكِ</p>
            <h2 className="display-title text-5xl font-bold sm:text-7xl">جاهزة تدخلين<br /><span className="text-[var(--berry)]">عالمنا؟</span></h2>
            <p className="mx-auto mt-5 max-w-md text-xs leading-7 text-black/55">اضغطي الزر عشان تفتح الصفحة وتبدأ أغنية «لماح» بصوتها.</p>
            <button onClick={enterWithMusic} className="mt-7 rounded-full bg-[var(--berry)] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-rose-950/20 transition hover:-translate-y-1">افتحي المفاجأة وشغّلي الأغنية ♥</button>
          </div>
        </div>
      )}

      <aside className={`fixed bottom-4 left-4 z-40 overflow-hidden rounded-2xl bg-[#241b25] text-white shadow-2xl transition-all duration-500 ${expanded ? "w-[min(360px,calc(100vw-2rem))]" : "w-56"}`}>
        <div className={`overflow-hidden transition-all duration-500 ${expanded ? "h-48" : "h-0"}`}>
          <iframe
            ref={frameRef}
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&enablejsapi=1&playsinline=1&rel=0`}
            title="عايض - لماح"
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <div className="flex items-center gap-3 p-3">
          <button onClick={togglePlayback} className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--pink)] text-[var(--berry-dark)]" aria-label={playing ? "إيقاف الأغنية" : "تشغيل الأغنية"}>{playing ? "Ⅱ" : "▶"}</button>
          <button onClick={() => setExpanded((value) => !value)} className="min-w-0 flex-1 text-right" aria-label="إظهار فيديو الأغنية">
            <strong className="block truncate font-display text-lg">لماح</strong>
            <span className="block truncate text-[10px] text-white/50">عايض • الآن تُعرض</span>
          </button>
          <div className="flex h-5 items-end gap-0.5" aria-hidden="true">{[0, 1, 2].map((bar) => <i key={bar} className="w-0.5 bg-[var(--pink)]" style={{ animation: playing ? `music-bars .7s ${bar * .15}s ease-in-out infinite` : "none", height: "30%" }} />)}</div>
        </div>
      </aside>
    </>
  );
}
