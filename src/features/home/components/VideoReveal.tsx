import { Eyebrow } from "@/components/ui/Eyebrow";
import type { HomeDictionary } from "@/i18n/dictionaries";

type VideoRevealProps = {
  video: HomeDictionary["video"];
};

const YOUTUBE_VIDEO_ID = "EngW7tLk6R8";

export function VideoReveal({ video }: VideoRevealProps) {
  return (
    <section
      className="bg-bg py-24 sm:py-30"
      aria-label={`${video.titleLine1} ${video.titleLine2}`}
    >
      <div className="mx-auto mb-11 max-w-[640px] px-6 text-center">
        <Eyebrow>{video.eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-[clamp(32px,3.6vw,46px)] leading-tight font-black tracking-tight text-ink">
          {video.titleLine1}
          <br />
          {video.titleLine2}
        </h2>
      </div>

      <div className="relative h-screen w-full overflow-hidden bg-ink shadow-[0_40px_100px_rgba(16,32,90,0.28)]">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`}
          title={video.posterAlt}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </section>
  );
}
