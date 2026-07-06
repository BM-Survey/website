import { Check, Coins, Shield } from "@/components/ui/icons";
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
          <div className="px-4 pt-11 pb-4">
            <div className="font-display text-lg font-extrabold">{p.heading}</div>
            <div className="mb-4 text-[12.5px] text-muted">
              {p.availableLabel}{" "}
              <b className="font-display text-[15px] text-success">{p.availableValue}</b>
            </div>

            <PayoutRow name={p.methods.paypal.name} note={p.methods.paypal.note} selected iconBg="bg-primary-soft" letter="P" letterColor="text-primary" />
            <PayoutRow name={p.methods.amazon.name} note={p.methods.amazon.note} iconBg="bg-amber-soft" letter="a" letterColor="text-orange" />
            <PayoutRow name={p.methods.bank.name} note={p.methods.bank.note} iconBg="bg-success-soft" letter="₿" letterColor="text-success-dark" />

            <div className="mt-4 rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-3.5 text-center font-display text-[15px] font-extrabold text-white">
              {p.withdraw}
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

function PayoutRow({
  name,
  note,
  selected = false,
  iconBg,
  letter,
  letterColor,
}: {
  name: string;
  note: string;
  selected?: boolean;
  iconBg: string;
  letter: string;
  letterColor: string;
}) {
  return (
    <div
      className={`mb-2.5 flex items-center gap-3 rounded-2xl bg-white p-3.5 ${
        selected ? "border-2 border-primary" : "border-2 border-line"
      }`}
    >
      <span className={`flex h-10 w-10 items-center justify-center rounded-xl font-display text-lg font-black ${iconBg} ${letterColor}`}>
        {letter}
      </span>
      <span className="flex-1">
        <span className="block font-display text-[14.5px] font-bold">{name}</span>
        <span className="block text-[11.5px] text-muted">{note}</span>
      </span>
      {selected && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
          <Check width={10} height={10} />
        </span>
      )}
    </div>
  );
}
