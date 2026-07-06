import { Bolt, Briefcase, Coins } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
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

export function PayoutSpeed({ data }: PayoutSpeedProps) {
  return (
    <section className="px-6 py-24" aria-label={data.title}>
      <Container size="lg">
        <div className="mx-auto mb-12 max-w-[640px] text-center">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(32px,3.6vw,46px)] leading-tight font-black tracking-tight text-ink">
            {data.title}
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {data.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={item.title}
                className={`flex min-h-[190px] flex-col justify-between rounded-[26px] p-7 ${cardTones[i]}`}
              >
                <span className={`flex h-8 w-8 items-center justify-center rounded-[10px] ${iconTones[i]}`}>
                  <Icon width={17} height={17} />
                </span>
                <div>
                  <div className="font-display text-lg font-extrabold">{item.title}</div>
                  <div className={`mt-1 text-[13.5px] ${textTones[i]}`}>{item.text}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
