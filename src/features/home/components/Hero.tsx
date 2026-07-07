"use client";

import { Fragment, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { ArrowRight, Coins, Bolt, Clock, Play, Check, ChevronDown, DollarSign } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/i18n/config";
import type { CommonDictionary, HomeDictionary } from "@/i18n/dictionaries";
import { authUrls, pageHref } from "@/lib/navigation";
import { StarRating } from "./StarRating";
import { PhoneFrame } from "./PhoneFrame";

type HeroProps = {
  locale: Locale;
  hero: HomeDictionary["hero"];
  actions: CommonDictionary["actions"];
};

const STEP_COUNT = 4;

/**
 * Drives the four journey steps (Browse → Answer → Submit → Get Paid).
 *
 * On large screens the hero is a pinned scroll track: the content is `sticky`
 * inside a tall wrapper and the visitor scrubs through the steps by
 * scrolling. Continuous progress is written to the `--hp` custom property on
 * the track so pure-CSS details (the fractional step bars) stay in sync
 * without re-rendering React.
 *
 * Below `lg` the pinned layout can't fit text + phone in one viewport, so the
 * hero sits in normal flow and the steps auto-advance on a timer instead.
 */
function useScrollStep(trackRef: React.RefObject<HTMLDivElement | null>) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    let cleanup: (() => void) | undefined;

    const setupDesktop = () => {
      let frame = 0;
      const update = () => {
        frame = 0;
        const track = trackRef.current;
        if (!track) return;
        const rect = track.getBoundingClientRect();
        const total = track.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const progress = total > 0 ? scrolled / total : 0;
        track.style.setProperty("--hp", progress.toFixed(4));
        setStep(Math.min(STEP_COUNT - 1, Math.floor(progress * STEP_COUNT)));
      };
      const onScroll = () => {
        if (!frame) frame = window.requestAnimationFrame(update);
      };
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      cleanup = () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        if (frame) window.cancelAnimationFrame(frame);
      };
    };

    const setupMobile = () => {
      let current = 0;
      const apply = () => {
        setStep(current);
        trackRef.current?.style.setProperty("--hp", ((current + 1) / STEP_COUNT).toFixed(4));
      };
      apply();
      const id = window.setInterval(() => {
        current = (current + 1) % STEP_COUNT;
        apply();
      }, 3200);
      cleanup = () => window.clearInterval(id);
    };

    const setup = () => {
      cleanup?.();
      if (desktop.matches) setupDesktop();
      else setupMobile();
    };
    setup();
    desktop.addEventListener("change", setup);
    return () => {
      desktop.removeEventListener("change", setup);
      cleanup?.();
    };
  }, [trackRef]);

  return step;
}

/**
 * Pointer-follow 3D tilt for the phone mockup. Desktop-only (fine pointers)
 * and disabled entirely for reduced-motion users; it drives `--tilt-x/y`
 * custom properties so the transform stays in CSS.
 */
function useTilt() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--tilt-x", `${(-y * 8).toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${(x * 10).toFixed(2)}deg`);
    };
    const onLeave = () => {
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return ref;
}

/** Ambient glow behind the phone, tinted to match the active journey step. */
const stepGlows = [
  "radial-gradient(circle at 50% 45%, rgba(46,91,255,0.32), transparent 65%)",
  "radial-gradient(circle at 50% 45%, rgba(122,63,242,0.28), transparent 65%)",
  "radial-gradient(circle at 50% 45%, rgba(255,176,32,0.28), transparent 65%)",
  "radial-gradient(circle at 50% 45%, rgba(34,195,94,0.32), transparent 65%)",
];

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
            style={{ "--word-delay": `${startDelay + i * 80}ms` } as React.CSSProperties}
          >
            {word}
          </span>{" "}
        </Fragment>
      ))}
    </>
  );
}

