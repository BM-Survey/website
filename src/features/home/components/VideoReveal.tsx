import { Play } from "@/components/ui/icons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { HomeDictionary } from "@/i18n/dictionaries";

type VideoRevealProps = {
  video: HomeDictionary["video"];
};

export function VideoReveal({ video }: VideoRevealProps) {
  return (
    <section className="bg-bg py-24 sm:py-30" aria-label={`${video.titleLine1} ${video.titleLine2}`}>
      <div className="mx-auto mb-11 max-w-[640px] px-6 text-center">
        <Eyebrow>{video.eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-[clamp(32px,3.6vw,46px)] leading-tight font-black tracking-tight text-ink">
          {video.titleLine1}
          <br />
          {video.titleLine2}
        </h2>
      </div>

      <div className="relative aspect-video w-full overflow-hidden bg-ink shadow-[0_40px_100px_rgba(16,32,90,0.28)]">
        {/* Poster placeholder (real video frame slots in here) */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#24378f,transparent_55%),radial-gradient(circle_at_75%_80%,#1a6b3f,transparent_55%),linear-gradient(160deg,#0b1220,#131e4d)]"
          role="img"
          aria-label={video.posterAlt}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/15 to-ink/55" aria-hidden />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4.5">
          <button
            type="button"
            aria-label={video.watch}
            className="relative flex h-22 w-22 items-center justify-center rounded-full border-[1.5px] border-white/50 bg-white/15 text-white backdrop-blur-sm transition-transform hover:scale-105"
          >
            <span
              className="absolute inset-0 rounded-full bg-white/25 animate-[pulseRing_2.2s_ease-out_infinite]"
              aria-hidden
            />
            <Play width={34} height={34} className="ms-1" />
          </button>
          <span className="font-display text-base font-bold text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.4)]">
            {video.watch}
          </span>
        </div>

        <div className="absolute start-4 top-4 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-[#ff4b4b] animate-[pulseRing_1.6s_ease-out_infinite]" aria-hidden />
          <span className="text-[11.5px] font-bold tracking-wide text-white">{video.featured}</span>
        </div>
      </div>
    </section>
  );
}
