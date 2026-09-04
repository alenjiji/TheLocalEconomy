"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import InView from "@/components/motion/InView";
import styles from "./Testimonials.module.css";
import { TESTIMONIALS, TESTIMONIALS_ACTIVE, TESTIMONIALS_PER_VIEW } from "@/lib/testimonials";

/** The dip-and-rise rule the comp repeats under section headings. */
function Flourish({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 182.36 10.08" aria-hidden="true">
      <path
        d="M182.36.5h-78.46c-1.14,0-2.23.45-3.03,1.26l-6.57,6.57c-1.68,1.68-4.39,1.68-6.07,0l-6.57-6.57c-.8-.8-1.9-1.26-3.03-1.26H0"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
      />
    </svg>
  );
}

function Chevron({ back }: { back?: boolean }) {
  return (
    <svg viewBox="0 0 20 38" aria-hidden="true">
      <path
        d={back ? "M18 2L3 19l15 17" : "M2 2l15 17-15 17"}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * "Our Biggest Success Stories".
 *
 * The films are portrait, so the reel is built from portrait cards rather than
 * the single wide frame this section started with — and the card itself is the
 * course section's video frame: same grained ground, same brand wash, same
 * cyan play button with its halo, so the two read as one family.
 *
 * Two cards to a page on a wide screen, one on a phone. Only the card being
 * played mounts a source, and every `<video>` carries `preload="none"`, so a
 * page of six-megabyte films costs nothing until someone presses play.
 */
export default function Testimonials() {
  /*
   * How many cards fit is a layout question, but it has to be answered here
   * rather than in CSS: hiding the second card with a media query would leave
   * it on a page nothing could reach, because the paging maths would still
   * think it was on screen. A phone gets one card and twice the pages.
   */
  const [perView, setPerView] = useState(TESTIMONIALS_PER_VIEW);
  useEffect(() => {
    const one = window.matchMedia("(max-width: 640px)");
    const apply = () => setPerView(one.matches ? 1 : TESTIMONIALS_PER_VIEW);
    apply();
    one.addEventListener("change", apply);
    return () => one.removeEventListener("change", apply);
  }, []);

  const pages = Math.max(1, Math.ceil(TESTIMONIALS.length / perView));
  const [page, setPage] = useState(TESTIMONIALS_ACTIVE);
  // A narrowing window can leave the reel past its last page.
  const safePage = Math.min(page, pages - 1);
  const [playing, setPlaying] = useState<string | null>(null);
  const videos = useRef(new Map<string, HTMLVideoElement | null>());

  const go = useCallback(
    (next: number) => {
      setPlaying(null);
      setPage(((next % pages) + pages) % pages);
    },
    [pages],
  );

  const play = useCallback((id: string) => {
    const el = videos.current.get(id);
    if (!el) return;
    setPlaying(id);
    void el.play().catch(() => setPlaying(null));
  }, []);

  const shown = TESTIMONIALS.slice(safePage * perView, safePage * perView + perView);

  return (
    <InView as="section" className={styles.section} amount={0.12} aria-labelledby="testimonials-heading">
      <div className={styles.inner}>
        <p className={`${styles.eyebrow} u-rise`}>Testimonials From The Heart</p>
        <Flourish className={`${styles.flourish} u-rise`} />

        <h2 id="testimonials-heading" className={`${styles.heading} u-rise`} style={{ "--d": 1 } as React.CSSProperties}>
          <span className="u-sr-only">
            Our Biggest Success Stories are Businesses Who Keep Writing Their Journey with Us!
          </span>
          <span className={styles.headingArt} aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.headingOur} src="/testimonials/Our biggest.svg" alt="" width={439} height={78} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.headingStories}
              src="/testimonials/Success_Stories.svg"
              alt=""
              width={636}
              height={64}
            />
          </span>
        </h2>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={`${styles.subtitle} u-rise`}
          style={{ "--d": 2 } as React.CSSProperties}
          src="/testimonials/are_businesses_subtitle.svg"
          alt=""
          aria-hidden="true"
          width={1084}
          height={39}
        />

        <div className={`${styles.reel} u-rise`} style={{ "--d": 3 } as React.CSSProperties}>
          <button
            className={`${styles.arrow} ${styles.arrowPrev}`}
            type="button"
            aria-label="Previous stories"
            onClick={() => go(safePage - 1)}
            disabled={pages < 2}
          >
            <Chevron back />
          </button>

          <ul className={styles.cards}>
            {shown.map((t, i) => (
              <li
                key={t.id}
                className={`${styles.card} ${playing === t.id ? styles.playing : ""}`}
                style={{ "--i": i } as React.CSSProperties}
              >
                <div className={styles.frame}>
                  <video
                    className={styles.video}
                    ref={(el) => {
                      videos.current.set(t.id, el);
                    }}
                    src={t.src || undefined}
                    poster={t.poster || undefined}
                    preload="none"
                    playsInline
                    controls={playing === t.id}
                    data-cursor="native"
                    onPause={() => setPlaying((p) => (p === t.id ? null : p))}
                    onEnded={() => setPlaying((p) => (p === t.id ? null : p))}
                  />
                  <div className={styles.frameArt} aria-hidden="true" />
                  <button
                    className={styles.play}
                    type="button"
                    data-cursor="cyan"
                    aria-label={`Play ${t.name}, ${t.role} of ${t.company}`}
                    onClick={() => play(t.id)}
                  >
                    <svg viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M19 14.5v19l15-9.5z" fill="currentColor" />
                    </svg>
                  </button>
                </div>

                <figcaption className={styles.caption}>
                  <span className={styles.person}>{t.name}</span>
                  <span className={styles.company}>
                    {t.role} &middot; {t.company}
                  </span>
                  {t.motto ? <span className={styles.motto}>{t.motto}</span> : null}
                </figcaption>
              </li>
            ))}
          </ul>

          <button
            className={`${styles.arrow} ${styles.arrowNext}`}
            type="button"
            aria-label="Next stories"
            onClick={() => go(safePage + 1)}
            disabled={pages < 2}
          >
            <Chevron />
          </button>
        </div>

        {pages > 1 ? (
          <ul className={styles.dots} aria-label="Story pages">
            {Array.from({ length: pages }, (_, i) => (
              <li key={i}>
                <button
                  className={`${styles.dot} ${i === safePage ? styles.dotActive : ""}`}
                  type="button"
                  aria-label={`Show ${perView > 1 ? "stories" : "story"} ${i * perView + 1}\u2013${Math.min((i + 1) * perView, TESTIMONIALS.length)}`}
                  aria-current={i === safePage ? "true" : undefined}
                  onClick={() => go(i)}
                />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </InView>
  );
}
