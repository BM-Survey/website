import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { FaqPageAccordion } from "@/features/faq-page/components/FaqPageAccordion";
import { FaqPageHero } from "@/features/faq-page/components/FaqPageHero";
import { isLocale, localeMeta } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageHref } from "@/lib/navigation";
import { buildAlternates, siteUrl } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/faq-frequently-asked-questions-and-answers">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const { faqPage } = await getDictionary(locale);
  const meta = faqPage.meta;

  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: buildAlternates(locale),
    openGraph: {
      type: "website",
      locale: localeMeta[locale].htmlLang,
      title: meta.title,
      description: meta.description,
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: meta.ogAlt }],
    },
  };
}

export default async function FaqPage({
  params,
}: PageProps<"/[locale]/faq-frequently-asked-questions-and-answers">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { faqPage } = await getDictionary(locale);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqPage.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <FaqPageHero locale={locale} hero={faqPage.hero} />
      <Container size="sm" className="pb-20">
        <FaqPageAccordion categories={faqPage.categories} items={faqPage.items} />
      </Container>
      <CtaBanner
        title={faqPage.cta.title}
        subtitle={faqPage.cta.subtitle}
        buttonLabel={faqPage.cta.button}
        buttonHref={pageHref(locale, "contact")}
        size="md"
      />
    </>
  );
}
