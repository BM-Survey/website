import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type PhoneFrameProps = {
  children: ReactNode;
  className?: string;
};

/** Decorative device mockup used to frame the in-app screenshots. */
export function PhoneFrame({ children, className }: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative h-[600px] w-[292px] rounded-[44px] bg-ink p-2.5 shadow-[0_40px_80px_rgba(16,32,90,0.28)]",
        className,
      )}
      aria-hidden
    >
      <div className="absolute start-1/2 top-5 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-ink rtl:translate-x-1/2" />
      <div className="h-full w-full overflow-hidden rounded-[35px] bg-[#edf1fb]">
        {children}
      </div>
    </div>
  );
}
