import { Container } from "@/components/ui/Container";
import type { HomeDictionary } from "@/i18n/dictionaries";
import { partnerBrands } from "../data";

type TrustStripProps = {
  trust: HomeDictionary["trust"];
};

export function TrustStrip({ trust }: TrustStripProps) {
  return (
    <section className="border-t border-[#e7ecfb] bg-bg py-14" aria-label={trust.heading}>
      <Container size="md" className="text-center">
        <h2 className="mb-7 font-display text-sm font-bold tracking-wide text-muted-3 uppercase">
          {trust.heading}
        </h2>
        <div
          className="marquee-group relative [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
          aria-hidden
        >
          <div className="marquee-track flex gap-14 animate-[marq_30s_linear_infinite]">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center gap-14">
                {partnerBrands.map((brand) => (
                  <span
                    key={brand}
                    className="font-display text-2xl font-extrabold tracking-tight whitespace-nowrap text-[#b4bbce]"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
