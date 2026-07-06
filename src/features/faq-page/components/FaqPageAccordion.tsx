"use client";

import { useMemo, useState } from "react";

import { Plus } from "@/components/ui/icons";
import type { FaqPageDictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/cn";

type FaqPageAccordionProps = {
  categories: FaqPageDictionary["categories"];
  items: FaqPageDictionary["items"];
};

export function FaqPageAccordion({ categories, items }: FaqPageAccordionProps) {
  const [activeCat, setActiveCat] = useState(categories[0]?.key ?? "all");
  const [open, setOpen] = useState(0);

  const filtered = useMemo(
    () => (activeCat === "all" ? items : items.filter((item) => item.cat === activeCat)),
    [activeCat, items],
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2.5">
        {categories.map((cat) => {
          const active = cat.key === activeCat;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => {
                setActiveCat(cat.key);
                setOpen(0);
              }}
              className={cn(
                "rounded-full px-4.5 py-2.5 font-display text-[13px] font-bold transition-colors",
                active
                  ? "bg-gradient-to-br from-primary to-primary-dark text-white shadow-[0_8px_20px_rgba(46,91,255,0.3)]"
                  : "border border-primary-border bg-white text-ink",
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.question}
              className={cn(
                "overflow-hidden rounded-3xl border transition-colors",
                isOpen ? "border-primary-border bg-[#eff3ff]" : "border-[#eaeefa] bg-white",
              )}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5.5 text-start"
              >
                <span className="font-display text-[17px] font-bold text-ink">{item.question}</span>
                <span
                  className={cn(
                    "flex h-7.5 w-7.5 flex-none items-center justify-center rounded-full transition-all duration-300",
                    isOpen ? "rotate-[135deg] bg-primary-soft" : "bg-bg",
                  )}
                  aria-hidden
                >
                  <Plus width={14} height={14} className="text-primary" />
                </span>
              </button>
              <div hidden={!isOpen}>
                <p className="px-6 pb-6 text-[15px] leading-relaxed text-muted-2">{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
