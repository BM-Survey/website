import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { CollaborationDictionary } from "@/i18n/dictionaries";

type HowStepsProps = {
  data: CollaborationDictionary["how"];
};

const cardTones = [
  "bg-bg border border-primary-border text-ink",
  "bg-gradient-to-br from-primary to-primary-dark text-white shadow-[0_20px_44px_rgba(46,91,255,0.22)]",
  "bg-gradient-to-b from-ink to-ink-2 text-white",
];
const numberTones = ["text-primary", "text-white", "text-white"];
const textTones = ["text-muted", "text-white/85", "text-[#aeb4c2]"];

export function HowSteps({ data }: HowStepsProps) {
  return (
    <section className="bg-white px-6 py-24" aria-label={data.title}>
      <Container size="lg">
        <div className="mx-auto mb-12 max-w-[640px] text-center">
          <Eyebrow tone="success">{data.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(32px,3.6vw,46px)] leading-tight font-black tracking-tight text-ink">
            {data.title}
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {data.steps.map((step, i) => (
            <div
              key={step.number}
              className={`flex min-h-[230px] flex-col justify-between rounded-[26px] p-7 ${cardTones[i]}`}
            >
              <span className={`font-display text-[44px] leading-none font-black tracking-tight ${numberTones[i]}`}>
                {step.number}
              </span>
              <div>
                <h3 className="mb-2 font-display text-lg font-extrabold">{step.title}</h3>
                <p className={`text-sm leading-relaxed ${textTones[i]}`}>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
