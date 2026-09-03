"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Leans its children toward the pointer.
 *
 * Each child marked `data-parallax` gets `--px` and `--py`, a direction in the
 * range -1..1, and the stylesheet decides what to do with them — so the amount
 * of movement is a design decision that lives in CSS, not a number buried here.
 *
 * The weight falls off with distance, which is what makes it read as the cursor
 * having a focus rather than as three cards sliding in formation: a card under
 * the pointer leans fully, one at the far end barely moves.
 *
 * There is no easing loop. The values are targets, written at most once per
 * frame, and the transition already on the card does the smoothing — which
 * means nothing runs at all while the pointer is still.
 */
export default function PointerParallax({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = () => [...host.querySelectorAll<HTMLElement>("[data-parallax]")];
    let frame = 0;
    let mx = 0;
    let my = 0;

    const apply = () => {
      frame = 0;
      const items = targets();
      if (!items.length) return;
      // Every rect is read before anything is written, so the loop cannot
      // thrash layout.
      const boxes = items.map((el) => el.getBoundingClientRect());
      const reach = host.getBoundingClientRect().width * 0.75 || 1;

      boxes.forEach((b, i) => {
        const dx = mx - (b.left + b.width / 2);
        const dy = my - (b.top + b.height / 2);
        const dist = Math.hypot(dx, dy);
        /*
         * Displacement rather than direction. A unit vector times a weight
         * looks right until the pointer sits on a card's centre, where the
         * vector is near zero, its direction is noise and the weight is at its
         * maximum — so the card lurches. Scaling by the offset itself means a
         * card already under the pointer has nowhere to go and stays put, which
         * is both stabler and what actually reads as correct.
         */
        const fade = Math.max(0, 1 - dist / (reach * 2));
        const clamp = (v: number) => Math.max(-1, Math.min(1, v));
        items[i].style.setProperty("--px", (clamp(dx / reach) * fade).toFixed(3));
        items[i].style.setProperty("--py", (clamp(dy / reach) * fade).toFixed(3));
      });
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx = e.clientX;
      my = e.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      for (const el of targets()) {
        el.style.setProperty("--px", "0");
        el.style.setProperty("--py", "0");
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
}
