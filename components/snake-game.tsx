"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };
const size = 20;
const tiles = 21;

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snakeRef = useRef<Point[]>([{ x: 10, y: 10 }, { x: 11, y: 10 }, { x: 12, y: 10 }]);
  const directionRef = useRef<Point>({ x: -1, y: 0 });
  const nextDirectionRef = useRef<Point>({ x: -1, y: 0 });
  const heartRef = useRef<Point>({ x: 5, y: 10 });
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [state, setState] = useState<"ready" | "playing" | "paused" | "over">("ready");

  const draw = useCallback(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;
    context.fillStyle = "#fffaf5";
    context.fillRect(0, 0, 420, 420);
    context.fillStyle = "rgba(141,36,73,.05)";
    for (let y = 0; y < tiles; y++) for (let x = 0; x < tiles; x++) if ((x + y) % 2 === 0) context.fillRect(x * size, y * size, size, size);

    const heart = heartRef.current;
    context.save();
    context.translate(heart.x * size + 10, heart.y * size + 12);
    context.beginPath();
    context.moveTo(0, 6);context.bezierCurveTo(-14, -5, -8, -15, 0, -7);context.bezierCurveTo(8, -15, 14, -5, 0, 6);
    context.fillStyle = "#df563d";context.shadowColor = "rgba(223,86,61,.5)";context.shadowBlur = 12;context.fill();context.restore();

    snakeRef.current.forEach((segment, index) => {
      context.fillStyle = index === 0 ? "#641530" : `hsl(${338 + index * 2} 58% ${36 + Math.min(index, 8)}%)`;
      context.beginPath();context.roundRect(segment.x * size + 2, segment.y * size + 2, 16, 16, 5);context.fill();
    });
  }, []);

  const placeHeart = useCallback(() => {
    let next: Point;
    do next = { x: Math.floor(Math.random() * tiles), y: Math.floor(Math.random() * tiles) };
    while (snakeRef.current.some((part) => part.x === next.x && part.y === next.y));
    heartRef.current = next;
  }, []);

  const start = useCallback(() => {
    snakeRef.current = [{ x: 10, y: 10 }, { x: 11, y: 10 }, { x: 12, y: 10 }];
    directionRef.current = { x: -1, y: 0 };nextDirectionRef.current = { x: -1, y: 0 };
    setScore(0);placeHeart();setState("playing");draw();
  }, [draw, placeHeart]);

  const steer = useCallback((name: "up" | "down" | "left" | "right") => {
    const directions = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } };
    const next = directions[name], current = directionRef.current;
    if (next.x !== -current.x || next.y !== -current.y) nextDirectionRef.current = next;
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setBest(Number(localStorage.getItem("loveSnakeBest") || 0));
      draw();
    }, 0);
    return () => clearTimeout(timer);
  }, [draw]);
  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      const keys = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right" } as const;
      const direction = keys[event.key as keyof typeof keys];
      if (direction) { event.preventDefault();steer(direction); }
    };
    window.addEventListener("keydown", keydown);return () => window.removeEventListener("keydown", keydown);
  }, [steer]);
  useEffect(() => {
    if (state !== "playing") return;
    const timer = window.setInterval(() => {
      directionRef.current = nextDirectionRef.current;
      const head = snakeRef.current[0];
      const next = { x: head.x + directionRef.current.x, y: head.y + directionRef.current.y };
      const hit = next.x < 0 || next.x >= tiles || next.y < 0 || next.y >= tiles || snakeRef.current.some((part) => part.x === next.x && part.y === next.y);
      if (hit) { setState("over");setBest((old) => { const value = Math.max(old, score);localStorage.setItem("loveSnakeBest", String(value));return value; });return; }
      snakeRef.current.unshift(next);
      if (next.x === heartRef.current.x && next.y === heartRef.current.y) { setScore((value) => value + 1);placeHeart(); } else snakeRef.current.pop();
      draw();
    }, 115);
    return () => clearInterval(timer);
  }, [draw, placeHeart, score, state]);

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[.75fr_1.25fr]">
      <div className="text-center lg:text-right">
        <p className="eyebrow mb-5 justify-center !text-[var(--pink)] lg:justify-start">تحدّي صغير لكِ</p>
        <h2 className="display-title text-6xl sm:text-8xl">اجمعي<br /><span className="text-[var(--pink)]">كل الحب</span></h2>
        <p className="mx-auto mt-6 max-w-md text-xs leading-7 text-white/60 lg:mx-0">حرّكي الثعبان واجمعي القلوب، بس لا تصدمين بالجدار أو بنفسك.</p>
        <div className="my-7 flex justify-center gap-12 lg:justify-start"><div><span className="block text-[10px] text-white/50">النقاط</span><strong className="font-display text-4xl">{String(score).padStart(2,"0")}</strong></div><div><span className="block text-[10px] text-white/50">أفضل نتيجة</span><strong className="font-display text-4xl">{String(best).padStart(2,"0")}</strong></div></div>
        <button onClick={start} className="rounded-full bg-white px-7 py-4 text-xs font-bold text-[var(--berry)] transition hover:-translate-y-1 hover:bg-[var(--pink)]">{state === "ready" ? "ابدئي اللعبة" : "العبي من جديد"} ←</button>
      </div>
      <div className="mx-auto w-full max-w-[570px] rounded-[1.5rem] bg-[var(--cream)] p-3 soft-shadow">
        <div className="flex items-center justify-between px-2 pb-3 text-[10px] font-bold tracking-[.18em] text-[var(--berry)]"><span>SNAKE OF LOVE</span><button onClick={() => setState((value) => value === "playing" ? "paused" : value === "paused" ? "playing" : value)} className="grid size-8 place-items-center rounded-full bg-[var(--berry)]/10">{state === "paused" ? "▶" : "Ⅱ"}</button></div>
        <div className="relative"><canvas ref={canvasRef} width="420" height="420" className="aspect-square w-full rounded-xl" />{state !== "playing" && <div className="absolute inset-0 grid place-items-center bg-white/25 backdrop-blur-[2px]"><div className="text-center text-[var(--berry)]"><span className="animate-heart block text-5xl">♥</span><strong className="font-display block text-3xl">{state === "over" ? "حلوة المحاولة!" : state === "paused" ? "استراحة صغيرة" : "جاهزة؟"}</strong><small>{state === "over" ? `جمعتي ${score} قلوب` : "ابدئي من الزر"}</small></div></div>}</div>
        <div className="mx-auto mt-3 grid w-fit grid-cols-3 gap-1.5 text-[var(--berry)] sm:hidden"><button onPointerDown={() => steer("up")} className="col-start-2 size-12 rounded-xl bg-[var(--berry)]/10">↑</button><button onPointerDown={() => steer("left")} className="row-start-2 size-12 rounded-xl bg-[var(--berry)]/10">←</button><button onPointerDown={() => steer("down")} className="row-start-2 size-12 rounded-xl bg-[var(--berry)]/10">↓</button><button onPointerDown={() => steer("right")} className="row-start-2 size-12 rounded-xl bg-[var(--berry)]/10">→</button></div>
      </div>
    </div>
  );
}
