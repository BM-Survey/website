"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode, type Ref } from "react";

type RevealVariant = "rise" | "left" | "right" | "zoom" | "frame";

type RevealProps = {
  children: ReactNode;
  as?: "div" | "ul" | "ol";
  variant?: RevealVariant;
  /** Seconds to wait after entering the viewport before revealing. */
  delay?: number;
  /**
   * Seconds between each direct child. When set, the wrapper stays static and
   * the children animate individually (server-rendered markup is untouched).
   */
  stagger?: number;
  className?: string;
};

/**
 * Scroll-into-view reveal wrapper. The hidden initial state lives in CSS under
 * `prefers-reduced-motion: no-preference`, so reduced-motion users and
 * pre-hydration paints always see the content.
 */
export function Reveal({
  children,
  as = "div",
  variant = "rise",
  delay = 0,
  stagger,
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (stagger) {
      Array.from(el.children).forEach((child, i) => {
        (child as HTMLElement).style.setProperty("--reveal-delay", `${delay + i * stagger}s`);
      });
    }

    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-inview");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.classList.add("is-inview");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, stagger]);

  const Tag = as;
  return (
    <Tag
      ref={ref as Ref<never>}
      className={className}
      data-reveal={stagger ? undefined : variant}
      data-reveal-group={stagger ? variant : undefined}
      style={delay && !stagger ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
