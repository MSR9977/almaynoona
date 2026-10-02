import type { Metadata } from "next";
import { LegalAiDashboard } from "@/components/legal-ai-dashboard";

export const metadata: Metadata = {
  title: "مكتبها الذكي | المساعد القانوني",
  description: "مساحة خاصة للبحث والصياغة والتحليل القانوني.",
};

export default function LegalAiPage() {
  return <LegalAiDashboard />;
}
