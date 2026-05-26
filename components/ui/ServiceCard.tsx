import { motion } from "framer-motion";

import type { Service } from "@/types/booking";

type ServiceCardProps = {
  service: Service;
  description: string;
  className?: string;
};

export default function ServiceCard({
  service,
  description,
  className = "",
}: ServiceCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`rounded-lg border border-border/80 border-t-2 border-t-primary bg-surface p-6 shadow-sm ${className}`}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-display text-3xl font-medium leading-tight text-text">
            {service.name}
          </h3>
          <p className="max-w-sm text-sm text-muted">{description}</p>
        </div>
        <p className="font-body text-[13px] font-medium uppercase tracking-[0.12em] text-primary">
          {service.price}
        </p>
      </div>
    </motion.article>
  );
}
