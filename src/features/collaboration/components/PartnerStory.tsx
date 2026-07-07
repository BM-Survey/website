import type { CSSProperties } from "react";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Bolt, Briefcase, Check, Coins, Globe, Users } from "@/components/ui/icons";
import type { CollaborationDictionary } from "@/i18n/dictionaries";

type PartnerStoryProps = {
  data: CollaborationDictionary["story"];
};

const chapterIcons = [Briefcase, Bolt, Users, Globe, Coins];

/** Per-chapter card palettes, cycling light and branded dark surfaces. */
const tones = [
  {
    card: "border border-line bg-white shadow-[var(--shadow-card-lg)]",
    ghost: "text-ink/[0.05]",
    chip: "bg-primary-soft text-primary",
    title: "text-ink",
    text: "text-muted-2",
    panel: "border border-line bg-bg",
    point: "text-ink",
    check: "bg-success text-white",
  },
  {
    card: "bg-gradient-to-br from-primary to-primary-dark shadow-[0_20px_44px_rgba(46,91,255,0.22)]",
    ghost: "text-white/10",
    chip: "bg-white/15 text-white",
    title: "text-white",
    text: "text-white/85",
    panel: "bg-white/10",
    point: "text-white",
    check: "bg-white/25 text-white",
  },
  {
    card: "bg-gradient-to-b from-ink to-ink-2 shadow-[0_20px_44px_rgba(11,18,32,0.22)]",
    ghost: "text-white/10",
    chip: "bg-white/12 text-[#8aa5ff]",
    title: "text-white",
    text: "text-[#aeb4c2]",
    panel: "bg-white/8",
    point: "text-white",
    check: "bg-success text-white",
  },
  {
    card: "border border-primary-border bg-white shadow-[var(--shadow-card-lg)]",
    ghost: "text-ink/[0.05]",
    chip: "bg-purple-soft text-purple",
    title: "text-ink",
    text: "text-muted-2",
    panel: "border border-line bg-bg",
    point: "text-ink",
    check: "bg-success text-white",
  },
  {
    card: "bg-gradient-to-br from-success to-success-dark shadow-[0_20px_44px_rgba(34,195,94,0.22)]",
    ghost: "text-white/10",
    chip: "bg-white/18 text-white",
    title: "text-white",
    text: "text-white/85",
    panel: "bg-white/12",
    point: "text-white",
    check: "bg-white/25 text-white",
  },
];

/**
 * The organisation's story told as a deck of stacked chapter cards: each card
 * pins below the navbar as you scroll and the next chapter slides over it —
 * pure CSS `position: sticky`, no scroll listeners. Deliberately distinct
 * from the How It Works page's spine-and-milestones journey.
 */
export function PartnerStory({ data }: PartnerStoryProps) {
  return (
    <section className="px-6 pt-6 pb-28" aria-label={data.title}>
      <Container size="lg">
        <div className="mx-auto mb-14 max-w-[640px] text-center">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(32px,3.6vw,46px)] leading-tight font-black tracking-tight text-ink">
            {data.title}
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-muted-2">{data.subtitle}</p>
        </div>

        <ol className="flex flex-col gap-8">
          {data.chapters.map((chapter, i) => {
            const Icon = chapterIcons[i % chapterIcons.length];
            const tone = tones[i % tones.length];
            return (
              <li
                key={chapter.number}
                className="sticky"
                style={{ top: `calc(88px + ${i * 18}px)` } as CSSProperties}
              >
                <article
                  className={`relative overflow-hidden rounded-[30px] p-8 sm:p-11 ${tone.card}`}
                >
                  <span
                    className={`pointer-events-none absolute -top-8 end-4 font-display text-[120px] leading-none font-black tracking-tight select-none sm:text-[150px] ${tone.ghost}`}
                    aria-hidden
                  >
                    {chapter.number}
                  </span>

                  <div className="relative grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-12">
                    <div>
                      <span
                        className={`mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-display text-[12px] font-extrabold tracking-widest uppercase ${tone.chip}`}
                      >
                        <Icon width={14} height={14} />
                        {chapter.label}
                      </span>
                      <h3
                        className={`mb-3 font-display text-[clamp(24px,2.6vw,34px)] leading-tight font-black tracking-tight ${tone.title}`}
                      >
                        {chapter.title}
                      </h3>
                      <p className={`max-w-[520px] text-[16px] leading-relaxed ${tone.text}`}>
                        {chapter.text}
                      </p>
                    </div>

                    <ul className={`flex flex-col gap-3.5 rounded-[22px] p-6 sm:p-7 ${tone.panel}`}>
                      {chapter.points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <span
                            className={`mt-0.5 flex h-5.5 w-5.5 flex-none items-center justify-center rounded-full ${tone.check}`}
                          >
                            <Check width={11} height={11} />
                          </span>
                          <span className={`font-display text-[15px] font-bold ${tone.point}`}>
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
