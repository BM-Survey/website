import { Star } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type StarRatingProps = {
  count?: number;
  size?: number;
  className?: string;
  /** Accessible description, e.g. "Rated 4.6 out of 5". */
  label?: string;
};

/** Row of amber stars used in ratings and testimonials. */
export function StarRating({ count = 5, size = 14, className, label }: StarRatingProps) {
  return (
    <span
      className={cn("inline-flex gap-0.5 text-amber", className)}
      role="img"
      aria-label={label}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} width={size} height={size} aria-hidden />
      ))}
    </span>
  );
}
