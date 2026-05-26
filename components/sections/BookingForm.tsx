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

const fieldGroupClass = "space-y-2";

export default function BookingForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
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
    defaultValues: {
      service: "haircut-female",
      preferredTime: "",
      comment: "",
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setStatus("loading");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

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
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7 }}
        className="rounded-[24px] border border-border/80 bg-surface p-6 shadow-lg md:p-8"
      >
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex min-h-[480px] flex-col items-center justify-center text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary-highlight text-primary">
                <Check size={28} />
              </div>
              <h3 className="mt-6 font-display text-4xl font-light italic">
                Ваша заявка принята
              </h3>
              <p className="mt-4 max-w-md text-muted">
                {submittedName ? `${submittedName}, ` : ""}
                мы свяжемся с вами в ближайшее время, чтобы подтвердить запись и
                подобрать удобное окно.
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-8"
                href="#top"
              >
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
              className="space-y-5"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <div className={fieldGroupClass}>
                  <label htmlFor="name" className="text-sm text-muted">
                    Имя*
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    className="field-base"
                    {...register("name")}
                  />
                  {errors.name ? (
                    <p className="text-sm text-primary">{errors.name.message}</p>
                  ) : null}
                </div>

                <div className={fieldGroupClass}>
                  <label htmlFor="phone" className="text-sm text-muted">
                    Телефон*
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    className="field-base"
                    {...register("phone")}
                  />
                  {errors.phone ? (
                    <p className="text-sm text-primary">{errors.phone.message}</p>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className={fieldGroupClass}>
                  <label htmlFor="service" className="text-sm text-muted">
                    Услуга
                  </label>
                  <select id="service" className="field-base" {...register("service")}>
                    {BOOKING_SERVICE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.service ? (
                    <p className="text-sm text-primary">{errors.service.message}</p>
                  ) : null}
                </div>

                <div className={fieldGroupClass}>
                  <label htmlFor="preferredTime" className="text-sm text-muted">
                    Удобное время
                  </label>
                  <input
                    id="preferredTime"
                    type="text"
                    placeholder="например, будни после 18:00"
                    className="field-base"
                    {...register("preferredTime")}
                  />
                </div>
              </div>

              <div className={fieldGroupClass}>
                <label htmlFor="comment" className="text-sm text-muted">
                  Комментарий
                </label>
                <textarea
                  id="comment"
                  rows={5}
                  className="field-base min-h-[140px] resize-y"
                  {...register("comment")}
                />
                {errors.comment ? (
                  <p className="text-sm text-primary">{errors.comment.message}</p>
                ) : null}
              </div>

              {status === "error" ? (
                <p className="rounded-md border border-primary/20 bg-primary-highlight px-4 py-3 text-sm text-text">
                  Не удалось отправить заявку. Попробуйте ещё раз или позвоните
                  нам напрямую по номеру +7 (926) 153-23-43.
                </p>
              ) : null}

              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full"
              >
                {status === "loading" ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Отправляем
                  </span>
                ) : (
                  "Отправить заявку"
                )}
              </Button>
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
            className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-bg/90 p-4 backdrop-blur-sm md:hidden"
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
