import { Instagram } from "lucide-react";

import Logo from "@/components/ui/Logo";
import { SERVICES } from "@/lib/constants";

const navLinks = [
  { href: "#about", label: "О нас" },
  { href: "#services", label: "Услуги" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#booking", label: "Запись" },
];

export default function Footer() {
  return (
    <footer className="bg-dark-bg text-dark-text">
      <div className="container-shell grid gap-12 py-16 md:grid-cols-[1.2fr_0.8fr_1fr_1fr]">
        <div className="space-y-5">
          <Logo inverse />
          <p className="max-w-sm text-sm text-dark-text/75">
            Тёплое пространство красоты в центре Москвы, где каждая запись
            ощущается как тихий ритуал заботы о себе.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex items-center justify-center text-dark-text transition-colors hover:text-primary"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://vk.com"
              target="_blank"
              rel="noreferrer"
              aria-label="ВКонтакте"
              className="inline-flex items-center justify-center text-dark-text transition-colors hover:text-primary"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12.785 16.241s.289-.032.437-.193c.136-.146.131-.419.131-.419s-.019-1.279.576-1.467c.587-.185 1.34 1.235 2.139 1.78.604.413 1.062.322 1.062.322l2.136-.03s1.117-.069.587-.948c-.043-.071-.311-.654-1.603-1.851-1.35-1.251-1.169-1.049.457-3.219.991-1.322 1.387-2.129 1.264-2.475-.117-.329-.837-.242-.837-.242l-2.405.015s-.178-.024-.309.054c-.127.075-.208.249-.208.249s-.381 1.013-.888 1.875c-1.07 1.821-1.498 1.918-1.673 1.805-.407-.263-.305-1.057-.305-1.621 0-1.762.267-2.498-.52-2.689-.261-.064-.454-.106-1.123-.113-.859-.009-1.585.004-1.997.206-.274.135-.484.435-.355.453.159.021.52.097.71.354.247.333.238 1.08.238 1.08s.141 2.074-.329 2.332c-.322.177-.764-.184-1.715-1.838-.487-.847-.855-1.786-.855-1.786s-.071-.169-.198-.259c-.155-.109-.372-.144-.372-.144l-2.286.015s-.343.009-.469.16c-.112.134-.009.411-.009.411s1.79 4.189 3.817 6.298c1.86 1.935 3.969 1.808 3.969 1.808h.956Z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-body text-[13px] font-medium uppercase tracking-[0.12em] text-dark-text/70">
            Навигация
          </h3>
          <div className="space-y-3 text-sm text-dark-text/85">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="block hover:text-primary">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-body text-[13px] font-medium uppercase tracking-[0.12em] text-dark-text/70">
            Услуги
          </h3>
          <div className="space-y-3 text-sm text-dark-text/85">
            {SERVICES.slice(0, 6).map((service) => (
              <p key={service.id}>{service.name}</p>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-body text-[13px] font-medium uppercase tracking-[0.12em] text-dark-text/70">
            Контакты
          </h3>
          <div className="space-y-3 text-sm text-dark-text/85">
            <p>Москва, Духовской переулок, 17с10</p>
            <a href="tel:+79261532343" className="block hover:text-primary">
              +7 (926) 153-23-43
            </a>
            <p>Ежедневно до 23:00</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-shell flex flex-col gap-3 py-5 text-sm text-dark-text/65 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Art of Paradise</p>
          <a href="#booking" className="hover:text-primary">
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
}
