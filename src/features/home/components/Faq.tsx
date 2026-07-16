import { ArrowRight } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/i18n/config";
import type { HomeDictionary } from "@/i18n/dictionaries";
import { pageHref } from "@/lib/navigation";
import Link from "next/link";
import { FaqAccordion } from "./FaqAccordion";

type FaqProps = {
  locale: Locale;
  faq: HomeDictionary["faq"];
};

export function Faq({ locale, faq }: FaqProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <Section id="faq" className="bg-white" ariaLabel={faq.title}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Container size="sm">
        <Reveal className="mb-12 text-center">
          <Eyebrow>{faq.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(32px,3.6vw,46px)] leading-tight font-black tracking-tight text-ink">
            {faq.title}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <FaqAccordion items={faq.items.slice(0, 5)} />
        </Reveal>

        <Reveal delay={0.2} className="mt-9 text-center">
          <p className="mb-4 text-[15px] text-muted">{faq.moreText}</p>
          <Link
            href={pageHref(locale, "faq")}
            className="inline-flex items-center gap-2 rounded-2xl border border-primary-border bg-white px-6 py-3.5 font-display text-[15.5px] font-bold text-ink shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5"
          >
            {faq.moreLink}
            <ArrowRight width={16} height={16} className="rtl:rotate-180" />
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}
