import type { Metadata } from "next";
import { BahrainLogosGallery } from "@/components/bahrain-logos-gallery";

export const metadata: Metadata = {
  title: "شعارات البحرين",
  description: "دليل مصنف لشعارات الجهات والمؤسسات في مملكة البحرين.",
};

export default function BahrainLogosPage() {
  return (
    <main dir="rtl" className="min-h-screen px-4 pb-20 pt-32 sm:px-6">
      <div className="page-shell">
        <header className="mb-8 text-center">
          <p className="eyebrow justify-center">دليل بصري</p>
          <h1 className="display-title mt-4 text-5xl sm:text-7xl">
            شعارات <span className="text-[var(--berry)]">البحرين</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-black/55">
            تصفّح الشعارات حسب المجال، أو ابحث عن جهة محددة. اضغط على أي تصنيف لعرض محتواه.
          </p>
        </header>
        <BahrainLogosGallery />
      </div>
    </main>
  );
}
