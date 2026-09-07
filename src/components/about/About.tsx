import CountUp from "@/components/section4/CountUp";
import InView from "@/components/motion/InView";
import styles from "./About.module.css";
import { ABOUT_BELIEFS, ABOUT_PILLARS, ABOUT_STATS } from "@/lib/about";

/**
 * The quote glyphs from `el_6.svg`, on a viewBox cropped to them.
 *
 * The landing page's `QuoteMark` carries two vertical rules either side of the
 * mark, which are part of the closing band's composition — inside a card they
 * read as stray lines, so only the glyphs come across.
 */
function Quote({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 70.16 53.58 39.63" aria-hidden="true" focusable="false">
      <polygon
        points="29.25 70.16 29.25 94.49 41.03 94.49 39.07 109.79 53.58 94.49 53.58 70.16 29.25 70.16"
        fill="currentColor"
      />
      <polygon
        points="0 70.16 0 94.49 11.77 94.49 9.82 109.79 24.32 94.49 24.32 70.16 0 70.16"
        fill="currentColor"
      />
    </svg>
  );
}

/** The dip-and-rise rule the build repeats under every section eyebrow. */
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

/**
 * "What We Are" — the page's opening.
 *
 * Built from the same parts as the landing page rather than a new set: the
 * grained ground and its hairline, the amber eyebrow over a flourish, the
 * one-piece cyan bubble from `public/bubble/bubble.svg`, and the four figures
 * that count up on the light strip.
 */
function WhatWeAre() {
  return (
    <InView as="section" className={styles.opening} amount={0.1} aria-labelledby="about-heading">
      <div className={styles.inner}>
        <p className={`${styles.eyebrow} u-rise`}>What We Are</p>
        <Flourish className={`${styles.flourish} u-rise`} />

        <h1 id="about-heading" className={`${styles.heading} u-rise`} style={{ "--d": 1 } as React.CSSProperties}>
          Not Just a Consultancy.
          <span className={styles.headingLine}>
            A <span className={styles.cyan}>Growth Engine</span> for Businesses.
          </span>
        </h1>

        <div className={`${styles.lede} u-rise`} style={{ "--d": 2 } as React.CSSProperties}>
          <p>
            The Local Economy is one of India&rsquo;s boldest business growth platform, built for the
            entrepreneurs who are done playing small. We exist at the intersection of global
            business intelligence and local business reality.
          </p>
          <p>
            Founded on one powerful belief: that every local business in India has the potential,
            people, and purpose to compete on the world stage. It just needs the right architecture.
          </p>
        </div>

        <figure className={`${styles.bubble} u-rise`} style={{ "--d": 3 } as React.CSSProperties}>
          {/* Body and tail as one shape, so the tail's tip keeps the radius the
              export draws rather than coming to a point. */}
          <svg
            className={styles.bubbleShape}
            viewBox="0 0 835.53 261.7"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M385.02,230.1l15.59,22.38c8.32,11.94,25.98,11.94,34.29,0l15.59-22.38c3.91-5.61,10.31-8.95,17.15-8.95h346.72c11.54,0,20.9-9.36,20.9-20.9V21.16c0-11.54-9.36-20.9-20.9-20.9H21.16C9.62.26.26,9.62.26,21.16v179.09c0,11.54,9.36,20.9,20.9,20.9h346.72c6.84,0,13.24,3.34,17.15,8.95Z"
              fill="#00adee"
              stroke="#43d3ff"
              strokeMiterlimit="10"
              strokeWidth="0.53"
            />
          </svg>
          <blockquote className={styles.bubbleQuote}>
            <p>
              &ldquo;Every Great Global Brand Was Once a Local Business With a Vision.&rdquo;
            </p>
          </blockquote>
        </figure>
      </div>

      <div className={styles.strip} data-surface="light">
        <ul className={styles.stats}>
          {ABOUT_STATS.map((s, i) => (
            <li key={s.id} className={styles.stat} style={{ "--d": i } as React.CSSProperties}>
              <span className={`${styles.statTop} u-pop`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={styles.statIcon}
                  src={s.icon.src}
                  alt=""
                  width={s.icon.width}
                  height={s.icon.height}
                  loading="lazy"
                  decoding="async"
                />
                <span className={`${styles.statValue} ${s.tone === "cyan" ? styles.cyan : styles.amber}`}>
                  <CountUp value={s.value} replay />
                </span>
              </span>
              <span className={`${styles.statCaption} u-rise`}>{s.caption}</span>
            </li>
          ))}
        </ul>

        <p className={`${styles.stripNote} u-rise`}>
          The Local Economy brings professional business development to the entrepreneurs who have
          always deserved it, with a <strong>Local to Global</strong> approach that respects your
          roots while raising your reach.
        </p>
      </div>
    </InView>
  );
}

/** "Our Aim" — the four pillars. */
function OurAim() {
  return (
    <InView as="section" className={styles.aim} amount={0.12} aria-labelledby="aim-heading">
      <div className={styles.inner}>
        <p className={`${styles.eyebrow} u-rise`}>Our Aim</p>
        <Flourish className={`${styles.flourish} u-rise`} />

        <h2 id="aim-heading" className={`${styles.heading} u-rise`} style={{ "--d": 1 } as React.CSSProperties}>
          We Don&rsquo;t Chase Milestones.
          <span className={styles.headingLine}>
            We <span className={styles.amber}>Build Movements</span>.
          </span>
        </h2>

        <ul className={styles.pillars}>
          {ABOUT_PILLARS.map((p, i) => (
            <li
              key={p.id}
              className={`${styles.pillar} u-rise`}
              style={{ "--d": i + 2 } as React.CSSProperties}
            >
              <p className={styles.pillarLabel}>{p.label}</p>
              <h3 className={styles.pillarHeading}>{p.heading}</h3>
              <p className={styles.pillarBody}>{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </InView>
  );
}

/** The two closing statements, each on its own brand ground. */
function Beliefs() {
  return (
    <InView as="section" className={styles.beliefs} amount={0.15} aria-label="What we stand for">
      <div className={styles.inner}>
        <ul className={styles.beliefList}>
          {ABOUT_BELIEFS.map((b, i) => (
            <li
              key={b.id}
              className={`${styles.belief} ${b.tone === "amber" ? styles.beliefAmber : styles.beliefCyan} u-rise`}
              style={{ "--d": i } as React.CSSProperties}
            >
              <Quote className={styles.beliefMark} />
              <p className={styles.beliefLabel}>{b.label}</p>
              <blockquote className={styles.beliefQuote}>
                <p>&ldquo;{b.quote}&rdquo;</p>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </InView>
  );
}

export default function About() {
  return (
    <>
      <WhatWeAre />
      <OurAim />
      <Beliefs />
    </>
  );
}
