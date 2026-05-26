type LogoProps = {
  compact?: boolean;
  inverse?: boolean;
};

export default function Logo({ compact = false, inverse = false }: LogoProps) {
  const textClass = inverse ? "text-inverse" : "text-text";
  const ringStroke = inverse ? "rgba(248, 240, 229, 0.74)" : "rgba(127, 74, 36, 0.72)";
  const fillColor = inverse ? "#f8f0e5" : "#7f4a24";

  return (
    <div className={`inline-flex items-center gap-3 ${textClass}`}>
      <svg
        width={compact ? 34 : 44}
        height={compact ? 34 : 44}
        viewBox="0 0 44 44"
        fill="none"
        aria-hidden="true"
        className="logo-mark rounded-[12px]"
      >
        <rect x="1.5" y="1.5" width="41" height="41" rx="12" stroke="currentColor" strokeOpacity="0.18" />
        <circle cx="22" cy="22" r="15.2" stroke={ringStroke} strokeWidth="1.3" />
        <path
          d="M14.2 27.9V16.1h3.84c2.92 0 4.71 1.34 4.71 3.72 0 2.58-1.92 3.95-4.86 3.95h-1.5v4.13h-2.19Zm2.19-5.93h1.32c1.82 0 2.8-.62 2.8-2.07 0-1.41-.98-1.93-2.8-1.93h-1.32v4Zm7.77 5.93V16.1h2.15v4.84h.39l3.75-4.84h2.54l-4.5 5.62 4.75 6.18h-2.66l-3.91-5.17h-.36v5.17h-2.15Z"
          fill={fillColor}
        />
        <path
          d="M16.5 31.2c1.72-1.04 3.54-1.56 5.46-1.56 1.96 0 3.82.52 5.58 1.56"
          stroke={ringStroke}
          strokeWidth="1.15"
          strokeLinecap="round"
        />
        <path d="M18.1 28.9h7.8" stroke={ringStroke} strokeWidth="1.15" strokeLinecap="round" />
      </svg>
      <div className="leading-none">
        <p className="font-display text-2xl font-light tracking-[0.03em]">
          Art of Paradise
        </p>
        {!compact ? (
          <p className="mt-1 font-body text-[11px] uppercase tracking-[0.22em] text-current/60">
            Beauty Salon Moscow
          </p>
        ) : null}
      </div>
    </div>
  );
}
