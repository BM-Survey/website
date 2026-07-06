import Image from "next/image";

import { Briefcase, Star, Users } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import type { HomeDictionary } from "@/i18n/dictionaries";
import { StarRating } from "./StarRating";

type StatsProps = {
  stats: HomeDictionary["stats"];
};

export function Stats({ stats }: StatsProps) {
  return (
    <Section className="bg-bg" ariaLabel={stats.title}>
      <Container>
        <div className="mx-auto mb-12 max-w-[620px] text-center">
          <Eyebrow>{stats.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(32px,3.6vw,46px)] leading-tight font-black tracking-tight text-ink">
            {stats.title}
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.05fr_1.15fr]">
          {/* Big blue card */}
          <article className="relative flex min-h-[420px] flex-col overflow-hidden rounded-[26px] bg-gradient-to-br from-primary to-primary-dark p-9 shadow-[0_20px_44px_rgba(46,91,255,0.22)]">
            <Image
              src="/illustrations/gold-coins.svg"
              alt=""
              aria-hidden
              width={400}
              height={320}
              className="pointer-events-none absolute -inset-e-6 -top-6 w-60 select-none opacity-95 drop-shadow-[0_12px_30px_rgba(0,0,0,0.25)] sm:w-75"
            />
            <p className="relative font-display text-[13px] font-bold tracking-wide text-white/75 uppercase">
              {stats.paid.label}
            </p>
            <div className="mt-auto">
              <div className="font-display text-[clamp(52px,7.5vw,108px)] leading-[0.86] font-black tracking-tighter text-white">
                {stats.paid.value}
              </div>
              <p className="mt-5 max-w-[340px] text-[17px] leading-relaxed text-white/85">
                {stats.paid.description}
              </p>
            </div>
          </article>

          {/* Right cluster */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-1 gap-4">
              <article className="relative flex min-h-[200px] flex-1 flex-col justify-between overflow-hidden rounded-[26px] bg-gradient-to-b from-ink to-ink-2 p-8">
                <Image
                  src="/illustrations/members.svg"
                  alt=""
                  aria-hidden
                  width={360}
                  height={300}
                  className="pointer-events-none absolute -inset-e-8 -top-4 w-40 select-none opacity-90"
                />
                <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#8aa5ff]">
                  <Users />
                </span>
                <div className="relative">
                  <p className="mb-1.5 font-display text-[13px] font-bold tracking-wide text-[#8aa5ff] uppercase">
                    {stats.members.label}
                  </p>
                  <div className="font-display text-[clamp(30px,3.4vw,44px)] font-black tracking-tight text-white">
                    {stats.members.value}
                  </div>
                </div>
              </article>

              <article className="relative flex min-h-[200px] flex-1 flex-col justify-between overflow-hidden rounded-[26px] bg-gradient-to-br from-success to-success-dark p-8 shadow-[0_20px_44px_rgba(34,195,94,0.22)]">
                <Image
                  src="/illustrations/brands.svg"
                  alt=""
                  aria-hidden
                  width={360}
                  height={300}
                  className="pointer-events-none absolute -inset-e-6 -top-2 w-40 select-none opacity-90"
                />
                <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white">
                  <Briefcase />
                </span>
                <div className="relative">
                  <p className="mb-1.5 font-display text-[13px] font-bold tracking-wide text-white/80 uppercase">
                    {stats.brands.label}
                  </p>
                  <div className="font-display text-[clamp(30px,3.4vw,44px)] font-black tracking-tight text-white">
                    {stats.brands.value}
                  </div>
                </div>
              </article>
            </div>

            <article className="relative flex min-h-[150px] flex-1 items-center justify-between gap-4 overflow-hidden rounded-[26px] border border-line bg-white p-8 shadow-[var(--shadow-card-lg)]">
              <Image
                src="/illustrations/rating.svg"
                alt=""
                aria-hidden
                width={300}
                height={300}
                className="pointer-events-none absolute -inset-e-8 -top-10 w-40 select-none opacity-15"
              />
              <div className="relative">
                <div className="flex items-center gap-2">
                  <span className="font-display text-[clamp(34px,3.8vw,50px)] leading-none font-black tracking-tight text-ink">
                    {stats.rating.value}
                  </span>
                  <Star width={30} height={30} className="text-amber" />
                </div>
                <p className="mt-2 font-display text-[13px] font-bold tracking-wide text-muted uppercase">
                  {stats.rating.reviews}
                </p>
              </div>
              <StarRating size={22} label={stats.rating.value} />
            </article>
          </div>
        </div>
      </Container>
    </Section>
  );
}
