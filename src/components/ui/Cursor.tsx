"use client";

import { useEffect, useRef } from "react";

import styles from "./Cursor.module.css";

/**
 * The pointer.
 *
 * A solid amber dot that tracks exactly, and a ring that eases in behind it —
 * the lag is what makes it read as a physical thing rather than a decal.
 *
 * Three rules shape the implementation:
 *
 * 1. It never renders on a touch screen. A cursor is a mouse affordance, and
 *    the check is `pointer: fine` / `hover: hover` rather than a width, because
 *    a narrow window on a laptop still has a mouse and a large tablet does not.
 * 2. Pointer position never touches React state. It lives in refs and is
 *    written straight to `transform` inside one rAF loop, so moving the mouse
 *    costs no renders and no layout — and the loop parks itself once the ring
 *    has caught up.
 * 3. What it is over comes from the DOM, not from a list of selectors kept in
 *    step by hand: any element may declare `data-cursor` and the cursor adopts
 *    that state. Links and buttons get it for free.
 *
 * Amber disappears on the light bands, so the pointer turns blue over them.
 * Which surfaces are light is declared with `data-surface="light"` rather than
 * sampled, and it is matched geometrically rather than through the DOM: the
 * light bands are painted behind their sections, so the copy sitting on top of
 * one is not a descendant of it and `closest()` would never find it. Their
 * boxes are measured once in document coordinates and only re-measured when the
 * page resizes, so the test on each frame is a handful of comparisons.
 */

/** How much of the remaining distance the ring closes each frame. */
const EASE = 0.19;

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // A mouse, and a user who wants the decoration.
    const fine = window.matchMedia("(pointer: fine)");
    const canHover = window.matchMedia("(hover: hover)");
    if (!fine.matches || !canHover.matches) return;

    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!root || !dot || !ring) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add(styles.enabled);

    let px = window.innerWidth / 2;
    let py = window.innerHeight / 2;
    let rx = px;
    let ry = py;
    let frame = 0;
    let seen = false;
    let light = false;

    /*
     * Light bands.
     *
     * Two kinds, and they cannot share a coordinate space: a band inside the
     * page is fixed in the document and scrolls past the pointer, while the
     * payment sheet is `position: fixed` and stays where it is. The first is
     * stored in document coordinates, the second in viewport coordinates, and
     * each is compared against the matching pair.
     */
    type Zone = {
      el: Element;
      fixed: boolean;
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
    let zones: Zone[] = [];

    const visible = (el: Element) => {
      if (el.checkVisibility) {
        return el.checkVisibility({ visibilityProperty: true, opacityProperty: true });
      }
      if (!el.getClientRects().length) return false;
      const cs = getComputedStyle(el);
      return cs.visibility !== "hidden" && cs.opacity !== "0";
    };

    const isFixed = (el: Element) => {
      for (let n: Element | null = el; n; n = n.parentElement) {
        if (getComputedStyle(n).position === "fixed") return true;
      }
      return false;
    };

    const measure = () => {
      const sx = window.scrollX;
      const sy = window.scrollY;
      zones = [...document.querySelectorAll('[data-surface="light"]')].map((el) => {
        const b = el.getBoundingClientRect();
        const fixed = isFixed(el);
        const ox = fixed ? 0 : sx;
        const oy = fixed ? 0 : sy;
        return { el, fixed, top: b.top + oy, bottom: b.bottom + oy, left: b.left + ox, right: b.right + ox };
      });
    };
    measure();
    // Fonts and images settle after first paint and move things.
    window.addEventListener("load", measure);
    const remeasure = () => measure();
    window.addEventListener("resize", remeasure);

    const draw = () => {
      // Tone first, so a scroll under a still pointer still re-colours it.
      const docX = px + window.scrollX;
      const docY = py + window.scrollY;
      let onLight = false;
      for (const z of zones) {
        const x = z.fixed ? px : docX;
        const y = z.fixed ? py : docY;
        if (y < z.top || y > z.bottom || x < z.left || x > z.right) continue;
        // Only on a hit, so the cost is paid once rather than per zone: the
        // payment sheet keeps its box while it is closed, and a hidden band
        // must not tint anything. The flags matter — by default
        // `checkVisibility` ignores `visibility` and `opacity`, which is
        // exactly how that sheet hides itself.
        if (!visible(z.el)) continue;
        onLight = true;
        break;
      }
      if (onLight !== light) {
        light = onLight;
        root.classList.toggle(styles.light, light);
      }

      const dx = px - rx;
      const dy = py - ry;
      rx += dx * (still ? 1 : EASE);
      ry += dy * (still ? 1 : EASE);
      dot.style.transform = `translate3d(${px}px, ${py}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      // Park the loop once the ring has arrived; a move restarts it.
      if (Math.abs(dx) + Math.abs(dy) < 0.1) {
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(draw);
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!seen) {
        // First sighting: drop the ring on the pointer instead of flying it in
        // from the middle of the screen.
        seen = true;
        rx = px;
        ry = py;
        root.classList.add(styles.visible);
      }
      wake();
    };

    // `data-cursor` on any ancestor wins; links and buttons fall back to the
    // interactive state without having to declare it.
    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(
        "[data-cursor], a[href], button, [role='button'], label, summary",
      );
      const state = el?.getAttribute("data-cursor") ?? (el ? "link" : "");
      root.dataset.state = state;
    };

    const onDown = () => root.classList.add(styles.pressed);
    const onUp = () => root.classList.remove(styles.pressed);
    const onLeave = () => root.classList.remove(styles.visible);
    const onEnter = () => seen && root.classList.add(styles.visible);

    window.addEventListener("pointermove", onMove, { passive: true });
    // Scrolling changes what is under a stationary pointer.
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("blur", onLeave);
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    return () => {
      document.documentElement.classList.remove(styles.enabled);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", remeasure);
      window.removeEventListener("load", measure);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={styles.root} ref={rootRef} aria-hidden="true">
      <div className={styles.ring} ref={ringRef} />
      <div className={styles.dot} ref={dotRef} />
    </div>
  );
}
