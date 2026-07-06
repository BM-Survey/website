import { Bolt, Check, Users } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { CollaborationDictionary } from "@/i18n/dictionaries";

type WhyBentoProps = {
  data: CollaborationDictionary["why"];
};

export function WhyBento({ data }: WhyBentoProps) {
  return (
    <section className="px-6 pb-24">
      <Container size="lg">
        <div className="mx-auto mb-11 max-w-[620px] text-center">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(30px,3.4vw,44px)] leading-tight font-black tracking-tight text-ink">
            {data.title}
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.05fr_1.15fr]">
          <div className="flex min-h-[420px] flex-col justify-between rounded-[26px] bg-gradient-to-br from-primary to-primary-dark p-9 shadow-[0_20px_44px_rgba(46,91,255,0.22)]">
            <div className="font-display text-[13px] font-bold tracking-widest text-white/75 uppercase">
              {data.panelSize.label}
            </div>
            <div>
              <div className="font-display text-[clamp(52px,7.5vw,100px)] leading-[0.86] font-black tracking-tight text-white">
                {data.panelSize.value}
              </div>
              <p className="mt-5 max-w-[340px] text-[17px] leading-relaxed text-white/85">
                {data.panelSize.text}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-1 gap-4">
              <div className="flex min-h-[190px] flex-1 flex-col justify-between rounded-[26px] bg-gradient-to-b from-ink to-ink-2 p-6.5">
                <span className="flex h-8.5 w-8.5 items-center justify-center rounded-[10px] bg-white/14">
                  <Bolt width={18} height={18} className="text-white" />
                </span>
                <div>
                  <div className="mb-1.5 font-display text-[13px] font-bold tracking-widest text-[#8aa5ff] uppercase">
                    {data.fastFielding.label}
                  </div>
                  <div className="font-display text-lg font-extrabold text-white">{data.fastFielding.value}</div>
                </div>
              </div>
              <div className="flex min-h-[190px] flex-1 flex-col justify-between rounded-[26px] bg-gradient-to-br from-success to-success-dark p-6.5 shadow-[0_20px_44px_rgba(34,195,94,0.22)]">
                <span className="flex h-8.5 w-8.5 items-center justify-center rounded-[10px] bg-white/18">
                  <Check width={18} height={18} className="text-white" />
                </span>
                <div>
                  <div className="mb-1.5 font-display text-[13px] font-bold tracking-widest text-white/80 uppercase">
                    {data.qualityChecks.label}
                  </div>
                  <div className="font-display text-lg font-extrabold text-white">{data.qualityChecks.value}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-1 items-center justify-between gap-4 rounded-[26px] border border-line bg-white p-6.5 shadow-[var(--shadow-card-lg)]">
              <div>
                <div className="mb-1.5 font-display text-[19px] font-extrabold text-ink">{data.fairPay.title}</div>
                <p className="max-w-[320px] text-sm text-muted">{data.fairPay.text}</p>
              </div>
              <span className="flex h-10 w-10 flex-none items-center justify-center text-primary">
                <Users width={30} height={30} />
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
