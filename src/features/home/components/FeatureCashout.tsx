import {
  ArrowRight,
  ChartBars,
  Clock,
  Close,
  Coins,
  DollarSign,
  Home,
  Shield,
  User,
  Wallet,
} from "@/components/ui/icons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeDictionary } from "@/i18n/dictionaries";
import { PhoneFrame } from "./PhoneFrame";

type FeatureCashoutProps = {
  feature: HomeDictionary["feature2"];
};

export function FeatureCashout({ feature }: FeatureCashoutProps) {
  const p = feature.phone;

  return (
    <section className="relative overflow-hidden py-16 pb-32" aria-label={feature.title}>
      <Reveal className="mx-auto mb-12 max-w-[640px] px-6 text-center">
        <Eyebrow tone="success">{feature.eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-[clamp(32px,3.6vw,46px)] leading-tight font-black tracking-tight text-ink">
          {feature.title}
        </h2>
      </Reveal>

      <div className="relative mx-auto flex w-full max-w-[760px] justify-center px-6">
        {/* Floating card: top-start */}
        <Reveal variant="left" delay={0.25} className="start-0 top-5 z-[3] lg:absolute">
          <FloatingCard
            icon={<Coins width={15} height={15} className="text-primary" />}
            iconBg="bg-primary-soft"
            title={feature.cards.threshold.title}
            text={feature.cards.threshold.text}
          />
        </Reveal>

        <Reveal variant="zoom" className="relative z-[2]">
          <PhoneFrame>
            {/* Dimmed wallet page behind a "Request a withdrawal" sheet —
                mirrors the real app's withdrawal modal over the Wallet tab. */}
            <div className="flex h-full flex-col bg-line">
              {/* Backdrop: app header + page title, dimmed under the sheet */}
              <div className="px-3.5 pt-9 pb-2 opacity-40">
                <div className="flex items-center justify-between">
                  <span className="font-display text-[11px] font-extrabold text-ink">{p.appName}</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink font-display text-[10px] font-extrabold text-white">
                    A
                  </span>
                </div>
                <div className="mt-2 font-display text-[13px] font-extrabold text-ink">{p.pageTitle}</div>
              </div>

              {/* Request-a-withdrawal sheet */}
              <div className="flex flex-1 flex-col overflow-hidden rounded-t-[22px] bg-white p-3.5 pt-3 shadow-[0_-8px_24px_rgba(16,32,90,0.12)]">
                <div className="mb-2.5 flex items-center justify-between">
                  <span className="font-display text-[13px] font-extrabold text-ink">{p.modalTitle}</span>
                  <Close width={13} height={13} className="text-muted-2" />
                </div>

                {/* From */}
                <div className="mb-2.5 rounded-xl bg-line p-2.5">
                  <div className="text-[7.5px] font-bold uppercase tracking-wide text-muted">{p.fromLabel}</div>
                  <div className="mt-0.5 font-display text-[11.5px] font-extrabold text-ink">{p.orgName}</div>
                  <div className="mt-0.5 text-[9.5px] text-muted">
                    {p.availableValue} {p.availableSuffix}
                  </div>
                </div>

                {/* Segmented control */}
                <div className="mb-2.5 flex overflow-hidden rounded-xl border border-primary-border">
                  <span className="flex-1 bg-primary-dark py-1.5 text-center text-[9.5px] font-bold text-white">
                    {p.fullBalance}
                  </span>
                  <span className="flex-1 bg-white py-1.5 text-center text-[9.5px] font-bold text-ink">
                    {p.customAmount}
                  </span>
                </div>

                {/* Amount breakdown */}
                <div className="mb-2.5 rounded-xl bg-line p-2.5">
                  <div className="flex items-center justify-between text-[10px] text-muted">
                    <span>{p.amountLabel}</span>
                    <span>{p.amountValue}</span>
                  </div>
                  <div className="my-1.5 border-t border-primary-border" />
                  <div className="flex items-center justify-between font-display text-[11.5px] font-extrabold text-ink">
                    <span>{p.receiveLabel}</span>
                    <span>{p.receiveValue}</span>
                  </div>
                </div>

                {/* CTA */}
                <button
                  type="button"
                  className="mb-2 flex w-full items-center justify-center gap-1.5 rounded-2xl bg-primary-dark py-2.5 font-display text-[11.5px] font-bold text-white"
                  tabIndex={-1}
                >
                  <DollarSign width={13} height={13} />
                  {p.requestCta} {p.receiveValue}
                  <ArrowRight width={13} height={13} className="rtl:rotate-180" />
                </button>

                <p className="text-[8.5px] leading-relaxed text-muted">{p.disclaimer}</p>
              </div>

              {/* Bottom tab bar — not dimmed, Wallet active */}
              <div className="flex items-start justify-between border-t border-primary-border bg-white px-4 pt-2 pb-3.5">
                {[
                  { label: p.nav.surveys, Icon: Home, active: false },
                  { label: p.nav.history, Icon: Clock, active: false },
                  { label: p.nav.wallet, Icon: Wallet, active: true },
                  { label: p.nav.analytics, Icon: ChartBars, active: false },
                  { label: p.nav.profile, Icon: User, active: false },
                ].map(({ label, Icon, active }) => (
                  <span
                    key={label}
                    className={
                      "flex w-11 flex-col items-center gap-0.5 " + (active ? "text-primary" : "text-muted-3")
                    }
                  >
                    <Icon width={15} height={15} />
                    <span className="max-w-full truncate text-[8px] font-semibold">{label}</span>
                  </span>
                ))}
              </div>
            </div>
          </PhoneFrame>
        </Reveal>

        {/* Floating card: bottom-end */}
        <Reveal variant="right" delay={0.4} className="bottom-8 end-0 z-[3] lg:absolute">
          <FloatingCard
            icon={<Shield width={15} height={15} className="text-success-dark" />}
            iconBg="bg-success-soft"
            title={feature.cards.noFees.title}
            text={feature.cards.noFees.text}
          />
        </Reveal>
      </div>
    </section>
  );
}

function FloatingCard({
  icon,
  iconBg,
  title,
  text,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  text: string;
}) {
  return (
    <div className="hidden max-w-[250px] rounded-3xl border border-line bg-white p-5 shadow-[0_24px_50px_rgba(16,32,90,0.16)] lg:block">
      <div className="mb-2 flex items-center gap-2 font-display text-base font-extrabold">
        <span className={`flex h-7 w-7 items-center justify-center rounded-[9px] ${iconBg}`}>{icon}</span>
        {title}
      </div>
      <p className="text-[13.5px] leading-relaxed text-muted">{text}</p>
    </div>
  );
}

