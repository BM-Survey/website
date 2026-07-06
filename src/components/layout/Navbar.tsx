"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Brand } from "@/components/layout/Brand";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { MobileNav } from "@/components/layout/MobileNav";
import type { Locale } from "@/i18n/config";
import type { CommonDictionary } from "@/i18n/dictionaries";
import { pageHref } from "@/lib/navigation";

type NavbarProps = {
  locale: Locale;
  common: CommonDictionary;
};

export function Navbar({ locale, common }: NavbarProps) {
  const pathname = usePathname();
  const home = pageHref(locale, "home");
  const items = [
    { label: common.nav.howItWorks, href: pageHref(locale, "howItWorks") },
    { label: common.nav.faq, href: pageHref(locale, "faq") },
    { label: common.nav.blog, href: pageHref(locale, "blog") },
    { label: common.nav.contact, href: pageHref(locale, "contact") },
    { label: common.nav.collaboration, href: pageHref(locale, "collaboration") },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed inset-x-0 top-4 z-[100] flex justify-center px-4">
      <nav
        aria-label={common.a11y.primaryNavigation}
        className="flex w-full max-w-[1180px] items-center justify-between gap-3 rounded-[22px] border border-white/70 bg-white/70 py-2.5 pe-3 ps-5 shadow-[0_10px_30px_rgba(16,32,90,0.10)] backdrop-blur-xl"
      >
        <Brand brand={common.brand} href={home} />

        <ul className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`rounded-xl px-3.5 py-2.5 font-display text-[14.5px] font-semibold transition-colors ${
                  isActive(item.href)
                    ? "bg-primary-soft text-ink"
                    : "text-muted-2 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LocaleSwitcher
            current={locale}
            label={common.language.label}
            selectLabel={common.language.select}
          />
          <Link
            href={home}
            className="hidden rounded-xl px-4 py-2.5 font-display text-[14.5px] font-bold text-primary hover:bg-primary-soft md:inline-block"
          >
            {common.actions.login}
          </Link>
          <Link
            href={home}
            className="hidden rounded-xl bg-gradient-to-br from-primary to-primary-dark px-5 py-2.5 font-display text-[14.5px] font-bold text-white shadow-[0_8px_20px_rgba(46,91,255,0.35)] transition-transform hover:-translate-y-0.5 sm:inline-block"
          >
            {common.actions.signupFree}
          </Link>
          <MobileNav
            brand={common.brand}
            home={home}
            items={items}
            loginLabel={common.actions.login}
            loginHref={home}
            signupLabel={common.actions.signupFree}
            signupHref={home}
            openLabel={common.a11y.openMenu}
            closeLabel={common.a11y.closeMenu}
          />
        </div>
      </nav>
    </header>
  );
}
