import { ImageResponse } from "next/og";

import { defaultLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "B2B Insight Panel";
export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Rendered per locale route, but always uses the default-locale copy: the
 * satori renderer used by `ImageResponse` doesn't support complex script
 * shaping (Arabic, Devanagari, Telugu), so localized text would fail to
 * prerender for those locales under `output: export`.
 */
export default async function OpengraphImage() {
  const dict = await getDictionary(defaultLocale);
  const title = dict.home.hero.titleLead;
  const subtitle = dict.home.meta.description;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg,#2E5BFF,#1E3FCC)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700, opacity: 0.85 }}>B2B · Insight Panel</div>
        <div style={{ fontSize: 82, fontWeight: 900, lineHeight: 1.05, marginTop: 24 }}>
          {title}
        </div>
        <div style={{ fontSize: 30, marginTop: 24, maxWidth: 900, opacity: 0.9 }}>
          {subtitle.slice(0, 120)}
        </div>
      </div>
    ),
    size,
  );
}
