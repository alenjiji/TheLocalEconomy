"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import InView from "@/components/motion/InView";
import SlideDeck from "@/components/motion/SlideDeck";
import WrittenStory from "./WrittenStory";
import styles from "./Testimonials.module.css";
import {
  TESTIMONIALS,
  TESTIMONIALS_ACTIVE,
  TESTIMONIALS_PER_VIEW,
  type Testimonial,
} from "@/lib/testimonials";

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
 * One story.
 *
 * The card owns its video outright rather than registering it in a map the
 * parent keeps. That map was the fragile part: entries were written and nulled
 * on every mount, unmount and re-render, and a stale one meant `play()` had
 * nothing to call. A ref that lives and dies with the element cannot go stale.
 *
 * It also pauses on the way out. An unmounted element that is still decoding
 * can hold the decoder on a phone, which is enough to make the next film
 * refuse to start.
 *
 * What was actually stopping the second film on a phone, though, was the file:
 * it was VP9 Profile 3 — 10-bit, 4:2:2 — which no phone decodes. See the note
 * on `src` in lib/testimonials.
 */
function StoryCard({
  story,
  index,
  playing,
  onPlay,
  onStop,
}: {
  story: Testimonial;
  index: number;
  playing: boolean;
  onPlay: () => void;
  onStop: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    /*
     * Pause on the way out, and nothing more.
     *
     * Tearing the source off the element here as well seemed tidier — it
     * releases the buffer outright — but React's development double-invoke
     * runs this cleanup on the *first* mount too, against the same DOM node
     * that is about to be reused. The attribute went, React saw no prop change
     * so never put it back, and every card rendered with no film at all.
     * Pausing is idempotent; the node itself is discarded on a real unmount,
     * which is what frees the decoder.
     */
    return () => el?.pause();
  }, []);

  const start = useCallback(() => {
    const el = videoRef.current;
    if (!el || !(story.src || story.srcMp4)) return;
    onPlay();
    // `preload="none"` means there may be nothing to play yet; asking for the
    // load inside the gesture is what keeps mobile from refusing it.
    if (el.readyState === 0) el.load();
    void el.play().catch(() => onStop());
  }, [onPlay, onStop, story.src, story.srcMp4]);

  return (
    <li
      className={`${styles.card} ${playing ? styles.playing : ""}`}
      style={{ "--i": index } as React.CSSProperties}
    >
      <div className={`${styles.frame} ${story.poster ? styles.framePoster : ""}`}>
        {/*
         * Sources rather than one `src`, so the browser can pass on a container
         * it cannot decode instead of failing the whole element. WebM first for
         * the size; the H.264 MP4 is what Safari actually takes.
         */}
        <video
          className={styles.video}
          ref={videoRef}
          poster={story.poster || undefined}
          preload="none"
          playsInline
          controls={playing}
          data-cursor="native"
          onPause={onStop}
          onEnded={onStop}
          onError={onStop}
        >
          {story.src ? <source src={story.src} type="video/webm" /> : null}
          {story.srcMp4 ? <source src={story.srcMp4} type="video/mp4" /> : null}
        </video>
        {/* The stand-in, or — over a real poster — the scrim that keeps the
            play button legible against the photograph. */}
        <div
          className={`${styles.frameArt} ${story.poster ? styles.frameArtScrim : ""}`}
          aria-hidden="true"
        />
        <button
          className={styles.play}
          type="button"
          data-cursor="cyan"
          aria-label={`Play ${story.name}, ${story.role} of ${story.company}`}
          onClick={start}
        >
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <path d="M19 14.5v19l15-9.5z" fill="currentColor" />
          </svg>
        </button>
      </div>

      <figcaption className={styles.caption}>
        <span className={styles.person}>{story.name}</span>
        <span className={styles.company}>
          {story.role} &middot; {story.company}
        </span>
        {story.motto ? <span className={styles.motto}>{story.motto}</span> : null}
      </figcaption>
    </li>
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
  // Which way the reel was sent. The deck cannot infer this across two pages —
  // stepping back and wrapping forward are the same move — so the control that
  // was pressed says so.
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const go = useCallback(
    (next: number, way: "next" | "prev") => {
      setPlaying(null);
      setDirection(way);
      setPage(((next % pages) + pages) % pages);
    },
    [pages],
  );

  const shown = TESTIMONIALS.slice(safePage * perView, safePage * perView + perView);

  return (
    <InView
      as="section"
      id="testimonial"
      className={styles.section}
      amount={0.12}
      aria-labelledby="testimonials-heading"
    >
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

        {/* The letter first, then the films. */}
        <WrittenStory />

        <div className={`${styles.reel} u-rise`} style={{ "--d": 3 } as React.CSSProperties}>
          <button
            className={`${styles.arrow} ${styles.arrowPrev}`}
            type="button"
            aria-label="Previous stories"
            onClick={() => go(safePage - 1, "prev")}
            disabled={pages < 2}
          >
            <Chevron back />
          </button>

          {/* Keyed on the page, so each turn remounts the cards — which is
              also what tears the previous film down. */}
          <SlideDeck className={styles.deck} index={safePage} count={pages} direction={direction}>
            <ul className={styles.cards}>
              {shown.map((t, i) => (
                <StoryCard
                  key={t.id}
                  story={t}
                  index={i}
                  playing={playing === t.id}
                  onPlay={() => setPlaying(t.id)}
                  onStop={() => setPlaying((p) => (p === t.id ? null : p))}
                />
              ))}
            </ul>
          </SlideDeck>

          <button
            className={`${styles.arrow} ${styles.arrowNext}`}
            type="button"
            aria-label="Next stories"
            onClick={() => go(safePage + 1, "next")}
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
                  onClick={() => go(i, i < safePage ? "prev" : "next")}
                />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </InView>
  );
}
