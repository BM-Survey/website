import "server-only";

import type { Locale } from "./config";
import type enCommon from "@/locales/en/common.json";
import type enHome from "@/locales/en/home.json";
import type enHowItWorks from "@/locales/en/how-it-works.json";
import type enFaqPage from "@/locales/en/faq-page.json";
import type enContact from "@/locales/en/contact.json";
import type enCollaboration from "@/locales/en/collaboration.json";
import type enLegal from "@/locales/en/legal.json";

/**
 * The dictionary shape is derived from the English source files, which act as
 * the canonical schema. Every other locale must satisfy the same structure.
 */
export type CommonDictionary = typeof enCommon;
export type HomeDictionary = typeof enHome;
export type HowItWorksDictionary = typeof enHowItWorks;
export type FaqPageDictionary = typeof enFaqPage;
export type ContactDictionary = typeof enContact;
export type CollaborationDictionary = typeof enCollaboration;
export type LegalDictionary = typeof enLegal;

export type Dictionary = {
  common: CommonDictionary;
  home: HomeDictionary;
  howItWorks: HowItWorksDictionary;
  faqPage: FaqPageDictionary;
  contact: ContactDictionary;
  collaboration: CollaborationDictionary;
  legal: LegalDictionary;
};

type DictionaryLoader = () => Promise<Dictionary>;

const load = (
  common: () => Promise<{ default: CommonDictionary }>,
  home: () => Promise<{ default: HomeDictionary }>,
  howItWorks: () => Promise<{ default: HowItWorksDictionary }>,
  faqPage: () => Promise<{ default: FaqPageDictionary }>,
  contact: () => Promise<{ default: ContactDictionary }>,
  collaboration: () => Promise<{ default: CollaborationDictionary }>,
  legal: () => Promise<{ default: LegalDictionary }>,
): DictionaryLoader => {
  return async () => {
    const [c, h, hiw, faq, ct, cb, lg] = await Promise.all([
      common(),
      home(),
      howItWorks(),
      faqPage(),
      contact(),
      collaboration(),
      legal(),
    ]);
    return {
      common: c.default,
      home: h.default,
      howItWorks: hiw.default,
      faqPage: faq.default,
      contact: ct.default,
      collaboration: cb.default,
      legal: lg.default,
    };
  };
};

/**
 * Lazily importable dictionaries. Only the requested locale's JSON is loaded,
 * and it runs on the server only — translation files never reach the client bundle.
 */
const dictionaries: Record<Locale, DictionaryLoader> = {
  en: load(
    () => import("@/locales/en/common.json"),
    () => import("@/locales/en/home.json"),
    () => import("@/locales/en/how-it-works.json"),
    () => import("@/locales/en/faq-page.json"),
    () => import("@/locales/en/contact.json"),
    () => import("@/locales/en/collaboration.json"),
    () => import("@/locales/en/legal.json"),
  ),
  fr: load(
    () => import("@/locales/fr/common.json"),
    () => import("@/locales/fr/home.json"),
    () => import("@/locales/fr/how-it-works.json"),
    () => import("@/locales/fr/faq-page.json"),
    () => import("@/locales/fr/contact.json"),
    () => import("@/locales/fr/collaboration.json"),
    () => import("@/locales/fr/legal.json"),
  ),
  ar: load(
    () => import("@/locales/ar/common.json"),
    () => import("@/locales/ar/home.json"),
    () => import("@/locales/ar/how-it-works.json"),
    () => import("@/locales/ar/faq-page.json"),
    () => import("@/locales/ar/contact.json"),
    () => import("@/locales/ar/collaboration.json"),
    () => import("@/locales/ar/legal.json"),
  ),
  hi: load(
    () => import("@/locales/hi/common.json"),
    () => import("@/locales/hi/home.json"),
    () => import("@/locales/hi/how-it-works.json"),
    () => import("@/locales/hi/faq-page.json"),
    () => import("@/locales/hi/contact.json"),
    () => import("@/locales/hi/collaboration.json"),
    () => import("@/locales/hi/legal.json"),
  ),
  te: load(
    () => import("@/locales/te/common.json"),
    () => import("@/locales/te/home.json"),
    () => import("@/locales/te/how-it-works.json"),
    () => import("@/locales/te/faq-page.json"),
    () => import("@/locales/te/contact.json"),
    () => import("@/locales/te/collaboration.json"),
    () => import("@/locales/te/legal.json"),
  ),
};

export const getDictionary = (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
