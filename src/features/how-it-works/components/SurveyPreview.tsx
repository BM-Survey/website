import { Clock } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
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

export function SurveyPreview({ data }: SurveyPreviewProps) {
  return (
    <section className="bg-white py-24" aria-label={data.title}>
      <Container size="lg">
        <div className="mx-auto mb-12 max-w-[640px] text-center">
          <Eyebrow tone="success">{data.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(32px,3.6vw,46px)] leading-tight font-black tracking-tight text-ink">
            {data.title}
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.cards.map((card) => (
            <div
              key={card.title}
              className="flex min-h-[150px] flex-col gap-2.5 rounded-[20px] bg-bg p-5 shadow-[var(--shadow-card)]"
            >
              <span
                className={`w-fit rounded-lg px-2.5 py-1 text-[11px] font-bold ${tagTones[card.tone as keyof typeof tagTones]}`}
              >
                {card.tag}
              </span>
              <div className="font-display text-base font-bold text-ink">{card.title}</div>
              <div className="mt-auto flex items-center justify-between text-[13px] text-muted">
                <span className="inline-flex items-center gap-1">
                  <Clock width={12} height={12} /> {card.time}
                </span>
                <b className="font-display text-success-dark">{card.reward}</b>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
