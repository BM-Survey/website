"use client";

import { useEffect, useRef, type ReactNode } from "react";

type StickyFooterProps = {
  children: ReactNode;
};

/**
 * Awwwards-style footer reveal: the footer is pinned to the bottom of the
 * viewport behind the page content (see the `md:fixed` / `-z-10` styles). The
 * `<main>` scrolls up over it, reserving `--footer-height` of bottom margin so
 * the last section slides away to uncover the footer.
 *
 * Only pinned from `md` upward — on small screens the stacked footer can be
 * taller than the viewport, so it stays in normal flow there.
 */
export function StickyFooter({ children }: StickyFooterProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const setHeight = () =>
      document.documentElement.style.setProperty(
        "--footer-height",
        `${el.offsetHeight}px`,
      );

    setHeight();
    const observer = new ResizeObserver(setHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="md:fixed md:inset-x-0 md:bottom-0 md:-z-10">
      {children}
    </div>
  );
}
