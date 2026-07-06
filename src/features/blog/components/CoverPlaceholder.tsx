import { cn } from "@/lib/cn";

type CoverPlaceholderProps = {
  color: string;
  initial: string;
  className?: string;
};

/** Gradient cover placeholder standing in for an article's hero image. */
export function CoverPlaceholder({ color, initial, className }: CoverPlaceholderProps) {
  return (
    <div
      className={cn("absolute inset-0 flex items-center justify-center", className)}
      style={{ background: `linear-gradient(135deg, ${color}, #0B1220)` }}
      aria-hidden
    >
      <span className="font-display text-6xl font-black text-white/20">{initial}</span>
    </div>
  );
}
