"use client";

import { useId, useState } from "react";

import { Plus } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type FaqItem = { question: string; answer: string };

type FaqAccordionProps = {
  items: FaqItem[];
};

/** Accessible single-open accordion for the FAQ section. */
export function FaqAccordion({ items }: FaqAccordionProps) {
  const [open, setOpen] = useState<number>(0);
  const baseId = useId();

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div
            key={item.question}
            className={cn(
              "overflow-hidden rounded-3xl border transition-colors",
              isOpen ? "border-primary-border bg-[#eff3ff]" : "border-[#eaeefa] bg-bg",
            )}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5.5 text-start"
              >
                <span className="font-display text-[17px] font-bold text-ink">
                  {item.question}
                </span>
                <span
                  className={cn(
                    "flex h-7.5 w-7.5 flex-none items-center justify-center rounded-full transition-all duration-300",
                    isOpen ? "rotate-[135deg] bg-primary-soft" : "bg-white",
                  )}
                  aria-hidden
                >
                  <Plus width={14} height={14} className="text-primary" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
            >
              <p className="px-6 pb-6 text-[15px] leading-relaxed text-muted-2">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
