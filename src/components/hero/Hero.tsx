import HeroBackdropMotion from "./HeroBackdropMotion";
import NavBar from "./NavBar";
import backdrop from "./HeroBackdrop.module.css";
import styles from "./Hero.module.css";
import { HERO_ACTIVE_SLIDE, HERO_SLIDE_COUNT } from "@/lib/design";

/**
 * Top and bottom insets, as percentages of the headline artwork, that isolate
 * each of its four lines. Boundaries sit in the leading between lines.
 */
const TITLE_BANDS: [number, number][] = [
  [0, 76.2],
  [23.8, 49],
  [51, 23.8],
  [76.2, 0],
];

/**
 * Hero section, rebuilt 1:1 from `public/design/web_tle.png`.
 *
 * The headline, sub-heads and flourish ship as outlined SVG from the design
 * export, so they are placed as images with the visible text carried on `alt`
 * (and, for the headline, an off-screen `h1` is unnecessary — the alt text on
 * the image inside the heading is what assistive tech announces).
 */
export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.stage}>
        {/* Split in two: the heavy raster plane drifts as one, and the vector
            curves, ticks and readouts animate individually. Together they
            reproduce the single `bg-elements.svg` the comp exports. */}
        <div className={styles.backdrop} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={`${styles.backdropArt} ${backdrop.plane}`}
            src="/hero/bg-elements-static.svg"
            alt=""
          />
          <HeroBackdropMotion className={`${styles.backdropArt} ${backdrop.motion}`} />
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.portrait}
          src="/hero/DSC_3834.webp"
          alt="Prasanth Sukumaran"
          width={2946}
          height={4128}
          fetchPriority="high"
        />

        <NavBar />

        <div className={styles.copy}>
          {/* The headline ships as one outlined SVG, so its four lines are four
              clipped copies of it — that lets them rise in sequence while the
              type stays exactly as the comp drew it. */}
          <h1 className={styles.title}>
            <span className={styles.srOnly}>
              Total transformation of your business with our one-month programme.
            </span>
            <span className={styles.titleLines} aria-hidden="true">
              {TITLE_BANDS.map((band, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={i}
                  className={styles.titleLine}
                  src="/hero/hero-title.svg"
                  alt=""
                  width={724}
                  height={294}
                  style={
                    {
                      "--clip-top": `${band[0]}%`,
                      "--clip-bottom": `${band[1]}%`,
                      "--i": i,
                    } as React.CSSProperties
                  }
                />
              ))}
            </span>
          </h1>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.name}
            src="/hero/hero_Sub-title.svg"
            alt="Prasanth Sukumaran"
            width={364}
            height={28}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.company}
            src="/hero/hero_Sub-title-1.svg"
            alt="ACE Business Coaching."
            width={305}
            height={29}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.flourish}
            src="/hero/hero_element1.svg"
            alt=""
            aria-hidden="true"
            width={182}
            height={10}
          />
        </div>

        {/* Static for now — wire to the carousel once the remaining slides land. */}
        <ul className={styles.dots} aria-label="Hero slides">
          {Array.from({ length: HERO_SLIDE_COUNT }, (_, i) => (
            <li
              key={i}
              className={`${styles.dot} ${i === HERO_ACTIVE_SLIDE ? styles.dotActive : ""}`}
              aria-current={i === HERO_ACTIVE_SLIDE ? "true" : undefined}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
