import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeDictionary } from "@/i18n/dictionaries";
import { avatarColors } from "../data";
import { StarRating } from "./StarRating";

type TestimonialsProps = {
  testimonials: HomeDictionary["testimonials"];
};

export function Testimonials({ testimonials }: TestimonialsProps) {
  const items = testimonials.items;

  return (
    <section className="overflow-hidden bg-bg py-24 sm:py-28" aria-label={testimonials.title}>
      <Reveal className="mx-auto mb-13 max-w-[640px] px-6 text-center">
        <Eyebrow tone="amber">{testimonials.eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-[clamp(32px,3.6vw,46px)] leading-tight font-black tracking-tight text-ink">
          {testimonials.title}
        </h2>
      </Reveal>

      <Reveal
        delay={0.15}
        className="marquee-group relative [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]"
      >
        <ul className="marquee-track flex gap-5 animate-[marqR_46s_linear_infinite]">
          {[0, 1].map((dup) => (
            <li key={dup} className="flex gap-5" aria-hidden={dup === 1}>
              {items.map((item, i) => (
                <figure
                  key={`${dup}-${item.name}`}
                  className="w-[340px] flex-none rounded-3xl border border-[#eef1fa] bg-white p-6.5 shadow-[0_10px_30px_rgba(16,32,90,0.07)]"
                >
                  <StarRating className="mb-3.5" label={testimonials.eyebrow} />
                  <figcaption className="mb-2.5 font-display text-[17px] font-extrabold leading-snug">
                    {item.headline}
                  </figcaption>
                  <blockquote className="mb-4.5 text-[14.5px] leading-relaxed text-muted-2">
                    {item.text}
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full font-display font-extrabold text-white ${avatarColors[i % avatarColors.length]}`}
                    >
                      {item.name.charAt(0)}
                    </span>
                    <div>
                      <div className="font-display text-[14.5px] font-bold">{item.name}</div>
                      <div className="text-[12.5px] text-muted-3">{item.role}</div>
                    </div>
                  </div>
                </figure>
              ))}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}