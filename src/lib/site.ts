import { defaultLocale, type Locale, locales } from "@/i18n/config";

/** Absolute site origin, driven by an environment variable (never hardcoded). */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

/** Absolute URL for a given locale's home page. */
export function localeUrl(locale: Locale): string {
  return `${siteUrl}/${locale}`;
}

/**
 * Builds the `alternates.languages` map for hreflang tags, plus the canonical
 * URL for the active locale.
 */
export function buildAlternates(locale: Locale) {
  const languages = Object.fromEntries(
    locales.map((l) => [l, `/${l}`]),
  ) as Record<Locale, string>;

  return {
    canonical: `/${locale}`,
    languages: {
      ...languages,
      "x-default": `/${defaultLocale}`,
    },
  };
}
