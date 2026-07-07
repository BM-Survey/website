import Link from "next/link";

import { Briefcase, Check } from "@/components/ui/icons";
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
      {/* One tap opens the mail client — no form needed at all */}
      <a
        href={`mailto:${cards.email.value}`}
        className="group rounded-[26px] bg-gradient-to-b from-ink to-ink-2 p-7 text-white transition-transform duration-300 hover:-translate-y-1"
      >
        <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
          <Check width={18} height={18} />
        </span>
        <div className="mb-1.5 font-display text-lg font-extrabold">{cards.email.title}</div>
        <div className="text-[14.5px] text-[#aeb4c2] underline-offset-4 group-hover:underline">
          {cards.email.value}
        </div>
      </a>

      <div className="rounded-[26px] border border-primary-border bg-white p-7 shadow-[var(--shadow-card-lg)]">
        <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-success-soft text-success-dark">
          <Check width={18} height={18} />
        </span>
        <div className="mb-1.5 font-display text-lg font-extrabold text-ink">{cards.chat.title}</div>
        <div className="text-[14.5px] text-muted">{cards.chat.value}</div>
      </div>

      <div className="rounded-[26px] bg-gradient-to-br from-primary to-primary-dark p-7 text-white shadow-[0_20px_44px_rgba(46,91,255,0.22)]">
        <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/18">
          <Briefcase width={18} height={18} />
        </span>
        <div className="mb-1.5 font-display text-lg font-extrabold">{cards.brands.title}</div>
        <div className="mb-3.5 text-[14.5px] text-[#d8e1ff]">{cards.brands.text}</div>
        <Link
          href={pageHref(locale, "collaboration")}
          className="inline-block rounded-[10px] bg-white px-4 py-2.5 font-display text-sm font-bold text-primary"
        >
          {cards.brands.link} →
        </Link>
      </div>
    </div>
  );
}
