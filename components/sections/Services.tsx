"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Brush, Scissors, Sparkles, SprayCan, Footprints, Hand } from "lucide-react";
import { useEffect, useRef } from "react";

import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import { ServicesAmbientDecor } from "@/components/ui/SectionVisuals";
import { SERVICE_DESCRIPTIONS, SERVICES } from "@/lib/constants";

import hairstyleImg from "@/img/hairstyle.webp";
import hairstyle1Img from "@/img/hairstyle1.webp";
import hairstyle2Img from "@/img/hairstyle2.webp";
import hairstyle4Img from "@/img/hairstyle4.webp";
import manicureImg from "@/img/manicure.webp";
import manicure3Img from "@/img/manicure3.webp";

const serviceMedia = {
  "haircut-female": hairstyleImg,
  coloring: hairstyle1Img,
  "haircut-male": hairstyle2Img,
  manicure: manicureImg,
  gel: manicure3Img,
  pedicure: hairstyle4Img,
} as const;

const serviceIcons = {
  "haircut-female": Scissors,
  coloring: Brush,
  "haircut-male": SprayCan,
  manicure: Hand,
  gel: Sparkles,
  pedicure: Footprints,
} as const;

export default function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const lastPageScrollAtRef = useRef(0);
  const userInteractingRef = useRef(false);
  const interactionTimeoutRef = useRef<number | null>(null);

  const syncTrackToProgress = (progress: number) => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) {
      return;
    }

    track.scrollTo({
      left: Math.max(0, Math.min(maxScroll, progress * maxScroll)),
      behavior: "auto",
    });
  };

  const startInteractionPause = () => {
    userInteractingRef.current = true;

    if (interactionTimeoutRef.current !== null) {
      window.clearTimeout(interactionTimeoutRef.current);
    }

    interactionTimeoutRef.current = window.setTimeout(() => {
      userInteractingRef.current = false;
      lastPageScrollAtRef.current = performance.now();
    }, 1200);
  };

  useEffect(() => {
    const updateFromPageScroll = () => {
      const section = sectionRef.current;
      const track = trackRef.current;

      if (!section || !track || userInteractingRef.current) {
        return;
      }

      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 0) {
        return;
      }

      const viewportHeight = window.innerHeight;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const sectionHeight = section.offsetHeight;
      const start = sectionTop - viewportHeight * 0.75;
      const end = sectionTop + sectionHeight - viewportHeight * 0.25;
      const progress = Math.max(0, Math.min(1, (window.scrollY - start) / (end - start)));

      syncTrackToProgress(progress);
      lastPageScrollAtRef.current = performance.now();
    };

    let rafId = 0;
    let scrollRafId = 0;

    const loop = (time: number) => {
      const track = trackRef.current;
      const section = sectionRef.current;
      const sectionIsVisible =
        section !== null
        && section.getBoundingClientRect().bottom > 0
        && section.getBoundingClientRect().top < window.innerHeight;

      if (
        track &&
        sectionIsVisible &&
        !userInteractingRef.current &&
        time - lastPageScrollAtRef.current > 650
      ) {
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (maxScroll > 0) {
          const nextScrollLeft = track.scrollLeft + 0.18;
          track.scrollTo({
            left: nextScrollLeft > maxScroll ? 0 : nextScrollLeft,
            behavior: "auto",
          });
        }
      }

      rafId = window.requestAnimationFrame(loop);
    };

    const onScroll = () => {
      if (scrollRafId) {
        return;
      }

      scrollRafId = window.requestAnimationFrame(() => {
        scrollRafId = 0;
        updateFromPageScroll();
      });
    };

    updateFromPageScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateFromPageScroll);
    rafId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.cancelAnimationFrame(scrollRafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateFromPageScroll);
      if (interactionTimeoutRef.current !== null) {
        window.clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-band section-band--dark relative overflow-hidden px-5 py-28 sm:px-6 lg:px-8"
    >
      <ServicesAmbientDecor />

      <div className="container-shell relative z-10 space-y-14">
        <SectionTitle
          eyebrow="Услуги"
          title="Искусство вашего стиля"
          description="От точной стрижки до деликатного ухода — каждая услуга собрана вокруг эстетики, комфорта и индивидуального подхода."
          align="center"
        />

        <motion.div
          ref={trackRef}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="services-track"
          onPointerDown={startInteractionPause}
          onPointerEnter={startInteractionPause}
          onWheel={startInteractionPause}
          onTouchStart={startInteractionPause}
          onScroll={() => {
            if (userInteractingRef.current) {
              lastPageScrollAtRef.current = performance.now();
            }
          }}
          aria-label="Панель услуг"
        >
          {SERVICES.slice(0, 6).map((service, i) => {
            const Media = serviceMedia[service.id as keyof typeof serviceMedia];
            const Icon = serviceIcons[service.id as keyof typeof serviceIcons];
            return (
              <motion.article
                key={service.id}
                variants={{
                  hidden:  { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="service-tile group"
              >
                <div className="service-tile__media">
                  <Image
                    src={Media}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 88vw, 24rem"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="service-tile__overlay" />
                </div>

                <div className="service-tile__content">
                  <div className="service-tile__icon">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>

                  <p className="font-body text-[10px] uppercase tracking-[0.22em] text-primary/55">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-light leading-tight text-text">
                    {service.name}
                  </h3>
                  <p className="mt-3 text-base font-light leading-relaxed text-text/65">
                    {SERVICE_DESCRIPTIONS[service.id]}
                  </p>
                  <p className="mt-6 font-body text-[12px] uppercase tracking-[0.18em] text-primary/85">
                    {service.price}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <div className="flex items-center justify-center pt-2">
          <Button href="#booking" variant="primary" className="min-w-[260px]">
            Записаться онлайн
          </Button>
        </div>
      </div>
    </section>
  );
}
