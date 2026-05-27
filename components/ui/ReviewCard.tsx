import { motion } from "framer-motion";

type ReviewCardProps = {
  author: string;
  text: string;
};

function Stars() {
  return (
    <div className="flex items-center gap-1 text-primary">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2.75 14.85 8.52l6.37.93-4.61 4.5 1.09 6.35L12 17.3 6.3 20.3l1.09-6.35-4.61-4.5 6.37-.93L12 2.75Z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewCard({ author, text }: ReviewCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="review-card w-[85vw] max-w-sm rounded-lg border border-border/80 border-t-2 border-t-primary bg-surface-2 p-6 shadow-sm md:w-auto md:max-w-none"
    >
      <div className="space-y-5">
        <p className="font-display text-xl font-light leading-relaxed text-text/80 md:text-2xl">
          {text}
        </p>
        <Stars />
        <p className="font-body text-base font-light uppercase tracking-[0.12em] text-muted">
          {author}
        </p>
      </div>
    </motion.article>
  );
}
