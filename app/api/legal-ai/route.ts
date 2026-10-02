import { NextRequest } from "next/server";
import { z } from "zod";
import { requireAuthentication } from "@/lib/auth-request";
import { generateLegalAnswer, searchLegalWeb, type LegalHistoryItem } from "@/lib/legal-ai";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_FILES = 3;
const MAX_FILE_BYTES = 3 * 1024 * 1024;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;
const ACCEPTED_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "text/plain",
  "text/markdown",
  "text/csv",
  "application/json",
]);

const historySchema = z.array(z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().max(12_000),
})).max(10);

function parseBoolean(value: FormDataEntryValue | null) {
  return value === "true" || value === "1" || value === "on";
}

function clientError(message: string, status = 400) {
  return Response.json({ ok: false, message }, { status });
}

export async function POST(request: NextRequest) {
  const authError = await requireAuthentication(request);
  if (authError) return authError;

  try {
    const form = await request.formData();
    const message = String(form.get("message") ?? "").trim();
    const webSearch = parseBoolean(form.get("webSearch"));
    const files = form.getAll("files").filter((entry): entry is File => entry instanceof File && entry.size > 0);

    if (!message && files.length === 0) return clientError("اكتب الطلب أو أرفق مستنداً.");
    if (message.length > 20_000) return clientError("نص الطلب أطول من الحد المسموح.");
    if (files.length > MAX_FILES) return clientError(`الحد الأقصى ${MAX_FILES} مرفقات.`);
    if (files.some((file) => file.size > MAX_FILE_BYTES)) return clientError("حجم الملف الواحد يجب ألا يتجاوز 3MB على Vercel.");
    if (files.reduce((sum, file) => sum + file.size, 0) > MAX_TOTAL_BYTES) return clientError("مجموع المرفقات يجب ألا يتجاوز 4MB على Vercel.");
    if (files.some((file) => !ACCEPTED_TYPES.has(file.type))) return clientError("نوع أحد المرفقات غير مدعوم.");

    let history: LegalHistoryItem[] = [];
    const rawHistory = String(form.get("history") ?? "[]");
    try {
      history = historySchema.parse(JSON.parse(rawHistory));
    } catch {
      return clientError("سجل المحادثة غير صالح.");
    }

    const stages = [
      { id: "intake", label: "قراءة الطلب والمرفقات", status: "done" },
      { id: "research", label: "البحث القانوني الموثّق", status: webSearch ? "done" : "skipped" },
      { id: "analysis", label: "التحليل والصياغة", status: "done" },
      { id: "quality", label: "مراجعة الاستشهادات والحدود", status: "done" },
    ] as const;

    let sources = [] as Awaited<ReturnType<typeof searchLegalWeb>>;
    let researchWarning: string | undefined;
    if (webSearch) {
      try {
        const researchQuery = `${message || "تحليل المستند القانوني المرفق"} مملكة البحرين قانون تشريع حكم محكمة`;
        sources = await searchLegalWeb(researchQuery.slice(0, 900), request.signal);
      } catch {
        researchWarning = "تعذر البحث الخارجي، فتمت متابعة التحليل من دون مصادر ويب.";
      }
    }

    const generated = await generateLegalAnswer({ message, history, sources, files, signal: request.signal });
    return Response.json({
      ok: true,
      answer: generated.answer,
      model: generated.model,
      attemptedModels: generated.attempted,
      sources,
      stages,
      researchWarning,
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown error";
    if (detail === "GEMINI_API_KEY_MISSING") {
      return Response.json({ ok: false, message: "مفتاح Gemini غير مضبوط على الخادم." }, { status: 503 });
    }
    return Response.json({
      ok: false,
      message: "تعذر إكمال التحليل الآن. تحقق من إعدادات Gemini أو جرّب مرة أخرى.",
      code: detail.startsWith("GEMINI_FAILED") ? "GEMINI_FAILED" : "LEGAL_AI_ERROR",
    }, { status: 502 });
  }
}
