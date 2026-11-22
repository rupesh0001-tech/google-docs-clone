import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
};

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--ink)] text-white hover:bg-[#2a2e38] shadow-[0_10px_28px_rgba(22,24,29,0.18)]",
  secondary:
    "bg-[var(--accent)] text-white hover:bg-[#185447] shadow-[0_10px_28px_rgba(31,107,92,0.25)]",
  ghost: "bg-transparent text-[var(--ink)] hover:bg-black/[0.04]",
  outline:
    "bg-transparent text-[var(--ink)] border border-[var(--line)] hover:bg-black/[0.03]",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-[14px]",
  lg: "h-12 px-6 text-[15px]",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  href,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-transform duration-300 ease-[var(--spring)] hover:scale-[1.03] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
    variantClass[variant],
    sizeClass[size],
    className,
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
