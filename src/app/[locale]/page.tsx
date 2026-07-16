import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale, localeMeta } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildAlternates, siteUrl } from "@/lib/site";

import { Hero } from "@/features/home/components/Hero";
// import { TrustStrip } from "@/features/home/components/TrustStrip";
import { Stats } from "@/features/home/components/Stats";
import { VideoReveal } from "@/features/home/components/VideoReveal";
import { FeatureSurveys } from "@/features/home/components/FeatureSurveys";
import { FeatureCashout } from "@/features/home/components/FeatureCashout";
import { Rewards } from "@/features/home/components/Rewards";
import { About } from "@/features/home/components/About";
import { Testimonials } from "@/features/home/components/Testimonials";
import { Faq } from "@/features/home/components/Faq";
import { FinalCta } from "@/features/home/components/FinalCta";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const { home } = await getDictionary(locale);
  const meta = home.meta;
  const url = `/${locale}`;

  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: buildAlternates(locale),
    openGraph: {
      type: "website",
      locale: localeMeta[locale].htmlLang,
      url,
      title: meta.title,
      description: meta.description,
      siteName: "B2B Insight Panel",
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: meta.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/opengraph-image.png"],
    },
  };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { home, common } = await getDictionary(locale);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "B2B Insight Panel",
    url: `${siteUrl}/${locale}`,
    inLanguage: localeMeta[locale].htmlLang,
    description: home.meta.description,
  };

  return (
    <>
      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Hero locale={locale} hero={home.hero} actions={common.actions} />
      {/* <TrustStrip trust={home.trust} /> */}
      <Stats stats={home.stats} />
      {/* <VideoReveal video={home.video} /> */}
      <FeatureSurveys feature={home.feature1} />
      <FeatureCashout feature={home.feature2} />
      <Rewards rewards={home.rewards} />
      <About about={home.about} actions={common.actions} />
      <Testimonials testimonials={home.testimonials} />
      <Faq locale={locale} faq={home.faq} />
      <FinalCta locale={locale} cta={home.cta} />
    </>
  );
}
