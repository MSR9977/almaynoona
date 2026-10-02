import { tavily } from "@tavily/core";
import { NextRequest } from "next/server";
import { requireAuthentication } from "@/lib/auth-request";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 45;

type NewsItem = {
  title: string;
  url: string;
  summary: string;
  image?: string;
  favicon?: string;
  publishedAt?: string;
  source: string;
};

const globalNews = globalThis as unknown as {
  bahrainNewsCache?: { expiresAt: number; items: NewsItem[]; updatedAt: string };
};

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "";
}

function hostname(url: string) {
  try { return new URL(url).hostname.replace(/^www\./, ""); }
  catch { return "مصدر إخباري"; }
}

export async function GET(request: NextRequest) {
  const unauthorized = await requireAuthentication(request);
  if (unauthorized) return unauthorized;

  const forceRefresh = request.nextUrl.searchParams.has("refresh");
  if (!forceRefresh && globalNews.bahrainNewsCache && globalNews.bahrainNewsCache.expiresAt > Date.now()) {
    return Response.json({ ok: true, cached: true, ...globalNews.bahrainNewsCache });
  }

  const apiKey = process.env.TAVILY_API_KEY?.trim();
  if (!apiKey) return Response.json({ ok: false, message: "مفتاح Tavily غير مضبوط على الخادم." }, { status: 503 });

  try {
    const client = tavily({ apiKey });
    const response = await client.search("أحدث أخبار مملكة البحرين اليوم Bahrain latest news", {
      topic: "news",
      searchDepth: "advanced",
      timeRange: "week",
      maxResults: 12,
      includeAnswer: false,
      includeRawContent: false,
      includeImages: true,
      includeImageDescriptions: true,
      includeFavicon: true,
    });
    const images = (response.images ?? [])
      .map((item) => typeof item === "string" ? item : clean((item as { url?: unknown }).url, 2_000))
      .filter((value): value is string => Boolean(value));
    const seen = new Set<string>();
    const items: NewsItem[] = [];
    for (const result of response.results ?? []) {
      const url = clean(result.url, 2_000);
      if (!url || seen.has(url)) continue;
      seen.add(url);
      const extra = result as typeof result & { publishedDate?: unknown; published_date?: unknown; favicon?: unknown };
      items.push({
        title: clean(result.title, 260) || "خبر من البحرين",
        url,
        summary: clean(result.content, 900),
        image: images[items.length % Math.max(images.length, 1)] || undefined,
        favicon: clean(extra.favicon, 2_000) || undefined,
        publishedAt: clean(extra.publishedDate ?? extra.published_date, 80) || undefined,
        source: hostname(url),
      });
    }
    const updatedAt = new Date().toISOString();
    globalNews.bahrainNewsCache = { items, updatedAt, expiresAt: Date.now() + 10 * 60_000 };
    return Response.json({ ok: true, cached: false, items, updatedAt });
  } catch (error) {
    console.error("[bahrain-news] Tavily search failed", error);
    return Response.json({ ok: false, message: "تعذر جلب أخبار البحرين الآن." }, { status: 502 });
  }
}
