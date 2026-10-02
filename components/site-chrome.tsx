"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { MusicPlayer } from "@/components/music-player";

export function SiteChrome() {
  const pathname = usePathname();
  if (pathname === "/login") return null;
  return <><Header /><MusicPlayer /></>;
}
