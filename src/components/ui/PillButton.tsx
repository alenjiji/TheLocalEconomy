"use client";

import { useCallback, useEffect, useRef, type CSSProperties } from "react";

import styles from "./PillButton.module.css";
import { useLiquid } from "./useLiquid";

/** Arrow lifted verbatim from the exported CTAs, which all share one glyph. */
const ARROW =
  "M226.42,12.36l-1.3,1.28,2.15,2.1c.34.34.73.69,1.18,1.06s.88.72,1.32,1.06c.19.15.37.28.54.41-.16-.03-.31-.06-.48-.09-.3-.05-.61-.09-.92-.13-.31-.04-.62-.05-.91-.05h-9.64v1.84h9.64c.29,0,.6-.02.91-.05.31-.04.62-.08.92-.14.17-.03.32-.06.48-.09-.08.06-.15.11-.24.18-.31.24-.63.49-.97.76-.34.27-.67.54-.98.81s-.6.53-.85.78l-2.15,2.1,1.31,1.28,6.65-6.55-6.66-6.55Z";

export type PillButtonProps = {
  href: string;
  label: string;
  tone: "amber" | "cyan";
  /** Pill width, in design units. Everything else derives from it. */
  width: number;
  className?: string;
};

export default function PillButton({ href, label, tone, width, className }: PillButtonProps) {
  const { liquidStyle, liquidProps } = useLiquid<HTMLAnchorElement>();
  const rowRef = useRef<HTMLSpanElement>(null);

  /*
   * Fit the label to the pill by measuring it, not by predicting it.
   *
   * This used to estimate the type size from the character count, which is
   * guesswork about a font's advance widths — and it was wrong by enough that
   * the longest label in the build ran out of both ends of its pill. Measuring
   * the row that actually rendered costs one read per button and cannot be
   * wrong about the font.
   */
  const fit = useCallback(() => {
    const row = rowRef.current;
    const pill = row?.parentElement;
    if (!row || !pill) return;
    row.style.removeProperty("--fit");
    // The reference insets the label 5.4% at each end.
    const room = pill.clientWidth * 0.892;
    const needed = row.scrollWidth;
    if (needed > room && needed > 0) row.style.setProperty("--fit", (room / needed).toFixed(4));
  }, []);

  useEffect(() => {
    fit();
    const pill = rowRef.current?.parentElement;
    if (!pill || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(fit);
    ro.observe(pill);
    // Webfonts land after first paint and change every measurement.
    void document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [fit, label]);

  return (
    <a
      className={`${styles.pill} ${styles[tone]} u-liquid u-liquid-${tone} ${className ?? ""}`}
      href={href}
      // Amber and cyan buttons would swallow an amber ring, so each declares
      // its own surface and the pointer inverts over it.
      data-cursor={tone}
      {...liquidProps}
      style={{ "--w": width, ...liquidStyle } as CSSProperties}
    >
      <span className={styles.row} ref={rowRef}>
        <span className={styles.label}>{label}</span>
        <svg
          className={`${styles.arrow} u-liquid-arrow`}
          viewBox="218.36 12.36 14.72 13.11"
          aria-hidden="true"
          focusable="false"
        >
          <path d={ARROW} />
        </svg>
      </span>
    </a>
  );
}
