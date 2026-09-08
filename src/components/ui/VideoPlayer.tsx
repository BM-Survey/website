"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import { cn } from "@/lib/cn";
import {
  Fullscreen,
  FullscreenExit,
  Pause,
  Play,
  VolumeHigh,
  VolumeMuted,
} from "@/components/ui/icons";

export type VideoPlayerLabels = {
  play: string;
  pause: string;
  mute: string;
  unmute: string;
  fullscreen: string;
  exitFullscreen: string;
  seek: string;
  volume: string;
};

type VideoPlayerProps = {
  src: string;
  poster?: string;
  /** Accessible name for the video itself. */
  label: string;
  labels: VideoPlayerLabels;
  className?: string;
};

/** Seconds → `m:ss`, or `h:mm:ss` once the clip runs past an hour. */
function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) seconds = 0;
  const total = Math.floor(seconds);
  const s = total % 60;
  const m = Math.floor(total / 60) % 60;
  const h = Math.floor(total / 3600);
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

/** Milliseconds of stillness before the control bar fades out during playback. */
const IDLE_HIDE_MS = 2600;

/**
 * Custom video player.
 *
 * Native `controls` are deliberately not used: their chrome differs per browser
 * and clashes with the surrounding design. This renders its own bar, and keeps
 * the parts of the native experience people expect — keyboard shortcuts, a
 * scrub preview, buffered-range shading, click-to-pause and a poster-state play
 * affordance.
 *
 * The two sliders are real `input[type="range"]`, not div-based fakes, so
 * keyboard and assistive-tech behaviour comes from the platform rather than
 * being reimplemented. They are styled in globals.css under `.vp-range`.
 */
