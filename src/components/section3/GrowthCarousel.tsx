import InView from "@/components/motion/InView";
import PillButton from "@/components/ui/PillButton";
import styles from "./GrowthCarousel.module.css";
import {
  GROWTH_ACTIVE_SLIDE,
  GROWTH_SLIDE_COUNT,
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

/** The comp's chevrons are a plain two-segment stroke, not an exported asset. */
function Chevron({ direction }: { direction: "prev" | "next" }) {
  const d = direction === "prev" ? "M18.44 1 1 18.36 18.44 35.72" : "M1 1 18.44 18.36 1 35.72";
  return (
    <svg viewBox="0 0 19.44 36.72" aria-hidden="true" focusable="false">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

/**
 * Growth carousel, rebuilt 1:1 from `public/design/web_tle.png` with the
 * exports in `public/section2_extend/`.
 *
 * Each column is anchored the way the comp anchors it: the icon sits against a
 * fixed baseline at the top, the CTA against a fixed line at the bottom, and
 * the headline + body group hangs from the body's last line — which is why the
 * middle slide's three-line body pushes its headline higher than its
 * neighbours' without moving anything else.
 */
export default function GrowthCarousel() {
  return (
    <InView as="section" className={styles.section} amount={0.2} aria-label="Growth programmes">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.grain} src="/bg_grains_overlay.png" alt="" aria-hidden="true" />
      <div className={styles.divider} aria-hidden="true" />

      <div className={styles.track}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={styles.rule} style={{ "--col": i } as React.CSSProperties} />
        ))}

        {GROWTH_SLIDES.map((slide, i) => (
          <article
            key={slide.id}
            className={`${styles.slide} u-rise`}
            style={{ "--col": i, "--d": i } as React.CSSProperties}
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

            <PillButton
              className={styles.cta}
              href={slide.cta.href}
              label={slide.cta.label}
              tone={slide.cta.tone}
              width={311.1}
              radius={5.76}
              labelX={slide.cta.labelX}
              arrowX={slide.cta.arrowX}
            />
          </article>
        ))}
      </div>

      {/* Controls are rendered but inert: the comp advertises seven slides and
          only three have copy so far. Wire them up when the rest land. They
          share a wrapper so that, once the gutters disappear below 1280px, the
          arrows and dots group together under the slides. */}
      <div className={styles.controls}>
        <button
          className={`${styles.arrow} ${styles.arrowPrev}`}
          type="button"
          aria-label="Previous slides"
        >
          <Chevron direction="prev" />
        </button>

        <div className={styles.dots} role="group" aria-label="Slides">
          {Array.from({ length: GROWTH_SLIDE_COUNT }, (_, i) => (
            <span
              key={i}
              className={`${styles.dot} ${i === GROWTH_ACTIVE_SLIDE ? styles.dotActive : ""}`}
              aria-current={i === GROWTH_ACTIVE_SLIDE ? "true" : undefined}
            />
          ))}
        </div>

        <button
          className={`${styles.arrow} ${styles.arrowNext}`}
          type="button"
          aria-label="Next slides"
        >
          <Chevron direction="next" />
        </button>
      </div>

    </InView>
  );
}
