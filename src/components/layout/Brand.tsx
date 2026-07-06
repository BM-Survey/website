import Link from "next/link";

import type { CommonDictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/cn";

type BrandProps = {
  brand: CommonDictionary["brand"];
  href: string;
  /** Light variant for use on dark backgrounds (footer). */
  tone?: "dark" | "light";
};

/** The "B2B | Insight Panel" wordmark, used in the navbar and footer. */
export function Brand({ brand, href, tone = "dark" }: BrandProps) {
  const color = tone === "light" ? "text-white" : "text-[#163868]";
  const divider = tone === "light" ? "bg-white/30" : "bg-[#163868]/35";

  return (
    <Link href={href} className="flex items-center gap-3 no-underline">
      <span className={cn("font-display text-[19px] font-black tracking-tight", color)}>
        {brand.prefix}
      </span>
      <span className={cn("h-5 w-px", divider)} aria-hidden />
      <span className={cn("font-display text-[17px] font-bold tracking-tight", color)}>
        {brand.name}
      </span>
    </Link>
  );
}
