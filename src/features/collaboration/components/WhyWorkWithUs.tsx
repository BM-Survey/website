import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import type { CollaborationDictionary } from "@/i18n/dictionaries";

type WhyWorkWithUsProps = {
  data: CollaborationDictionary["whyWorkWithUs"];
};

const cardIllustrations = [
  "/illustrations/why-work-with-us/verified-respondents.svg",
  "/illustrations/why-work-with-us/quality-data.svg",
  "/illustrations/why-work-with-us/flexible-solutions.svg",
  "/illustrations/why-work-with-us/project-management.svg",
  "/illustrations/why-work-with-us/fast-turnaround.svg",
  "/illustrations/why-work-with-us/secure-data.svg",
];

export function WhyWorkWithUs({ data }: WhyWorkWithUsProps) {
  return (
    <Section id="why-work-with-us" className="bg-bg" ariaLabel={data.title}>
      <Container size="lg">
        <div className="mx-auto mb-14 max-w-[640px] text-center">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(32px,3.6vw,46px)] leading-tight font-black tracking-tight text-ink">
            {data.title}
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-muted-2">{data.subtitle}</p>
        </div>

        <Reveal
          as="ul"
          variant="rise"
          stagger={0.07}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {data.cards.map((card, i) => {
            const illustration = cardIllustrations[i % cardIllustrations.length];
            return (
              <li
                key={card.title}
                className="rounded-[22px] border border-line bg-white p-7 shadow-[var(--shadow-card-lg)]"
              >
                <Image
                  src={illustration}
                  alt=""
                  aria-hidden
                  width={120}
                  height={120}
                  className="mb-5 h-20 w-20 select-none"
                />
                <h3 className="mb-2 font-display text-[18px] font-extrabold tracking-tight text-ink">
                  {card.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-muted-2">{card.text}</p>
              </li>
            );
          })}
        </Reveal>
      </Container>
    </Section>
  );
}
