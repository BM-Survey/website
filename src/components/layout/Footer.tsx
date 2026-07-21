import Image from "next/image";
import Link from "next/link";

import { Brand } from "@/components/layout/Brand";
import { LinkedIn } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/i18n/config";
import type { CommonDictionary } from "@/i18n/dictionaries";
import { interpolate } from "@/lib/interpolate";
import { pageHref } from "@/lib/navigation";

type FooterProps = {
  locale: Locale;
  common: CommonDictionary;
};

/** Site footer with brand, navigation columns, app links and legal bar. */
export function Footer({ locale, common }: FooterProps) {
  const f = common.footer;
  const home = pageHref(locale, "home");

  const productLinks = [
    { label: f.product.home, href: home },
    { label: f.product.howItWorks, href: pageHref(locale, "howItWorks") },
    { label: f.product.faq, href: pageHref(locale, "faq") },
    { label: f.product.blog, href: pageHref(locale, "blog") },
    { label: f.product.contact, href: pageHref(locale, "contact") },
    { label: f.product.collaboration, href: pageHref(locale, "collaboration") },
  ];
  const legalLinks = [
    { label: f.legal.privacy, href: pageHref(locale, "privacyPolicy") },
    { label: f.legal.cookie, href: pageHref(locale, "cookiePolicy") },
    { label: f.legal.eula, href: pageHref(locale, "eula") },
    { label: f.legal.terms, href: pageHref(locale, "termsConditions") },
  ];
  const socials = [
    { label: f.social.linkedin, Icon: LinkedIn, href: "https://www.linkedin.com/company/b2b-insight-panel/" },
  ];

  return (
    <footer className="bg-gradient-to-b from-ink to-[#131e4d] text-white">
      <Container className="pt-16">
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-4">
              <Brand brand={common.brand} href={home} tone="light" />
            </div>
            <p className="mb-5 max-w-[280px] text-[14.5px] leading-relaxed text-[#9aa6c8]">
              {f.tagline}
            </p>
            <ul className="flex gap-2.5">
              {socials.map(({ label, Icon, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.08] text-[#dde4ff] transition-colors hover:bg-white/15"
                  >
                    <Icon width={17} height={17} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterColumn title={f.product.title} links={productLinks} />
          <FooterColumn title={f.legal.title} links={legalLinks} />

          <div>
            <h2 className="mb-4 font-display text-[13px] font-extrabold tracking-wider text-[#6e7ba6] uppercase">
              {f.app.title}
            </h2>
            <div className="flex flex-col gap-2.5">
              <StoreBadge
                topLine={f.app.downloadOn}
                name={f.app.appStore}
                iconSrc="/icons/app-store.png"
              />
              <StoreBadge
                topLine={f.app.getItOn}
                name={f.app.googlePlay}
                iconSrc="/icons/google-play.png"
              />
            </div>
          </div>
        </div>

        <div className="py-7">
          <p className="text-[13.5px] text-[#6e7ba6]">
            {interpolate(f.copyright, { year: new Date().getFullYear() })}
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="mb-4 font-display text-[13px] font-extrabold tracking-wider text-[#6e7ba6] uppercase">
        {title}
      </h2>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-[14.5px] text-[#c7d0ea] hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StoreBadge({
  topLine,
  name,
  iconSrc,
}: {
  topLine: string;
  name: string;
  iconSrc: string;
}) {
  return (
    <a
      href="#"
      className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.08] px-3.5 py-2.5 transition-colors hover:bg-white/15"
    >
      <Image src={iconSrc} alt="" width={20} height={20} />
      <span>
        <span className="block text-[10px] text-[#9aa6c8]">{topLine}</span>
        <span className="block font-display text-[14px] font-bold text-white">{name}</span>
      </span>
    </a>
  );
}