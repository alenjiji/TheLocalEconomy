import InView from "@/components/motion/InView";
import PillButton from "@/components/ui/PillButton";
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

/** The comp's chevrons are a plain two-segment stroke, not an exported asset. */
/**
 * Growth carousel, rebuilt 1:1 from `design-source/web_tle.png` with the
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

            <PillButton
              className={styles.cta}
              href={slide.cta.href}
              label={slide.cta.label}
              tone={slide.cta.tone}
              width={311.1}
            />
          </article>
        ))}
      </div>

    </InView>
  );
}
