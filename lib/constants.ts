import type { BookingServiceValue, Service } from "@/types/booking";

export const SERVICES: Service[] = [
  { id: "haircut-female", name: "Женская стрижка", price: "от 2 000 ₽" },
  { id: "haircut-male", name: "Мужская стрижка", price: "от 1 500 ₽" },
  { id: "coloring", name: "Окрашивание", price: "от 10 000 ₽" },
  { id: "manicure", name: "Маникюр + покрытие", price: "от 3 000 ₽" },
  { id: "gel", name: "Покрытие гель-лак", price: "от 2 000 ₽" },
  { id: "pedicure", name: "Педикюр", price: "по прайсу" },
  { id: "cosmetology", name: "Косметология", price: "по прайсу" },
  { id: "brows", name: "Брови & Ресницы", price: "по прайсу" },
  { id: "depilation", name: "Депиляция", price: "по прайсу" },
];

export const SERVICE_DESCRIPTIONS: Record<Service["id"], string> = {
  "haircut-female":
    "Мягкая архитектура формы, внимание к текстуре и укладке, которая работает в вашем ритме.",
  "haircut-male":
    "Точная мужская стрижка без спешки, с акцентом на аккуратность линий и комфорт.",
  coloring:
    "Контуринг, тонкое осветление и сложный цвет, который подчёркивает вашу естественность.",
  manicure:
    "Уход за руками и стойкое покрытие в спокойной, чистой эстетике.",
  gel:
    "Бережное покрытие с аккуратной формой и оттенками, которые легко вписываются в образ.",
  pedicure:
    "Комфортный уход и педикюр по прайсу, собранный под ваш запрос и сезон.",
  cosmetology:
    "Деликатные процедуры ухода за кожей для свежести, сияния и восстановленного тонуса.",
  brows:
    "Архитектура бровей и ресниц, которая делает образ собранным без лишней графичности.",
  depilation:
    "Аккуратная и тактичная процедура с вниманием к комфорту и чистому результату.",
};

export const BOOKING_SERVICE_OPTIONS: {
  value: BookingServiceValue;
  label: string;
}[] = [
  { value: "haircut-female", label: "Стрижка" },
  { value: "coloring", label: "Окрашивание" },
  { value: "manicure", label: "Маникюр" },
  { value: "pedicure", label: "Педикюр" },
  { value: "cosmetology", label: "Косметология" },
  { value: "brows", label: "Брови/Ресницы" },
  { value: "depilation", label: "Депиляция" },
  { value: "other", label: "Другое" },
];
