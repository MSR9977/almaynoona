"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const photos = [
  { src: "/images/love-photo.jpeg", title: "الحلوة في كل حالاتها", className: "md:row-span-2" },
  { src: "/images/love-close.jpg", title: "ضحكة تشبه العيد", className: "" },
  { src: "/images/love-full.png", title: "ملونة مثل أيامنا", className: "" },
  { src: "/images/love-detail.png", title: "تفاصيل ما تنسى", className: "md:col-span-2" },
];

export function StoryGallery() {
  const [selected, setSelected] = useState<(typeof photos)[number] | null>(null);
  return (
    <>
      <div className="grid auto-rows-[350px] gap-3 md:grid-cols-2">
        {photos.map((photo, index) => (
          <motion.button key={photo.src} type="button" onClick={() => setSelected(photo)} className={`group relative overflow-hidden bg-white/5 text-right ${photo.className}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }}>
            <Image src={photo.src} alt={photo.title} fill sizes="(max-width:768px) 100vw, 50vw" className="object-contain transition duration-700 group-hover:scale-105" />
            <span className="absolute inset-x-0 bottom-0 flex items-center gap-4 bg-gradient-to-t from-black/90 to-transparent p-6 pt-20 text-white"><b className="text-[10px] text-white/50">0{index + 1}</b><strong className="font-display text-2xl">{photo.title}</strong><i className="mr-auto text-xl not-italic">↗</i></span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {selected && <motion.div className="fixed inset-0 z-[80] grid place-items-center bg-black/90 p-4 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}><button className="absolute left-5 top-5 grid size-12 place-items-center rounded-full border border-white/30 text-2xl text-white" aria-label="إغلاق">×</button><motion.figure initial={{ scale: .94, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .94 }} onClick={(event) => event.stopPropagation()} className="m-0 text-center"><Image src={selected.src} alt={selected.title} width={1000} height={1000} className="max-h-[78vh] w-auto object-contain" /><figcaption className="mt-4 font-display text-2xl font-bold text-white">{selected.title}</figcaption></motion.figure></motion.div>}
      </AnimatePresence>
    </>
  );
}
