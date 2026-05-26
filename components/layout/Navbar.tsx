"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import Logo from "@/components/ui/Logo";

const links = [
  { href: "#about", label: "О нас" },
  { href: "#services", label: "Услуги" },
  { href: "#advantages", label: "Преимущества" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#booking", label: "Запись" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-border/70 bg-bg/80 shadow-sm backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="container-shell flex items-center justify-between gap-4 py-4">
        <a href="#top" aria-label="Art of Paradise" className="shrink-0">
          <Logo />
        </a>

        <nav
          aria-label="Основная навигация"
          className="hidden items-center gap-7 md:flex"
        >
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#booking"
            className="inline-flex items-center justify-center rounded-sm border border-primary px-5 py-3 font-body text-[13px] font-medium uppercase tracking-[0.12em] text-primary transition-all duration-200 hover:bg-primary hover:text-inverse"
          >
            Записаться
          </a>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-sm border border-border bg-surface/80 p-2.5 text-text md:hidden"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-text/30 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25 }}
              className="ml-auto flex h-full w-[82%] max-w-sm flex-col gap-8 bg-surface-2 px-6 py-6 shadow-lg"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <Logo compact />
                <button
                  type="button"
                  aria-label="Закрыть меню"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center rounded-sm border border-border p-2.5"
                >
                  <X size={20} />
                </button>
              </div>

              <nav
                aria-label="Мобильная навигация"
                className="flex flex-col gap-5"
              >
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-body text-[13px] font-medium uppercase tracking-[0.12em] text-text"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <a
                href="#booking"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center rounded-sm bg-primary px-5 py-3 font-body text-[13px] font-medium uppercase tracking-[0.12em] text-inverse"
              >
                Записаться на приём
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
