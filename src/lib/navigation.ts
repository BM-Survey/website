import type { Locale } from "@/i18n/config";

/** Section anchors used across the single-page Home experience. */
export const anchors = {
  top: "#top",
  howItWorks: "#how-it-works",
  rewards: "#rewards",
  about: "#about",
  faq: "#faq",
} as const;

/**
 * Canonical (locale-independent) slugs for standalone marketing pages.
 * Kept SEO-descriptive rather than terse, per site convention.
 */
export const routes = {
  home: "/",
  howItWorks: "/how-it-works-and-user-can-earns-money",
  faq: "/faq-frequently-asked-questions-and-answers",
  contact: "/contact-us-support-and-help",
  collaboration: "/collaboration-why-join-our-survey-panel",
  privacyPolicy: "/privacy-policy-and-data-protection",
  cookiePolicy: "/cookie-policy-and-tracking-information",
  eula: "/eula-end-user-license-agreement",
  termsConditions: "/terms-and-conditions-of-use",
  blog: "/blog-stories-tips-and-updates-from-insight-panel",
} as const;

export type RouteKey = keyof typeof routes;

/**
 * Prefixes an internal path with the active locale.
 * Hash anchors and external/protocol links are returned unchanged.
 */
export function localizedHref(locale: Locale, path: string): string {
  if (path.startsWith("#") || /^https?:\/\//.test(path) || path.startsWith("mailto:")) {
    return path;
  }
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean === "/" ? "" : clean}`;
}

/** Locale-prefixed href for a named standalone page route. */
export function pageHref(locale: Locale, key: RouteKey): string {
  return localizedHref(locale, routes[key]);
}

/** Locale-prefixed href for a single blog post. */
export function blogPostHref(locale: Locale, slug: string): string {
  return localizedHref(locale, `${routes.blog}/${slug}`);
}
