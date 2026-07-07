import { ArrowRight, Bolt, Clock, Funnel, Gift, Search, Star } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeDictionary } from "@/i18n/dictionaries";
import { PhoneFrame } from "./PhoneFrame";

type FeatureSurveysProps = {
  feature: HomeDictionary["feature1"];
};

/** Index of the chip shown as selected — the phone demonstrates filtering
 *  the matched feed down to a single chosen category. */
const ACTIVE_CHIP_INDEX = 1;

export function FeatureSurveys({ feature }: FeatureSurveysProps) {
  const p = feature.phone;
  const points = [
    {
      title: feature.points.matching.title,
      text: feature.points.matching.text,
      icon: <Star className="text-primary" />,
      bg: "bg-primary-soft",
    },
    {
      title: feature.points.upfront.title,
      text: feature.points.upfront.text,
      icon: <Bolt className="text-success" />,
      bg: "bg-success-soft",
    },
    {
      title: feature.points.biteSized.title,
      text: feature.points.biteSized.text,
      icon: <Clock className="text-orange" />,
      bg: "bg-orange-soft",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 sm:py-30" aria-label={`${feature.titleLine1} ${feature.titleLine2}`}>
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal variant="left" stagger={0.09}>
          <Eyebrow>{feature.eyebrow}</Eyebrow>
          <h2 className="mt-5 mb-5 font-display text-[clamp(32px,3.6vw,46px)] leading-tight font-black tracking-tight text-ink">
            {feature.titleLine1}
            <br />
            {feature.titleLine2}
          </h2>
          <p className="mb-7 max-w-[440px] text-[17px] leading-relaxed text-muted-2">
            {feature.description}
          </p>
          <ul className="flex flex-col gap-3.5">
            {points.map((point) => (
              <li key={point.title} className="flex items-start gap-3.5">
                <span className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl ${point.bg}`}>
                  {point.icon}
                </span>
                <div>
                  <div className="font-display text-base font-bold text-ink">{point.title}</div>
                  <div className="text-[14.5px] leading-relaxed text-muted">{point.text}</div>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal variant="right" delay={0.15} className="flex justify-center">
          <PhoneFrame>
            {/* Same app chrome as the hero's Browse step — header, search,
                category chips — but only one chip is active, so the list
                below shows just that category's matched surveys. */}
            <div className="flex h-full flex-col pt-10">
              <div className="px-3.5">
                <div className="mb-0.5 flex items-center justify-between">
                  <div className="font-display text-[17px] font-extrabold text-ink">{p.heading}</div>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-soft text-primary">
                    <Star width={13} height={13} />
                  </span>
                </div>
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
                  {p.chips.map((chip, i) => (
                    <span
                      key={chip}
                      className={
                        "rounded-full px-3 py-1 text-[10.5px] font-bold " +
                        (i === ACTIVE_CHIP_INDEX
                          ? "bg-primary-dark text-white"
                          : "bg-white text-ink shadow-[var(--shadow-card)]")
                      }
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-hidden px-3.5 pb-4" data-stagger>
                {p.cards.map((card, i) => (
                  <MatchCard key={card.title} card={card} highlight={i === 0} />
                ))}
              </div>
            </div>
          </PhoneFrame>
        </Reveal>
      </Container>
    </section>
  );
}

type MatchCardData = HomeDictionary["feature1"]["phone"]["cards"][number];

function MatchCard({ card, highlight }: { card: MatchCardData; highlight: boolean }) {
  if (highlight) {
    return (
      <div className="mb-2.5 rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-3 text-white">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="rounded-lg bg-white/20 px-2 py-0.5 text-[9.5px] font-bold">{card.match}</span>
          <span className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 font-display text-[10.5px] font-extrabold">
            <Gift width={10} height={10} />
            {card.reward}
          </span>
        </div>
        <div className="mb-1.5 font-display text-[12.5px] font-extrabold leading-tight">{card.title}</div>
        <div className="flex items-center gap-1 text-[9.5px] opacity-85">
          <Clock width={10} height={10} />
          {card.time} · {card.questions}
        </div>
      </div>
    );
  }

  return (
    <div className="relative mb-2 overflow-hidden rounded-2xl bg-white p-2.5 ps-3.5 shadow-[var(--shadow-card)]">
      <span className="absolute inset-y-0 start-0 w-1 bg-primary" aria-hidden />
      <div className="mb-1">
        <span className="rounded-lg bg-primary-soft px-2 py-0.5 text-[9.5px] font-bold text-primary-dark">
          {card.match}
        </span>
      </div>
      <div className="mb-1.5 font-display text-[12px] font-extrabold leading-tight text-ink">{card.title}</div>
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1 rounded-full bg-primary-dark px-2 py-1 font-display text-[10.5px] font-extrabold text-white">
          <Gift width={11} height={11} />
          {card.reward}
        </span>
        <span className="flex items-center gap-1 text-[9px] text-muted">
          <Clock width={10} height={10} />
          {card.time} · {card.questions}
        </span>
        <span className="ms-auto flex h-6 w-6 items-center justify-center rounded-full bg-line text-muted-2">
          <ArrowRight width={11} height={11} className="rtl:rotate-180" />
        </span>
      </div>
    </div>
  );
}
