"use client";

import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  ArrowRight,
  Bolt,
  ChartBars,
  Check,
  Clock,
  Funnel,
  Gift,
  Home,
  Search,
  User,
  Wallet,
} from "@/components/ui/icons";
import type { HowItWorksDictionary } from "@/i18n/dictionaries";
import { PhoneFrame } from "@/features/home/components/PhoneFrame";

type StoryJourneyProps = {
  steps: HowItWorksDictionary["steps"];
  preview: HowItWorksDictionary["surveyPreview"];
  phoneScreens: HowItWorksDictionary["phoneScreens"];
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

/** Ambient glow behind each chapter's phone, tinted to match that chapter. */
const stepGlows = [
  "radial-gradient(circle, rgba(46,91,255,0.22), transparent 65%)",
  "radial-gradient(circle, rgba(122,63,242,0.2), transparent 65%)",
  "radial-gradient(circle, rgba(255,176,32,0.2), transparent 65%)",
  "radial-gradient(circle, rgba(34,195,94,0.22), transparent 65%)",
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
export function StoryJourney({ steps, preview, phoneScreens, navLabel }: StoryJourneyProps) {
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

  // Each chapter is illustrated with the same phone-screen chrome used on
  // the homepage hero's status steps, so "how it works" shows the actual
  // app rather than an abstract mockup.
  const vignettes = [
    <ProfileScreen key="profile" p={phoneScreens.profile} />,
    <MatchedScreen key="matched" nav={phoneScreens.nav} p={phoneScreens.matched} cards={preview.cards} />,
    <AnswerScreen key="answer" p={phoneScreens.answer} card={preview.cards[0]} />,
    <PaidScreen key="paid" p={phoneScreens.paid} reward={preview.cards[0].reward} />,
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

                  {/* Chapter vignette — the app itself, in a phone frame */}
                  <Reveal variant="zoom" delay={0.12} className={flip ? "md:order-1" : ""}>
                    <div className="relative flex min-h-[280px] items-center justify-center" aria-hidden>
                      <div
                        className="absolute h-[420px] w-[420px] rounded-full blur-2xl"
                        style={{ background: stepGlows[i] }}
                      />
                      <PhoneFrame className="relative">{vignettes[i]}</PhoneFrame>
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
/* Phone screens — the same app chrome used on the homepage hero's     */
/* Browse / Answer / Submit / Get Paid steps, reused per chapter here. */
/* ------------------------------------------------------------------ */

type NavDict = HowItWorksDictionary["phoneScreens"]["nav"];

/** Small bottom tab bar shared by the chapters that show it. */
function PhoneNav({ nav, active }: { nav: NavDict; active: "surveys" | "profile" }) {
  const items = [
    { key: "surveys", label: nav.surveys, Icon: Home },
    { key: "history", label: nav.history, Icon: Clock },
    { key: "wallet", label: nav.wallet, Icon: Wallet },
    { key: "analytics", label: nav.analytics, Icon: ChartBars },
    { key: "profile", label: nav.profile, Icon: User },
  ] as const;

  return (
    <div className="flex items-start justify-between border-t border-primary-border bg-white px-4 pt-2 pb-3.5">
      {items.map(({ key, label, Icon }) => (
        <span
          key={key}
          className={"flex w-11 flex-col items-center gap-0.5 " + (key === active ? "text-primary" : "text-muted-3")}
        >
          <Icon width={15} height={15} />
          <span className="max-w-full truncate text-[8px] font-semibold">{label}</span>
        </span>
      ))}
    </div>
  );
}

/** Chapter 1: create your profile — same white shadow-card chrome as the
 *  other chapters, with interest chips styled like the Browse category chips.
 *  Onboarding, so a sticky CTA replaces the tab bar (matches the hero's
 *  Answer screen, which does the same while mid-flow). */
function ProfileScreen({ p }: { p: HowItWorksDictionary["phoneScreens"]["profile"] }) {
  return (
    <div className="flex h-full flex-col pt-10">
      <div className="flex-1 overflow-hidden px-3.5">
        <div className="mb-0.5 flex items-center justify-between">
          <div className="font-display text-[17px] font-extrabold text-ink">{p.title}</div>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark font-display text-[11px] font-extrabold text-white">
            {p.nameValue.charAt(0)}
          </span>
        </div>
        <div className="mb-2.5 text-[10.5px] leading-snug text-muted">{p.subtitle}</div>

        <div className="mb-2.5 rounded-2xl bg-white p-2.5 shadow-[var(--shadow-card)]">
          <div className="text-[7.5px] font-bold uppercase tracking-wide text-muted">{p.nameLabel}</div>
          <div className="mt-0.5 font-display text-[11.5px] font-extrabold text-ink">{p.nameValue}</div>
        </div>
        <div className="mb-2.5 rounded-2xl bg-white p-2.5 shadow-[var(--shadow-card)]">
          <div className="text-[7.5px] font-bold uppercase tracking-wide text-muted">{p.emailLabel}</div>
          <div className="mt-0.5 font-display text-[11.5px] font-extrabold text-ink">{p.emailValue}</div>
        </div>

        <div className="mb-1.5 text-[9.5px] font-bold text-muted">{p.interestsLabel}</div>
        <div className="mb-2.5 flex flex-wrap gap-1.5">
          {p.interests.map((interest, i) => (
            <span
              key={interest}
              className={
                "rounded-full px-3 py-1 text-[10.5px] font-bold " +
                (i < 2 ? "bg-primary-dark text-white" : "bg-white text-ink shadow-[var(--shadow-card)]")
              }
            >
              {interest}
            </span>
          ))}
        </div>

        <div className="mb-2.5 rounded-2xl bg-white p-2.5 shadow-[var(--shadow-card)]">
          <div className="mb-1.5 flex items-center justify-between text-[9.5px] font-bold">
            <span className="text-muted">{p.progressLabel}</span>
            <span className="text-primary">{p.progressValue}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
            <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-primary to-[#22C35E]" />
          </div>
        </div>
      </div>

      <div className="border-t border-primary-border bg-white px-4 pt-2.5 pb-3.5">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-1.5 rounded-2xl bg-primary py-2.5 font-display text-[11px] font-bold text-white"
          tabIndex={-1}
        >
          {p.cta}
          <ArrowRight width={13} height={13} className="rtl:rotate-180" />
        </button>
      </div>
    </div>
  );
}

/** Chapter 2: get matched — the hero's Browse screen, unfiltered so every
 *  matched category shows at once. */
function MatchedScreen({
  nav,
  p,
  cards,
}: {
  nav: NavDict;
  p: HowItWorksDictionary["phoneScreens"]["matched"];
  cards: HowItWorksDictionary["surveyPreview"]["cards"];
}) {
  return (
    <div className="flex h-full flex-col pt-10">
      <div className="px-3.5">
        <div className="mb-0.5 font-display text-[17px] font-extrabold text-ink">{p.heading}</div>
        <div className="mb-2.5 text-[10.5px] leading-snug text-muted">{p.subtitle}</div>

        <div className="mb-2.5 flex items-center gap-2">
          <div className="flex h-9 flex-1 items-center gap-2 rounded-full bg-white px-3 text-muted-3 shadow-[var(--shadow-card)]">
            <Search width={14} height={14} />
            <span className="text-[11px]">{p.search}</span>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white text-ink shadow-[var(--shadow-card)]">
            <Funnel width={14} height={14} />
          </span>
        </div>

        <div className="mb-2.5 flex gap-1.5">
          <span className="rounded-full bg-primary-dark px-3 py-1 text-[10.5px] font-bold text-white">
            {p.allChip}
          </span>
          {cards.map((card) => (
            <span
              key={card.tag}
              className="rounded-full bg-white px-3 py-1 text-[10.5px] font-bold text-ink shadow-[var(--shadow-card)]"
            >
              {card.tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-3.5" data-stagger>
        {cards.map((card) => (
          <div
            key={card.title}
            className="relative mb-2 overflow-hidden rounded-2xl bg-white p-2.5 ps-3.5 shadow-[var(--shadow-card)]"
          >
            <span
              className={`absolute inset-y-0 start-0 w-1 ${tagTones[card.tone as keyof typeof tagTones].split(" ")[0].replace("text-", "bg-")}`}
              aria-hidden
            />
            <div className="mb-1">
              <span
                className={`rounded-lg px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wide ${tagTones[card.tone as keyof typeof tagTones]}`}
              >
                {card.tag}
              </span>
            </div>
            <div className="mb-1.5 font-display text-[12px] font-extrabold leading-tight text-ink">
              {card.title}
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-full bg-primary-dark px-2 py-1 font-display text-[10.5px] font-extrabold text-white">
                <Gift width={11} height={11} />
                {card.reward}
              </span>
              <span className="flex items-center gap-1 text-[9px] text-muted">
                <Clock width={10} height={10} />
                {card.time}
              </span>
              <span className="ms-auto flex h-6 w-6 items-center justify-center rounded-full bg-line text-muted-2">
                <ArrowRight width={11} height={11} className="rtl:rotate-180" />
              </span>
            </div>
          </div>
        ))}
      </div>

      <PhoneNav nav={nav} active="surveys" />
    </div>
  );
}

/** Chapter 3: answer & submit — the hero's Answer screen, progressed near
 *  the end and labeled with the submit CTA instead of "Next". */
function AnswerScreen({
  p,
  card,
}: {
  p: HowItWorksDictionary["phoneScreens"]["answer"];
  card: HowItWorksDictionary["surveyPreview"]["cards"][number];
}) {
  const progressPct = 83;

  return (
    <div className="flex h-full flex-col pt-10">
      <div className="px-3.5">
        <div className="mb-0.5 flex items-center justify-between">
          <div className="font-display text-[17px] font-extrabold text-ink">{card.title}</div>
        </div>
        <div className="mb-2.5 flex items-center gap-1.5">
          <span
            className={`rounded-lg px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wide ${tagTones[card.tone as keyof typeof tagTones]}`}
          >
            {card.tag}
          </span>
          <span className="flex items-center gap-1 rounded-full bg-primary-dark px-2 py-0.5 font-display text-[9.5px] font-extrabold text-white">
            <Gift width={10} height={10} />
            {card.reward}
          </span>
        </div>

        <div className="mb-2.5 rounded-2xl bg-white p-2.5 shadow-[var(--shadow-card)]">
          <div className="mb-1.5 flex items-center justify-between text-[9.5px] font-bold">
            <span className="text-muted">{p.progressLabel}</span>
            <span className="text-primary">{progressPct}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-[#22C35E]"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-3.5" data-stagger>
        <div className="mb-2.5 font-display text-[13px] font-extrabold leading-snug text-ink">{p.question}</div>

        <div className="flex flex-col gap-1.5">
          {p.options.map((opt, i) => {
            const selected = i === 1;
            return (
              <div
                key={opt}
                className={
                  "flex items-center justify-between rounded-2xl bg-white px-3 py-2.5 text-[11px] font-semibold shadow-[var(--shadow-card)] " +
                  (selected ? "text-primary ring-2 ring-primary" : "text-ink")
                }
              >
                {opt}
                <span
                  className={
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 " +
                    (selected ? "border-primary bg-primary text-white" : "border-primary-border bg-white")
                  }
                >
                  {selected && <Check width={9} height={9} />}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-primary-border bg-white px-4 pt-2.5 pb-3.5">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-1.5 rounded-2xl bg-primary py-2.5 font-display text-[11px] font-bold text-white"
          tabIndex={-1}
        >
          {p.submitCta}
          <ArrowRight width={13} height={13} className="rtl:rotate-180" />
        </button>
      </div>
    </div>
  );
}

/** Deterministic confetti layout, reused from the hero's Get Paid screen. */
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

/** Chapter 4: get paid — the hero's payout celebration screen. */
function PaidScreen({ p, reward }: { p: HowItWorksDictionary["phoneScreens"]["paid"]; reward: string }) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden px-6 pt-11 pb-6 text-center">
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

      <span className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-success text-white shadow-[0_16px_30px_rgba(34,195,94,0.35)]">
        <Check width={40} height={40} />
      </span>
      <div className="mb-1 font-display text-[19px] font-extrabold text-ink">{p.title}</div>
      <div className="mb-5 font-display text-[34px] font-black text-success">+{reward}</div>

      <div className="mb-3 flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-[12.5px] font-bold text-primary">
        <Bolt width={13} height={13} />
        {p.via}
      </div>

      <div className="w-full rounded-2xl bg-white p-4 shadow-[var(--shadow-card)]">
        <div className="text-[11px] text-muted">{p.balanceLabel}</div>
        <div className="font-display text-2xl font-extrabold text-ink">{p.balanceValue}</div>
      </div>
    </div>
  );
}
