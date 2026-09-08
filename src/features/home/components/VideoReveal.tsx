import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeDictionary } from "@/i18n/dictionaries";

type VideoRevealProps = {
  video: HomeDictionary["video"];
};

/**
 * Self-hosted member story. The 46 MB source is re-encoded to 1080p H.264
 * CRF 28 / AAC 96k (~6 MB) with the moov atom moved to the front
 * (`faststart`), so playback starts after the first few hundred KB instead of
 * waiting for the whole file. `preload="metadata"` fetches only headers, so
 * nothing but the poster loads until the visitor presses play.
 */
const VIDEO_SRC = "/video/member-story.mp4";
const POSTER_SRC = "/video/member-story-poster.jpg";

export function VideoReveal({ video }: VideoRevealProps) {
  return (
    <section
      className="bg-bg py-24 sm:py-30"
      aria-label={`${video.titleLine1} ${video.titleLine2}`}
    >
      <Reveal className="mx-auto mb-11 max-w-[640px] px-6 text-center">
        <Eyebrow>{video.eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-[clamp(32px,3.6vw,46px)] leading-tight font-black tracking-tight text-ink">
          {video.titleLine1}
          <br />
          {video.titleLine2}
        </h2>
      </Reveal>

      <Reveal
        variant="frame"
        className="relative aspect-video w-full overflow-hidden bg-ink shadow-[0_40px_100px_rgba(16,32,90,0.28)] sm:aspect-auto sm:h-screen"
      >
        {/* `object-contain` keeps the letterboxing the YouTube embed had, so
            the frame crops nothing at the tall `sm:h-screen` size. */}
        <video
          className="absolute inset-0 h-full w-full object-contain"
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          preload="metadata"
          playsInline
          controls
          controlsList="nodownload"
          aria-label={video.posterAlt}
        />
      </Reveal>
    </section>
  );
}