export function Hero({ locale, hero, actions }: HeroProps) {
  const p = hero.phone;
  const steps = [hero.steps.browse, hero.steps.answer, hero.steps.submit, hero.steps.getPaid];
  const trackRef = useRef<HTMLDivElement>(null);
  const step = useScrollStep(trackRef);
  const tiltRef = useTilt();
  const leadWordCount = hero.titleLead.split(" ").length;

  return (
    <section id="top" className="relative">
      {/* Scroll track — on lg+ its extra height gives room to scrub through
          the four steps while the content stays pinned to the viewport.
          Below lg the hero sits in normal flow and steps auto-advance. */}
      <div ref={trackRef} className="relative lg:h-[320vh]">
        <div className="flex items-center overflow-hidden pt-28 pb-12 sm:pt-32 lg:sticky lg:top-0 lg:min-h-screen">
          {/* Ambient background: drifting aurora blobs + faded dot grid */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <div className="absolute -top-[10%] -start-[8%] h-[620px] w-[620px] animate-[auroraDrift_14s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(46,91,255,0.28),transparent_60%)] blur-xl" />
            <div className="absolute -bottom-[15%] -end-[10%] h-[680px] w-[680px] animate-[auroraDrift2_18s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle_at_60%_40%,rgba(34,195,94,0.18),transparent_62%)] blur-xl" />
            <div className="absolute top-[30%] start-[38%] h-[420px] w-[420px] animate-[auroraDrift_22s_ease-in-out_2s_infinite] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(122,63,242,0.12),transparent_62%)] blur-xl" />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(rgba(27,42,85,0.10) 1px, transparent 1px)",
                backgroundSize: "26px 26px",
                maskImage: "radial-gradient(ellipse 70% 60% at 50% 42%, black 25%, transparent 75%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 70% 60% at 50% 42%, black 25%, transparent 75%)",
              }}
            />
          </div>

          <Container className="relative grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        {/* LEFT — centered on mobile, start-aligned from lg */}
        <div className="mx-auto max-w-[560px] text-center lg:mx-0 lg:text-start [&>*]:animate-[riseIn_0.7s_cubic-bezier(0.22,1,0.36,1)_both] [&>*:nth-child(2)]:[animation-delay:90ms] [&>*:nth-child(3)]:[animation-delay:180ms] [&>*:nth-child(4)]:[animation-delay:270ms] [&>*:nth-child(5)]:[animation-delay:360ms]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-border bg-white px-3.5 py-1.5 shadow-[0_4px_14px_rgba(16,32,90,0.06)]">
            <StarRating size={14} label={`${hero.ratingValue} / 5`} />
            <span className="font-display text-[13px] font-bold text-ink">{hero.ratingValue}</span>
            <span className="text-[12.5px] text-muted">{hero.ratingLabel}</span>
          </div>

          <h1 className="mb-5 font-display text-[clamp(35px,5vw,66px)] leading-[1.05] font-black tracking-tight text-ink lg:leading-[1.02]">
            <HeadlineWords text={hero.titleLead} startDelay={150} />
            <br />
            <HeadlineWords text={hero.titleSharing} startDelay={150 + leadWordCount * 80} />
            <span className="relative whitespace-nowrap text-primary">
              <span
                className="hero-word hero-shimmer"
                style={
                  {
                    "--word-delay": `${150 + (leadWordCount + hero.titleSharing.split(" ").length) * 80}ms`,
                  } as React.CSSProperties
                }
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
                  className="animate-[underlineDraw_0.9s_cubic-bezier(0.22,1,0.36,1)_1s_both]"
                />
              </svg>
            </span>
          </h1>

          <p className="mx-auto mb-7 max-w-[480px] text-[16.5px] leading-relaxed text-muted-2 sm:text-[18.5px] lg:mx-0">
            {hero.subtitle} <b className="text-ink">{hero.subtitleBold}</b> {hero.subtitleTail}
          </p>

          <div className="mb-2 flex flex-wrap justify-center gap-3 lg:mb-7 lg:justify-start">
            <Button
              href={authUrls.register}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              className="hero-shine hover:shadow-[0_16px_36px_rgba(46,91,255,0.48)]"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/25">
                <DollarSign width={14} height={14} />
              </span>
              {actions.earnMoney}
              <ArrowRight width={18} height={18} className="rtl:rotate-180" />
            </Button>
            <Button href={pageHref(locale, "howItWorks")} variant="secondary">
              <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-primary-soft">
                <span className="absolute inset-0 animate-[pulseRing_1.8s_ease-out_infinite] rounded-full bg-primary/25" />
                <Play width={11} height={11} className="relative text-primary" />
              </span>
              {actions.seeHowItWorks}
            </Button>
          </div>

          {/* Step tracker — desktop position (mobile renders it below the phone) */}
          <StepTracker
            steps={steps}
            step={step}
            label={hero.scroll}
            className="hidden max-w-[440px] lg:flex"
          />
        </div>

        {/* RIGHT: phone mockup + floating badges */}
        <div className="relative flex animate-[riseIn_0.9s_cubic-bezier(0.22,1,0.36,1)_0.25s_both] flex-col items-center justify-center">
          {/* Step-tinted glow + slow conic ring behind the device */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
            {stepGlows.map((glow, i) => (
              <div
                key={glow}
                className={
                  "absolute h-[560px] w-[560px] rounded-full blur-2xl transition-opacity duration-700 " +
                  (i === step ? "opacity-100" : "opacity-0")
                }
                style={{ background: glow }}
              />
            ))}
            <div
              className="absolute h-[540px] w-[540px] animate-[heroRing_26s_linear_infinite] rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(46,91,255,0.35), transparent 30%, rgba(34,195,94,0.28) 55%, transparent 78%, rgba(46,91,255,0.35))",
                maskImage: "radial-gradient(circle, transparent 61%, black 62%, black 66%, transparent 67%)",
                WebkitMaskImage:
                  "radial-gradient(circle, transparent 61%, black 62%, black 66%, transparent 67%)",
              }}
            />
          </div>

          {/* Phone + badges share one anchor so the badges hug the device on
              every screen size */}
          <div className="relative">
          {/* Pointer-follow tilt wrapper (desktop only) */}
          <div ref={tiltRef} className="relative [perspective:1200px]">
            <div
              className="transition-transform duration-300 ease-out will-change-transform [transform:rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))]"
            >
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
                    <PaidScreen p={p} active={step === 3} />
                  </PhoneScreen>
                </div>
              </PhoneFrame>
            </div>
          </div>

          {/* Floating badge: paid — entrance runs on the outer wrapper so it
              doesn't fight the infinite floaty transform on the inner one */}
          <div className="absolute top-14 -start-6 animate-[riseIn_0.7s_cubic-bezier(0.22,1,0.36,1)_0.55s_both] sm:-start-16 lg:-start-24">
            <div
              className={
                "flex animate-[floaty_5s_ease-in-out_infinite] items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-[var(--shadow-float)] transition-transform duration-500 " +
                (step === 3 ? "scale-110" : "")
              }
            >
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
          </div>

          {/* Floating badge: instant */}
          <div className="absolute bottom-16 -end-6 animate-[riseIn_0.7s_cubic-bezier(0.22,1,0.36,1)_0.7s_both] sm:-end-16 lg:-end-24">
            <div className="flex animate-[floaty2_6s_ease-in-out_infinite] items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-[var(--shadow-float)]">
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
          </div>

          {/* Step tracker — mobile position, right under the story it tracks */}
          <StepTracker
            steps={steps}
            step={step}
            label={hero.scroll}
            className="mt-8 flex w-full max-w-[380px] lg:hidden"
          />
        </div>
          </Container>

          {/* Scroll cue — desktop only (mobile steps auto-advance), fades away
              once the visitor starts scrolling */}
          <div
            className={
              "pointer-events-none absolute bottom-6 start-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 transition-all duration-500 rtl:translate-x-1/2 lg:flex " +
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

/** Four-step progress tracker; bars fill fractionally via the --hp variable. */
function StepTracker({
  steps,
  step,
  label,
  className,
}: {
  steps: string[];
  step: number;
  label: string;
  className?: string;
}) {
  return (
    <ol className={"gap-2 " + (className ?? "flex")} aria-label={label}>
      {steps.map((stepLabel, i) => (
        <li key={stepLabel} className="flex-1 text-center" aria-current={i === step ? "step" : undefined}>
          <span className="block h-1 overflow-hidden rounded-full bg-[#dfe4f5]" aria-hidden>
            <span
              className="hero-bar-fill block h-full rounded-full bg-gradient-to-r from-primary to-[#22C35E]"
              style={{ "--bar-index": i } as React.CSSProperties}
            />
          </span>
          <span
            className={
              "mt-2 block font-display text-xs font-bold transition-all duration-300 " +
              (i === step ? "translate-y-0 scale-105 text-primary" : i < step ? "text-ink" : "text-muted-3")
            }
          >
            {stepLabel}
          </span>
        </li>
      ))}
    </ol>
  );
}

type PhoneData = HomeDictionary["hero"]["phone"];

/**
 * Cross-fading layer for a single phone screen. Inactive screens sit slightly
 * deeper (scaled down + blurred) so switching reads as a depth change, and the
 * data attribute re-triggers the staggered card entrances on activation.
 */
function PhoneScreen({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div
      data-phone-active={active}
      className={
        "absolute inset-0 transition-all duration-500 ease-out " +
        (active
          ? "translate-y-0 scale-100 opacity-100 blur-0"
          : "pointer-events-none translate-y-3 scale-[0.97] opacity-0 blur-[2px]")
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
      <div data-stagger>
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

      <div className="flex flex-col gap-2.5" data-stagger>
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
      <div data-stagger>
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

/** Deterministic confetti layout for the payout celebration. */
const confettiPieces = [
  { x: "6%", delay: "0s", color: "#2e5bff", duration: "1.5s" },
  { x: "18%", delay: "0.25s", color: "#22c35e", duration: "1.8s" },
  { x: "30%", delay: "0.1s", color: "#ffb020", duration: "1.4s" },
  { x: "44%", delay: "0.35s", color: "#7a3ff2", duration: "1.7s" },
  { x: "56%", delay: "0.05s", color: "#22c35e", duration: "1.5s" },
  { x: "68%", delay: "0.3s", color: "#2e5bff", duration: "1.9s" },
  { x: "80%", delay: "0.15s", color: "#ffb020", duration: "1.4s" },
  { x: "92%", delay: "0.4s", color: "#7a3ff2", duration: "1.6s" },
];

function PaidScreen({ p, active }: { p: PhoneData; active: boolean }) {
  const f = p.flow;
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden px-6 pt-11 pb-6 text-center">
      {/* Confetti burst — remounts each time the step activates */}
      {active && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {confettiPieces.map((piece) => (
            <span
              key={piece.x}
              className="absolute top-0 h-2.5 w-1.5 rounded-[2px]"
              style={{
                insetInlineStart: piece.x,
                background: piece.color,
                animation: `confettiFall ${piece.duration} ease-in ${piece.delay} both`,
              }}
            />
          ))}
        </div>
      )}

      <span
        className={
          "mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-success text-white shadow-[0_16px_30px_rgba(34,195,94,0.35)] " +
          (active ? "animate-[popSpring_0.6s_cubic-bezier(0.22,1,0.36,1)_0.15s_both]" : "")
        }
      >
        <Check width={40} height={40} />
      </span>
      <div className="mb-1 font-display text-[19px] font-extrabold text-ink">{f.paidTitle}</div>
      <div
        className={
          "mb-5 font-display text-[34px] font-black text-success " +
          (active ? "animate-[popSpring_0.6s_cubic-bezier(0.22,1,0.36,1)_0.3s_both]" : "")
        }
      >
        {f.paidAmount}
      </div>

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
