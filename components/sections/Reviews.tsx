"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import ReviewCard from "@/components/ui/ReviewCard";
import SectionTitle from "@/components/ui/SectionTitle";

const reviews = [
  {
    author: "Мария В.",
    text: "Каждый визит здесь ощущается как возвращение в знакомое и очень красивое место. Артур умеет тонко почувствовать образ.",
  },
  {
    author: "Дмитрий К.",
    text: "Для меня это лучший салон рядом с домом: можно спокойно приехать после работы и не торопиться даже поздним вечером.",
  },
  {
    author: "Анна С.",
    text: "Елена встречает с такой теплотой, что настроение становится лучше ещё до начала процедуры. Атмосфера действительно особенная.",
  },
];

export default function Reviews() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="reviews"
      className="section-band section-band--warm px-5 py-24 sm:px-6 lg:px-8"
    >
      <div className="container-shell space-y-12">
        <SectionTitle
          eyebrow="Отзывы"
          title="Что говорят наши гости"
          description="О салоне чаще всего говорят не только как о сервисе, а как о месте, куда хочется возвращаться за ощущением уюта и красоты."
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="reviews-track md:grid md:grid-cols-3 md:gap-5 md:overflow-visible"
        >
          {reviews.map((review) => (
            <ReviewCard
              key={review.author}
              author={review.author}
              text={review.text}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
