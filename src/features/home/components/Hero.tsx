import { Button } from "@/components/ui/Button";
import { ArrowRight, Coins, Bolt, Clock, Play } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/i18n/config";
import type { CommonDictionary, HomeDictionary } from "@/i18n/dictionaries";
import { anchors, localizedHref } from "@/lib/navigation";
import { StarRating } from "./StarRating";
import { PhoneFrame } from "./PhoneFrame";

type HeroProps = {
  locale: Locale;
  hero: HomeDictionary["hero"];
  actions: CommonDictionary["actions"];
};

export function Hero({ locale, hero, actions }: HeroProps) {
  const p = hero.phone;
  const steps = [hero.steps.browse, hero.steps.answer, hero.steps.submit, hero.steps.getPaid];

  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-16 sm:pt-40 sm:pb-24">
      {/* Ambient background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-[10%] -start-[8%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(46,91,255,0.28),transparent_60%)] blur-xl" />
        <div className="absolute -bottom-[15%] -end-[10%] h-[680px] w-[680px] rounded-full bg-[radial-gradient(circle_at_60%_40%,rgba(34,195,94,0.18),transparent_62%)] blur-xl" />
      </div>

      <Container className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
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
            <Button href={localizedHref(locale, "/")} variant="primary">
              {actions.signupFree}
              <ArrowRight width={18} height={18} className="rtl:rotate-180" />
            </Button>
            <Button href={anchors.howItWorks} variant="secondary">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-soft">
                <Play width={11} height={11} className="text-primary" />
              </span>
              {actions.seeHowItWorks}
            </Button>
          </div>

          {/* Step tracker */}
          <ol className="flex max-w-[440px] gap-2" aria-label={hero.scroll}>
            {steps.map((label, i) => (
              <li key={label} className="flex-1 text-center">
                <span
                  className={cnBar(i === 0)}
                  aria-hidden
                />
                <span
                  className={
                    "mt-2 block font-display text-xs font-bold " +
                    (i === 0 ? "text-primary" : "text-muted-3")
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
            <div className="px-4 pt-11 pb-4">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <div className="text-xs text-muted">{p.greeting}</div>
                  <div className="font-display text-[19px] font-extrabold">{p.userName}</div>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-dark px-3 py-2 text-end text-white">
                  <div className="text-[9.5px] opacity-80">{p.balanceLabel}</div>
                  <div className="font-display text-base font-extrabold">{p.balanceValue}</div>
                </div>
              </div>
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
    </section>
  );
}

function cnBar(active: boolean) {
  return (
    "block h-1 rounded-full " + (active ? "bg-primary" : "bg-[#dfe4f5]")
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
