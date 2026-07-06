import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "white";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-2xl font-display font-extrabold transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-gradient-to-br from-primary to-primary-dark shadow-[0_12px_28px_rgba(46,91,255,0.38)]",
  secondary:
    "text-ink bg-white border border-primary-border shadow-[var(--shadow-card)]",
  ghost: "text-primary bg-transparent hover:bg-primary-soft",
  white: "text-primary bg-white shadow-[0_14px_30px_rgba(0,0,0,0.18)]",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-[14.5px]",
  lg: "px-7 py-4 text-base",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type LinkButtonProps = CommonProps & {
  href: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className">;

type NativeButtonProps = CommonProps & {
  href?: undefined;
} & Omit<ComponentPropsWithoutRef<"button">, "className">;

type ButtonProps = LinkButtonProps | NativeButtonProps;

/**
 * Polymorphic button: renders a Next.js <Link> when `href` is provided,
 * otherwise a native <button>. Shares the design system's variants and sizes.
 */
export function Button(props: ButtonProps) {
  const { children, variant = "primary", size = "lg", className } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    const { href, ...rest } = props as LinkButtonProps;
    const cleaned = stripCommon(rest);
    return (
      <Link href={href} className={classes} {...cleaned}>
        {children}
      </Link>
    );
  }

  const cleaned = stripCommon(props as NativeButtonProps);
  return (
    <button className={classes} {...cleaned}>
      {children}
    </button>
  );
}

function stripCommon<T extends CommonProps>(
  props: T,
): Omit<T, "children" | "variant" | "size" | "className"> {
  const { children, variant, size, className, ...rest } = props;
  void children;
  void variant;
  void size;
  void className;
  return rest;
}
