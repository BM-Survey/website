import { Clock } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { HowItWorksDictionary } from "@/i18n/dictionaries";

type SurveyPreviewProps = {
  data: HowItWorksDictionary["surveyPreview"];
};

const tagTones = {
  primary: "text-primary bg-primary-soft",
  purple: "text-purple bg-purple-soft",
  orange: "text-orange bg-orange-soft",
  success: "text-success-dark bg-success-soft",
} as const;

/* Editorial "pinned to a board" tilt per card; hover straightens it out. */
const tilts = [
  "md:-rotate-[1.6deg]",
  "md:rotate-[1.2deg]",
  "md:-rotate-[1.2deg]",
  "md:rotate-[1.6deg]",
];

export function SurveyPreview({ data }: SurveyPreviewProps) {
  return (
    <section className="overflow-hidden bg-white py-24" aria-label={data.title}>
      <Container size="lg">
        <Reveal className="mx-auto mb-14 max-w-[640px] text-center">
          <Eyebrow tone="success">{data.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(32px,3.6vw,46px)] leading-tight font-black tracking-tight text-ink">
            {data.title}
          </h2>
        </Reveal>
        <Reveal variant="zoom" stagger={0.09} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.cards.map((card, i) => (
            <div
              key={card.title}
              className={`group relative flex min-h-[170px] flex-col gap-3 rounded-[22px] bg-bg p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-2 hover:rotate-0 hover:shadow-[var(--shadow-card-lg)] ${tilts[i]}`}
            >
              <div className="flex items-start justify-between gap-2">
                <span
                  className={`w-fit rounded-lg px-2.5 py-1 text-[11px] font-bold ${tagTones[card.tone as keyof typeof tagTones]}`}
                >
                  {card.tag}
                </span>
                <b className="rounded-full bg-success-soft px-2.5 py-1 font-display text-[13px] font-extrabold text-success-dark transition-transform duration-300 group-hover:scale-110">
                  {card.reward}
                </b>
              </div>
              <div className="font-display text-base font-bold text-ink">{card.title}</div>
              <div className="mt-auto flex items-center justify-between text-[13px] text-muted">
                <span className="inline-flex items-center gap-1">
                  <Clock width={12} height={12} /> {card.time}
                </span>
              </div>
              {/* Accent underline sweeps in on hover */}
              <span
                className="pointer-events-none absolute inset-x-5 bottom-0 h-[3px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-primary to-success transition-transform duration-400 group-hover:scale-x-100 rtl:origin-right"
                aria-hidden
              />
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
