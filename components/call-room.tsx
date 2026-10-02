"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CallSignal } from "@/lib/call-types";

type CallMode = "audio" | "video";
type CallState = "idle" | "calling" | "connected";
type IncomingCall = { from: string; name: string; mode: CallMode; description: RTCSessionDescriptionInit };

function deviceId() {
  return typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
}

export function CallRoom() {
  const [clientId, setClientId] = useState("");
  const [name, setName] = useState("حبيبتي");
  const [callState, setCallState] = useState<CallState>("idle");
  const [mode, setMode] = useState<CallMode>("video");
  const [incoming, setIncoming] = useState<IncomingCall | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [online, setOnline] = useState(false);
  const [turnConfigured, setTurnConfigured] = useState(false);
  const [notice, setNotice] = useState("");
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const remoteIdRef = useRef<string | undefined>(undefined);
  const availablePeerRef = useRef<string | undefined>(undefined);
  const stateRef = useRef<CallState>("idle");
  const pendingIceRef = useRef<RTCIceCandidateInit[]>([]);
  const iceServersRef = useRef<RTCIceServer[]>([{ urls: "stun:stun.l.google.com:19302" }]);
  const handleSignalRef = useRef<(signal: CallSignal) => void>(() => undefined);
  const presenceTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const callTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const initializedRef = useRef(false);

  useEffect(() => { stateRef.current = callState; }, [callState]);
  useEffect(() => { if (localVideoRef.current) localVideoRef.current.srcObject = localStream; }, [localStream]);
  useEffect(() => {
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;
    if (remoteAudioRef.current) remoteAudioRef.current.srcObject = remoteStream;
  }, [remoteStream, mode, sharing]);

  const sendSignal = useCallback(async (type: CallSignal["type"], payload: Record<string, unknown> = {}, to?: string) => {
    if (!clientId) return;
    const response = await fetch("/api/calls", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ from: clientId, to, type, payload }) });
    if (!response.ok) throw new Error("تعذر إرسال إشارة الاتصال");
  }, [clientId]);

  const flushIce = useCallback(async (peer: RTCPeerConnection) => {
    for (const candidate of pendingIceRef.current.splice(0)) {
      try { await peer.addIceCandidate(candidate); } catch { /* stale candidate */ }
    }
  }, []);

  const createPeer = useCallback((remoteId?: string) => {
    peerRef.current?.close();
    remoteIdRef.current = remoteId;
    const peer = new RTCPeerConnection({ iceServers: iceServersRef.current, iceCandidatePoolSize: 8 });
    peer.onicecandidate = (event) => { if (event.candidate) void sendSignal("ice", { candidate: event.candidate.toJSON() }, remoteIdRef.current).catch(() => setNotice("تعذر تبادل بيانات الشبكة")); };
    peer.ontrack = (event) => {
      const stream = event.streams[0] || new MediaStream([event.track]);
      remoteStreamRef.current = stream;
      setRemoteStream(stream);
    };
    peer.onconnectionstatechange = () => {
      if (peer.connectionState === "connected") { clearTimeout(callTimerRef.current);setCallState("connected");setNotice(""); }
      if (["failed", "disconnected"].includes(peer.connectionState)) setNotice("انقطع الاتصال. حاولا الاتصال مرة ثانية أو أضيفوا TURN.");
      if (peer.connectionState === "closed") setCallState("idle");
    };
    peerRef.current = peer;
    return peer;
  }, [sendSignal]);

  const getMedia = useCallback(async (callMode: CallMode) => {
    if (!navigator.mediaDevices?.getUserMedia) throw new Error("المتصفح لا يدعم المكالمات أو الصفحة ليست على HTTPS");
    const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true }, video: callMode === "video" ? { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } } : false });
    localStreamRef.current = stream;
    setLocalStream(stream);setMode(callMode);setMuted(false);setCameraOff(false);
    return stream;
  }, []);

  const endCall = useCallback(async (notify = true) => {
    const target = remoteIdRef.current;
    if (notify) void sendSignal("hangup", {}, target).catch(() => undefined);
    clearTimeout(callTimerRef.current);
    peerRef.current?.close();peerRef.current = null;remoteIdRef.current = undefined;pendingIceRef.current = [];
    localStreamRef.current?.getTracks().forEach((track) => track.stop());remoteStreamRef.current?.getTracks().forEach((track) => track.stop());
    localStreamRef.current = null;remoteStreamRef.current = null;
    setLocalStream(null);setRemoteStream(null);setIncoming(null);setSharing(false);setCallState("idle");setNotice("");
  }, [sendSignal]);

  const answerOffer = useCallback(async (call: IncomingCall, acquireMedia: boolean) => {
    try {
      remoteIdRef.current = call.from;
      const stream = acquireMedia ? await getMedia(call.mode) : localStreamRef.current;
      const peer = createPeer(call.from);
      stream?.getTracks().forEach((track) => peer.addTrack(track, stream));
      await peer.setRemoteDescription(call.description);
      await flushIce(peer);
      const answer = await peer.createAnswer();await peer.setLocalDescription(answer);
      await sendSignal("answer", { description: answer, name }, call.from);
      clearTimeout(callTimerRef.current);
      setIncoming(null);setCallState("connected");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "تعذر قبول الاتصال");
      await endCall(false);
    }
  }, [createPeer, endCall, flushIce, getMedia, name, sendSignal]);

  useEffect(() => { handleSignalRef.current = (signal) => {
    if (signal.type === "presence" || signal.type === "presence_ack") {
      availablePeerRef.current = signal.from;
      setOnline(true);clearTimeout(presenceTimerRef.current);presenceTimerRef.current = setTimeout(() => { availablePeerRef.current = undefined;setOnline(false); }, 18_000);
      if (signal.type === "presence") void sendSignal("presence_ack", { name }, signal.from).catch(() => undefined);
      return;
    }
    if (signal.type === "offer") {
      const call: IncomingCall = { from: signal.from, name: String(signal.payload.name || "حبيبتي"), mode: signal.payload.mode === "audio" ? "audio" : "video", description: signal.payload.description as RTCSessionDescriptionInit };
      if (peerRef.current && stateRef.current === "connected") void answerOffer(call, false); else setIncoming(call);
      return;
    }
    if (signal.type === "answer" && peerRef.current) {
      remoteIdRef.current = signal.from;
      clearTimeout(callTimerRef.current);
      void peerRef.current.setRemoteDescription(signal.payload.description as RTCSessionDescriptionInit).then(() => flushIce(peerRef.current!)).catch(() => setNotice("تعذر إكمال الاتصال"));return;
    }
    if (signal.type === "ice") {
      const candidate = signal.payload.candidate as RTCIceCandidateInit;
      if (peerRef.current?.remoteDescription) void peerRef.current.addIceCandidate(candidate).catch(() => undefined); else pendingIceRef.current.push(candidate);return;
    }
    if (signal.type === "hangup" || signal.type === "decline") {
      setNotice(signal.type === "decline" ? "تم رفض الاتصال" : "تم إنهاء الاتصال من الجهاز الآخر");void endCall(false);
    }
  }; }, [answerOffer, endCall, flushIce, name, sendSignal]);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    const timer = setTimeout(() => {
      setClientId(deviceId());
      setName(localStorage.getItem("love-chat-name") || "حبيبتي");
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!clientId) return;
    let source: EventSource | null = null;
    void fetch("/api/calls/config", { cache: "no-store" }).then((response) => response.json()).then((config: { iceServers?: RTCIceServer[]; turnConfigured?: boolean }) => { if (config.iceServers) iceServersRef.current = config.iceServers;setTurnConfigured(Boolean(config.turnConfigured)); });
    source = new EventSource(`/api/calls/stream?clientId=${encodeURIComponent(clientId)}`);
    source.addEventListener("signal", (event) => handleSignalRef.current(JSON.parse((event as MessageEvent).data) as CallSignal));
    source.onerror = () => setNotice("جاري إعادة الاتصال بخدمة المكالمات…");
    const presence = () => void sendSignal("presence", { name }).catch(() => undefined);
    presence();const interval = setInterval(presence, 8_000);
    return () => { source?.close();clearInterval(interval);clearTimeout(presenceTimerRef.current); };
  }, [clientId, name, sendSignal]);

  async function startCall(callMode: CallMode) {
    setNotice("");
    const target = availablePeerRef.current;
    if (!online || !target) {
      setNotice("افتحوا صفحة الاتصال في الجهاز الثاني أولاً، وانتظروا حتى تظهر علامة أنه موجود.");
      return;
    }
    try {
      const stream = await getMedia(callMode);const peer = createPeer(target);stream.getTracks().forEach((track) => peer.addTrack(track, stream));
      const offer = await peer.createOffer();await peer.setLocalDescription(offer);await sendSignal("offer", { description: offer, mode: callMode, name }, target);setCallState("calling");
      clearTimeout(callTimerRef.current);
      callTimerRef.current = setTimeout(() => {
        if (stateRef.current !== "calling") return;
        void endCall(false).then(() => setNotice("لم يرد الجهاز الثاني على الاتصال. تأكدوا أن صفحة الاتصال مفتوحة ثم حاولوا مجدداً."));
      }, 35_000);
    } catch (error) { setNotice(error instanceof Error ? error.message : "تعذر بدء الاتصال");await endCall(false); }
  }

  async function decline() { if (incoming) await sendSignal("decline", {}, incoming.from).catch(() => undefined);setIncoming(null); }
  function toggleMute() { localStreamRef.current?.getAudioTracks().forEach((track) => { track.enabled = muted; });setMuted((value) => !value); }
  function toggleCamera() { localStreamRef.current?.getVideoTracks().filter((track) => track.getSettings().displaySurface === undefined).forEach((track) => { track.enabled = cameraOff; });setCameraOff((value) => !value); }

  async function shareScreen() {
    if (!peerRef.current || !navigator.mediaDevices?.getDisplayMedia) return;
    try {
      const screen = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
      const track = screen.getVideoTracks()[0];
      const sender = peerRef.current.getSenders().find((item) => item.track?.kind === "video");
      if (sender) await sender.replaceTrack(track); else {
        peerRef.current.addTrack(track, screen);const offer = await peerRef.current.createOffer();await peerRef.current.setLocalDescription(offer);await sendSignal("offer", { description: offer, mode: "video", name }, remoteIdRef.current);
      }
      const sharedStream = new MediaStream([...(localStreamRef.current?.getAudioTracks() || []), track]);
      localStreamRef.current = sharedStream;setSharing(true);setLocalStream(sharedStream);
      track.onended = () => { setSharing(false);setNotice("انتهت مشاركة الشاشة. أوقفي الاتصال وابدئيه مجدداً لإعادة الكاميرا."); };
    } catch { setNotice("تم إلغاء مشاركة الشاشة أو تعذر تشغيلها"); }
  }

  const audioOnly = mode === "audio" && !sharing;
  return <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] bg-[#171218] text-white soft-shadow">
    <div className="flex items-center justify-between border-b border-white/8 px-5 py-4"><div><h1 className="font-display text-2xl font-bold">اتصالنا الخاص</h1><p className="mt-1 flex items-center gap-2 text-[9px] text-white/45"><span className={`size-2 rounded-full ${online ? "bg-emerald-400" : "bg-white/25"}`} />{online ? "الجهاز الثاني موجود" : "بانتظار الجهاز الثاني"}</p></div><div className="rounded-full bg-white/8 px-3 py-2 text-[9px] text-white/50">{turnConfigured ? "TURN + STUN" : "STUN"}</div></div>
    <div className="relative min-h-[560px] bg-[radial-gradient(circle_at_70%_20%,rgba(141,36,73,.35),transparent_35%)] p-3 sm:p-6">
      {callState === "idle" && !incoming && <div className="grid min-h-[520px] place-items-center text-center"><div><span className="animate-heart mx-auto grid size-24 place-items-center rounded-full bg-[var(--berry)] text-4xl shadow-[10px_10px_0_var(--pink)]">♥</span><h2 className="display-title mt-8 text-5xl font-bold sm:text-7xl">قريبين حتى<br /><span className="text-[var(--pink)]">لو كنا بعيدين</span></h2><p className="mx-auto mt-5 max-w-md text-xs leading-7 text-white/45">اختاري نوع الاتصال. لازم تفتحون صفحة الاتصال في الجهازين.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><button onClick={() => void startCall("audio")} className="rounded-full bg-white px-7 py-4 text-xs font-bold text-[var(--berry)] transition hover:-translate-y-1">☎ اتصال صوتي</button><button onClick={() => void startCall("video")} className="rounded-full bg-[var(--berry)] px-7 py-4 text-xs font-bold text-white transition hover:-translate-y-1">▣ اتصال فيديو</button></div></div></div>}
      {callState !== "idle" && <div className="relative min-h-[520px] overflow-hidden rounded-2xl bg-black/30">{audioOnly ? <div className="absolute inset-0 grid place-items-center"><audio ref={remoteAudioRef} autoPlay /><div className="text-center"><span className="animate-heart mx-auto grid size-32 place-items-center rounded-full bg-[var(--berry)] text-5xl">♥</span><h2 className="mt-6 font-display text-4xl font-bold">{callState === "calling" ? "جاري الاتصال…" : "متصلين الآن"}</h2></div></div> : <video ref={remoteVideoRef} autoPlay playsInline className="absolute inset-0 h-full w-full object-cover" />}<div className="absolute bottom-4 right-4 z-10 h-36 w-28 overflow-hidden rounded-2xl border-2 border-white/25 bg-[#2d222d] shadow-xl sm:h-48 sm:w-36">{mode === "video" || sharing ? <video ref={localVideoRef} autoPlay muted playsInline className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-3xl">♥</div>}</div><div className="absolute inset-x-0 bottom-5 z-20 flex justify-center gap-2"><button onClick={toggleMute} className={`grid size-12 place-items-center rounded-full ${muted ? "bg-red-500" : "bg-white/15 backdrop-blur"}`} aria-label="كتم المايك">{muted ? "⊘" : "♩"}</button>{mode === "video" && <button onClick={toggleCamera} className={`grid size-12 place-items-center rounded-full ${cameraOff ? "bg-red-500" : "bg-white/15 backdrop-blur"}`} aria-label="إيقاف الكاميرا">▣</button>}<button onClick={() => void shareScreen()} disabled={sharing || callState !== "connected"} className="grid size-12 place-items-center rounded-full bg-white/15 backdrop-blur disabled:opacity-35" aria-label="مشاركة الشاشة">▱</button><button onClick={() => void endCall()} className="grid h-12 w-16 place-items-center rounded-full bg-red-500 text-xl" aria-label="إنهاء الاتصال">⌕</button></div></div>}
      {notice && <p className="absolute inset-x-5 top-5 z-30 rounded-xl bg-amber-400/90 px-4 py-3 text-center text-[10px] font-bold text-black">{notice}</p>}
    </div>
    <AnimatePresence>{incoming && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-40 grid place-items-center bg-black/80 p-5 backdrop-blur-xl"><motion.div initial={{ y: 20, scale: .95 }} animate={{ y: 0, scale: 1 }} className="w-full max-w-sm rounded-[2rem] bg-[var(--cream)] p-8 text-center text-[var(--ink)]"><span className="animate-heart mx-auto grid size-20 place-items-center rounded-full bg-[var(--berry)] text-3xl text-white">♥</span><p className="mt-5 text-[10px] text-black/40">اتصال {incoming.mode === "video" ? "فيديو" : "صوتي"} وارد من</p><h2 className="mt-2 font-display text-4xl font-bold">{incoming.name}</h2><div className="mt-7 grid grid-cols-2 gap-3"><button onClick={() => void decline()} className="rounded-2xl bg-red-100 py-4 text-xs font-bold text-red-700">رفض</button><button onClick={() => void answerOffer(incoming, true)} className="rounded-2xl bg-emerald-500 py-4 text-xs font-bold text-white">قبول</button></div></motion.div></motion.div>}</AnimatePresence>
  </div>;
}
