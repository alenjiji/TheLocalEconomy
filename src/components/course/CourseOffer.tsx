"use client";

import { useCallback, useRef, useState } from "react";

import InView from "@/components/motion/InView";
import PaymentOverlay from "./PaymentOverlay";
import styles from "./CourseOffer.module.css";
import { COURSE } from "@/lib/course";

/** The dip-and-rise rule the comp repeats under section headings. */
function Flourish({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 182.36 10.08" aria-hidden="true">
      <path
        d="M182.36.5h-78.46c-1.14,0-2.23.45-3.03,1.26l-6.57,6.57c-1.68,1.68-4.39,1.68-6.07,0l-6.57-6.57c-.8-.8-1.9-1.26-3.03-1.26H0"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
      />
    </svg>
  );
}

/** Line art for the three meta rows, drawn to one 24-unit box. */
const META_ICONS: Record<string, React.ReactNode> = {
  modules: (
    <>
      <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4H10a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H4.5A1.5 1.5 0 0 1 3 15.5z" />
      <path d="M21 5.5A1.5 1.5 0 0 0 19.5 4H14a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h5.5a1.5 1.5 0 0 0 1.5-1.5z" />
    </>
  ),
  language: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.2 2.3 3.3 5.2 3.3 8.5s-1.1 6.2-3.3 8.5c-2.2-2.3-3.3-5.2-3.3-8.5S9.8 5.8 12 3.5z" />
    </>
  ),
  access: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.4l3.4 2" />
    </>
  ),
};

/**
 * The course offer.
 *
 * Unlike the sections around it there is no comp for this one, so it is laid
 * out in flow — a centred 1280-unit column holding the preview and the offer
 * card — rather than on measured coordinates. Sizes are still in `--u`, so it
 * scales with the rest of the page.
 */
export default function CourseOffer() {
  const [payOpen, setPayOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Nothing of the film is fetched until this runs — the element carries
  // `preload="none"` and no poster attribute, so the 21MB never touches a
  // first page load.
  const play = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    setPlaying(true);
    void el.play().catch(() => setPlaying(false));
  }, []);

  return (
    <InView as="section" className={styles.section} amount={0.15} aria-labelledby="course-heading">
      <div className={styles.inner}>
        <div className={styles.head}>
          <p className={`${styles.eyebrow} u-rise`}>Learn It Yourself</p>
          <Flourish className={`${styles.flourish} u-rise`} style={{ "--d": 1 } as React.CSSProperties} />
          <h2 id="course-heading" className={`${styles.heading} u-rise`} style={{ "--d": 2 } as React.CSSProperties}>
            Buy the <span className={styles.cyan}>Course</span> Now
          </h2>
        </div>

        <div className={styles.body}>
          {/* --- Preview ---------------------------------------------------- */}
          <div
            className={`${styles.preview} ${playing ? styles.playing : ""} u-rise`}
            style={{ "--d": 3 } as React.CSSProperties}
          >
            <video
              className={styles.video}
              ref={videoRef}
              src={COURSE.video.src}
              poster={COURSE.video.poster || undefined}
              width={COURSE.video.width}
              height={COURSE.video.height}
              preload="none"
              playsInline
              /* Hands the pointer back for the native controls. */
              data-cursor="native"
              controls={playing}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
            />

            {/* Sits over the film until it is running, then gets out of the way
                so the native controls are reachable. */}
            <div className={styles.previewArt} aria-hidden="true" />
            <button
              className={styles.play}
              type="button"
              data-cursor="cyan"
              aria-label={`Play the ${COURSE.title} preview`}
              onClick={play}
            >
              <svg viewBox="0 0 48 48" aria-hidden="true">
                <path d="M19 15.5v17l14-8.5z" fill="currentColor" />
              </svg>
            </button>
            <p className={styles.previewLabel}>Course preview</p>
          </div>

          {/* --- Offer card ------------------------------------------------- */}
          <div className={`${styles.card} u-rise`} style={{ "--d": 4 } as React.CSSProperties}>
            <h3 className={styles.title}>
              {COURSE.title}
              <span className={styles.titleSub}>{COURSE.subtitle}</span>
            </h3>
            <p className={styles.provider}>{COURSE.provider}</p>
            <p className={styles.blurb}>{COURSE.blurb}</p>

            <ul className={styles.meta}>
              {COURSE.meta.map((m) => (
                <li key={m.id}>
                  <svg
                    className={styles.metaIcon}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {META_ICONS[m.icon]}
                  </svg>
                  {m.label}
                </li>
              ))}
            </ul>

            <p className={styles.price}>
              <span className={styles.priceNow}>
                <span className={styles.currency}>{COURSE.price.currency}</span>
                {COURSE.price.amount}
              </span>
              <span className={styles.priceWas}>
                {COURSE.price.currency}
                {COURSE.price.was}
              </span>
            </p>

            <button
              className={`${styles.buy} u-liquid u-liquid-amber`}
              type="button"
              data-cursor="amber"
              onClick={() => setPayOpen(true)}
            >
              <span>Buy Now</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 12h15M13 6l6 6-6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <PaymentOverlay open={payOpen} onClose={() => setPayOpen(false)} />
    </InView>
  );
}
