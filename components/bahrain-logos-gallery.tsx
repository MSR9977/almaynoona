"use client";

/* Logo assets are remote images from the supplied catalog. */
/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";
import { bahrainLogoGroups } from "@/lib/bahrain-logos";

export function BahrainLogosGallery() {
  const [search, setSearch] = useState("");
  const query = search.trim().toLocaleLowerCase();
  const groups = useMemo(
    () =>
      bahrainLogoGroups
        .map((group) => ({
          ...group,
          logos: group.logos.filter((logo) =>
            `${logo.name} ${group.title}`.toLocaleLowerCase().includes(query),
          ),
        }))
        .filter((group) => group.logos.length > 0),
    [query],
  );
  const visibleCount = groups.reduce((total, group) => total + group.logos.length, 0);

  return (
    <>
      <label className="mx-auto mb-6 block w-full max-w-2xl">
        <span className="sr-only">ابحث في شعارات البحرين</span>
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="ابحث عن جهة أو شعار..."
          className="w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-sm shadow-sm outline-none transition placeholder:text-black/35 focus:border-[var(--berry)] focus:ring-4 focus:ring-[var(--pink)]/25"
        />
      </label>

      <p className="mb-4 text-center text-xs text-black/50">
        {query ? `${visibleCount} نتيجة` : `${visibleCount} شعار في ${groups.length} تصنيف`}
      </p>

      <div className="space-y-3">
        {groups.map((group, index) => (
          <details
            key={group.title}
            open={Boolean(query) || index === 0}
            className="group overflow-hidden rounded-2xl border border-black/10 bg-white/85 shadow-sm transition open:shadow-lg"
          >
            <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-4 sm:px-6">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-black/10 text-[var(--berry)] transition group-open:rotate-180">
                ⌄
              </span>
              <span className="flex-1 text-sm font-bold sm:text-base">{group.title}</span>
              <span className="rounded-full bg-[var(--cream)] px-3 py-1 text-[10px] font-bold text-black/55">
                {group.logos.length} شعار
              </span>
            </summary>
            <div className="grid grid-cols-2 gap-2 border-t border-black/8 p-3 sm:grid-cols-3 sm:gap-3 sm:p-5 lg:grid-cols-4 xl:grid-cols-6">
              {group.logos.map((logo) => (
                <article
                  key={`${logo.name}-${logo.src}`}
                  className="flex min-h-36 flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-black/8 bg-white p-3 transition hover:-translate-y-0.5 hover:border-[var(--yellow)] hover:shadow-md sm:min-h-40 sm:p-4"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    loading="lazy"
                    className="h-20 w-full object-contain sm:h-24"
                  />
                  <p className="line-clamp-2 min-h-8 text-center text-[10px] leading-4 text-black/70">
                    {logo.name}
                  </p>
                </article>
              ))}
            </div>
          </details>
        ))}
        {groups.length === 0 && (
          <div className="rounded-2xl border border-dashed border-black/15 bg-white/50 px-5 py-14 text-center text-sm text-black/50">
            ما لقينا شعارات تطابق بحثك.
          </div>
        )}
      </div>
    </>
  );
}
