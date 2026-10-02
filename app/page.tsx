import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SnakeGame } from "@/components/snake-game";

export default function HomePage() {
  return (
    <main>
      <section className="relative min-h-screen overflow-hidden pt-28">
        <div className="absolute inset-x-0 top-0 -z-10 h-3/4 bg-[radial-gradient(circle_at_75%_35%,rgba(238,170,192,.5),transparent_35%),linear-gradient(140deg,rgba(238,170,192,.2),transparent_55%)]" />
        <div className="page-shell grid min-h-[calc(100vh-7rem)] items-center gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal className="z-10 text-center lg:text-right">
            <p className="eyebrow mb-5 justify-center lg:justify-start"></p>
            <h1 className="display-title text-[clamp(2rem,6vw,5rem)]">الحكاية .. إنك أجمل<br /><span className="text-[var(--berry)]">من تفاصيل الحكاية</span></h1>
            <p className="mx-auto mt-7 max-w-xl text-sm leading-8 text-black/60 lg:mx-0">
وإنك أكبر من كلامي .. وكل ما تكتب يدي
كل يوم أحبك إنتي .. من البداية للبداية
أبتدي بك .. وابتدي بك .. وابتدي بك وابتدي.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start"><Link href="/story" className="rounded-full bg-[var(--berry)] px-7 py-4 text-xs font-bold text-white shadow-xl shadow-rose-950/20 transition hover:-translate-y-1">ابدئي الحكاية ←</Link><Link href="/chat" className="rounded-full border border-black/15 bg-white/30 px-7 py-4 text-xs font-bold transition hover:-translate-y-1 hover:bg-white">تعالي نتكلم ♥</Link></div>
          </Reveal>
          <Reveal delay={.1} className="relative flex min-h-[560px] items-end justify-center">
            <div className="absolute top-[10%] size-[min(65vw,500px)] rounded-full bg-[var(--orange)] shadow-[0_30px_90px_rgba(223,86,61,.25)]" />
            <div className="absolute top-[12%] size-[min(80vw,600px)] animate-spin-slow rounded-full border border-[var(--berry)]/20" />
            <span className="absolute right-[5%] top-[25%] z-20 rotate-6 bg-[var(--berry)] px-5 py-3 font-display text-xl font-bold text-white shadow-[8px_8px_0_var(--yellow)]">يا حلوة</span>
            <Image src="/images/love-full.png" width={2000} height={2000} priority alt="حبيبة دنيتي بإطلالة ملونة" className="animate-floaty relative z-10 h-[min(72vh,700px)] w-auto object-contain drop-shadow-2xl" />
          </Reveal>
        </div>
      </section>

      <section className="-rotate-1 scale-[1.02] overflow-hidden bg-[var(--berry)] py-4 text-white"><div className="animate-marquee flex w-max gap-10 whitespace-nowrap font-display text-2xl"><span>من لقى مثل وجهه !</span><span>مالقى مثل عينه  ✦</span><span>ومن يشوف العيون ✦</span><span>الناعسه ماجهلها ♥ </span><span>✦✦✦✦</span><span>أبشر من عيوني الثنتين ♥</span><span>مثلك تلبى مطاليبه ✦</span><span>والقلب مايسكنه شخصين ♥</span><span>واحد ويكفيني تعذيبه  ✦</span><span>✦✦✦✦</span></div></section>

      <section className="page-shell py-28 sm:py-40">
        <Reveal><p className="eyebrow mb-5 !text-4xl "> ♥️</p><h2 className="display-title max-w-3xl text-6xl sm:text-8xl">تفاصيلك<br /></h2> <h2 className=" mt-10 display-title max-w-3xl text-6xl sm:text-6xl"><span className="text-[var(--berry)]">إهي ضعفي </span><br /><span className="text-[var(--berry)]">لا تسأل ليـش !! </span></h2></Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {[{n:"01",icon:"☀",title:"حنانك",text: "المكان الوحيد اللي أحس فيه أن الدنيا مهما تعبت، لسه فيها أمان كثير. "},{n:"02",icon:"♥",title:"ضحكتك",text:"هي الشيء اللي يغيّر شكل اليوم كله، ويخلّي كل شيء أخف وأحلى ."},{n:"03",icon:"✦",title:"هيبتك وطيب أصلك",text:"الحلوة والدعله .. هي بالضبط الشيء اللي ما يتكرر مرتين."}].map((card,index)=><Reveal key={card.n} delay={index*.08}><article className={`group min-h-80 border border-black/10 p-8 transition duration-300 hover:-translate-y-3 hover:soft-shadow ${index===1?"bg-[var(--berry)] text-white md:translate-y-8":"bg-white/50"}`}><div className="flex justify-between text-xs opacity-50"><span>{card.n}</span><span className={`text-3xl ${index===1?"text-[var(--pink)]":"text-[var(--coral)]"}`}>{card.icon}</span></div><h3 className="mt-24 font-display text-4xl font-bold">{card.title}</h3><p className="mt-3 text-xs leading-7 opacity-65">{card.text}</p></article></Reveal>)}
        </div>
      </section>

      <section className="bg-[#241b25] py-28 text-white">
        <div className="page-shell grid items-center gap-12 lg:grid-cols-2">
          <Reveal><div className="relative mx-auto max-w-lg"><div className="absolute -inset-4 rotate-3 bg-[var(--pink)]" /><Image src="/images/love-close.jpg" width={2000} height={2000} alt="صورة مرحة بنظارة النجوم" className="relative h-[600px] w-full object-contain" /></div></Reveal>
          <Reveal delay={.1}><p className="eyebrow mb-5 !text-[var(--pink)]">المكان الخاص فينا</p><h2 className="display-title text-6xl sm:text-7xl">دش و فضفضلي</h2><br /><h2 className="display-title mt-4 text-4xl sm:text-6xl"><span className="text-[var(--pink)]">جعل محد يدش غيرك ♥</span></h2><p className="mt-6 max-w-lg text-sm leading-8 text-white/55">رسائلنا وسورنا وكل شي في مكان واحد، عندج السالفة.</p><Link href="/chat" className="mt-8 inline-flex rounded-full bg-white px-7 py-4 text-xs font-bold text-[var(--berry)] transition hover:-translate-y-1 hover:bg-[var(--pink)]">افتحي الدردشة الحية ←</Link></Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--berry)] py-28 text-white sm:py-40"><div className="page-shell"><SnakeGame /></div></section>
      <footer className="flex flex-col items-center justify-between gap-4 bg-[#241b25] px-6 py-12 text-center text-white sm:flex-row sm:px-20"><span className="font-display text-2xl font-bold"><i className="not-italic text-[var(--pink)]">♥</i> حبيبة دنيتي</span><p className="text-[10px] text-white/40">صنعت بكل الحب، لشخص يستحق كل الحب.</p></footer>
    </main>
  );
}
