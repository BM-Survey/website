"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { ArrowRight, Coins, Bolt, Clock, Play, Check, ChevronDown, DollarSign } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import type { CommonDictionary, HomeDictionary } from "@/i18n/dictionaries";
import { anchors, authUrls } from "@/lib/navigation";
import { StarRating } from "./StarRating";
import { PhoneFrame } from "./PhoneFrame";

type HeroProps = {
  hero: HomeDictionary["hero"];
  actions: CommonDictionary["actions"];
};

const STEP_COUNT = 4;

/**
 * Maps scroll progress through the pinned hero track to one of the four
 * journey steps (Browse → Answer → Submit → Get Paid). Because the hero
 * content is `sticky` inside a tall track, the phone mockup stays centered
 * on screen and "walks" through the flow as the visitor scrolls.
 */
function useScrollStep(trackRef: React.RefObject<HTMLDivElement | null>) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const total = track.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = total > 0 ? scrolled / total : 0;
      const next = Math.min(STEP_COUNT - 1, Math.floor(progress * STEP_COUNT));
      setStep(next);
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
  }, [trackRef]);

  return step;
}

export function Hero({ hero, actions }: HeroProps) {
  const p = hero.phone;
  const steps = [hero.steps.browse, hero.steps.answer, hero.steps.submit, hero.steps.getPaid];
  const trackRef = useRef<HTMLDivElement>(null);
  const step = useScrollStep(trackRef);

  return (
    <section id="top" className="relative">
      {/* Scroll track — its extra height gives room to scrub through the four
          steps while the content below stays pinned to the viewport. */}
      <div ref={trackRef} className="relative h-[320vh]">
        <div className="sticky top-0 flex min-h-screen items-center overflow-hidden pt-28 pb-12 sm:pt-32">
          {/* Ambient background blobs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <div className="absolute -top-[10%] -start-[8%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(46,91,255,0.28),transparent_60%)] blur-xl" />
            <div className="absolute -bottom-[15%] -end-[10%] h-[680px] w-[680px] rounded-full bg-[radial-gradient(circle_at_60%_40%,rgba(34,195,94,0.18),transparent_62%)] blur-xl" />
          </div>

          <Container className="relative grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        {/* LEFT */}
        <div className="max-w-[560px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-border bg-white px-3.5 py-1.5 shadow-[0_4px_14px_rgba(16,32,90,0.06)]">
            <StarRating size={14} label={`${hero.ratingValue} / 5`} />
            <span className="font-display text-[13px] font-bold text-ink">{hero.ratingValue}</span>
            <span className="text-[12.5px] text-muted">{hero.ratingLabel}</span>
          </div>

          <h1 className="mb-5 font-display text-[clamp(40px,5vw,66px)] leading-[1.02] font-black tracking-tight text-ink">
            {hero.titleLead}
            <br />
            {hero.titleSharing}{" "}
            <span className="relative whitespace-nowrap text-primary">
              {hero.titleHighlight}
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
                />
              </svg>
            </span>
          </h1>

          <p className="mb-7 max-w-[480px] text-[18.5px] leading-relaxed text-muted-2">
            {hero.subtitle} <b className="text-ink">{hero.subtitleBold}</b> {hero.subtitleTail}
          </p>

          <div className="mb-7 flex flex-wrap gap-3">
            <Button href={authUrls.register} target="_blank" rel="noopener noreferrer" variant="primary">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/25">
                <DollarSign width={14} height={14} />
              </span>
              {actions.earnMoney}
              <ArrowRight width={18} height={18} className="rtl:rotate-180" />
            </Button>
            <Button href={anchors.howItWorks} variant="secondary">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-soft">
                <Play width={11} height={11} className="text-primary" />
              </span>
              {actions.seeHowItWorks}
            </Button>
          </div>

          {/* Step tracker — advances with scroll position */}
          <ol className="flex max-w-[440px] gap-2" aria-label={hero.scroll}>
            {steps.map((label, i) => (
              <li key={label} className="flex-1 text-center" aria-current={i === step ? "step" : undefined}>
                <span className={cnBar(i <= step)} aria-hidden />
                <span
                  className={
                    "mt-2 block font-display text-xs font-bold transition-colors duration-300 " +
                    (i === step ? "text-primary" : i < step ? "text-ink" : "text-muted-3")
                  }
                >
                  {label}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* RIGHT: phone mockup + floating badges */}
        <div className="relative flex justify-center">
          <PhoneFrame>
            <div className="relative h-full">
              <PhoneScreen active={step === 0}>
                <BrowseScreen p={p} />
              </PhoneScreen>
              <PhoneScreen active={step === 1}>
                <AnswerScreen p={p} />
              </PhoneScreen>
              <PhoneScreen active={step === 2}>
                <SubmitScreen p={p} cta={actions.signupFree} />
              </PhoneScreen>
              <PhoneScreen active={step === 3}>
                <PaidScreen p={p} />
              </PhoneScreen>
            </div>
          </PhoneFrame>

          {/* Floating badge: paid */}
          <div className="absolute top-16 -start-2 flex animate-[floaty_5s_ease-in-out_infinite] items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-[var(--shadow-float)]">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#ffd25a] to-amber text-white">
              <Coins width={17} height={17} />
            </span>
            <span>
              <span className="block font-display text-sm font-extrabold leading-none">
                {hero.badges.paid.value}
              </span>
              <span className="block text-[10.5px] text-muted">{hero.badges.paid.label}</span>
            </span>
          </div>

          {/* Floating badge: instant */}
          <div className="absolute bottom-20 -end-3 flex animate-[floaty2_6s_ease-in-out_infinite] items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-[var(--shadow-float)]">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Bolt width={16} height={16} />
            </span>
            <span>
              <span className="block font-display text-sm font-extrabold leading-none">
                {hero.badges.instant.value}
              </span>
              <span className="block text-[10.5px] text-muted">{hero.badges.instant.label}</span>
            </span>
          </div>
        </div>
          </Container>

          {/* Scroll cue — fades away once the visitor starts scrolling */}
          <div
            className={
              "pointer-events-none absolute bottom-6 start-1/2 flex -translate-x-1/2 flex-col items-center gap-2 transition-all duration-500 rtl:translate-x-1/2 " +
              (step === 0 ? "opacity-100" : "translate-y-2 opacity-0")
            }
            aria-hidden
          >
            <span className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-muted">
              {hero.scroll}
            </span>
            <span className="flex h-9 w-[22px] items-start justify-center rounded-full border-2 border-muted-3/70 p-1.5">
              <span className="h-1.5 w-1.5 animate-[scrollDot_1.8s_ease-in-out_infinite] rounded-full bg-primary" />
            </span>
            <ChevronDown
              width={16}
              height={16}
              className="animate-[scrollNudge_1.8s_ease-in-out_infinite] text-muted-3"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function cnBar(active: boolean) {
  return (
    "block h-1 rounded-full transition-colors duration-300 " + (active ? "bg-primary" : "bg-[#dfe4f5]")
  );
}

type PhoneData = HomeDictionary["hero"]["phone"];

/** Cross-fading layer for a single phone screen. */
function PhoneScreen({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div
      className={
        "absolute inset-0 transition-all duration-500 ease-out " +
        (active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0")
      }
      aria-hidden={!active}
    >
      {children}
    </div>
  );
}

function PhoneHeader({ p, balanceValue }: { p: PhoneData; balanceValue?: string }) {
  return (
    <div className="mb-4 flex items-start justify-between">
      <div>
        <div className="text-xs text-muted">{p.greeting}</div>
        <div className="font-display text-[19px] font-extrabold">{p.userName}</div>
      </div>
      <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-dark px-3 py-2 text-end text-white">
        <div className="text-[9.5px] opacity-80">{p.balanceLabel}</div>
        <div className="font-display text-base font-extrabold">{balanceValue ?? p.balanceValue}</div>
      </div>
    </div>
  );
}

function BrowseScreen({ p }: { p: PhoneData }) {
  return (
    <div className="px-4 pt-11 pb-4">
      <PhoneHeader p={p} />
      <div className="mb-2.5 font-display text-[13px] font-bold">{p.surveysForYou}</div>
      <SurveyCard
        tag={p.cards.shopping.tag}
        tagTone="primary"
        reward={p.cards.shopping.reward}
        title={p.cards.shopping.title}
        time={p.cards.shopping.time}
        questions={p.cards.shopping.questions}
      />
      <SurveyCard
        tag={p.cards.tech.tag}
        tagTone="purple"
        reward={p.cards.tech.reward}
        title={p.cards.tech.title}
        time={p.cards.tech.time}
        questions={p.cards.tech.questions}
      />
      <SurveyCard
        tag={p.cards.food.tag}
        tagTone="orange"
        reward={p.cards.food.reward}
        title={p.cards.food.title}
      />
    </div>
  );
}

function AnswerScreen({ p }: { p: PhoneData }) {
  const f = p.flow;
  return (
    <div className="flex h-full flex-col px-4 pt-11 pb-4">
      <div className="mb-1 flex items-center justify-between">
        <span className="rounded-lg bg-primary-soft px-2 py-0.5 text-[11px] font-bold text-primary">
          {p.cards.shopping.tag}
        </span>
        <span className="font-display text-base font-extrabold text-success">
          {p.cards.shopping.reward}
        </span>
      </div>
      <div className="mb-2 font-display text-[13px] font-bold">{p.cards.shopping.title}</div>

      {/* Progress */}
      <div className="mb-1 h-1.5 w-full overflow-hidden rounded-full bg-[#dfe4f5]">
        <div className="h-full w-[38%] rounded-full bg-primary" />
      </div>
      <div className="mb-4 text-[11px] text-muted">{f.answerProgress}</div>

      <div className="mb-3 font-display text-[17px] font-extrabold leading-snug">
        {f.answerQuestion}
      </div>

      <div className="flex flex-col gap-2.5">
        {f.answerOptions.map((opt, i) => {
          const selected = i === 1;
          return (
            <div
              key={opt}
              className={
                "flex items-center justify-between rounded-2xl border px-3.5 py-3 text-sm font-semibold " +
                (selected
                  ? "border-primary bg-primary-soft text-primary"
                  : "border-primary-border bg-white text-ink")
              }
            >
              {opt}
              {selected && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                  <Check width={12} height={12} />
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SubmitScreen({ p, cta }: { p: PhoneData; cta: string }) {
  const f = p.flow;
  return (
    <div className="flex h-full flex-col px-4 pt-11 pb-4">
      <div className="mb-3 font-display text-[17px] font-extrabold">{f.submitTitle}</div>

      <SurveyCard
        tag={p.cards.shopping.tag}
        tagTone="primary"
        reward={p.cards.shopping.reward}
        title={p.cards.shopping.title}
        time={p.cards.shopping.time}
        questions={p.cards.shopping.questions}
      />

      <div className="mb-2.5 flex items-center gap-2.5 rounded-2xl bg-success-soft px-3.5 py-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-success text-white">
          <Check width={14} height={14} />
        </span>
        <span className="font-display text-sm font-bold text-ink">{f.submitDone}</span>
      </div>

      <div className="mt-auto">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 font-display text-sm font-bold text-white"
          tabIndex={-1}
        >
          {f.submitCta}
          <ArrowRight width={16} height={16} className="rtl:rotate-180" />
        </button>
        <div className="mt-2 text-center text-[11px] text-muted">{cta}</div>
      </div>
    </div>
  );
}

function PaidScreen({ p }: { p: PhoneData }) {
  const f = p.flow;
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 pt-11 pb-6 text-center">
      <span className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-success text-white shadow-[0_16px_30px_rgba(34,195,94,0.35)]">
        <Check width={40} height={40} />
      </span>
      <div className="mb-1 font-display text-[19px] font-extrabold text-ink">{f.paidTitle}</div>
      <div className="mb-5 font-display text-[34px] font-black text-success">{f.paidAmount}</div>

      <div className="mb-3 flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-[12.5px] font-bold text-primary">
        <Bolt width={13} height={13} />
        {f.paidVia}
      </div>

      <div className="w-full rounded-2xl bg-white p-4 shadow-[var(--shadow-card)]">
        <div className="text-[11px] text-muted">{f.paidBalanceLabel}</div>
        <div className="font-display text-2xl font-extrabold text-ink">{f.paidBalanceValue}</div>
      </div>
    </div>
  );
}

type TagTone = "primary" | "purple" | "orange";
const tagTones: Record<TagTone, string> = {
  primary: "text-primary bg-primary-soft",
  purple: "text-purple bg-purple-soft",
  orange: "text-orange bg-orange-soft",
};

function SurveyCard({
  tag,
  tagTone,
  reward,
  title,
  time,
  questions,
}: {
  tag: string;
  tagTone: TagTone;
  reward: string;
  title: string;
  time?: string;
  questions?: string;
}) {
  return (
    <div className="mb-2.5 rounded-2xl bg-white p-3.5 shadow-[var(--shadow-card)]">
      <div className="mb-2 flex items-center justify-between">
        <span className={`rounded-lg px-2 py-0.5 text-[11px] font-bold ${tagTones[tagTone]}`}>
          {tag}
        </span>
        <span className="font-display text-base font-extrabold text-success">{reward}</span>
      </div>
      <div className="font-display text-sm font-bold leading-tight">{title}</div>
      {time && questions && (
        <div className="mt-2 flex gap-2.5 text-[11px] text-muted">
          <span className="inline-flex items-center gap-1">
            <Clock width={11} height={11} /> {time}
          </span>
          <span>{questions}</span>
        </div>
      )}
    </div>
  );
}
