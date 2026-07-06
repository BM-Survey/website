import type { ReactNode } from "react";

import { Bolt, Clock, Star } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { HomeDictionary } from "@/i18n/dictionaries";
import { PhoneFrame } from "./PhoneFrame";

type FeatureSurveysProps = {
  feature: HomeDictionary["feature1"];
};

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
        <div>
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
        </div>

        <div className="flex justify-center">
          <PhoneFrame>
            <div className="px-4 pt-11 pb-4">
              <div className="mb-3.5 font-display text-lg font-extrabold">{p.heading}</div>

              <div className="mb-3 rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-4 text-white">
                <div className="mb-2.5 flex items-center justify-between">
                  <span className="rounded-lg bg-white/20 px-2.5 py-0.5 text-[11px] font-bold">
                    {p.cards.travel.match}
                  </span>
                  <span className="font-display text-lg font-extrabold">{p.cards.travel.reward}</span>
                </div>
                <div className="mb-2.5 font-display text-[15.5px] font-bold leading-snug">
                  {p.cards.travel.title}
                </div>
                <div className="flex items-center gap-1 text-[11.5px] opacity-85">
                  <Clock width={11} height={11} /> {p.cards.travel.meta}
                </div>
              </div>

              <MatchCard match={p.cards.banking.match} reward={p.cards.banking.reward} title={p.cards.banking.title} tone="purple" />
              <MatchCard match={p.cards.coffee.match} reward={p.cards.coffee.reward} title={p.cards.coffee.title} tone="orange" />
            </div>
          </PhoneFrame>
        </div>
      </Container>
    </section>
  );
}

function MatchCard({
  match,
  reward,
  title,
  tone,
}: {
  match: string;
  reward: string;
  title: string;
  tone: "purple" | "orange";
}): ReactNode {
  const toneClass = tone === "purple" ? "text-purple bg-purple-soft" : "text-orange bg-orange-soft";
  return (
    <div className="mb-3 rounded-2xl bg-white p-3.5 shadow-[0_4px_12px_rgba(16,32,90,0.05)]">
      <div className="mb-1.5 flex justify-between">
        <span className={`rounded-lg px-2 py-0.5 text-[11px] font-bold ${toneClass}`}>{match}</span>
        <span className="font-display font-extrabold text-success">{reward}</span>
      </div>
      <div className="text-[13.5px] font-bold">{title}</div>
    </div>
  );
}
