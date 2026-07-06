import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { ArrowRight, Check, Lock, Shield } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/i18n/config";
import type { CommonDictionary, HomeDictionary } from "@/i18n/dictionaries";
import { localizedHref } from "@/lib/navigation";

type AboutProps = {
  locale: Locale;
  about: HomeDictionary["about"];
  actions: CommonDictionary["actions"];
};

export function About({ locale, about, actions }: AboutProps) {
  const chips = [
    { label: about.chips.neverSold, icon: <Lock width={13} height={13} /> },
    { label: about.chips.encryption, icon: <Shield width={13} height={13} /> },
    { label: about.chips.delete, icon: <Check width={13} height={13} /> },
  ];

  return (
    <Section id="about" className="bg-bg" ariaLabel={about.title}>
      <Container size="md">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Photo placeholder with GDPR badge */}
          <div className="relative">
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
          </div>

          <div>
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
              <Button href={localizedHref(locale, "/")}>
                {actions.startNow}
                <ArrowRight width={18} height={18} className="rtl:rotate-180" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
