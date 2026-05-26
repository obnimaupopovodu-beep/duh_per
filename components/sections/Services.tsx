"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import SectionTitle from "@/components/ui/SectionTitle";
import { SERVICE_DESCRIPTIONS, SERVICES } from "@/lib/constants";

export default function Services() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="services"
      className="section-band section-band--dark px-5 py-28 sm:px-6 lg:px-8"
    >
      <div className="container-shell space-y-14">
        <SectionTitle
          eyebrow="Услуги"
          title="Что мы делаем"
          description="От точной стрижки до деликатного ухода — каждая услуга собрана вокруг эстетики, комфорта и индивидуального подхода."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid gap-px bg-border md:grid-cols-2 xl:grid-cols-3"
        >
          {SERVICES.slice(0, 6).map((service, i) => (
            <motion.article
              key={service.id}
              variants={{
                hidden:  { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="service-card group flex flex-col justify-between gap-8"
            >
              {/* Number */}
              <span className="font-body text-[10px] font-light uppercase tracking-[0.22em] text-primary/50">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="space-y-3">
                <h3 className="font-display text-2xl font-light leading-tight text-text">
                  {service.name}
                </h3>
                <p className="text-sm font-light leading-relaxed text-muted">
                  {SERVICE_DESCRIPTIONS[service.id]}
                </p>
              </div>

              <p className="font-body text-[11px] font-light uppercase tracking-[0.18em] text-primary">
                {service.price}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
