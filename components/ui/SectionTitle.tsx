type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionTitleProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow ? (
        <p className="mb-4 font-body text-[11px] font-light uppercase tracking-[0.22em] text-muted">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-4xl font-light italic leading-[1.08] tracking-[-0.01em] md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base font-light leading-relaxed text-muted">{description}</p>
      ) : null}
    </div>
  );
}
