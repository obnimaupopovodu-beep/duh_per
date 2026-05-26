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
    "bg-primary text-inverse hover:bg-primary-hover border border-primary shadow-sm",
  outline:
    "border border-primary text-primary hover:bg-primary hover:text-inverse",
};

export default function Button({
  children,
  className = "",
  href,
  type = "button",
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  const classes = `inline-flex min-h-12 items-center justify-center rounded-sm px-7 py-3 font-body text-[13px] font-medium uppercase tracking-[0.12em] transition-all duration-200 ${variants[variant]} ${disabled ? "cursor-not-allowed opacity-70" : ""} ${className}`;

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
