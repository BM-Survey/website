"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { Brand } from "@/components/layout/Brand";
import { ArrowRight, Close, Menu } from "@/components/ui/icons";
import type { CommonDictionary } from "@/i18n/dictionaries";

type NavItem = { label: string; href: string };

type MobileNavProps = {
  brand: CommonDictionary["brand"];
  home: string;
  items: NavItem[];
  loginLabel: string;
  loginHref: string;
  signupLabel: string;
  signupHref: string;
  openLabel: string;
  closeLabel: string;
};

/** Compact hamburger menu shown on small screens. */
export function MobileNav({
  brand,
  home,
  items,
  loginLabel,
  loginHref,
  signupLabel,
  signupHref,
  openLabel,
  closeLabel,
}: MobileNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);
  const isActive = (href: string) => pathname === href;

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={openLabel}
        aria-expanded={open}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary-border bg-white/70 text-ink transition-colors hover:bg-white"
      >
        <Menu />
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[200]">
            <button
              type="button"
              aria-label={closeLabel}
              onClick={close}
              className="absolute inset-0 h-full w-full animate-[fadeIn_0.2s_ease-out] bg-ink/40 backdrop-blur-sm"
            />
            <nav
              aria-label={openLabel}
              className="absolute inset-x-3 top-3 origin-top animate-[menuIn_0.22s_cubic-bezier(0.16,1,0.3,1)] overflow-hidden rounded-3xl border border-primary-border bg-white shadow-[var(--shadow-card-lg)]"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <Brand brand={brand} href={home} />
                <button
                  type="button"
                  onClick={close}
                  aria-label={closeLabel}
                  className="-me-1.5 inline-flex h-10 w-10 items-center justify-center rounded-xl text-muted-2 transition-colors hover:bg-bg hover:text-ink"
                >
                  <Close />
                </button>
              </div>

              <ul className="flex flex-col p-2">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-[16px] font-semibold transition-colors ${
                        isActive(item.href)
                          ? "bg-primary-soft text-primary"
                          : "text-ink hover:bg-primary-soft"
                      }`}
                    >
                      {item.label}
                      <ArrowRight
                        width={17}
                        height={17}
                        className={`transition-all group-hover:translate-x-0.5 ${
                          isActive(item.href)
                            ? "text-primary"
                            : "text-muted-3 group-hover:text-primary"
                        }`}
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-2.5 border-t border-line p-4">
                <Link
                  href={signupHref}
                  onClick={close}
                  className="rounded-2xl bg-gradient-to-br from-primary to-primary-dark px-4 py-3.5 text-center font-display text-[15px] font-extrabold text-white shadow-[0_8px_20px_rgba(46,91,255,0.35)] transition-transform hover:-translate-y-0.5"
                >
                  {signupLabel}
                </Link>
                <Link
                  href={loginHref}
                  onClick={close}
                  className="rounded-2xl border border-primary-border px-4 py-3 text-center font-display text-[15px] font-bold text-primary transition-colors hover:bg-primary-soft"
                >
                  {loginLabel}
                </Link>
              </div>
            </nav>
          </div>,
          document.body,
        )}
    </div>
  );
}
