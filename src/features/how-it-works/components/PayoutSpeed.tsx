import type { CSSProperties } from "react";

import { Bolt, Briefcase, Coins } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { HowItWorksDictionary } from "@/i18n/dictionaries";

type PayoutSpeedProps = {
  data: HowItWorksDictionary["payoutSpeed"];
};

const icons = [Coins, Briefcase, Bolt];
const cardTones = [
  "bg-gradient-to-br from-primary to-primary-dark text-white shadow-[0_20px_44px_rgba(46,91,255,0.22)]",
  "bg-gradient-to-b from-ink to-ink-2 text-white",
  "bg-white border border-primary-border text-ink shadow-[var(--shadow-card-lg)]",
];
const iconTones = ["bg-white/18 text-white", "bg-white/14 text-white", "bg-primary-soft text-primary"];
const textTones = ["text-white/85", "text-[#aeb4c2]", "text-muted"];
const trackTones = ["bg-white/20", "bg-white/15", "bg-[#dfe4f5]"];
const fillTones = [
  "bg-gradient-to-r from-white to-[#d8e1ff]",
  "bg-gradient-to-r from-primary to-[#7aa0ff]",
  "bg-gradient-to-r from-primary to-success",
];

/* How far each method's "speed bar" races — instant, same day, 1–2 days. */
const speeds = ["96%", "68%", "40%"];

export function PayoutSpeed({ data }: PayoutSpeedProps) {
  return (
    <section className="px-6 py-24" aria-label={data.title}>
      <Container size="lg">
        <Reveal className="mx-auto mb-12 max-w-[640px] text-center">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(32px,3.6vw,46px)] leading-tight font-black tracking-tight text-ink">
            {data.title}
          </h2>
        </Reveal>
        <Reveal variant="rise" stagger={0.12} className="grid gap-4 md:grid-cols-3">
          {data.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={item.title}
                className={`flex min-h-[210px] flex-col rounded-[26px] p-7 transition-transform duration-300 hover:-translate-y-1.5 ${cardTones[i]}`}
              >
                <span className={`flex h-9 w-9 items-center justify-center rounded-[10px] ${iconTones[i]}`}>
                  <Icon width={18} height={18} />
                </span>
                <div className="mt-auto">
                  <div className="font-display text-lg font-extrabold">{item.title}</div>
                  <div className={`mt-1 mb-4 text-[13.5px] ${textTones[i]}`}>{item.text}</div>
                  {/* Speed bar races to its mark once the card is revealed */}
                  <div className={`h-2 w-full overflow-hidden rounded-full ${trackTones[i]}`} aria-hidden>
                    <div
                      className={`hiw-speed-fill h-full rounded-full ${fillTones[i]}`}
                      style={
                        {
                          "--speed-w": speeds[i],
                          "--speed-delay": `${0.3 + i * 0.15}s`,
                        } as CSSProperties
                      }
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
