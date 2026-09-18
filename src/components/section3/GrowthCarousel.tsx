import InView from "@/components/motion/InView";
import styles from "./GrowthCarousel.module.css";
import {
  GROWTH_SLIDES,
  type InkSpan,
} from "@/lib/growth";

function Ink({ spans }: { spans: InkSpan[] }) {
  return (
    <>
      {spans.map((s, i) => (
        <span
          key={i}
          className={
            s.tone === "cyan" ? styles.cyan : s.tone === "amber" ? styles.amber : undefined
          }
        >
          {s.text}
        </span>
      ))}
    </>
  );
}

/**
 * Growth carousel, rebuilt 1:1 from `design-source/web_tle.png` with the
 * exports in `public/section2_extend/`.
 *
 * Three columns, each an icon and label over a headline and body, with a
 * hairline between neighbours. The comp closed each column with a button and
 * framed the row with a rule at either end; both are gone, so the row is laid
 * out edge to edge on the 1280 content grid and the band closes up under the
 * copy.
 */
/*
 * The row is spread evenly across the 1280 content grid. Each column is as
 * wide as its own body copy; what the three leave over becomes two full gaps
 * between them and a half gap at either end, with a divider down the middle
 * of each full gap.
 *
 * That puts the same space on both sides of every divider and the same space
 * outside the first and last columns. The layout it replaces hung every
 * column 47 units in from a left-hand rule, so the widest body, in the last
 * column, ran to within 12 units of the right-hand one.
 */
const GRID = 1280;
const WIDTHS = GROWTH_SLIDES.map((s) => s.bodyWidth);
const GAP = (GRID - WIDTHS.reduce((a, b) => a + b, 0)) / WIDTHS.length;
const COLUMN_X = WIDTHS.map((_, i) =>
  WIDTHS.slice(0, i).reduce((a, b) => a + b + GAP, GAP / 2),
);
const RULE_X = COLUMN_X.slice(0, -1).map((x, i) => x + WIDTHS[i] + GAP / 2);

export default function GrowthCarousel() {
  return (
    <InView as="section" className={styles.section} amount={0.2} aria-label="Growth programmes">
      <div className={styles.divider} aria-hidden="true" />

      <div className={styles.track}>
        {/* Dividers between the columns only: the row is open at both ends. */}
        {RULE_X.map((x) => (
          <span key={x} className={styles.rule} style={{ "--x": x } as React.CSSProperties} />
        ))}

        {GROWTH_SLIDES.map((slide, i) => (
          <article
            key={slide.id}
            className={`${styles.slide} u-rise`}
            style={{ "--x": COLUMN_X[i], "--col-w": WIDTHS[i], "--d": i } as React.CSSProperties}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.icon}
              src={slide.icon.src}
              alt={slide.icon.alt}
              width={slide.icon.width}
              height={slide.icon.height}
              style={
                {
                  "--icon-w": slide.icon.width,
                  "--icon-h": slide.icon.height,
                  "--icon-x": slide.icon.inset,
                } as React.CSSProperties
              }
            loading="lazy"
            decoding="async"
          />
            <p
              className={styles.label}
              style={
                {
                  "--icon-w": slide.icon.width,
                  "--icon-x": slide.icon.inset,
                } as React.CSSProperties
              }
            >
              <Ink spans={slide.label} />
            </p>

            <div className={styles.copy}>
              <h3 className={styles.headline}>
                <Ink spans={slide.headline} />
              </h3>
              <p
                className={styles.body}
                style={{ "--body-w": slide.bodyWidth } as React.CSSProperties}
              >
                {slide.body}
              </p>
            </div>
          </article>
        ))}
      </div>

    </InView>
  );
}
