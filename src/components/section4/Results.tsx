import InView from "@/components/motion/InView";
import RoadmapTrack from "./RoadmapTrack";
import TypedText from "./TypedText";
import roadmap from "./Roadmap.module.css";
import styles from "./Results.module.css";
import { ROADMAP_TIMELINE } from "@/lib/roadmapTimeline";
import { STATS, STAT_RULES, STEPS, RESULTS_TOP } from "@/lib/results";

/** Absolute comp row -> offset from the top of this section, in design units. */
const row = (y: number) => y - RESULTS_TOP;

/**
 * "What Changes When You Work With TLE?", rebuilt 1:1 from
 * `public/design/web_tle.png` (comp rows 2272–4308) with the exports in
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
      <div className={styles.ground} aria-hidden="true" />
      <div className={styles.closingBg} aria-hidden="true" />

      {/* --- Stat strip ----------------------------------------------------
          Each band wrapper is `display: contents` in comp mode, so its children
          keep positioning against the section; below 1280px they become real
          blocks and the section flows. */}
      <div className={styles.strip}>
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
            />
            <p
              className={`${styles.statValue} ${s.tone === "cyan" ? styles.cyan : styles.amber} u-rise`}
              style={{ "--x": s.valueX, "--d": i } as React.CSSProperties}
            >
              {s.value}
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
        <span className={styles.promiseTail} aria-hidden="true" />
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
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.headingCyan}
          src="/section_3/text_1.svg"
          alt="Work With TLE?"
          width={461}
          height={47}
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
        <RoadmapTrack className={styles.track} />

        <ol className={styles.steps}>
          {STEPS.map((s, i) => {
            const t = ROADMAP_TIMELINE.steps[i];
            return (
              <li
                key={s.id}
                className={styles.step}
                style={
                  {
                    "--x": s.x,
                    "--y": row(s.y),
                    "--w": s.width,
                    "--body-offset": s.bodyOffset ?? 0,
                    "--align": s.align ?? "justify",
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
      </InView>

      </div>

      {/* --- Closing band ---------------------------------------------------- */}
      <div className={styles.closing}>
      <div className={styles.notch} aria-hidden="true" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`${styles.closingMark} u-rise`}
        src="/section_3/el_6.svg"
        alt=""
        aria-hidden="true"
        width={54}
        height={175}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`${styles.closingText} u-rise`}
        src="/section_3/text_2.svg"
        alt="You were always meant to be the leader. The greatest transformation isn't just in your business, it's in you."
        width={639}
        height={182}
      />
      </div>
    </InView>
  );
}
