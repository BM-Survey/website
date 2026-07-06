import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { Locale } from "@/i18n/config";
import type { FaqPageDictionary } from "@/i18n/dictionaries";
import { pageHref } from "@/lib/navigation";

type FaqPageHeroProps = {
  locale: Locale;
  hero: FaqPageDictionary["hero"];
};

export function FaqPageHero({ locale, hero }: FaqPageHeroProps) {
  return (
    <section className="px-6 pt-40 pb-10 sm:pt-44">
      <Container size="sm" className="text-center">
        <Eyebrow>{hero.eyebrow}</Eyebrow>
        <h1 className="mt-5 mb-4 font-display text-[clamp(36px,5.2vw,60px)] leading-[1.04] font-black tracking-tight text-ink">
          {hero.titleLead} <span className="text-primary">{hero.titleHighlight}</span>
        </h1>
        <p className="text-[17px] text-muted">
          {hero.subtitleText}{" "}
          <Link href={pageHref(locale, "contact")} className="font-bold text-primary">
            {hero.subtitleLink}
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
