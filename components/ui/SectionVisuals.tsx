/** Purely decorative visuals — aria-hidden, pointer-events-none */
export function ServicesAmbientDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute -right-[10%] top-[-8%] h-[min(55vw,28rem)] w-[min(55vw,28rem)] rounded-full blur-[110px]"
        style={{ background: "var(--color-shape)" }}
      />
      <div
        className="absolute -left-[15%] bottom-[5%] h-[min(45vw,22rem)] w-[min(45vw,22rem)] rounded-full blur-[100px]"
        style={{ background: "var(--color-shape-soft)" }}
      />
      {/* Outlined ellipse */}
      <div className="absolute left-[3%] top-[42%] h-48 w-72 rotate-[-18deg] rounded-[100%] border md:left-[8%]" style={{ borderColor: "var(--color-line-soft)" }} />
      <svg
        className="absolute right-[6%] top-[18%] h-32 w-32 md:h-44 md:w-44"
        viewBox="0 0 100 100"
        fill="none"
        style={{ color: "var(--color-line)" }}
      >
        <rect x="12" y="12" width="76" height="76" stroke="currentColor" strokeWidth="0.35" opacity="0.55" transform="rotate(12 50 50)" />
        <path d="M10 70C28 56 42 58 56 46C69 35 79 34 92 22" stroke="currentColor" strokeWidth="0.35" opacity="0.75" />
      </svg>
      <svg
        className="absolute bottom-[8%] right-[12%] h-40 w-40 md:h-52 md:w-52"
        viewBox="0 0 120 120"
        fill="none"
        style={{ color: "var(--color-line-soft)" }}
      >
        <path d="M10 88C28 68 45 70 58 58C72 44 85 42 108 20" stroke="currentColor" strokeWidth="0.38" opacity="0.95" />
        <path d="M0 104C24 82 40 84 56 72C74 58 91 52 120 30" stroke="currentColor" strokeWidth="0.32" opacity="0.75" />
        <circle cx="76" cy="48" r="26" stroke="currentColor" strokeWidth="0.35" opacity="0.55" />
      </svg>
    </div>
  );
}

export function AboutAmbientDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -right-32 top-1/4 h-80 w-80 rounded-full border" style={{ borderColor: "var(--color-line-soft)" }} />
      <div
        className="absolute left-[-12%] top-[8%] h-[min(40vw,240px)] w-[min(40vw,240px)] rounded-full blur-[86px]"
        style={{ background: "var(--color-shape-soft)" }}
      />
      <svg
        className="absolute bottom-[12%] left-[4%] h-36 w-36 md:h-48 md:w-48"
        viewBox="0 0 100 100"
        fill="none"
        style={{ color: "var(--color-line)" }}
      >
        <polygon points="50,8 92,92 8,92" stroke="currentColor" strokeWidth="0.4" fill="transparent" opacity="0.58" />
      </svg>
    </div>
  );
}

export function AdvantagesAmbientDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute left-1/2 top-0 h-px w-[min(90%,48rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--color-line)] to-transparent" />
      <div className="absolute right-[5%] top-1/3 h-px w-32 rotate-90 bg-gradient-to-r from-[var(--color-line)] to-transparent" />
      <div className="absolute bottom-[30%] left-[8%] h-24 w-24 rotate-45 rounded-[2px] border" style={{ borderColor: "var(--color-line-soft)" }} />
    </div>
  );
}

export function ReviewsAmbientDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute right-[-5%] top-[15%] h-[min(50vw,20rem)] w-[min(50vw,20rem)] rounded-full blur-[92px]"
        style={{ background: "var(--color-shape-soft)" }}
      />
      <svg
        className="absolute left-[2%] top-[22%] h-28 w-28 md:h-36 md:w-36"
        viewBox="0 0 100 100"
        fill="none"
        style={{ color: "var(--color-line)" }}
      >
        <path d="M20 85 Q50 15 80 85" stroke="currentColor" strokeWidth="0.45" opacity="0.7" />
        <circle cx="50" cy="38" r="6" stroke="currentColor" strokeWidth="0.35" fill="transparent" opacity="0.7" />
      </svg>
    </div>
  );
}

export function BookingAmbientDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute -left-[20%] top-1/2 h-[min(70vw,24rem)] w-[min(70vw,24rem)] -translate-y-1/2 rounded-full blur-[110px]"
        style={{ background: "var(--color-shape-soft)" }}
      />
      <div className="absolute right-[10%] top-[12%] h-20 w-20 rounded-full border" style={{ borderColor: "var(--color-line-soft)" }} />
    </div>
  );
}
