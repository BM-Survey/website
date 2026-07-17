import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CtaBanner } from "@/components/marketing/CtaBanner";
import { PageHero } from "@/components/marketing/PageHero";
import { PartnerStory } from "@/features/collaboration/components/PartnerStory";
import { WhyWorkWithUs } from "@/features/collaboration/components/WhyWorkWithUs";
import { isLocale, localeMeta } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageHref } from "@/lib/navigation";
import { buildAlternates, siteUrl } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/collaboration-why-join-our-survey-panel">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const { collaboration } = await getDictionary(locale);
  const meta = collaboration.meta;

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
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: meta.ogAlt,
        },
      ],
    },
  };
}

export default async function CollaborationPage({
  params,
}: PageProps<"/[locale]/collaboration-why-join-our-survey-panel">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { collaboration } = await getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={collaboration.hero.eyebrow}
        titleLead={collaboration.hero.titleLead}
        titleHighlight={collaboration.hero.titleHighlight}
        subtitle={collaboration.hero.subtitle}
      />
      <PartnerStory data={collaboration.story} />
      <WhyWorkWithUs data={collaboration.whyWorkWithUs} />
      
      <CtaBanner
        title={collaboration.cta.title}
        subtitle={collaboration.cta.subtitle}
        buttonLabel={collaboration.cta.button}
        buttonHref={pageHref(locale, "contact")}
      />
    </>
  );
}
