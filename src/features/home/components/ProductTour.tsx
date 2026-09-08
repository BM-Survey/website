import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import type { HomeDictionary } from "@/i18n/dictionaries";

type ProductTourProps = {
  demo: HomeDictionary["demo"];
};

/**
 * Product tour walkthrough, self-hosted rather than embedded.
 *
 * The 46 MB source is re-encoded at CRF 23 — visually near-transparent, no
 * downscale — which lands at ~9 MB, with the moov atom moved to the front
 * (`faststart`) so playback starts after the first few hundred KB instead of
 * waiting for the whole file. `preload="metadata"` fetches only headers, so
 * nothing but the poster loads until the visitor presses play.
 *
 * The source carries a 20px black band along its top edge, cropped out at
 * encode time to 1880x1058 — exactly 16:9, so the frame fills with no
 * letterbox and no stretch.
 */
const VIDEO_SRC = "/video/product-tour.mp4";
const POSTER_SRC = "/video/product-tour-poster.jpg";

export function ProductTour({ demo }: ProductTourProps) {
  return (
    <Section id="product-tour" className="bg-white" ariaLabel={demo.title}>
      <Container>
        <Reveal className="mx-auto mb-12 max-w-[760px] text-center">
          <Eyebrow>{demo.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(32px,3.6vw,46px)] leading-tight font-black tracking-tight text-ink">
            {demo.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] text-[17px] leading-relaxed text-muted-2">
            {demo.description}
          </p>
        </Reveal>

        {/* `zoom`, not `frame`: the frame variant keeps a `clip-path` in its
            resting state, which would cut off the drop shadow. */}
        <Reveal variant="zoom" className="mx-auto w-full max-w-[64rem]">
          {/* `isolate` forces a stacking context so Safari honours the rounded
              corners on the video instead of painting it square. */}
          <div className="relative isolate aspect-video w-full overflow-hidden rounded-[24px] border-2 border-primary bg-ink shadow-[0_24px_60px_rgba(46,91,255,0.18)]">
            <VideoPlayer
              src={VIDEO_SRC}
              poster={POSTER_SRC}
              label={demo.videoTitle}
              labels={demo.player}
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
