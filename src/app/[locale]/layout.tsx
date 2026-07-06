import { notFound } from "next/navigation";
import Script from "next/script";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { StickyFooter } from "@/components/layout/StickyFooter";
import { getDirection, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { roboto, urbanist } from "@/lib/fonts";
import { cn } from "@/lib/cn";

import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { common } = await getDictionary(locale);
  const dir = getDirection(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      className={cn(urbanist.variable, roboto.variable)}
    >
      <body className="min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[300] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-display focus:text-ink focus:shadow-[var(--shadow-card-lg)]"
        >
          {common.a11y.skipToContent}
        </a>
        <Navbar locale={locale} common={common} />
        <main
          id="main"
          className="relative z-1 bg-bg md:mb-(--footer-height)"
        >
          {children}
        </main>
        <StickyFooter>
          <Footer locale={locale} common={common} />
        </StickyFooter>
        <div
          className="elfsight-app-10561567-b2fa-4e17-8710-936fcc5e8b64"
          data-elfsight-app-lazy
        />
      </body>
      <Script
        src="https://elfsightcdn.com/platform.js"
        strategy="afterInteractive"
      />
    </html>
  );
}
