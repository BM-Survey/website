import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Check, Lock, Shield } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import type { CommonDictionary, HomeDictionary } from "@/i18n/dictionaries";
import { authUrls } from "@/lib/navigation";

type AboutProps = {
  about: HomeDictionary["about"];
  actions: CommonDictionary["actions"];
};

type IconProps = { width?: number; height?: number };

function EyeOff({ width = 24, height = 24 }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}

function ShieldCheck({ width = 24, height = 24 }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function About({ about, actions }: AboutProps) {
  const chips = [
    { label: about.chips.neverSold, icon: <Lock width={13} height={13} /> },
    { label: about.chips.encryption, icon: <Shield width={13} height={13} /> },
    { label: about.chips.delete, icon: <Check width={13} height={13} /> },
    { label: about.chips.confidential, icon: <EyeOff width={13} height={13} /> },
    { label: about.chips.privacyProtected, icon: <ShieldCheck width={13} height={13} /> },
  ];

  return (
    <Section id="about" className="bg-bg" ariaLabel={about.title}>
      <Container size="md">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Photo placeholder with GDPR badge */}
          <Reveal variant="left" className="relative">
            <div
              className="flex aspect-4/5 w-full items-center justify-center overflow-hidden rounded-[26px] bg-[radial-gradient(circle_at_30%_20%,#c7d5ff,transparent_55%),radial-gradient(circle_at_75%_85%,#bff0d3,transparent_55%),linear-gradient(160deg,#e8edff,#dfeafe)]"
              role="img"
              aria-label={about.photoAlt}
            >
              <Image
                src="/illustrations/survey-phone.svg"
                alt=""
                aria-hidden
                width={480}
                height={600}
                className="pointer-events-none h-[86%] w-auto select-none"
              />
            </div>
            <div className="absolute -bottom-5 -start-5 flex items-center gap-3 rounded-3xl bg-white p-4 shadow-[var(--shadow-float)]">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-success to-success-dark text-white">
                <Lock width={22} height={22} />
              </span>
              <div>
                <div className="font-display text-[15px] font-extrabold">{about.badge.title}</div>
                <div className="text-[12.5px] text-muted">{about.badge.text}</div>
              </div>
            </div>
          </Reveal>

          <Reveal stagger={0.09} delay={0.1}>
            <Eyebrow>{about.eyebrow}</Eyebrow>
            <h2 className="mt-5 mb-5 font-display text-[clamp(30px,3.4vw,44px)] leading-[1.1] font-black tracking-tight text-ink">
              {about.title}
            </h2>
            <p className="mb-4 text-[16.5px] leading-loose text-muted-2">{about.paragraph1}</p>
            <p className="mb-6 text-[16.5px] leading-loose text-muted-2">{about.paragraph2}</p>
            <ul className="flex flex-wrap gap-2.5">
              {chips.map((chip) => (
                <li
                  key={chip.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary-border bg-white px-3.5 py-2 font-display text-[13.5px] font-semibold text-ink"
                >
                  {chip.icon}
                  {chip.label}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <Button href={authUrls.register} target="_blank" rel="noopener noreferrer">
                {actions.startNow}
                <ArrowRight width={18} height={18} className="rtl:rotate-180" />
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}