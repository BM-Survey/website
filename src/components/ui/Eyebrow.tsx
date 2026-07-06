import { cn } from "@/lib/cn";

type EyebrowTone = "primary" | "success" | "amber";

type EyebrowProps = {
  children: string;
  tone?: EyebrowTone;
  className?: string;
};

const tones: Record<EyebrowTone, string> = {
  primary: "text-primary bg-primary-soft",
  success: "text-success-dark bg-success-soft",
  amber: "text-amber bg-amber-soft",
};

/** Small pill label used above section headings. */
export function Eyebrow({ children, tone = "primary", className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3.5 py-1.5 font-display text-[13px] font-extrabold tracking-wide uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
