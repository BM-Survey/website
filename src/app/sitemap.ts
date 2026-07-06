import type { MetadataRoute } from "next";

import { posts } from "@/features/blog/data";
import { defaultLocale, locales } from "@/i18n/config";
import { routes } from "@/lib/navigation";
import { siteUrl } from "@/lib/site";

const pagePaths = [...Object.values(routes), ...posts.map((post) => `${routes.blog}/${post.slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return locales.flatMap((locale) =>
    pagePaths.map((path) => {
      const suffix = path === "/" ? "" : path;
      return {
        url: `${siteUrl}/${locale}${suffix}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: path === "/" ? (locale === defaultLocale ? 1 : 0.8) : 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${siteUrl}/${l}${suffix}`]),
          ),
        },
      };
    }),
  );
}
