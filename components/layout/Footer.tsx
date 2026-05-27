import { Instagram } from "lucide-react";

import Logo from "@/components/ui/Logo";
import { SERVICES } from "@/lib/constants";

const navLinks = [
  { href: "#about",    label: "О нас" },
  { href: "#services", label: "Услуги" },
  { href: "#reviews",  label: "Отзывы" },
  { href: "#booking",  label: "Запись" },
];

export default function Footer() {
  return (
    <footer className="bg-bg border-t border-border">
      {/* Top rule with gold accent */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, var(--color-primary) 40%, transparent)" }} />

      <div className="container-shell grid gap-12 py-16 md:grid-cols-[1.4fr_0.7fr_1fr_1fr]">
        <div className="space-y-6">
          <Logo />
          <p className="max-w-sm text-base font-light leading-relaxed text-muted md:text-[1.07rem]">
            Тёплое пространство красоты в центре Москвы, где каждая запись ощущается как тихий ритуал.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-muted transition-colors hover:text-primary"
            >
              <Instagram size={16} strokeWidth={1.5} />
            </a>
            <a
              href="https://vk.com"
              target="_blank"
              rel="noreferrer"
              aria-label="ВКонтакте"
              className="text-muted transition-colors hover:text-primary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.785 16.241s.289-.032.437-.193c.136-.146.131-.419.131-.419s-.019-1.279.576-1.467c.587-.185 1.34 1.235 2.139 1.78.604.413 1.062.322 1.062.322l2.136-.03s1.117-.069.587-.948c-.043-.071-.311-.654-1.603-1.851-1.35-1.251-1.169-1.049.457-3.219.991-1.322 1.387-2.129 1.264-2.475-.117-.329-.837-.242-.837-.242l-2.405.015s-.178-.024-.309.054c-.127.075-.208.249-.208.249s-.381 1.013-.888 1.875c-1.07 1.821-1.498 1.918-1.673 1.805-.407-.263-.305-1.057-.305-1.621 0-1.762.267-2.498-.52-2.689-.261-.064-.454-.106-1.123-.113-.859-.009-1.585.004-1.997.206-.274.135-.484.435-.355.453.159.021.52.097.71.354.247.333.238 1.08.238 1.08s.141 2.074-.329 2.332c-.322.177-.764-.184-1.715-1.838-.487-.847-.855-1.786-.855-1.786s-.071-.169-.198-.259c-.155-.109-.372-.144-.372-.144l-2.286.015s-.343.009-.469.16c-.112.134-.009.411-.009.411s1.79 4.189 3.817 6.298c1.862 1.935 3.97 1.808 3.97 1.808h.955Z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="space-y-5">
          <h3 className="font-body text-[9px] font-light uppercase tracking-[0.26em] text-primary/70">
            Навигация
          </h3>
          <div className="space-y-4 text-base font-light text-muted">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="block transition-colors hover:text-text">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <h3 className="font-body text-[9px] font-light uppercase tracking-[0.26em] text-primary/70">
            Услуги
          </h3>
          <div className="space-y-4 text-base font-light text-muted">
            {SERVICES.slice(0, 5).map((service) => (
              <p key={service.id}>{service.name}</p>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <h3 className="font-body text-[9px] font-light uppercase tracking-[0.26em] text-primary/70">
            Контакты
          </h3>
          <div className="space-y-4 text-base font-light text-muted">
            <p>Москва, Духовской переулок, 17с10</p>
            <a href="tel:+79261532343" className="block transition-colors hover:text-text">
              +7 (926) 153-23-43
            </a>
            <p>Ежедневно до 23:00</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-shell flex flex-col gap-3 py-5 text-[11px] font-light text-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Art of Paradise</p>
          <a href="#booking" className="transition-colors hover:text-primary">
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
}
