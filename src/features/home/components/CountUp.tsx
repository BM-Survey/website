"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Matches the Latin-digit token every locale keeps inside its stat strings
 * (e.g. "$8.4M+", "+1.9 مليون"), so prefix/suffix text survives untouched.
 */
const NUMERIC_TOKEN = /[0-9]+(?:\.[0-9]+)?/;

const DURATION_MS = 1400;

export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(NUMERIC_TOKEN);
    if (!el || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const token = match[0];
    const target = parseFloat(token);
    if (Number.isNaN(target)) return;
    const decimals = token.includes(".") ? token.split(".")[1].length : 0;

    let frame = 0;
    const run = () => {
      const startedAt = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - startedAt) / DURATION_MS, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(value.replace(token, (target * eased).toFixed(decimals)));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
