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
  coloring:         hairstyle1Img,
  "haircut-male":   hairstyle2Img,
  manicure:         manicureImg,
  gel:              manicure3Img,
  pedicure:         hairstyle4Img,
} as const;

const serviceIcons = {
  "haircut-female": Scissors,
  coloring:         Brush,
  "haircut-male":   SprayCan,
  manicure:         Hand,
  gel:              Sparkles,
  pedicure:         Footprints,
} as const;

// Easing: how fast current chases target (0 = instant, 1 = never)
// 0.07 gives a silky ~400ms feel at 60 fps
const LERP_FACTOR = 0.07;
// Auto-drift speed (px/frame) when page is idle
const AUTO_DRIFT_PX = 0.22;

export default function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef   = useRef<HTMLDivElement | null>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-10%" });

  // Refs that drive the animation loop — no re-renders needed
  const currentRef         = useRef(0);   // rendered scrollLeft
  const targetRef          = useRef(0);   // desired scrollLeft
  const userInteractingRef = useRef(false);
  const pauseTimerRef      = useRef<number | null>(null);
  const rafRef             = useRef<number>(0);

  /** Call whenever the user touches / wheels the track */
  const pauseSync = () => {
    userInteractingRef.current = true;
    if (pauseTimerRef.current !== null) window.clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = window.setTimeout(() => {
      userInteractingRef.current = false;
      // Snap target to current so drift resumes from where user left off
      targetRef.current = currentRef.current;
    }, 1200);
  };

  /** Compute target scrollLeft from vertical page progress */
  const targetFromScroll = (): number | null => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return null;

    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) return null;

    const vh        = window.innerHeight;
    const secTop    = section.getBoundingClientRect().top + window.scrollY;
    const secHeight = section.offsetHeight;
    // Section scrolls horizontally while between 75vh above and 25vh above bottom
    const start    = secTop - vh * 0.75;
    const end      = secTop + secHeight - vh * 0.25;
    const progress = Math.max(0, Math.min(1, (window.scrollY - start) / (end - start)));

    return progress * maxScroll;
  };

  useEffect(() => {
    // Initialise target/current from current scroll position
    const init = targetFromScroll();
    if (init !== null) {
      targetRef.current  = init;
      currentRef.current = init;
    }

    // Vertical scroll → update target
    const onScroll = () => {
      if (userInteractingRef.current) return;
      const t = targetFromScroll();
      if (t !== null) targetRef.current = t;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Animation loop: lerp current → target, write to DOM
    const loop = () => {
      const track = trackRef.current;
      if (track) {
        const maxScroll = track.scrollWidth - track.clientWidth;

        // Auto-drift when idle
        if (!userInteractingRef.current && maxScroll > 0) {
          const section = sectionRef.current;
          const inView  =
            section !== null &&
            section.getBoundingClientRect().top    < window.innerHeight &&
            section.getBoundingClientRect().bottom > 0;

          if (inView) {
            targetRef.current += AUTO_DRIFT_PX;
            // Loop back to start when we reach the end
            if (targetRef.current > maxScroll) {
              targetRef.current  = 0;
              currentRef.current = 0;
            }
          }
        }

        // Lerp
        currentRef.current += (targetRef.current - currentRef.current) * LERP_FACTOR;

        // Only write to DOM when meaningfully different (avoids forced layout)
        const diff = Math.abs(currentRef.current - track.scrollLeft);
        if (diff > 0.25) {
          track.scrollLeft = currentRef.current;
        }
      }

      rafRef.current = window.requestAnimationFrame(loop);
    };

    rafRef.current = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (pauseTimerRef.current !== null) window.clearTimeout(pauseTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          // Pause sync on any user interaction with the track
          onPointerDown={pauseSync}
          onWheel={pauseSync}
          onTouchStart={pauseSync}
          // Keep target in sync if user manually scrolls the track
          onScroll={() => {
            const track = trackRef.current;
            if (track && userInteractingRef.current) {
              targetRef.current  = track.scrollLeft;
              currentRef.current = track.scrollLeft;
            }
          }}
          aria-label="Панель услуг"
        >
          {SERVICES.slice(0, 6).map((service, i) => {
            const Media = serviceMedia[service.id as keyof typeof serviceMedia];
            const Icon  = serviceIcons[service.id as keyof typeof serviceIcons];
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
