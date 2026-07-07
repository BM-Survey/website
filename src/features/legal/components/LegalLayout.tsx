import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { Locale } from "@/i18n/config";
import type { LegalDictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/cn";
import { pageHref, type RouteKey } from "@/lib/navigation";

type LegalSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
  table?: { headers: string[]; rows: string[][] };
  contactLink?: boolean;
};

type LegalDoc = {
  title: string;
  intro: string;
  sections: LegalSection[];
};

type LegalNavKey = keyof LegalDictionary["nav"];

const navRoute: Record<LegalNavKey, RouteKey> = {
  privacy: "privacyPolicy",
  cookie: "cookiePolicy",
  eula: "eula",
  terms: "termsConditions",
};

type LegalLayoutProps = {
  locale: Locale;
  badge: string;
  nav: LegalDictionary["nav"];
  active: LegalNavKey;
  doc: LegalDoc;
  contactLinkLabel: string;
};

export function LegalLayout({ locale, badge, nav, active, doc, contactLinkLabel }: LegalLayoutProps) {
  return (
    <>
      <section className="px-6 pt-40 pb-10 sm:pt-44">
        <Container size="lg">
          <Eyebrow>{badge}</Eyebrow>
          <h1 className="mt-5 font-display text-[clamp(34px,4.8vw,58px)] leading-[1.02] font-black tracking-tight text-ink">
            {doc.title}
          </h1>
        </Container>
      </section>

      <section className="px-6 pb-32">
        <Container size="lg" className="grid gap-8 lg:grid-cols-[230px_1fr]">
          <nav
            aria-label={badge}
            className="h-fit rounded-[20px] border border-primary-border bg-white p-2.5 shadow-[var(--shadow-card-lg)] lg:sticky lg:top-25"
          >
            {(Object.keys(nav) as LegalNavKey[]).map((key) => (
              <Link
                key={key}
                href={pageHref(locale, navRoute[key])}
                className={cn(
                  "mb-1 block rounded-xl px-4 py-2.5 font-display text-[13.5px] font-semibold text-muted",
                  key === active && "bg-primary-soft font-extrabold text-primary",
                )}
              >
                {nav[key]}
              </Link>
            ))}
          </nav>

          <div className="rounded-[26px] border border-primary-border bg-white p-8 shadow-[var(--shadow-card-lg)] sm:p-12">
            <p className="text-[15.5px] leading-[1.75] text-muted-2">{doc.intro}</p>
            {doc.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="mt-10 mb-3 font-display text-xl font-extrabold tracking-tight text-ink">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="text-[15.5px] leading-[1.75] text-muted-2">
                    {p}
                    {section.contactLink && i === section.paragraphs.length - 1 && (
                      <>
                        {" "}
                        <Link href={pageHref(locale, "contact")} className="font-bold text-primary">
                          {contactLinkLabel}
                        </Link>
                        .
                      </>
                    )}
                  </p>
                ))}
                {section.list && (
                  <ul className="list-disc space-y-1.5 pl-5 text-[15.5px] leading-[1.75] text-muted-2">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.table && (
                  <div className="mt-2.5 overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead className="max-sm:sr-only">
                        <tr>
                          {section.table.headers.map((h) => (
                            <th
                              key={h}
                              className="border-b border-line px-3 py-2.5 text-start font-display text-[11px] font-bold tracking-wide text-muted uppercase"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, i) => (
                          <tr
                            key={i}
                            className="block border-b border-line py-2 last:border-b-0 sm:table-row sm:border-b-0 sm:py-0"
                          >
                            {row.map((cell, j) => (
                              <td
                                key={j}
                                data-label={section.table!.headers[j]}
                                className="block px-3 py-1 text-sm text-muted-2 before:block before:font-display before:text-[11px] before:font-bold before:tracking-wide before:text-muted before:uppercase before:content-[attr(data-label)] sm:table-cell sm:border-b sm:border-line sm:py-2.5 sm:before:hidden"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
