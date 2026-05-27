"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import SectionTitle from "@/components/ui/SectionTitle";
import { ReviewsAmbientDecor } from "@/components/ui/SectionVisuals";

import hairstyle2Img from "@/img/hairstyle2.webp";

const reviews = [
  {
    author: "Мария В.",
    role:   "Постоянный гость",
    text:   "Каждый визит здесь ощущается как возвращение в знакомое и очень красивое место. Артур умеет тонко почувствовать образ.",
  },
  {
    author: "Дмитрий К.",
    role:   "Постоянный гость",
    text:   "Для меня это лучший салон рядом с домом: можно спокойно приехать после работы и не торопиться даже поздним вечером.",
  },
  {
    author: "Анна С.",
    role:   "Постоянный гость",
    text:   "Елена встречает с такой теплотой, что настроение становится лучше ещё до начала процедуры. Атмосфера действительно особенная.",
  },
];

export default function Reviews() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="reviews"
      className="section-band section-band--lift relative overflow-hidden px-5 py-28 sm:px-6 lg:px-8"
    >
      <ReviewsAmbientDecor />
      <div className="container-shell relative z-10 space-y-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <SectionTitle
              eyebrow="Отзывы"
              title="Что говорят гости"
            />
          </div>
          <div className="relative h-[180px] w-full max-w-md shrink-0 overflow-hidden rounded-sm border border-primary/15 lg:h-[220px] lg:max-w-sm">
            <Image
              src={hairstyle2Img}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 22rem"
              className="object-cover object-[center_30%]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--color-surface)] via-[var(--color-surface)]/40 to-transparent" />
          </div>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="reviews-track md:grid md:grid-cols-3 md:gap-7 md:overflow-visible"
        >
          {reviews.map((review) => (
            <div key={review.author} className="review-card flex flex-col justify-between gap-10 md:w-auto">
              {/* Quote mark */}
              <svg width="24" height="18" viewBox="0 0 24 18" fill="none" aria-hidden="true">
                <path
                  d="M0 18V10.8C0 4.68 3.36 1.08 10.08 0l1.44 2.16C7.92 3 6.12 5.04 5.76 8.4H10.08V18H0Zm13.92 0V10.8C13.92 4.68 17.28 1.08 24 0l1.44 2.16C21.84 3 20.04 5.04 19.68 8.4H24V18H13.92Z"
                  fill="currentColor"
                  className="text-primary/25"
                />
              </svg>

              <p className="font-display text-xl font-light leading-relaxed text-text/80 md:text-[1.375rem]">
                {review.text}
              </p>

              <div>
                <p className="font-body text-base font-light text-text">{review.author}</p>
                <p className="mt-1 font-body text-[10px] uppercase tracking-[0.18em] text-primary/60">{review.role}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
