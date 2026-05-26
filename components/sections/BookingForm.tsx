"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import { BOOKING_SERVICE_OPTIONS } from "@/lib/constants";
import {
  type BookingFormData,
  bookingSchema,
} from "@/lib/booking.schema";

// Floating-label underline field wrapper
function FloatField({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="float-field">
      {children}
      <label htmlFor={id}>{label}</label>
      <span className="float-field__line" />
      {error ? <p className="float-field__error">{error}</p> : null}
    </div>
  );
}

export default function BookingForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submittedName, setSubmittedName] = useState("");
  const [showMobileCta, setShowMobileCta] = useState(true);

  useEffect(() => {
    const element = document.getElementById("booking");
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowMobileCta(!entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { service: "haircut-female", preferredTime: "", comment: "" },
  });

  const onSubmit = async (data: BookingFormData) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Request failed");
      setSubmittedName(data.name);
      setStatus("success");
      reset();
    } catch {
      setSubmittedName(getValues("name"));
      setStatus("error");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[2px] border border-[var(--color-line-soft)] bg-surface p-8 md:p-10"
      >
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex min-h-[480px] flex-col items-center justify-center text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-[2px] border border-[var(--color-line)] text-primary">
                <Check size={24} />
              </div>
              <h3 className="mt-6 font-display text-4xl font-light italic">
                Ваша заявка принята
              </h3>
              <p className="mt-4 max-w-md text-muted">
                {submittedName ? `${submittedName}, ` : ""}
                мы свяжемся с вами в ближайшее время, чтобы подтвердить запись и
                подобрать удобное окно.
              </p>
              <Button type="button" variant="outline" className="mt-8" href="#top">
                Вернуться наверх
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-7"
            >
              <div className="grid gap-7 md:grid-cols-2">
                <FloatField id="name" label="Имя *" error={errors.name?.message}>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    className="float-field__input"
                    placeholder=" "
                    {...register("name")}
                  />
                </FloatField>

                <FloatField id="phone" label="Телефон *" error={errors.phone?.message}>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    className="float-field__input"
                    placeholder=" "
                    {...register("phone")}
                  />
                </FloatField>
              </div>

              <div className="grid gap-7 md:grid-cols-2">
                <FloatField id="service" label="Услуга" error={errors.service?.message}>
                  <select
                    id="service"
                    className="float-field__input float-field__select"
                    {...register("service")}
                  >
                    {BOOKING_SERVICE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </FloatField>

                <FloatField id="preferredTime" label="Удобное время">
                  <input
                    id="preferredTime"
                    type="text"
                    className="float-field__input"
                    placeholder=" "
                    {...register("preferredTime")}
                  />
                </FloatField>
              </div>

              <FloatField id="comment" label="Комментарий" error={errors.comment?.message}>
                <textarea
                  id="comment"
                  rows={4}
                  className="float-field__input float-field__textarea"
                  placeholder=" "
                  {...register("comment")}
                />
              </FloatField>

              {status === "error" ? (
                <p className="border border-[var(--color-line)] px-4 py-3 text-sm text-text">
                  Не удалось отправить заявку. Позвоните нам напрямую:
                  +7 (926) 153-23-43.
                </p>
              ) : null}

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="hover:-translate-y-0.5 hover:shadow-md"
                >
                  {status === "loading" ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 size={14} className="animate-spin" />
                      Отправляем
                    </span>
                  ) : (
                    "Записаться"
                  )}
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {showMobileCta ? (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--color-line-soft)] bg-bg/90 p-4 backdrop-blur-sm md:hidden"
          >
            <Button href="#booking" className="w-full">
              Записаться
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
