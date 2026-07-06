import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Check } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import type { HomeDictionary } from "@/i18n/dictionaries";
import { anchors, authUrls } from "@/lib/navigation";

type FinalCtaProps = {
  cta: HomeDictionary["cta"];
};

export function FinalCta({ cta }: FinalCtaProps) {
  const assurances = [cta.assurances.noCard, cta.assurances.cashOut, cta.assurances.rated];

  return (
    <section className="bg-white px-6 pt-10 pb-32" aria-label={`${cta.titleLine1} ${cta.titleLine2}`}>
      <Container className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-primary to-primary-dark px-6 py-20 text-center sm:px-10">
        <div
          className="absolute -top-2/5 -start-[5%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),transparent_60%)]"
          aria-hidden
        />
        <div
          className="absolute -bottom-[45%] -end-[5%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(34,195,94,0.28),transparent_62%)]"
          aria-hidden
        />
        <Image
          src="/illustrations/gold-coins.svg"
          alt=""
          aria-hidden
          width={400}
          height={320}
          className="pointer-events-none absolute bottom-0 -inset-s-6 hidden w-44 select-none opacity-90 drop-shadow-[0_12px_30px_rgba(0,0,0,0.25)] md:block lg:w-56"
        />
        <Image
          src="/illustrations/gold-coins.svg"
          alt=""
          aria-hidden
          width={400}
          height={320}
          className="pointer-events-none absolute bottom-0 -inset-e-6 hidden w-44 -scale-x-100 select-none opacity-90 drop-shadow-[0_12px_30px_rgba(0,0,0,0.25)] md:block lg:w-56"
        />
        <div className="relative">
          <h2 className="mb-4 font-display text-[clamp(34px,4.4vw,58px)] leading-[1.05] font-black tracking-tight text-white">
            {cta.titleLine1}
            <br />
            {cta.titleLine2}
          </h2>
          <p className="mx-auto mb-8 max-w-[500px] text-[18.5px] leading-relaxed text-[#d8e1ff]">
            {cta.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Button href={authUrls.register} target="_blank" rel="noopener noreferrer" variant="white">
              {cta.primary}
            </Button>
            <Button href={anchors.howItWorks} variant="ghost" className="border border-white/40 bg-white/15 text-white hover:bg-white/25">
              {cta.secondary}
            </Button>
          </div>
          <ul className="mt-6 flex flex-wrap justify-center gap-4.5 text-[13.5px] text-[#b9c6ff]">
            {assurances.map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <Check width={14} height={14} /> {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
