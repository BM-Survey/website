import { Check, Coins, Shield } from "@/components/ui/icons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { HomeDictionary } from "@/i18n/dictionaries";
import { PhoneFrame } from "./PhoneFrame";

type FeatureCashoutProps = {
  feature: HomeDictionary["feature2"];
};

export function FeatureCashout({ feature }: FeatureCashoutProps) {
  const p = feature.phone;

  return (
    <section className="relative overflow-hidden py-16 pb-32" aria-label={feature.title}>
      <div className="mx-auto mb-12 max-w-[640px] px-6 text-center">
        <Eyebrow tone="success">{feature.eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-[clamp(32px,3.6vw,46px)] leading-tight font-black tracking-tight text-ink">
          {feature.title}
        </h2>
      </div>

      <div className="relative mx-auto flex w-full max-w-[760px] justify-center px-6">
        {/* Floating card: top-start */}
        <FloatingCard
          className="start-0 top-5 lg:absolute"
          icon={<Coins width={15} height={15} className="text-primary" />}
          iconBg="bg-primary-soft"
          title={feature.cards.threshold.title}
          text={feature.cards.threshold.text}
        />

        <PhoneFrame className="relative z-[2]">
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

        {/* Floating card: bottom-end */}
        <FloatingCard
          className="bottom-8 end-0 lg:absolute"
          icon={<Shield width={15} height={15} className="text-success-dark" />}
          iconBg="bg-success-soft"
          title={feature.cards.noFees.title}
          text={feature.cards.noFees.text}
        />
      </div>
    </section>
  );
}

function FloatingCard({
  className,
  icon,
  iconBg,
  title,
  text,
}: {
  className: string;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  text: string;
}) {
  return (
    <div
      className={`z-[3] hidden max-w-[250px] rounded-3xl border border-line bg-white p-5 shadow-[0_24px_50px_rgba(16,32,90,0.16)] lg:block ${className}`}
    >
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
