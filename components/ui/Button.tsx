import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "outline";
  disabled?: boolean;
};

const variants = {
  primary:
    "border border-primary/60 bg-transparent text-primary hover:bg-primary hover:text-inverse hover:border-primary",
  outline:
    "border border-primary/40 text-primary bg-primary/5 hover:bg-primary hover:text-inverse hover:border-primary",
};

export default function Button({
  children,
  className = "",
  href,
  type = "button",
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  const classes = `inline-flex min-h-12 items-center justify-center rounded-[2px] px-7 py-3 font-body text-[13px] font-light uppercase tracking-[0.18em] transition-all duration-300 ${variants[variant]} ${disabled ? "cursor-not-allowed opacity-60" : ""} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
