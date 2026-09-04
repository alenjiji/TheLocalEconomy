import CountUp from "./CountUp";
import InView from "@/components/motion/InView";
import QuoteMark from "./QuoteMark";
import RoadmapTrack from "./RoadmapTrack";
import TypedText from "./TypedText";
import styles from "./Results.module.css";
import { ROADMAP_NODES } from "@/lib/roadmapNodes";
import { ROADMAP_TIMELINE } from "@/lib/roadmapTimeline";
import { STATS, STAT_RULES, STEPS, RESULTS_TOP } from "@/lib/results";

/** Absolute comp row -> offset from the top of this section, in design units. */
const row = (y: number) => y - RESULTS_TOP;

/**
 * "What Changes When You Work With TLE?", rebuilt 1:1 from
 * `design-source/web_tle.png` (comp rows 2272–4308) with the exports in
 * `public/section_3/`.
 *
 * Four stacked bands share one absolutely-positioned canvas: the light stat
 * strip, the cyan promise card that straddles its lower edge, the dark
 * roadmap, and the amber closing band. The headline and the closing copy ship
 * as outlined SVG, so they are placed as images with their text on `alt`.
 */
export default function Results() {
  return (
    <InView as="section" className={styles.section} amount={0.06} aria-labelledby="results-heading">
      {/* `data-surface="light"` is what tells the cursor to invert over these;
          it is matched geometrically, so it works even though the copy sitting
          on these bands is not descended from them. */}
      <div className={styles.stripBg} data-surface="light" aria-hidden="true" />
      <div className={styles.ground} aria-hidden="true" />
      <div className={styles.closingBg} data-surface="light" aria-hidden="true" />

      {/* Everything below is placed on comp coordinates, so it lives on a
          centred 1440-unit stage. The painted bands above stay full-bleed. */}
      <div className={styles.stage}>

      {/* --- Stat strip ----------------------------------------------------
          Each band wrapper is `display: contents` in comp mode, so its children
          keep positioning against the section; below 1280px they become real
          blocks and the section flows. */}
      <div className={styles.strip} data-surface="light">
      <ul className={styles.stats}>
        {STATS.map((s, i) => (
          <li key={s.id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={`${styles.statIcon} u-pop`}
              src={s.icon.src}
              alt=""
              width={s.icon.width}
              height={s.icon.height}
              style={
                {
                  "--x": s.iconX,
                  "--y": row(s.iconY),
                  "--w": s.icon.width,
                  "--h": s.icon.height,
                  "--d": i,
                } as React.CSSProperties
              }
            loading="lazy"
            decoding="async"
          />
            <p
              className={`${styles.statValue} ${s.tone === "cyan" ? styles.cyan : styles.amber} u-rise`}
              style={{ "--x": s.valueX, "--d": i } as React.CSSProperties}
            >
              <CountUp value={s.value} replay />
            </p>
            <p
              className={`${styles.statCaption} u-rise`}
              style={
                {
                  "--x": s.textX,
                  "--y": row(s.captionTop),
                  "--w": s.captionWidth,
                  "--d": i + 1,
                } as React.CSSProperties
              }
            >
              {s.caption}
            </p>
          </li>
        ))}
      </ul>
      {STAT_RULES.map((x) => (
        <span key={x} className={styles.statRule} style={{ "--x": x } as React.CSSProperties} />
      ))}
      </div>

      {/* --- Promise card --------------------------------------------------- */}
      <figure className={`${styles.promise} u-rise`} style={{ "--d": 4 } as React.CSSProperties}>
        <blockquote className={styles.promiseQuote}>
          <p>
            {/* Non-breaking hyphens: the comp keeps "day-to-day" whole on its line. */}
            &ldquo; Most business owners are so deep in the day&#8209;to&#8209;day, they never
            work on the business itself. We change that. Permanently.&rdquo;
          </p>
        </blockquote>
        <figcaption className={styles.promiseBy}>
          The local economy <strong>Promise to Each Client</strong>
        </figcaption>
        {/* Body and tail are one shape, taken from `public/bubble/bubble.svg` —
            the tail's tip is radiused there, not pointed. */}
        <svg
          className={styles.promiseShape}
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
      </figure>

      {/* --- Heading -------------------------------------------------------- */}
      <div className={styles.roadmapBand}>
      <p className={`${styles.eyebrow} u-rise`}>The Real Results</p>
      <svg className={`${styles.flourish} u-rise`} style={{ "--d": 1 } as React.CSSProperties} viewBox="0 0 182.36 10.08" aria-hidden="true">
        <path
          d="M182.36.5h-78.46c-1.14,0-2.23.45-3.03,1.26l-6.57,6.57c-1.68,1.68-4.39,1.68-6.07,0l-6.57-6.57c-.8-.8-1.9-1.26-3.03-1.26H0"
          fill="none"
          stroke="currentColor"
          strokeMiterlimit="10"
        />
      </svg>

      {/* One box holds both halves of the headline at their comp ratios, so it
          scales as a unit. */}
      <h2 id="results-heading" className={`${styles.heading} u-rise`} style={{ "--d": 2 } as React.CSSProperties}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.headingWhite}
          src="/section_3/text_3.svg"
          alt="What Changes When You"
          width={706}
          height={138}
            loading="lazy"
            decoding="async"
          />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.headingCyan}
          src="/section_3/text_1.svg"
          alt="Work With TLE?"
          width={461}
          height={47}
            loading="lazy"
            decoding="async"
          />
      </h2>

      <p className={`${styles.lede} u-rise`} style={{ "--d": 3 } as React.CSSProperties}>
        Our clients don&rsquo;t just grow, they transform. Here&rsquo;s what you gain when
        The Local Economy becomes your growth partner.
      </p>

      {/* --- Roadmap --------------------------------------------------------
          One clock drives the whole thing: the track draws itself left to
          right while each step types in numbered order and its marker grows
          out of the line as that step begins. Nothing runs until the section
          is in view. */}
      <InView
        as="div"
        className={styles.roadmap}
        amount={0.15}
        style={
          {
            "--track-duration": `${Math.round(ROADMAP_TIMELINE.trackDuration)}ms`,
          } as React.CSSProperties
        }
      >
        <div className={styles.flow}>
        <RoadmapTrack className={styles.track} />

        <ol className={styles.steps}>
          {STEPS.map((s, i) => {
            const t = ROADMAP_TIMELINE.steps[i];
            return (
              <li
                key={s.id}
                className={styles.step}
                data-side={s.side}
                style={
                  {
                    /* The marker's own place on the curve, in the track's
                       viewBox units; the copy hangs off it. */
                    "--x": ROADMAP_NODES[i].x,
                    "--y": ROADMAP_NODES[i].y,
                    "--w": s.width,
                    "--dx": s.dx ?? 0,
                    "--dy": s.dy ?? 0,
                  } as React.CSSProperties
                }
              >
                <p className={styles.stepLabel}>
                  <span className={styles.stepNumber}>
                    <TypedText chars={t.number} />
                  </span>
                  <span>
                    <TypedText chars={t.label} />
                  </span>
                </p>
                <h3 className={styles.stepHeading}>
                  <TypedText chars={t.heading} />
                </h3>
                <p className={styles.stepBody}>
                  <TypedText chars={t.body} />
                </p>
              </li>
            );
          })}
        </ol>
        </div>
      </InView>

      </div>

      {/* --- Closing band ---------------------------------------------------- */}
      <div className={styles.closing}>
      {/* The tab that drops out of the dark ground into the amber band. Its
          tip is radiused, not pointed — the same shape sits on the dark band's
          lower edge in `public/flow_section/bg_flow.svg`. */}
      <svg
        className={styles.notch}
        viewBox="0 0 89.81 39.73"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,0c4.88,1.2,9.23,4.13,12.17,8.35l15.59,22.38c8.32,11.94,25.98,11.94,34.29,0l15.59-22.38c2.94-4.22,7.29-7.15,12.17-8.35Z"
          fill="#282727"
        />
      </svg>
      <QuoteMark className={styles.closingMark} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`${styles.closingText} u-rise`}
        src="/section_3/text_2.svg"
        alt="You were always meant to be the leader. The greatest transformation isn't just in your business, it's in you."
        width={639}
        height={182}
            loading="lazy"
            decoding="async"
          />
      </div>
      </div>
    </InView>
  );
}
