import type { Metadata } from "next";
import { Aref_Ruqaa, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/site-chrome";

const kufi = Noto_Kufi_Arabic({ subsets: ["arabic"], variable: "--font-kufi", display: "swap" });
const ruqaa = Aref_Ruqaa({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-ruqaa", display: "swap" });

export const metadata: Metadata = {
  title: { default: "حبيبة دنيتي", template: "%s | حبيبة دنيتي" },
  description: "مساحة خاصة صنعت بكل الحب — حكايات، صور، ورسائل بين قلبين.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" data-scroll-behavior="smooth">
      <body className={`${kufi.variable} ${ruqaa.variable} paper-noise`}>
        <SiteChrome />
        {children}
      </body>
    </html>
  );
}
