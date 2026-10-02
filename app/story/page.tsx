import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { StoryGallery } from "@/components/story-gallery";

export const metadata: Metadata = { title: "حكايتنا" };

export default function StoryPage() {
  return (
    <main className="pt-24 sm:pt-36">
      <section className="relative overflow-hidden py-26 sm:py-36">
        <div className="absolute -left-20 top-0 size-96 rounded-full bg-[var(--pink)]/30 blur-3xl" />
        <div className="page-shell relative grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow mb-5">صفحات من أيامنا</p>
            <h1 className="display-title text-4xl sm:text-5xl">
يالله نسوي كستنا
                    <br />
              <span className="text-[var(--berry)] m-15 ">ونشرب أسير  .. ونسولف مع بعض  </span>
            <br />
            
              <span className="text-[var(--berry)] mb-4"> ونحلب بعض  لي النهاية</span>
            
            </h1>
            <p className="mt-7 max-w-lg text-sm leading-8 text-black/55">
               جزء بسيط من شعور أكبر من
              الكلام.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative mx-auto max-w-xl">
              <div className="absolute inset-10 rounded-full bg-[var(--orange)]" />
              <Image
                src="/images/love-close.jpg"
                width={2000}
                height={2000}
                priority
                alt="لحظة مرحة من حكايتنا"
                className="animate-floaty relative h-[550px] w-full object-contain"
              />
            </div>
          </Reveal>
        </div>
      </section>
      <section className="bg-[#241b25] py-24 text-white sm:py-36">
        <div className="page-shell">
          <Reveal className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-5 !text-[var(--pink)]">ألبومنا الصغير</p>
              <h2 className="display-title text-6xl sm:text-8xl">
                لحظات تستحق
                <br />
                <span className="text-[var(--pink)]">أن تبقى</span>
              </h2>
            </div>
            <p className="max-w-sm text-xs leading-7 text-white/50">
              اضغطي على أي صورة وشوفيها بحجم أكبر، لأن التفاصيل الحلوة ما تنشاف
              من بعيد.
            </p>
          </Reveal>
          <StoryGallery />
        </div>
      </section>
      <section className="page-shell grid items-center gap-16 py-28 lg:grid-cols-2 lg:py-40">
        <Reveal>
          <div className="relative">
            <div className="absolute inset-8 -rotate-6 bg-[var(--pink)]" />
            <Image
              src="/images/love-full.png"
              width={2000}
              height={2000}
              alt="حبيبة دنيتي"
              className="relative h-[620px] w-full object-contain"
            />
            <span className="absolute bottom-10 left-0 right-110 -rotate-6 font-display text-4xl font-bold text-[var(--berry)]">
              أجمل إنثانـة في الكون  ♥
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow mb-5">هالحجي</p>
          <h2 className="display-title text-6xl sm:text-8xl">
            إلى حبيبتي
            <br />
            <span className="text-[var(--berry)]">الملحة " الله المستعان بس "</span>
          </h2>
          <div className="mt-8 space-y-5 text-sm leading-8 text-black/60">
            <p>
              يمكن الكلام ما يوسف كل اللي أحسه، لكن أبيج تعرفين إن سسسسدفه أجمل كل السسسدف .
            </p>
            <p>
              وعلشان هالحجي أهديج أغنية سدفه ومن بين كل الناس علقني 
              
            </p>
            <p>
              بعدين بافهمج معنات كلمة علقني .
            </p>
          </div>
          <div className="mt-8">
            <span className=" mb-6 block text-xs text-black/40">بلاليطة حياتي ،</span>
            <strong className=" mt-22 font-display text-5xl text-[var(--berry)]">
              شيخ القبيلة محمد 
              
          </strong>
          </div>
        </Reveal>
      </section>
      <section className="bg-[var(--berry)] px-5 py-24 text-center text-white">
        <Reveal>
          <p className="mb-4 text-xs text-white/60">
          مانخلصة
          </p>
          <h2 className="display-title text-5xl sm:text-7xl">
            يلا 0تعالي نخوره ونتنمر على البشر 
          </h2>
          <Link
            href="/chat"
            className="mt-7 inline-flex rounded-full bg-white px-7 py-4 text-xs font-bold text-[var(--berry)] transition hover:-translate-y-1 hover:bg-[var(--pink)]"
          >
           روحي للدردشة الحية ياحيه ← 
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
