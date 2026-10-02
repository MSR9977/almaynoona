import { NextRequest, NextResponse } from "next/server";
import { requireAuthentication } from "@/lib/auth-request";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface TenorFormat {
  url?: string;
}

interface TenorResult {
  id?: string;
  title?: string;
  content_description?: string;
  media_formats?: Record<string, TenorFormat>;
}

interface TenorResponse {
  results?: TenorResult[];
}

function isTenorMediaUrl(value: string | undefined): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "media.tenor.com";
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const unauthorized = await requireAuthentication(request);
  if (unauthorized) return unauthorized;

  const apiKey = process.env.TENOR_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "أضيفي TENOR_API_KEY إلى إعدادات البيئة لتفعيل البحث." },
      { status: 503 },
    );
  }

  const query = request.nextUrl.searchParams.get("q")?.trim().slice(0, 80) || "love";
  const isSticker = request.nextUrl.searchParams.get("type") === "sticker";
  const tenorUrl = new URL("https://tenor.googleapis.com/v2/search");
  const gifFormats = isSticker
    ? "tinygif_transparent,gif_transparent"
    : "tinygif,gif";
  tenorUrl.searchParams.set("key", apiKey);
  tenorUrl.searchParams.set("client_key", "almaynoona");
  tenorUrl.searchParams.set("q", query);
  tenorUrl.searchParams.set("limit", "18");
  tenorUrl.searchParams.set("country", "BH");
  tenorUrl.searchParams.set("locale", "ar_BH");
  tenorUrl.searchParams.set("contentfilter", "medium");
  tenorUrl.searchParams.set("media_filter", gifFormats);
  if (isSticker) tenorUrl.searchParams.set("searchfilter", "sticker,-static");

  try {
    const response = await fetch(tenorUrl, {
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error("[tenor:search] Tenor returned an error", {
        status: response.status,
      });
      return NextResponse.json(
        { error: "تعذر تحميل نتائج Tenor الآن." },
        { status: 502 },
      );
    }

    const data = (await response.json()) as TenorResponse;
    const results = (data.results ?? []).flatMap((result) => {
      const formats = result.media_formats;
      const previewFormat = isSticker
        ? formats?.tinygif_transparent?.url
        : formats?.tinygif?.url;
      const shareFormat = isSticker
        ? formats?.gif_transparent?.url
        : formats?.gif?.url;
      const shareUrl = shareFormat ?? previewFormat;
      const previewUrl = previewFormat ?? shareUrl;
      if (
        !result.id ||
        !isTenorMediaUrl(shareUrl) ||
        !isTenorMediaUrl(previewUrl)
      ) {
        return [];
      }

      return [
        {
          id: result.id,
          title: result.content_description || result.title || "GIF من Tenor",
          previewUrl,
          shareUrl,
        },
      ];
    });

    return NextResponse.json({ results });
  } catch (error) {
    console.error("[tenor:search] Request failed", {
      name: error instanceof Error ? error.name : "UnknownError",
    });
    return NextResponse.json(
      { error: "تعذر الاتصال بخدمة Tenor." },
      { status: 502 },
    );
  }
}
