"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import Logo from "@/components/ui/Logo";

const links = [
  { href: "#about",      label: "О нас" },
  { href: "#services",   label: "Услуги" },
  { href: "#advantages", label: "Преимущества" },
  { href: "#reviews",    label: "Отзывы" },
  { href: "#booking",    label: "Запись" },
];

export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = "mobile-main-menu";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border/60 bg-bg/90 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-lg"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-shell flex items-center justify-between gap-4 py-5">
        <a href="#top" aria-label="Art of Paradise" className="shrink-0">
          <Logo />
        </a>

        <nav aria-label="Основная навигация" className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#booking"
            className="inline-flex items-center justify-center border border-primary/60 px-6 py-2.5 font-body text-[11px] font-light uppercase tracking-[0.16em] text-primary transition-all duration-300 hover:bg-primary hover:text-inverse"
          >
            Записаться
          </a>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={isOpen}
          aria-controls={menuId}
          onClick={() => setIsOpen((p) => !p)}
          className="inline-flex items-center justify-center border border-border/60 bg-surface/80 p-2.5 text-text md:hidden"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id={menuId}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="ml-auto flex h-full w-[82%] max-w-sm flex-col gap-10 bg-surface px-8 py-8 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <Logo compact />
                <button
                  type="button"
                  aria-label="Закрыть меню"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center border border-border p-2.5 text-text"
                >
                  <X size={18} />
                </button>
              </div>

              <nav aria-label="Мобильная навигация" className="flex flex-col gap-7">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-body text-[12px] font-light uppercase tracking-[0.18em] text-text/70 transition-colors hover:text-text"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <a
                href="#booking"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center border border-primary/60 px-6 py-3 font-body text-[11px] font-light uppercase tracking-[0.16em] text-primary transition-all duration-300 hover:bg-primary hover:text-inverse"
              >
                Записаться на приём
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
