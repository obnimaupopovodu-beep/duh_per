"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import ServiceCard from "@/components/ui/ServiceCard";
import SectionTitle from "@/components/ui/SectionTitle";
import { SERVICE_DESCRIPTIONS, SERVICES } from "@/lib/constants";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

export default function Services() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="services"
      className="section-band px-5 py-24 sm:px-6 lg:px-8"
    >
      <div className="container-shell space-y-12">
        <SectionTitle
          eyebrow="Услуги"
          title="Что мы делаем"
          description="От точной стрижки до деликатного ухода — каждая услуга собрана вокруг эстетики, комфорта и индивидуального подхода."
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
        >
          {SERVICES.slice(0, 6).map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className={index === 0 ? "md:col-span-2 xl:col-span-2" : ""}
            >
              <ServiceCard
                service={service}
                description={SERVICE_DESCRIPTIONS[service.id]}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
