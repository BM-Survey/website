import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalLayout } from "@/features/legal/components/LegalLayout";
import { isLocale, localeMeta } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildAlternates, siteUrl } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/eula-end-user-license-agreement">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const { legal } = await getDictionary(locale);
  const meta = legal.eula.meta;

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

export default async function EulaPage({
  params,
}: PageProps<"/[locale]/eula-end-user-license-agreement">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { legal } = await getDictionary(locale);

  return (
    <LegalLayout
      locale={locale}
      badge={legal.badge}
      nav={legal.nav}
      active="eula"
      doc={legal.eula}
      contactLinkLabel={legal.contactPageLabel}
    />
  );
}
