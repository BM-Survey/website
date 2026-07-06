/**
 * Central i18n configuration.
 * A single source of truth for supported locales, their text direction,
 * and native display labels used by the language switcher.
 */

export const locales = ["en", "fr", "ar", "hi", "te"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

type LocaleMeta = {
  /** Native language name shown in the switcher. */
  label: string;
  /** Text direction for the <html dir> attribute. */
  dir: "ltr" | "rtl";
  /** BCP-47 tag for the <html lang> attribute and Intl APIs. */
  htmlLang: string;
};

export const localeMeta: Record<Locale, LocaleMeta> = {
  en: { label: "English", dir: "ltr", htmlLang: "en" },
  fr: { label: "Français", dir: "ltr", htmlLang: "fr" },
  ar: { label: "العربية", dir: "rtl", htmlLang: "ar" },
  hi: { label: "हिन्दी", dir: "ltr", htmlLang: "hi" },
  te: { label: "తెలుగు", dir: "ltr", htmlLang: "te" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return localeMeta[locale].dir;
}
