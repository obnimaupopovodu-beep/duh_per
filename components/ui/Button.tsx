import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";

type BaseProps = {
  variant?: "primary" | "ghost";
  children: React.ReactNode;
  className?: string;
};

type ButtonProps  = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type AnchorProps  = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement>  & { href: string };
type Props = ButtonProps | AnchorProps;

const variants = {
  primary:
    "border border-primary/70 bg-transparent text-primary hover:bg-primary hover:text-inverse",
  ghost:
    "border border-border text-text/60 hover:border-text/30 hover:text-text",
};

const base =
  "inline-flex items-center justify-center px-7 py-3 font-body text-[11px] font-light uppercase tracking-[0.18em] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary";

export default function Button({ variant = "primary", children, className = "", href, ...rest }: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (href) {
    return (
      <a href={href} className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
