"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Clock3, Compass, MapPin, Phone } from "lucide-react";
import { useRef } from "react";

import SectionTitle from "@/components/ui/SectionTitle";

import entranceAltImage from "@/img/enterence1.webp";

const contactItems = [
  { icon: MapPin, label: "Адрес",        value: "Москва, Духовской переулок, 17с10" },
  { icon: Phone,  label: "Телефон",      value: "+7 (926) 153-23-43", href: "tel:+79261532343" },
  { icon: Clock3, label: "Часы работы",  value: "Ежедневно до 23:00" },
];

export default function Contacts() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-10"
    >
      <SectionTitle
        eyebrow="Запись"
        title="Запишитесь на приём"
        description="Оставьте заявку — свяжемся в течение часа и подберём удобное время."
      />

      <div className="space-y-0">
        {contactItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={item.label}>
              {i > 0 && <hr className="border-0 border-t border-border/50" />}
              <div className="flex items-start gap-4 py-5">
                <Icon size={14} className="mt-0.5 shrink-0 text-primary/60" strokeWidth={1.5} />
                <div className="min-w-0 flex-1">
                  <p className="font-body text-[9px] font-light uppercase tracking-[0.22em] text-muted">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a href={item.href} className="mt-1.5 block text-sm text-text transition-colors hover:text-primary">
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1.5 text-sm text-text">{item.value}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Map card */}
      <a
        href="https://yandex.ru/maps/-/CHdEbB~w"
        target="_blank"
        rel="noreferrer"
        className="group block overflow-hidden border border-border transition-all duration-400 hover:border-primary/30 hover:shadow-lg"
      >
        <div className="relative min-h-[200px]">
          <Image
            src={entranceAltImage}
            alt="Вход в салон рядом с картой проезда"
            fill
            sizes="(max-width: 1024px) 100vw, 35vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="flex items-center justify-between gap-4 bg-surface px-5 py-4">
          <div>
            <p className="font-body text-[9px] font-light uppercase tracking-[0.22em] text-primary/60">Яндекс.Карты</p>
            <p className="mt-1 text-sm font-light text-text">Открыть маршрут до салона</p>
          </div>
          <Compass size={16} strokeWidth={1.5} className="shrink-0 text-muted transition-colors duration-300 group-hover:text-primary" />
        </div>
      </a>
    </motion.div>
  );
}
