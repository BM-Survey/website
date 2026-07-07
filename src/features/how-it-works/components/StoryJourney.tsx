"use client";

import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight, Bolt, Check, Clock, Coins, Users } from "@/components/ui/icons";
import type { HowItWorksDictionary } from "@/i18n/dictionaries";

type StoryJourneyProps = {
  steps: HowItWorksDictionary["steps"];
  preview: HowItWorksDictionary["surveyPreview"];
  /** Accessible name for the sticky chapter-chip rail. */
  navLabel: string;
};

const STEP_COUNT = 4;

/**
 * Tracks how far the visitor has scrolled through the journey section and
 * writes it to the `--jp` custom property (0–1) so the spine fills in pure
 * CSS. Also returns the step the spine has reached, to light up the dots.
 */
function useJourneyProgress(ref: React.RefObject<HTMLElement | null>) {
  const [reached, setReached] = useState(-1);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.6;
      const progress = Math.min(Math.max((anchor - rect.top) / rect.height, 0), 1);
      el.style.setProperty("--jp", progress.toFixed(4));
      setReached(Math.min(STEP_COUNT - 1, Math.floor(progress * STEP_COUNT)));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ref]);

  return reached;
}

const panelTones = [
  "bg-gradient-to-br from-primary to-primary-dark shadow-[0_20px_44px_rgba(46,91,255,0.22)]",
  "bg-gradient-to-b from-ink to-ink-2 shadow-[0_20px_44px_rgba(11,18,32,0.22)]",
  "bg-white border border-primary-border shadow-[var(--shadow-card-lg)]",
  "bg-gradient-to-br from-success to-success-dark shadow-[0_20px_44px_rgba(34,195,94,0.22)]",
];

const tagTones = {
  primary: "text-primary bg-primary-soft",
  purple: "text-purple bg-purple-soft",
  orange: "text-orange bg-orange-soft",
  success: "text-success-dark bg-success-soft",
} as const;

/**
 * The story of the platform told as a scroll-driven vertical journey:
 * a spine that fills as you read, numbered milestones that light up, and a
 * visual vignette for every chapter — profile, matching, answering, payout.
 */
