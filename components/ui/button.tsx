import Link from "next/link";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const styles = {
  primary:
    "bg-premium-gold text-slate-950 hover:bg-amber-300 focus-visible:ring-premium-gold",
  secondary:
    "border border-premium-line/80 bg-premium-base/55 text-premium-mist hover:bg-premium-surface/70 focus-visible:ring-premium-cyan",
  accent:
    "bg-premium-cyan text-slate-950 hover:bg-teal-200 focus-visible:ring-premium-cyan",
  danger:
    "bg-red-500/14 text-red-100 border border-red-400/30 hover:bg-red-500/22 focus-visible:ring-red-300"
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof styles;
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60",
        styles[variant],
        className
      )}
      {...props}
    />
  );
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: keyof typeof styles;
};

export function LinkButton({ className, variant = "primary", href, children, ...props }: LinkButtonProps) {
  return (
    <Link
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2",
        styles[variant],
        className
      )}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}
