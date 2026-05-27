"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { AdvantagesAmbientDecor } from "@/components/ui/SectionVisuals";

const advantages = [
  { value: "Ежедневно до 23:00", label: "Режим работы" },
  { value: "5.0 рейтинг",        label: "Лучший в районе" },
  { value: "Кофе и чай",         label: "Комплимент" },
  { value: "Персональный подход",label: "Каждому гостю" },
];

export default function Advantages() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="advantages"
      className="section-band section-band--mid relative overflow-hidden px-5 py-0 sm:px-6 lg:px-8"
    >
      <AdvantagesAmbientDecor />
      <div ref={ref} className="container-shell relative z-10">
        {/* Horizontal rule at top */}
        <div className="h-px w-full bg-border" />

        <div className="grid grid-cols-2 xl:grid-cols-4">
          {advantages.map((item, i) => (
            <motion.div
              key={item.value}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
              className={`flex flex-col gap-4 px-6 py-10 sm:px-8 xl:px-10 xl:py-12 ${
                i % 2 === 0 ? "border-r border-border" : ""
              } ${
                i >= 2 ? "border-t border-border xl:border-t-0" : ""
              } ${
                i < advantages.length - 1 ? "xl:border-r xl:border-border" : "xl:border-r-0"
              }`}
            >
              <p className="font-body text-[9px] font-light uppercase tracking-[0.24em] text-primary/60">
                {item.label}
              </p>
              <p className="font-display text-xl font-light leading-snug text-text md:text-[1.35rem]">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Rule at bottom */}
        <div className="h-px w-full bg-border" />
      </div>
    </section>
  );
}
