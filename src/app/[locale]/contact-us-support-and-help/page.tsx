import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactCards } from "@/features/contact/components/ContactCards";
import { ContactForm } from "@/features/contact/components/ContactForm";
import { isLocale, localeMeta } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildAlternates, siteUrl } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact-us-support-and-help">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const { contact } = await getDictionary(locale);
  const meta = contact.meta;

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

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact-us-support-and-help">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { contact } = await getDictionary(locale);

  return (
    <>
      <section className="px-6 pt-40 pb-12 sm:pt-44">
        <Container size="sm" className="text-center">
          <Eyebrow>{contact.hero.eyebrow}</Eyebrow>
          <h1 className="mt-5 font-display text-[clamp(36px,5.2vw,60px)] leading-[1.04] font-black tracking-tight text-ink">
            {contact.hero.title}
          </h1>
        </Container>
      </section>

      <section className="px-6 pb-32">
        <Container size="lg" className="grid gap-4 lg:grid-cols-[1fr_1.3fr]">
          <ContactCards locale={locale} cards={contact.cards} />
          <ContactForm form={contact.form} />
        </Container>
      </section>
    </>
  );
}
