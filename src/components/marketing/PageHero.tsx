import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

type PageHeroProps = {
  eyebrow: string;
  titleLead: string;
  titleHighlight: string;
  subtitle: string;
};

/** Centered hero used by standalone marketing pages: eyebrow, two-part title, subtitle. */
export function PageHero({ eyebrow, titleLead, titleHighlight, subtitle }: PageHeroProps) {
  return (
    <section className="px-6 pt-40 pb-14 sm:pt-44">
      <Container size="sm" className="text-center">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 mb-5 font-display text-[clamp(38px,5.6vw,66px)] leading-[1.02] font-black tracking-tight text-ink">
          {titleLead} <span className="text-primary">{titleHighlight}</span>
        </h1>
        <p className="mx-auto max-w-[640px] text-[18px] leading-relaxed text-muted-2">{subtitle}</p>
      </Container>
    </section>
  );
}
