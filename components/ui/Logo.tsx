type LogoProps = {
  compact?: boolean;
  inverse?: boolean;
};

export default function Logo({ compact = false, inverse = false }: LogoProps) {
  const textColor  = inverse ? "#0d0c0b" : "#e8e0d4";
  const goldColor  = "#c9a84c";
  const ringStroke = inverse ? "rgba(13,12,11,0.4)" : "rgba(201,168,76,0.45)";

  return (
    <div className="inline-flex items-center gap-3" style={{ color: textColor }}>
      <svg
        width={compact ? 32 : 40}
        height={compact ? 32 : 40}
        viewBox="0 0 44 44"
        fill="none"
        aria-hidden="true"
        className="logo-mark"
      >
        <rect x="1.5" y="1.5" width="41" height="41" rx="2" stroke={ringStroke} strokeWidth="1" />
        <circle cx="22" cy="22" r="15.2" stroke={goldColor} strokeWidth="0.8" strokeOpacity="0.5" />
        <path
          d="M14.2 27.9V16.1h3.84c2.92 0 4.71 1.34 4.71 3.72 0 2.58-1.92 3.95-4.86 3.95h-1.5v4.13h-2.19Zm2.19-5.93h1.32c1.82 0 2.8-.62 2.8-2.07 0-1.41-.98-1.93-2.8-1.93h-1.32v4Zm7.77 5.93V16.1h2.15v4.84h.39l3.75-4.84h2.54l-4.5 5.62 4.75 6.18h-2.66l-3.91-5.17h-.36v5.17h-2.15Z"
          fill={goldColor}
        />
        <path
          d="M16.5 31.2c1.72-1.04 3.54-1.56 5.46-1.56 1.96 0 3.82.52 5.58 1.56"
          stroke={goldColor}
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeOpacity="0.5"
        />
      </svg>
      <div className="leading-none">
        <p className="font-display text-xl font-light tracking-[0.06em]" style={{ color: textColor }}>
          Art of Paradise
        </p>
        {!compact && (
          <p className="mt-1 font-body text-[9px] uppercase tracking-[0.28em]" style={{ color: goldColor, opacity: 0.7 }}>
            Beauty Salon
          </p>
        )}
      </div>
    </div>
  );
}
