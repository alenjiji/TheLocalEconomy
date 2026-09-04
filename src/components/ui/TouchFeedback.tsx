"use client";

import { useEffect } from "react";

import styles from "./TouchFeedback.module.css";

/**
 * Press feedback for touch screens.
 *
 * A finger gets no hover, so every hover state in this build is gated behind
 * `@media (hover: hover)` — on a phone they would otherwise latch on after a
 * tap and stay lit until you touched something else. This puts back what the
 * hover was doing: a ripple that starts under the finger, so a tap is
 * acknowledged at the point of contact rather than somewhere near it.
 *
 * One delegated listener for the whole page, and one element per press that is
 * removed when it finishes. Nothing is attached per component.
 *
 * The ink adapts, for the same reason the cursor's does: an amber ripple on an
 * amber button is invisible. The surface a control declares through
 * `data-cursor` — or the light band it sits in — picks the ink.
 */
export default function TouchFeedback() {
  useEffect(() => {
    if (window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      const el = (e.target as Element | null)?.closest?.(
        "a[href], button, [role='button'], [data-tap]",
      );
      if (!(el instanceof HTMLElement) || el.dataset.tap === "off") return;

      const box = el.getBoundingClientRect();
      // Reach the far corner from wherever the finger landed, so the ripple
      // always covers the control rather than stopping short on a wide one.
      const reach =
        Math.max(e.clientX - box.left, box.right - e.clientX) +
        Math.max(e.clientY - box.top, box.bottom - e.clientY);

      const ripple = document.createElement("span");
      const tone = el.getAttribute("data-cursor");
      ripple.className = `${styles.ripple} ${
        tone === "amber"
          ? styles.onAmber
          : tone === "cyan"
            ? styles.onCyan
            : el.closest('[data-surface="light"]')
              ? styles.onLight
              : ""
      }`;
      ripple.style.left = `${e.clientX - box.left}px`;
      ripple.style.top = `${e.clientY - box.top}px`;
      ripple.style.width = ripple.style.height = `${reach * 2}px`;

      // The host has to clip and position the ripple; both are restored after.
      const host = el;
      const prevPosition = host.style.position;
      const prevOverflow = host.style.overflow;
      if (getComputedStyle(host).position === "static") host.style.position = "relative";
      if (getComputedStyle(host).overflow === "visible") host.style.overflow = "hidden";

      host.appendChild(ripple);
      const done = () => {
        ripple.remove();
        if (!host.querySelector("." + styles.ripple)) {
          host.style.position = prevPosition;
          host.style.overflow = prevOverflow;
        }
      };
      ripple.addEventListener("animationend", done, { once: true });
      // A dropped animationend must not leak an element into the page.
      window.setTimeout(done, 900);
    };

    document.addEventListener("pointerdown", onDown, { passive: true });
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);

  return null;
}
