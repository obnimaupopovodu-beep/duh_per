"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Brush, Scissors, Sparkles, SprayCan, Footprints, Hand } from "lucide-react";
import { useEffect, useRef } from "react";

import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import { ServicesAmbientDecor } from "@/components/ui/SectionVisuals";
import { SERVICE_DESCRIPTIONS, SERVICES } from "@/lib/constants";

import hairstyleImg   from "@/img/hairstyle.webp";
import hairstyle1Img  from "@/img/hairstyle1.webp";
import hairstyle2Img  from "@/img/hairstyle2.webp";
import hairstyle4Img  from "@/img/hairstyle4.webp";
import manicureImg    from "@/img/manicure.webp";
import manicure3Img   from "@/img/manicure3.webp";

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

// lerp factor: 0.055 ≈ silky 500 ms feel at 60 fps
const LERP = 0.055;
// auto-drift px per frame
const DRIFT = 0.28;

export default function Services() {
  const sectionRef  = useRef<HTMLElement | null>(null);
  // viewport wrapper (overflow:hidden)
  const viewportRef = useRef<HTMLDivElement | null>(null);
  // inner strip that we translateX
  const stripRef    = useRef<HTMLDivElement | null>(null);
  const isInView    = useInView(sectionRef, { once: true, margin: "-10%" });

  const targetRef   = useRef(0);   // desired offset (px, positive = left)
  const currentRef  = useRef(0);   // rendered offset
  const pauseRef    = useRef(false);
  const pauseTimer  = useRef<number | null>(null);
  const rafRef      = useRef<number>(0);

  // ── helpers ────────────────────────────────────────────────
  const maxOffset = () => {
    const vp    = viewportRef.current;
    const strip = stripRef.current;
    if (!vp || !strip) return 0;
    return Math.max(0, strip.scrollWidth - vp.clientWidth);
  };

  const pause = () => {
    pauseRef.current = true;
    if (pauseTimer.current !== null) window.clearTimeout(pauseTimer.current);
    pauseTimer.current = window.setTimeout(() => {
      pauseRef.current  = false;
      // re-sync target so drift continues from current position
      targetRef.current = currentRef.current;
    }, 1400);
  };

  // Convert vertical scroll progress → horizontal offset
  const targetFromScroll = (): number | null => {
    const section = sectionRef.current;
    if (!section) return null;
    const max = maxOffset();
    if (max <= 0) return null;

    const vh      = window.innerHeight;
    const secTop  = section.getBoundingClientRect().top + window.scrollY;
    const secH    = section.offsetHeight;
    const start   = secTop - vh * 0.8;
    const end     = secTop + secH - vh * 0.2;
    const p       = Math.max(0, Math.min(1, (window.scrollY - start) / (end - start)));
    return p * max;
  };

  // ── touch / pointer drag on the viewport ───────────────────
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    let startX = 0;
    let startOffset = 0;

    const onPointerDown = (e: PointerEvent) => {
      pause();
      startX      = e.clientX;
      startOffset = currentRef.current;
      vp.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!vp.hasPointerCapture(e.pointerId)) return;
      const delta      = startX - e.clientX;
      const max        = maxOffset();
      targetRef.current  = Math.max(0, Math.min(max, startOffset + delta));
      currentRef.current = targetRef.current; // instant while dragging
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      pause();
      const max = maxOffset();
      targetRef.current = Math.max(0, Math.min(max, targetRef.current + e.deltaY * 0.8));
    };

    vp.addEventListener("pointerdown",  onPointerDown,  { passive: true });
    vp.addEventListener("pointermove",  onPointerMove,  { passive: true });
    vp.addEventListener("wheel",        onWheel,        { passive: false });

    return () => {
      vp.removeEventListener("pointerdown", onPointerDown);
      vp.removeEventListener("pointermove", onPointerMove);
      vp.removeEventListener("wheel",       onWheel);
    };
  }, []);

  // ── main animation loop ─────────────────────────────────────
  useEffect(() => {
    // init from current scroll
    const init = targetFromScroll();
    if (init !== null) { targetRef.current = init; currentRef.current = init; }

    const onScroll = () => {
      if (pauseRef.current) return;
      const t = targetFromScroll();
      if (t !== null) targetRef.current = t;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const loop = () => {
      const strip   = stripRef.current;
      const section = sectionRef.current;

      if (strip && section) {
        const max = maxOffset();

        // auto-drift when not paused and section is visible
        if (!pauseRef.current && max > 0) {
          const r = section.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) {
            targetRef.current += DRIFT;
            if (targetRef.current > max) {
              targetRef.current  = 0;
              currentRef.current = 0;
            }
          }
        }

        // lerp current → target
        currentRef.current += (targetRef.current - currentRef.current) * LERP;

        // write ONLY via transform — GPU compositor, no layout
        strip.style.transform = `translateX(${-currentRef.current.toFixed(3)}px)`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (pauseTimer.current !== null) window.clearTimeout(pauseTimer.current);
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

        {/* Viewport: clips overflow, handles drag/wheel */}
        <div
          ref={viewportRef}
          className="services-viewport"
          style={{ cursor: "grab" }}
          aria-label="Панель услуг"
        >
          {/* Strip: the element we translateX */}
          <motion.div
            ref={stripRef}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            className="services-strip"
            style={{ willChange: "transform" }}
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
        </div>

        <div className="flex items-center justify-center pt-2">
          <Button href="#booking" variant="primary" className="min-w-[260px]">
            Записаться онлайн
          </Button>
        </div>
      </div>
    </section>
  );
}
