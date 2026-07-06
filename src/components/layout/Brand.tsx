import Image from "next/image";
import Link from "next/link";

import type { CommonDictionary } from "@/i18n/dictionaries";

type BrandProps = {
  brand: CommonDictionary["brand"];
  href: string;
  /** Light variant for use on dark backgrounds (footer). */
  tone?: "dark" | "light";
};

export function Brand({ brand, href, tone = "dark" }: BrandProps) {
  return (
    <Link href={href} className="flex items-center no-underline">
      <Image
        src="/logo.svg"
        alt={`${brand.prefix} ${brand.name}`}
        width={160}
        height={40}
        priority
        className={tone === "light" ? "brightness-0 invert" : ""}
      />
    </Link>
  );
}
