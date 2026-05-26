"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import Button from "@/components/ui/Button";

import entranceImage from "@/img/enterence.webp";

export default function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section id="top" ref={ref} className="luxury-hero">
      {/* Parallax background */}
      <div className="luxury-hero__bg">
        <motion.div
          style={{ y: yBg }}
          className="absolute inset-[-10%] will-change-transform"
        >
          <Image
            src={entranceImage}
            alt="Интерьер салона Art of Paradise"
            priority
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </div>

      {/* Gradient overlay */}
      <div className="luxury-hero__overlay" />

      {/* Content — pinned to bottom */}
      <div className="container-shell relative z-10 pb-16 pt-40">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 flex items-center gap-4 font-body text-[10px] font-light uppercase tracking-[0.28em] text-primary/80"
          >
            <span className="block h-px w-10 bg-primary/60" />
            Премиальный салон красоты · Москва
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(3.6rem,9vw,8.5rem)] font-light leading-[0.9] tracking-[-0.02em] text-text"
          >
            <span className="block">Искусство</span>
            <span className="block italic text-text/80">быть красивой</span>
          </motion.h1>

          {/* Sub + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
          >
            <p className="max-w-xs text-sm font-light leading-relaxed text-text/60">
              Пространство тёплого минимализма на Тульской. Стрижка, окрашивание и уход — тихий ритуал для себя.
            </p>
            <Button href="#booking" variant="primary">
              Записаться
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.75 }}
            className="mt-14 flex items-center gap-8 border-t border-white/10 pt-8"
          >
            {[
              { value: "5.0", label: "Рейтинг" },
              { value: "412", label: "Оценок" },
              { value: "до 23:00", label: "Ежедневно" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-light text-primary">{stat.value}</p>
                <p className="mt-1 font-body text-[10px] uppercase tracking-[0.18em] text-text/40">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 right-8 z-10 hidden md:block"
      >
        <p className="[writing-mode:vertical-rl] font-body text-[9px] uppercase tracking-[0.24em] text-text/30">
          Scroll
        </p>
      </motion.div>
    </section>
  );
}
