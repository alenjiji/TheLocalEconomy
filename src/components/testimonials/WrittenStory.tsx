"use client";

import { Fragment } from "react";

import InView from "@/components/motion/InView";
import PointerParallax from "@/components/motion/PointerParallax";
import { seededRandom } from "@/lib/motion";
import { WRITTEN_STORY } from "@/lib/testimonials";
import styles from "./WrittenStory.module.css";

/**
 * The site's quote mark, on its own.
 *
 * The two polygons are lifted straight from `el_6.svg` — the glyph in the
 * closing band of the results section — with the 70.16 the artboard put above
 * them taken off. Same mark, so the two quotations on the page are plainly the
 * same voice; amber rather than ink, because this one sits on a dark ground.
 */
function QuoteGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 53.58 39.63" aria-hidden="true" focusable="false">
      <polygon
        className={styles.glyph}
        points="0 0 0 24.33 11.77 24.33 9.82 39.63 24.32 24.33 24.32 0"
        fill="currentColor"
      />
      <polygon
        className={`${styles.glyph} ${styles.glyphSecond}`}
        points="29.25 0 29.25 24.33 41.03 24.33 39.07 39.63 53.58 24.33 53.58 0"
        fill="currentColor"
      />
    </svg>
  );
}

/*
 * A word lands every `STEP` milliseconds, give or take `JITTER` of it.
 *
 * Dead-even timing reads as a machine dealing cards. The jitter is drawn from
 * a seeded generator rather than `Math.random` so the server and the client
 * agree on every delay — otherwise React flags the mismatch on hydration.
 */
const STEP = 15;
const JITTER = 0.55;

/**
 * The quote, one paragraph to a `<p>` and one `<span>` to a word.
 *
 * Spaces are plain text nodes between the spans, never part of them: the words
 * are `inline-block` so they can be moved, and an `inline-block` swallows the
 * whitespace inside it — which is what once ran a whole paragraph together on
 * a single line.
 */
function QuoteBody() {
  const rand = seededRandom(0x5a17);
  let at = 0;

  return (
    <div className={styles.body}>
      {WRITTEN_STORY.body.map((runs, pi) => (
        <p className={styles.paragraph} key={pi}>
          {runs.map((run, ri) => {
            const words = run.text.split(" ");
            return (
              <Fragment key={ri}>
                {words.map((word, wi) => {
                  /* A run starts mid-word where the previous one ended on
                     punctuation, so an empty piece is a join, not a word. */
                  if (word === "") return <Fragment key={wi}> </Fragment>;
                  at += STEP * (1 + (rand() - 0.5) * 2 * JITTER);
                  return (
                    <Fragment key={wi}>
                      <span
                        className={`${styles.word} ${run.mark ? styles.mark : ""}`}
                        style={{ "--wd": `${Math.round(at)}ms` } as React.CSSProperties}
                      >
                        {word}
                      </span>
                      {wi < words.length - 1 ? " " : null}
                    </Fragment>
                  );
                })}
              </Fragment>
            );
          })}
        </p>
      ))}
    </div>
  );
}

/**
 * The featured written testimonial, above the film reel.
 *
 * One panel: the portrait bleeding off the left edge, the letter on the right.
 * It borrows the reel card's ground — the same dark, the same grain, the same
 * corner radius — so the featured story and the films read as one section
 * rather than two ideas stacked.
 *
 * It carries its own `InView` rather than riding the section's. The section is
 * several screens tall and its flag trips on the heading; this panel is the
 * thing being watched, so it should start when *it* arrives.
 */
export default function WrittenStory() {
  const { name, role, company, portrait, portraitAlt } = WRITTEN_STORY;

  return (
    <InView as="figure" className={styles.feature} amount={0.15}>
      <PointerParallax className={styles.portraitCol}>
        <div className={styles.portraitFrame} data-parallax>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.portrait}
            src={portrait}
            alt={portraitAlt}
            width={1114}
            height={1412}
            loading="lazy"
            decoding="async"
          />
        </div>
        {/* Lifts the foot of the picture off the panel so the crop reads as a
            choice; on the stacked layout it becomes the seam between the two. */}
        <span className={styles.portraitWash} aria-hidden="true" />
      </PointerParallax>

      <blockquote className={styles.quote}>
        <QuoteGlyph className={styles.glyphs} />
        <QuoteBody />
      </blockquote>

      <figcaption className={styles.attribution}>
        <span className={styles.rule} aria-hidden="true" />
        <span className={styles.name}>{name}</span>
        <span className={styles.role}>
          {role} &middot; {company}
        </span>
      </figcaption>
    </InView>
  );
}
