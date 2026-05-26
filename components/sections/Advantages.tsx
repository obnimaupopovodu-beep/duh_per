"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const advantages = [
  { label: "Ежедневно до 23:00", note: "Режим работы" },
  { label: "5.0 — лучший в районе", note: "Рейтинг" },
  { label: "Кофе и чай в подарок", note: "Атмосфера" },
  { label: "Индивидуальный подход", note: "Мастера" },
];

export default function Advantages() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="advantages"
      className="section-band section-band--stone px-5 py-20 sm:px-6 lg:px-8"
    >
      <div
        ref={ref}
        className="container-shell"
      >
        <div className="grid grid-cols-2 divide-x divide-y divide-[var(--color-line-soft)] border border-[var(--color-line-soft)] xl:grid-cols-4 xl:divide-y-0">
          {advantages.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{
                duration: 0.9,
                delay: index * 0.12,
              }}
              className="flex flex-col justify-between px-8 py-10 xl:px-10"
            >
              <p className="font-body text-[10px] font-light uppercase tracking-[0.2em] text-muted">
                {item.note}
              </p>
              <p className="mt-6 font-display text-xl font-light italic leading-snug text-text">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
