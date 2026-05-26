"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Clock3, MapPinned, Phone } from "lucide-react";
import { useRef } from "react";

import SectionTitle from "@/components/ui/SectionTitle";

import entranceAltImage from "@/img/enterence1.webp";

const contactItems = [
  {
    icon: MapPinned,
    label: "Адрес",
    value: "Москва, Духовской переулок, 17с10",
  },
  {
    icon: Phone,
    label: "Телефон",
    value: "+7 (926) 153-23-43",
    href: "tel:+79261532343",
  },
  {
    icon: Clock3,
    label: "Часы",
    value: "Ежедневно до 23:00",
  },
];

export default function Contacts() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="space-y-8"
    >
      <SectionTitle
        eyebrow="Запись"
        title="Запишитесь на приём"
        description="Оставьте заявку — свяжемся в течение часа и подберём удобное время визита."
      />

      <div className="space-y-5">
        {contactItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-lg border border-border/70 bg-surface p-5 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <Icon className="mt-1 text-primary" size={18} />
                <div>
                  <p className="font-body text-[13px] uppercase tracking-[0.12em] text-muted">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a href={item.href} className="mt-2 block text-text hover:text-primary">
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-2 text-text">{item.value}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <a
        href="https://yandex.ru/maps/-/CHdEbB~w"
        target="_blank"
        rel="noreferrer"
        className="block overflow-hidden rounded-[22px] border border-border/70 bg-surface shadow-md"
      >
        <div className="relative min-h-[260px]">
          {/* TODO: заменить на реальный фрагмент карты или фото входа */}
          <Image
            src={entranceAltImage}
            alt="Вход в салон рядом с картой проезда"
            fill
            sizes="(max-width: 1024px) 100vw, 35vw"
            className="object-cover"
          />
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-border/70 px-5 py-4">
          <div>
            <p className="font-body text-[13px] uppercase tracking-[0.12em] text-muted">
              Яндекс.Карты
            </p>
            <p className="text-sm text-text">Открыть маршрут до салона</p>
          </div>
          <span className="font-body text-[13px] uppercase tracking-[0.12em] text-primary">
            Смотреть
          </span>
        </div>
      </a>
    </motion.div>
  );
}