export function VideoPlayer({
  src,
  poster,
  label,
  labels,
  className,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [idle, setIdle] = useState(false);
  /** Set while dragging the scrubber, so playback time does not fight the drag. */
  const [scrubbing, setScrubbing] = useState(false);

  const wake = useCallback(() => {
    setIdle(false);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setIdle(true), IDLE_HIDE_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused || v.ended) {
      setStarted(true);
      void v.play().catch(() => setPlaying(false));
    } else {
      v.pause();
    }
    wake();
  }, [wake]);

  const seekBy = useCallback(
    (delta: number) => {
      const v = videoRef.current;
      if (!v || !Number.isFinite(v.duration)) return;
      v.currentTime = Math.min(Math.max(v.currentTime + delta, 0), v.duration);
      wake();
    },
    [wake],
  );

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    // Nudge a zero-volume unmute back to something audible, otherwise the
    // button appears to do nothing.
    if (!v.muted && v.volume === 0) v.volume = 0.5;
    wake();
  }, [wake]);

  const toggleFullscreen = useCallback(() => {
    const shell = shellRef.current;
    if (!shell) return;
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
    else void shell.requestFullscreen().catch(() => {});
    wake();
  }, [wake]);

  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  /** Keyboard shortcuts, scoped to the player so the page keeps its own keys. */
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    // Let the range inputs handle their own arrow keys.
    const onSlider = target.tagName === "INPUT";

    switch (event.key) {
      case " ":
      case "k":
        if (target.tagName === "BUTTON") return;
        event.preventDefault();
        togglePlay();
        break;
      case "ArrowRight":
        if (onSlider) return;
        event.preventDefault();
        seekBy(5);
        break;
      case "ArrowLeft":
        if (onSlider) return;
        event.preventDefault();
        seekBy(-5);
        break;
      case "m":
        event.preventDefault();
        toggleMute();
        break;
      case "f":
        event.preventDefault();
        toggleFullscreen();
        break;
      default:
        break;
    }
  };

  const onScrub = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    const next = Number(event.target.value);
    setCurrent(next);
    if (v) v.currentTime = next;
  };

  const onVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    const next = Number(event.target.value);
    if (!v) return;
    v.volume = next;
    v.muted = next === 0;
  };

  const progress = duration > 0 ? current / duration : 0;
  const bufferedPct = duration > 0 ? buffered / duration : 0;
  const effectiveVolume = muted ? 0 : volume;
  // Controls stay up until playback starts, and whenever the pointer is around.
  const controlsHidden = playing && idle && !scrubbing;

  return (
    <div
      ref={shellRef}
      className={cn(
        "group/player relative isolate h-full w-full overflow-hidden bg-ink",
        controlsHidden && "cursor-none",
        className,
      )}
      onPointerMove={wake}
      onPointerLeave={() => playing && setIdle(true)}
      onKeyDown={onKeyDown}
      tabIndex={-1}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        poster={poster}
        preload="metadata"
        playsInline
        aria-label={label}
        onClick={togglePlay}
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration);
          setVolume(e.currentTarget.volume);
          setMuted(e.currentTarget.muted);
          setReady(true);
        }}
        onTimeUpdate={(e) => {
          if (!scrubbing) setCurrent(e.currentTarget.currentTime);
        }}
        onProgress={(e) => {
          const v = e.currentTarget;
          if (v.buffered.length > 0) {
            setBuffered(v.buffered.end(v.buffered.length - 1));
          }
        }}
        onPlay={() => {
          setPlaying(true);
          setStarted(true);
          wake();
        }}
        onPause={() => {
          setPlaying(false);
          setIdle(false);
        }}
        onWaiting={() => setWaiting(true)}
        onPlaying={() => setWaiting(false)}
        onVolumeChange={(e) => {
          setVolume(e.currentTarget.volume);
          setMuted(e.currentTarget.muted);
        }}
        onEnded={() => {
          setPlaying(false);
          setIdle(false);
        }}
      />

      {/* Poster-state play affordance. Fades out once playback has begun. */}
      {!started && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={labels.play}
          className="absolute inset-0 z-20 flex cursor-pointer items-center justify-center bg-gradient-to-t from-ink/70 via-ink/10 to-ink/5 text-white transition-colors duration-300 hover:from-ink/75 hover:via-ink/20 hover:to-ink/10 focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-white"
        >
          <span className="relative flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20">
            <span className="absolute inset-0 rounded-full bg-white/40 motion-safe:animate-[pulseRing_1.8s_ease-out_infinite]" />
            <span className="relative flex h-full w-full items-center justify-center rounded-full bg-white text-primary shadow-[0_18px_44px_rgba(11,18,32,0.45)] transition-transform duration-300 ease-out group-hover/player:scale-105">
              <Play
                width={28}
                height={28}
                className="translate-x-[2px] rtl:-translate-x-[2px] rtl:rotate-180"
              />
            </span>
          </span>
        </button>
      )}

      {/* Buffering spinner */}
      {waiting && started && (
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 z-20 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white/25 border-t-white motion-safe:animate-[spin_0.7s_linear_infinite]"
        />
      )}

      {/* Control bar. `dir="ltr"` because a timeline reads left-to-right even
          in RTL locales — only the surrounding copy flips. */}
      <div
        dir="ltr"
        className={cn(
          "absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-ink/85 via-ink/45 to-transparent px-3 pb-2.5 pt-10 transition-opacity duration-300 sm:px-4 sm:pb-3",
          controlsHidden
            ? "pointer-events-none opacity-0"
            : "pointer-events-auto opacity-100",
        )}
      >
        {/* Seek */}
        <div className="relative flex h-4 items-center">
          {/* Buffered shading, behind the range track. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 overflow-hidden rounded-full bg-white/25"
          >
            <span
              className="block h-full rounded-full bg-white/30 transition-[width] duration-300"
              style={{ width: `${bufferedPct * 100}%` }}
            />
          </span>
          <input
            type="range"
            className="vp-range vp-range--seek relative z-10 w-full"
            style={{ "--vp-fill": `${progress * 100}%` } as CSSProperties}
            min={0}
            max={duration || 0}
            step={0.01}
            value={current}
            disabled={!ready}
            onChange={onScrub}
            onPointerDown={() => setScrubbing(true)}
            onPointerUp={() => setScrubbing(false)}
            onPointerCancel={() => setScrubbing(false)}
            onKeyDown={wake}
            aria-label={labels.seek}
            aria-valuetext={`${formatTime(current)} / ${formatTime(duration)}`}
          />
        </div>

        <div className="mt-1 flex items-center gap-1 text-white sm:gap-1.5">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? labels.pause : labels.play}
            className="vp-btn"
          >
            {playing ? (
              <Pause width={19} height={19} />
            ) : (
              <Play width={19} height={19} className="translate-x-[1px]" />
            )}
          </button>

          {/* Volume. The slider expands on hover/focus so the resting bar stays
              uncluttered, and is always reachable by keyboard. */}
          <div className="group/vol flex items-center">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted || volume === 0 ? labels.unmute : labels.mute}
              className="vp-btn"
            >
              {muted || volume === 0 ? (
                <VolumeMuted width={19} height={19} />
              ) : (
                <VolumeHigh width={19} height={19} />
              )}
            </button>
            <input
              type="range"
              className="vp-range vp-range--volume w-0 opacity-0 transition-all duration-300 group-hover/vol:ms-1 group-hover/vol:w-20 group-hover/vol:opacity-100 group-focus-within/vol:ms-1 group-focus-within/vol:w-20 group-focus-within/vol:opacity-100"
              style={{ "--vp-fill": `${effectiveVolume * 100}%` } as CSSProperties}
              min={0}
              max={1}
              step={0.05}
              value={effectiveVolume}
              onChange={onVolume}
              onKeyDown={wake}
              aria-label={labels.volume}
              aria-valuetext={`${Math.round(effectiveVolume * 100)}%`}
            />
          </div>

          <span className="ms-1 select-none font-display text-[13px] font-semibold tabular-nums text-white/90">
            {formatTime(current)}
            <span className="mx-1 text-white/45">/</span>
            {formatTime(duration)}
          </span>

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={fullscreen ? labels.exitFullscreen : labels.fullscreen}
            className="vp-btn ms-auto"
          >
            {fullscreen ? (
              <FullscreenExit width={18} height={18} />
            ) : (
              <Fullscreen width={18} height={18} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
