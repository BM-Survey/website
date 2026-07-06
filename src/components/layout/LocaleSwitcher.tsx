"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ChevronDown, Globe } from "@/components/ui/icons";
import { type Locale, localeMeta, locales } from "@/i18n/config";
import { cn } from "@/lib/cn";

type LocaleSwitcherProps = {
  current: Locale;
  label: string;
  selectLabel: string;
};

/**
 * Accessible language dropdown for the header. Swaps the first path segment
 * for the chosen locale and navigates, preserving the rest of the route.
 */
export function LocaleSwitcher({ current, label, selectLabel }: LocaleSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const switchTo = (locale: Locale) => {
    setOpen(false);
    if (locale === current) return;
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/") || `/${locale}`);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={selectLabel}
        className="inline-flex items-center gap-1.5 rounded-xl border border-primary-border bg-white/70 px-3 py-2 font-display text-[14px] font-bold text-ink transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <Globe width={16} height={16} className="text-primary" />
        <span>{localeMeta[current].label}</span>
        <ChevronDown
          width={14}
          height={14}
          className={cn("text-muted transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={label}
          className="absolute end-0 z-50 mt-2 min-w-[168px] overflow-hidden rounded-2xl border border-primary-border bg-white p-1.5 shadow-[var(--shadow-card-lg)]"
        >
          {locales.map((locale) => {
            const active = locale === current;
            return (
              <li key={locale}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  lang={localeMeta[locale].htmlLang}
                  onClick={() => switchTo(locale)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-start font-display text-[14px] font-semibold transition-colors",
                    active
                      ? "bg-primary-soft text-primary"
                      : "text-ink hover:bg-bg",
                  )}
                >
                  <span>{localeMeta[locale].label}</span>
                  {active && <span aria-hidden>●</span>}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
