import { Fragment, type CSSProperties } from "react";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { HowItWorksDictionary } from "@/i18n/dictionaries";

type JourneyHeroProps = {
  hero: HowItWorksDictionary["hero"];
};

/**
 * Splits a phrase into per-word spans so the headline reveals word by word.
 * The separating space lives OUTSIDE each span: `.hero-word` is inline-block,
 * and trailing whitespace inside an inline-block collapses away, which would
 * fuse the words together.
 */
function HeadlineWords({ text, startDelay }: { text: string; startDelay: number }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span
            className="hero-word"
            style={{ "--word-delay": `${startDelay + i * 80}ms` } as CSSProperties}
          >
            {word}
          </span>{" "}
        </Fragment>
      ))}
    </>
  );
}

/**
 * Storytelling hero for the How It Works page: word-by-word headline reveal
 * and a shimmering highlight with a drawn underline. The chapter navigation
 * lives in StoryJourney's sticky chip rail just below.
 */
export function JourneyHero({ hero }: JourneyHeroProps) {
  const leadWordCount = hero.titleLead.split(" ").length;

  return (
    <section className="relative overflow-hidden px-6 pt-40 pb-16 sm:pt-44">
      {/* Ambient background: aurora blobs + faded dot grid, echoing the home hero */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-[30%] -start-[12%] h-[560px] w-[560px] animate-[auroraDrift_16s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(46,91,255,0.22),transparent_60%)] blur-xl" />
        <div className="absolute -bottom-[45%] -end-[12%] h-[600px] w-[600px] animate-[auroraDrift2_20s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle_at_60%_40%,rgba(34,195,94,0.16),transparent_62%)] blur-xl" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(27,42,85,0.10) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage: "radial-gradient(ellipse 65% 70% at 50% 30%, black 25%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 65% 70% at 50% 30%, black 25%, transparent 75%)",
          }}
        />
      </div>

      <Container size="md" className="relative text-center">
        <div className="animate-[riseIn_0.7s_cubic-bezier(0.22,1,0.36,1)_both]">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
        </div>

        <h1 className="mt-5 mb-5 font-display text-[clamp(38px,5.6vw,66px)] leading-[1.05] font-black tracking-tight text-ink">
          <HeadlineWords text={hero.titleLead} startDelay={150} />
          <span className="relative whitespace-nowrap text-primary">
            <span
              className="hero-word hero-shimmer"
              style={{ "--word-delay": `${150 + leadWordCount * 80}ms` } as CSSProperties}
            >
              {hero.titleHighlight}
            </span>
            <svg
              className="absolute start-0 -bottom-2 w-full"
              height="14"
              viewBox="0 0 300 14"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M3 9C60 3 240 3 297 8"
                stroke="#22C35E"
                strokeWidth="5"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                className="animate-[underlineDraw_0.9s_cubic-bezier(0.22,1,0.36,1)_0.9s_both]"
              />
            </svg>
          </span>
        </h1>

        <p className="mx-auto max-w-[640px] animate-[riseIn_0.7s_cubic-bezier(0.22,1,0.36,1)_0.35s_both] text-[18px] leading-relaxed text-muted-2">
          {hero.subtitle}
        </p>
      </Container>
    </section>
  );
}
