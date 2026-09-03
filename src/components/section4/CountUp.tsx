"use client";

import { useEffect, useRef, useState } from "react";

/** "10K" -> 10 and "K"; "SME" has no leading figure and is left alone. */
const LEADING_NUMBER = /^(\d+)(.*)$/s;

/**
 * Counts a stat's figure up to its final value the first time it scrolls into
 * view.
 *
 * The finished string is always in the DOM for assistive tech and for a client
 * that never runs the effect — only the digits are swapped while it runs, and
 * the visible half is hidden from the accessibility tree so the figure is not
 * announced twice.
 */
export default function CountUp({
  value,
  duration = 1500,
  replay = false,
}: {
  value: string;
  duration?: number;
  /**
   * Keep re-running the count at random gaps while the figure is on screen,
   * rather than once on the way in. Each stat draws its own gap, so the row
   * never re-counts in unison.
   */
  replay?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = LEADING_NUMBER.exec(value);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";

  // `null` means there is nothing to count — render the value as it is.
  const [shown, setShown] = useState<number | null>(target === null ? null : 0);

  useEffect(() => {
    if (target === null) return;
    const node = ref.current;
    if (!node) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(target);
      return;
    }

    let frame = 0;
    let started = 0;
    // A background tab suspends `requestAnimationFrame`, so a count that begins
    // and is then hidden could sit on 0. This lands the final figure regardless.
    let safety = 0;
    let queued = 0;
    let visible = false;

    const run = () => {
      started = 0;
      clearTimeout(safety);
      safety = window.setTimeout(() => setShown(target), duration + 1500);
      const tick = (now: number) => {
        if (!started) started = now;
        const p = Math.min(1, (now - started) / duration);
        // Ease out cubic, so the figure decelerates onto its final value
        // instead of stopping dead.
        setShown(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) {
          frame = requestAnimationFrame(tick);
          return;
        }
        frame = 0;
        clearTimeout(safety);
        safety = 0;
        // 2.2s-5.4s, drawn fresh each time so the four figures drift apart
        // instead of pulsing together.
        if (replay && visible) {
          queued = window.setTimeout(run, 2200 + Math.random() * 3200);
        }
      };
      frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) {
          // Off screen: stop scheduling. Nothing runs where nobody is looking.
          clearTimeout(queued);
          queued = 0;
          return;
        }
        if (!replay) io.disconnect();
        // Neither a frame in flight nor a re-run pending, so this is a fresh
        // entry rather than a scroll wobble.
        if (!frame && !queued) run();
      },
      // Fires a little before the strip is fully up, so the count is already
      // running by the time it is comfortably on screen.
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
      if (safety) clearTimeout(safety);
      if (queued) clearTimeout(queued);
    };
  }, [target, duration, replay]);

  if (target === null) return <span ref={ref}>{value}</span>;

  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {shown}
        {suffix}
      </span>
      <span className="u-sr-only">{value}</span>
    </span>
  );
}
