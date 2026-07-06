import { Container } from "@/components/ui/Container";
import type { HowItWorksDictionary } from "@/i18n/dictionaries";

type StepsGridProps = {
  steps: HowItWorksDictionary["steps"];
};

const cardTones = [
  "bg-bg border border-primary-border text-ink",
  "bg-gradient-to-br from-primary to-primary-dark text-white shadow-[0_20px_44px_rgba(46,91,255,0.22)]",
  "bg-gradient-to-b from-ink to-ink-2 text-white",
  "bg-gradient-to-br from-success to-success-dark text-white shadow-[0_20px_44px_rgba(34,195,94,0.22)]",
];

const numberTones = ["text-primary", "text-white", "text-white", "text-white"];
const textTones = ["text-muted", "text-white/85", "text-[#aeb4c2]", "text-white/85"];

export function StepsGrid({ steps }: StepsGridProps) {
  return (
    <section className="px-6 pb-24">
      <Container size="lg" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <div
            key={step.number}
            className={`flex min-h-[300px] flex-col justify-between rounded-[26px] p-7 ${cardTones[i]}`}
          >
            <span className={`font-display text-5xl leading-[0.8] font-black tracking-tight ${numberTones[i]}`}>
              {step.number}
            </span>
            <div>
              <h3 className="mb-2.5 font-display text-xl font-extrabold">{step.title}</h3>
              <p className={`text-[14.5px] leading-relaxed ${textTones[i]}`}>{step.text}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
