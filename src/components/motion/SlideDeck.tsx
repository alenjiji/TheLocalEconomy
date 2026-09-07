"use client";

import { useRef, type ReactNode } from "react";

import styles from "./SlideDeck.module.css";

/**
 * Slides its children in whenever `index` changes.
 *
 * Direction is inferred from the index, so a simple caller need only say which
 * page it is on, and `count` lets that inference spot a wrap from the last page
 * back to the first.
 *
 * Inference cannot always win, though: across two pages a move from 1 to 0 is
 * indistinguishable — it is both "back one" and "forward one, wrapping" — so a
 * caller that knows which button was pressed can say so with `direction`, and
 * that always wins.
 *
 * The pane is keyed on the index, so React tears the old one down and mounts
 * the new: whatever is inside gets a genuine remount rather than a reshuffle,
 * which matters when the content owns something stateful like a video.
 */
export default function SlideDeck({
  index,
  count,
  direction,
  className,
  children,
}: {
  index: number;
  /** Total pages. Only used to tell a wrap from a step. */
  count?: number;
  /** Overrides the inference when the caller knows which way it went. */
  direction?: "next" | "prev";
  className?: string;
  children: ReactNode;
}) {
  const seen = useRef(index);
  const dir = useRef<"next" | "prev">("next");

  // Derived during render, not in an effect: an effect would land after the
  // new pane had already painted, so the first frame would carry the previous
  // direction. Re-running the render with an unchanged index is a no-op, so
  // this stays correct under StrictMode's double invocation.
  if (index !== seen.current) {
    const delta = index - seen.current;
    const wrapped = count ? Math.abs(delta) > count / 2 : false;
    dir.current = (delta > 0) !== wrapped ? "next" : "prev";
    seen.current = index;
  }

  return (
    <div className={`${styles.viewport} ${className ?? ""}`}>
      <div className={styles.pane} data-dir={direction ?? dir.current} key={index}>
        {children}
      </div>
    </div>
  );
}
