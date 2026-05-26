import { z } from "zod";

export const bookingServiceValues = [
  "haircut-female",
  "haircut-male",
  "coloring",
  "manicure",
  "gel",
  "pedicure",
  "cosmetology",
  "brows",
  "depilation",
  "other",
] as const;

export const bookingSchema = z.object({
  name: z.string().min(2, "Введите имя").max(100),
  phone: z
    .string()
    .min(7, "Введите номер телефона")
    .regex(/^[+7\d\s\-()]{7,}$/, "Некорректный номер"),
  service: z.enum(bookingServiceValues),
  preferredTime: z.string().max(120).optional(),
  comment: z.string().max(500).optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
