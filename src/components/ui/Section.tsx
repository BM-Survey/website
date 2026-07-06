import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Optional accessible label for the section landmark. */
  ariaLabel?: string;
};

/** Semantic <section> landmark with vertical rhythm shared across the page. */
export function Section({ children, className, id, ariaLabel }: SectionProps) {
  return (
    <section id={id} aria-label={ariaLabel} className={cn("py-20 sm:py-28", className)}>
      {children}
    </section>
  );
}
