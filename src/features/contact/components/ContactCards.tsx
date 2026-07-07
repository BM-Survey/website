import Link from "next/link";

import { ArrowRight, ChatBubble, Mail } from "@/components/ui/icons";
import type { Locale } from "@/i18n/config";
import type { ContactDictionary } from "@/i18n/dictionaries";
import { pageHref } from "@/lib/navigation";

type ContactCardsProps = {
  locale: Locale;
  cards: ContactDictionary["cards"];
};

export function ContactCards({ locale, cards }: ContactCardsProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Direct channels share one quiet card; the divider keeps them scannable */}
      <div className="rounded-[26px] border border-primary-border bg-white p-3 shadow-(--shadow-card)">
        <a
          href={`mailto:${cards.email.value}`}
          className="group flex items-center gap-4 rounded-[18px] p-4 transition-colors hover:bg-primary-soft/60"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
            <Mail width={19} height={19} />
          </span>
          <span className="min-w-0">
            <span className="block font-display text-[15px] font-extrabold text-ink">
              {cards.email.title}
            </span>
            <span className="block truncate text-[14px] text-primary underline-offset-4 group-hover:underline">
              {cards.email.value}
            </span>
          </span>
        </a>

        <div className="mx-4 h-px bg-line" />

        <div className="flex items-center gap-4 p-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-success-soft text-success-dark">
            <ChatBubble width={19} height={19} />
          </span>
          <span className="min-w-0">
            <span className="block font-display text-[15px] font-extrabold text-ink">
              {cards.chat.title}
            </span>
            <span className="block text-[14px] text-muted">{cards.chat.value}</span>
          </span>
        </div>
      </div>

      {/* Brands get their own panel, but in the same voice — no gradient billboard */}
      <div className="rounded-[26px] border border-primary-border bg-primary-soft/50 p-7">
        <div className="mb-1.5 font-display text-[15px] font-extrabold text-ink">
          {cards.brands.title}
        </div>
        <p className="mb-4 text-[14px] leading-relaxed text-muted-2">{cards.brands.text}</p>
        <Link
          href={pageHref(locale, "collaboration")}
          className="inline-flex items-center gap-1.5 font-display text-sm font-bold text-primary underline-offset-4 hover:underline"
        >
          {cards.brands.link}
          <ArrowRight width={14} height={14} className="rtl:rotate-180" />
        </Link>
      </div>
    </div>
  );
}
