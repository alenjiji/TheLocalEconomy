import styles from "./QuoteMark.module.css";

/**
 * `el_6.svg` inlined — the quote mark and its two rules in the closing band.
 *
 * At 743 bytes it costs nothing to inline, and it lets the rules draw
 * themselves toward the mark while the glyphs settle in behind them.
 */
export default function QuoteMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 53.58 175.1"
      aria-hidden="true"
      focusable="false"
    >
      <g className={styles.glyphs}>
        <polygon
          className={styles.glyph}
          points="29.25 70.16 29.25 94.49 41.03 94.49 39.07 109.79 53.58 94.49 53.58 70.16 29.25 70.16"
          fill="#282727"
        />
        <polygon
          className={`${styles.glyph} ${styles.glyphSecond}`}
          points="0 70.16 0 94.49 11.77 94.49 9.82 109.79 24.32 94.49 24.32 70.16 0 70.16"
          fill="#282727"
        />
      </g>
      <g fill="none" stroke="#282727" strokeMiterlimit="10" strokeWidth="2">
        {/* Drawn from the mark outward: the upper rule grows up, the lower down. */}
        <line
          className={styles.ruleUp}
          pathLength="1"
          x1="29.25"
          y1="0"
          x2="29.25"
          y2="48.69"
        />
        <line
          className={styles.ruleDown}
          pathLength="1"
          x1="29.25"
          y1="126.41"
          x2="29.25"
          y2="175.1"
        />
      </g>
    </svg>
  );
}
