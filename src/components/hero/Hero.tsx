import HeroBackdropMotion from "./HeroBackdropMotion";
import NavBar from "./NavBar";
import backdrop from "./HeroBackdrop.module.css";
import styles from "./Hero.module.css";
import { HERO_ACTIVE_SLIDE, HERO_SLIDE_COUNT } from "@/lib/design";

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
          <h1>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.title}
              src="/hero/hero-title.svg"
              alt="Total transformation of your business with our one-month programme."
              width={724}
              height={294}
            />
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
