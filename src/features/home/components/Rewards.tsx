import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import type { HomeDictionary } from "@/i18n/dictionaries";

type RewardsProps = {
  rewards: HomeDictionary["rewards"];
};

export function Rewards({ rewards }: RewardsProps) {
  const stats = [rewards.stats.minCashout, rewards.stats.fees, rewards.stats.options];
  const options = [
    { label: rewards.options.paypal, icon: "/icons/paypal.png", bg: "bg-primary-soft" },
    { label: rewards.options.amazon, icon: "/icons/amazon.png", bg: "bg-amber-soft" },
    { label: rewards.options.bank, icon: "/icons/bank.png", bg: "bg-success-soft" },
    { label: rewards.options.starbucks, icon: "/icons/starbucks.png", bg: "bg-purple-soft" },
    { label: rewards.options.steam, icon: "/icons/steam.png", bg: "bg-white border border-primary-border" },
    { label: rewards.options.donate, icon: "/icons/donate.png", bg: "bg-white border border-primary-border" },
  ];

  return (
    <Section id="rewards" className="bg-white" ariaLabel={`${rewards.titleLine1} ${rewards.titleLine2}`}>
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          <Reveal stagger={0.09}>
            <Eyebrow tone="success">{rewards.eyebrow}</Eyebrow>
            <h2 className="mt-5 mb-4 font-display text-[clamp(32px,3.6vw,46px)] leading-tight font-black tracking-tight text-ink">
              {rewards.titleLine1}
              <br />
              {rewards.titleLine2}
            </h2>
            <p className="mb-6 max-w-[420px] text-[17px] leading-relaxed text-muted">
              {rewards.description}
            </p>
            <dl className="flex flex-wrap gap-x-7 gap-y-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="font-display text-3xl font-black text-primary">{stat.value}</dd>
                  <dt className="text-[13.5px] text-muted">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal as="ul" variant="zoom" stagger={0.07} delay={0.1} className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
            {options.map((option) => (
              <li
                key={option.label}
                className={`flex aspect-[1.6] flex-col items-center justify-center gap-1.5 rounded-2xl ${option.bg}`}
              >
                <Image
                  src={option.icon}
                  alt=""
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain"
                />
                <span className="font-display text-[13px] font-bold text-ink">{option.label}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
