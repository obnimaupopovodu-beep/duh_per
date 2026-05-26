"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const advantages = [
  "Работаем ежедневно до 23:00",
  "Рейтинг 5.0 — лучший в районе",
  "Кофе, чай и уют в подарок",
  "Мастера с индивидуальным подходом",
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
        className="container-shell grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
      >
        {advantages.map((text, index) => (
          <motion.article
            key={text}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: index * 0.08,
            }}
            className="rounded-[18px] border border-white/45 bg-surface/65 p-6 shadow-md backdrop-blur-sm"
          >
            <p className="font-display text-6xl font-light text-primary">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-6 max-w-[16rem] text-base text-text">{text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
