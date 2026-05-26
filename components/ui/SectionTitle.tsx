type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: SectionTitleProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <p className="section-eyebrow">
          <span className="gold-rule" />
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-4xl font-light italic leading-[1.06] tracking-[-0.01em] md:text-5xl ${
          light ? "text-inverse" : "text-text"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base font-light leading-relaxed text-muted">{description}</p>
      )}
    </div>
  );
}
