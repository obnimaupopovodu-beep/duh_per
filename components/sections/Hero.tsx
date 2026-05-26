"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import Button from "@/components/ui/Button";

import entranceImage from "@/img/enterence.webp";

export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="top"
      className="luxury-hero flex items-center overflow-hidden py-10 md:py-16"
    >
      <div className="container-shell">
        <div
          ref={ref}
          className="grid items-center gap-10 md:grid-cols-[55fr_45fr] md:gap-14"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-7"
          >
            <p className="font-body text-[11px] font-light uppercase tracking-[0.2em] text-muted">
              Премиальный салон красоты в центре Москвы
            </p>
            <div className="space-y-5">
              <h1 className="font-display text-[clamp(3.5rem,8vw,7rem)] font-light leading-[0.92] tracking-[-0.01em]">
                <span className="block not-italic">Искусство</span>
                <span className="block italic">быть красивой</span>
              </h1>
              <p className="max-w-xl text-base font-light leading-relaxed text-muted">
                Пространство тёплого минимализма на Тульской, где стрижка,
                окрашивание и уход становятся тихим ритуалом для себя.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href="#booking" variant="primary">
                Записаться на приём
              </Button>
              <p className="text-sm font-light text-muted">
                Артур и команда встречают вас ежедневно до 23:00.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 font-body text-[11px] font-light uppercase tracking-[0.14em] text-muted">
              <span>5.0 рейтинг</span>
              <span aria-hidden="true">·</span>
              <span>412 оценок</span>
              <span aria-hidden="true">·</span>
              <span>Работаем до 23:00</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="image-frame relative min-h-[420px] overflow-hidden rounded-[4px] bg-surface-off"
          >
            {/* TODO: заменить на реальное фото интерьера */}
            <Image
              src={entranceImage}
              alt="Вход в салон Art of Paradise"
              priority
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,21,16,0.28),transparent_55%)]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
