import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalLayout } from "@/features/legal/components/LegalLayout";
import { isLocale, localeMeta } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildAlternates, siteUrl } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/cookie-policy-and-tracking-information">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const { legal } = await getDictionary(locale);
  const meta = legal.cookie.meta;

  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
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

export default async function CookiePolicyPage({
  params,
}: PageProps<"/[locale]/cookie-policy-and-tracking-information">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { legal } = await getDictionary(locale);

  return (
    <LegalLayout
      locale={locale}
      badge={legal.badge}
      nav={legal.nav}
      active="cookie"
      doc={legal.cookie}
      contactLinkLabel={legal.contactPageLabel}
    />
  );
}
