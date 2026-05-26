"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import SectionTitle from "@/components/ui/SectionTitle";

import outsideLogoImage from "@/img/logofromoutside.webp";

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inViewRef  = useRef<HTMLDivElement | null>(null);
  const isInView   = useInView(inViewRef, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-band section-band--lift px-5 py-28 sm:px-6 lg:px-8"
    >
      <div
        ref={inViewRef}
        className="container-shell grid gap-16 md:grid-cols-[55fr_45fr] md:items-center"
      >
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10"
        >
          <SectionTitle
            eyebrow="О салоне"
            title="Наша история"
            description="Art of Paradise вырос из простой идеи: премиальный сервис может быть тихим, искренним и очень человеческим."
          />

          <div className="space-y-5 text-sm font-light leading-relaxed text-muted">
            <p>
              Я хотел создать место, куда хочется возвращаться не только за результатом,
              но и за ощущением покоя. Поэтому у нас всё строится вокруг внимания
              к человеку: от первой чашки кофе до финального взгляда в зеркало.
            </p>
            <p>
              Наша команда работает в ритме большого города, но без суеты. Здесь можно
              записаться после рабочего дня, спокойно обсудить образ и выйти с ощущением,
              что о вас действительно позаботились.
            </p>
          </div>

          {/* Blockquote */}
          <blockquote className="border-l border-primary/50 pl-6">
            <p className="font-display text-2xl font-light italic leading-snug text-text/80 md:text-3xl">
              Мы создали пространство, где вы чувствуете себя, как дома — только ещё красивее.
            </p>
            <footer className="mt-4 font-body text-[10px] uppercase tracking-[0.2em] text-primary/70">
              — Артур, основатель
            </footer>
          </blockquote>
        </motion.div>

        {/* Image with parallax */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-[480px] overflow-hidden image-frame"
        >
          <motion.div style={{ y: yImg }} className="absolute inset-[-8%] will-change-transform">
            <Image
              src={outsideLogoImage}
              alt="Вывеска и входная зона салона Art of Paradise"
              fill
              sizes="(max-width: 768px) 100vw, 42vw"
              className="object-cover"
            />
          </motion.div>
          {/* Gold corner accent */}
          <div className="pointer-events-none absolute left-0 top-0 h-12 w-px bg-gradient-to-b from-primary/60 to-transparent" />
          <div className="pointer-events-none absolute left-0 top-0 h-px w-12 bg-gradient-to-r from-primary/60 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
