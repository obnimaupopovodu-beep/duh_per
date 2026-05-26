"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import SectionTitle from "@/components/ui/SectionTitle";

import outsideLogoImage from "@/img/logofromoutside.webp";

export default function About() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="about"
      className="section-band section-band--warm px-5 py-24 sm:px-6 lg:px-8"
    >
      <div
        ref={ref}
        className="container-shell grid gap-10 md:grid-cols-[60fr_40fr] md:items-start"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <SectionTitle
            eyebrow="О салоне"
            title="Наша история"
            description="Art of Paradise вырос из простой идеи: премиальный сервис может быть тихим, искренним и очень человеческим."
          />

          <div className="space-y-5 text-muted">
            <p>
              Я хотел создать место, куда хочется возвращаться не только за
              результатом, но и за ощущением покоя. Поэтому у нас всё строится
              вокруг внимания к человеку: от первой чашки кофе до финального
              взгляда в зеркало.
            </p>
            <p>
              Наша команда работает в ритме большого города, но без суеты.
              Здесь можно записаться после рабочего дня, спокойно обсудить
              образ и выйти с ощущением, что о вас действительно позаботились.
            </p>
            <p>
              Для многих гостей салон стал почти родным домом. И это, наверное,
              самая точная оценка того, каким Art of Paradise мы задумывали с
              самого начала.
            </p>
          </div>

          <div className="border-l-[3px] border-primary pl-6">
            <p className="font-display text-2xl font-light italic leading-snug md:text-3xl">
              Мы создали пространство, где вы чувствуете себя, как дома —
              только ещё красивее.
            </p>
            <p className="mt-4 text-sm uppercase tracking-[0.12em] text-muted">
              — Артур, основатель
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="image-frame relative min-h-[400px] overflow-hidden rounded-[24px] bg-surface-off"
        >
          {/* TODO: заменить на реальное фото команды или интерьера */}
          <Image
            src={outsideLogoImage}
            alt="Вывеска и входная зона салона Art of Paradise"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
