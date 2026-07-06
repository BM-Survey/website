import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CtaBanner } from "@/components/marketing/CtaBanner";
import { PageHero } from "@/components/marketing/PageHero";
import { PayoutSpeed } from "@/features/how-it-works/components/PayoutSpeed";
import { StepsGrid } from "@/features/how-it-works/components/StepsGrid";
import { SurveyPreview } from "@/features/how-it-works/components/SurveyPreview";
import { isLocale, localeMeta } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildAlternates, siteUrl } from "@/lib/site";
import { pageHref } from "@/lib/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/how-it-works-and-user-can-earns-money">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const { howItWorks } = await getDictionary(locale);
  const meta = howItWorks.meta;

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

export default async function HowItWorksPage({
  params,
}: PageProps<"/[locale]/how-it-works-and-user-can-earns-money">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { howItWorks } = await getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={howItWorks.hero.eyebrow}
        titleLead={howItWorks.hero.titleLead}
        titleHighlight={howItWorks.hero.titleHighlight}
        subtitle={howItWorks.hero.subtitle}
      />
      <StepsGrid steps={howItWorks.steps} />
      <SurveyPreview data={howItWorks.surveyPreview} />
      <PayoutSpeed data={howItWorks.payoutSpeed} />
      <CtaBanner
        title={howItWorks.cta.title}
        subtitle={howItWorks.cta.subtitle}
        buttonLabel={howItWorks.cta.button}
        buttonHref={pageHref(locale, "home")}
      />
    </>
  );
}