export function StoryJourney({ steps, preview, navLabel }: StoryJourneyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const chipsRef = useRef<HTMLElement>(null);
  const reached = useJourneyProgress(sectionRef);
  const active = Math.max(0, reached);

  // Keep the active chapter chip centered in the scrollable rail, like a
  // native segmented control following the screen you're on.
  useEffect(() => {
    const rail = chipsRef.current;
    if (!rail || rail.scrollWidth <= rail.clientWidth) return;
    const chip = rail.querySelectorAll("a")[active];
    chip?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  const vignettes = [
    <ProfileVignette key="profile" />,
    <MatchVignette key="match" cards={preview.cards.slice(0, 2)} />,
    <AnswerVignette key="answer" />,
    <PaidVignette key="paid" reward={preview.cards[0].reward} />,
  ];

  return (
    <section ref={sectionRef} className="relative pt-4 pb-28">
      {/* Sticky chapter rail — horizontally scrollable, like a native app's
          segmented tabs pinned under the navbar */}
      <nav
        ref={chipsRef}
        aria-label={navLabel}
        className="hiw-chips sticky top-20 z-30 mb-12 overflow-x-auto px-6 py-1 lg:top-24"
      >
        <div className="mx-auto flex w-max items-center gap-1.5 rounded-full border border-primary-border bg-white/85 p-1.5 shadow-[var(--shadow-card-lg)] backdrop-blur-xl">
          {steps.map((step, i) => (
            <a
              key={step.number}
              href={`#journey-step-${i + 1}`}
              aria-current={i === active ? "step" : undefined}
              className={
                "flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 transition-all duration-300 " +
                (i === active ? "bg-primary shadow-[0_6px_16px_rgba(46,91,255,0.35)]" : "hover:bg-primary-soft")
              }
            >
              <span
                className={
                  "flex h-5.5 w-5.5 items-center justify-center rounded-full font-display text-[11px] font-extrabold transition-colors duration-300 " +
                  (i === active
                    ? "bg-white/25 text-white"
                    : i < active
                      ? "bg-success text-white"
                      : "bg-primary-soft text-primary")
                }
              >
                {i < active ? <Check width={11} height={11} /> : step.number.replace(/^0/, "")}
              </span>
              <span
                className={
                  "font-display text-[13px] font-bold whitespace-nowrap transition-colors duration-300 " +
                  (i === active ? "text-white" : "text-ink")
                }
              >
                {step.title}
              </span>
            </a>
          ))}
        </div>
      </nav>

      <Container size="lg">
        <div className="relative">
        {/* Journey spine — fills top-to-bottom as the visitor scrolls. Shares
            the content box with the list so it lines up with the dots. */}
        <div
          className="absolute top-2 bottom-2 start-[21px] w-[3px] -translate-x-1/2 overflow-hidden rounded-full bg-[#dfe4f5] md:start-1/2 rtl:translate-x-1/2"
          aria-hidden
        >
          <div className="hiw-spine-fill w-full rounded-full bg-gradient-to-b from-primary via-purple to-success" />
        </div>

        <ol className="flex flex-col gap-16 md:gap-24">
          {steps.map((step, i) => {
            const lit = i <= reached;
            const flip = i % 2 === 1;
            return (
              <li key={step.number} id={`journey-step-${i + 1}`} className="relative scroll-mt-36">
                {/* Milestone dot */}
                <span
                  className={
                    "absolute top-0 start-[21px] z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border-4 border-bg font-display text-[13px] font-extrabold transition-all duration-500 md:top-1/2 md:start-1/2 md:-translate-y-1/2 rtl:translate-x-1/2 " +
                    (lit
                      ? "scale-110 bg-primary text-white shadow-[0_10px_24px_rgba(46,91,255,0.4)]"
                      : "bg-white text-muted-3 shadow-[var(--shadow-card)]")
                  }
                  aria-hidden
                >
                  {lit && i < reached ? <Check width={16} height={16} /> : step.number.replace(/^0/, "")}
                </span>

                <div className="grid items-center gap-8 ps-14 md:grid-cols-2 md:gap-24 md:ps-0">
                  {/* Chapter text */}
                  <Reveal
                    variant={flip ? "right" : "left"}
                    className={
                      "relative " +
                      (flip ? "md:order-2 md:ps-14" : "md:pe-14 md:text-end")
                    }
                  >
                    <span
                      className="pointer-events-none absolute -top-9 start-0 font-display text-[76px] leading-none font-black tracking-tight text-ink/[0.05] md:-top-12 md:start-auto md:end-0 md:text-[110px]"
                      aria-hidden
                    >
                      {step.number}
                    </span>
                    <div className="relative">
                      <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 font-display text-[12px] font-extrabold tracking-wide text-primary uppercase">
                        {step.number}
                        <ArrowRight width={11} height={11} className="rtl:rotate-180" />
                      </span>
                      <h3 className="mb-3 font-display text-[clamp(24px,2.6vw,34px)] leading-tight font-black tracking-tight text-ink">
                        {step.title}
                      </h3>
                      <p className="text-[16px] leading-relaxed text-muted-2">{step.text}</p>
                    </div>
                  </Reveal>

                  {/* Chapter vignette */}
                  <Reveal variant="zoom" delay={0.12} className={flip ? "md:order-1" : ""}>
                    <div
                      className={`relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-[26px] p-8 ${panelTones[i]}`}
                      aria-hidden
                    >
                      <div className="absolute -top-1/3 -end-1/4 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.14),transparent_60%)]" />
                      {vignettes[i]}
                    </div>
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Vignettes — purely visual chapter illustrations, no copy needed     */
/* ------------------------------------------------------------------ */

/** Chapter 1: a profile card assembling itself. */
function ProfileVignette() {
  return (
    <div className="relative w-full max-w-[260px]">
      <div className="rounded-2xl bg-white p-5 shadow-[var(--shadow-float)]">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary">
            <Users width={22} height={22} />
          </span>
          <div className="flex-1">
            <div className="mb-1.5 h-2.5 w-3/4 rounded-full bg-[#dfe4f5]" />
            <div className="h-2 w-1/2 rounded-full bg-[#edf1fb]" />
          </div>
        </div>
        <div className="mb-4 flex flex-wrap gap-1.5">
          <span className="h-6 w-16 rounded-full bg-primary-soft" />
          <span className="h-6 w-20 rounded-full bg-purple-soft" />
          <span className="h-6 w-14 rounded-full bg-orange-soft" />
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#edf1fb]">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-primary to-success" />
        </div>
      </div>
      <span className="absolute -top-3 -end-3 flex h-9 w-9 animate-[floaty_5s_ease-in-out_infinite] items-center justify-center rounded-full bg-success text-white shadow-[0_10px_22px_rgba(34,195,94,0.45)]">
        <Check width={16} height={16} />
      </span>
    </div>
  );
}

/** Chapter 2: surveys radar-matching to the profile. */
function MatchVignette({ cards }: { cards: HowItWorksDictionary["surveyPreview"]["cards"] }) {
  return (
    <div className="relative w-full max-w-[270px]">
      <span className="absolute start-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 animate-[pulseRing_2.4s_ease-out_infinite] rounded-full border-2 border-white/25 rtl:translate-x-1/2" />
      <div className="relative flex flex-col gap-3">
        {cards.map((card, i) => (
          <div
            key={card.title}
            className={
              "rounded-2xl bg-white p-4 shadow-[var(--shadow-float)] " +
              (i === 0
                ? "animate-[floaty_5s_ease-in-out_infinite] rotate-[-2deg]"
                : "ms-8 animate-[floaty2_6s_ease-in-out_infinite]")
            }
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <span
                className={`rounded-lg px-2 py-0.5 text-[11px] font-bold ${tagTones[card.tone as keyof typeof tagTones]}`}
              >
                {card.tag}
              </span>
              <span className="font-display text-sm font-extrabold text-success-dark">
                {card.reward}
              </span>
            </div>
            <div className="font-display text-[13px] font-bold text-ink">{card.title}</div>
            <div className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-muted">
              <Clock width={11} height={11} /> {card.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Chapter 3: a question mid-answer. */
function AnswerVignette() {
  return (
    <div className="relative w-full max-w-[250px]">
      <div className="rounded-2xl bg-bg p-5 shadow-[var(--shadow-card-lg)]">
        <div className="mb-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#dfe4f5]">
          <div className="h-full w-[62%] rounded-full bg-primary" />
        </div>
        <div className="mb-4 h-2 w-1/3 rounded-full bg-[#dfe4f5]" />
        <div className="mb-3 h-3 w-5/6 rounded-full bg-ink/15" />
        <div className="flex flex-col gap-2">
          <span className="h-9 rounded-xl border border-primary-border bg-white" />
          <span className="flex h-9 items-center justify-end rounded-xl border border-primary bg-primary-soft px-3">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
              <Check width={11} height={11} />
            </span>
          </span>
          <span className="h-9 rounded-xl border border-primary-border bg-white" />
        </div>
      </div>
      <span className="absolute -bottom-3 -start-3 flex h-9 w-9 animate-[floaty_5s_ease-in-out_infinite] items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-white shadow-[0_10px_22px_rgba(46,91,255,0.45)]">
        <ArrowRight width={15} height={15} className="rtl:rotate-180" />
      </span>
    </div>
  );
}

/** Chapter 4: the payout landing. */
function PaidVignette({ reward }: { reward: string }) {
  return (
    <div className="relative flex w-full max-w-[250px] flex-col items-center">
      <span className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white text-success shadow-[0_16px_34px_rgba(11,18,32,0.25)]">
        <span className="absolute inset-0 animate-[pulseRing_2s_ease-out_infinite] rounded-full bg-white/40" />
        <Coins width={34} height={34} className="relative" />
      </span>
      <span className="mb-4 flex animate-[floaty_5s_ease-in-out_infinite] items-center gap-1.5 rounded-full bg-white px-4 py-2 font-display text-lg font-black text-success-dark shadow-[var(--shadow-float)]">
        +{reward}
        <Bolt width={15} height={15} className="text-amber" />
      </span>
      <div className="w-full rounded-2xl bg-white/95 p-4 shadow-[var(--shadow-card-lg)]">
        <div className="mb-1.5 h-2 w-1/3 rounded-full bg-[#dfe4f5]" />
        <div className="flex items-center justify-between">
          <div className="h-3.5 w-1/2 rounded-full bg-ink/15" />
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success text-white">
            <Check width={12} height={12} />
          </span>
        </div>
      </div>
    </div>
  );
}
