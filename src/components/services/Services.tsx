import Link from "next/link";

import InView from "@/components/motion/InView";
import styles from "./Services.module.css";
import { APPROACH, LEVERS, SECTORS } from "@/lib/services";

/** The dip-and-rise rule the build repeats under every section eyebrow. */
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

/** Two digits, the way the flow section numbers its steps. */
const two = (n: number) => String(n + 1).padStart(2, "0");

/**
 * "Our Services" — the seven levers, the question, and who it is for.
 *
 * The numbered levers borrow the flow section's device: an amber ordinal
 * against a white label, which is how this build already counts things out.
 */
function OurServices() {
  return (
    <InView as="section" className={styles.opening} amount={0.1} aria-labelledby="services-heading">
      <div className={styles.inner}>
        <p className={`${styles.eyebrow} u-rise`}>Our Services</p>
        <Flourish className={`${styles.flourish} u-rise`} />

        <h1 id="services-heading" className={`${styles.heading} u-rise`} style={{ "--d": 1 } as React.CSSProperties}>
          Seven Levers.
          <span className={styles.headingLine}>
            One <span className={styles.cyan}>Support System</span>.
          </span>
        </h1>

        <p className={`${styles.lede} u-rise`} style={{ "--d": 2 } as React.CSSProperties}>
          We don&rsquo;t believe in half-measures. The Local Economy works across every critical
          dimension of your business. Because sustainable growth is never the result of fixing just
          one thing.
        </p>

        <ol className={styles.levers}>
          {LEVERS.map((lever, i) => (
            <li key={lever} className={`${styles.lever} u-rise`} style={{ "--d": i + 3 } as React.CSSProperties}>
              <span className={styles.leverNumber}>{two(i)}</span>
              <span className={styles.leverLabel}>{lever}</span>
            </li>
          ))}
        </ol>

        <figure className={`${styles.bubble} u-rise`} style={{ "--d": 4 } as React.CSSProperties}>
          {/* Body and tail as one shape, so the tail keeps the radius the export
              draws rather than coming to a point. */}
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
              &ldquo;Is your business working for you, or are you working for your business?&rdquo;
            </p>
            <figcaption className={styles.bubbleBy}>
              We help you answer this question and build the business that sets you free.
            </figcaption>
          </blockquote>
        </figure>
      </div>

      <div className={styles.sectors} data-surface="light">
        <div className={styles.inner}>
          <h2 className={`${styles.sectorsHeading} u-rise`}>
            Any Business is <span className={styles.sectorsAccent}>Our Business</span>
          </h2>
          <ul className={styles.sectorList}>
            {SECTORS.map((sector, i) => (
              <li
                key={sector}
                className={`${styles.sector} u-rise`}
                style={{ "--d": i + 1 } as React.CSSProperties}
              >
                {sector}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </InView>
  );
}

/** "Your Growth Journey Starts Here" — the invitation and the four steps. */
function GrowthJourney() {
  return (
    <InView as="section" className={styles.journey} amount={0.12} aria-labelledby="journey-heading">
      <div className={styles.inner}>
        <p className={`${styles.eyebrow} u-rise`}>Your Growth Journey Starts Here</p>
        <Flourish className={`${styles.flourish} u-rise`} />

        <h2 id="journey-heading" className={`${styles.heading} u-rise`} style={{ "--d": 1 } as React.CSSProperties}>
          Ready to Build a Business
          <span className={styles.headingLine}>
            Worth Being <span className={styles.amber}>Proud Of</span>?
          </span>
        </h2>

        <p className={`${styles.lede} u-rise`} style={{ "--d": 2 } as React.CSSProperties}>
          Join hundreds of business owners who chose to stop surviving and start building. The Local
          Economy is ready to grow with you.
        </p>

        <Link
          className={`${styles.cta} u-liquid u-liquid-amber u-rise`}
          style={{ "--d": 3 } as React.CSSProperties}
          href="/#consultation"
          data-cursor="amber"
        >
          <span>Book a Free Consultation</span>
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
        </Link>

        <h3 className={`${styles.approachHeading} u-rise`} style={{ "--d": 4 } as React.CSSProperties}>
          Know Our Approach
        </h3>
        <Flourish
          className={`${styles.flourish} ${styles.approachFlourish} u-rise`}
          style={{ "--d": 4 } as React.CSSProperties}
        />

        {/*
         * Four drawings on one line, linked by the exported cyan connector, with
         * the ordinal and copy ranged left under each. The list is a four-row
         * grid and every step is a subgrid of it, so drawing, ordinal, heading
         * and body line up across the columns however the headings wrap.
         */}
        <ol className={styles.approach}>
          {APPROACH.map((step, i) => (
            <li
              key={step.id}
              className={`${styles.step} u-rise`}
              style={{ "--d": i + 5, "--vbw": step.iconWidth } as React.CSSProperties}
            >
              <span className={styles.stepIcon}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={styles.stepArt}
                  src={step.icon}
                  alt=""
                  width={step.iconWidth}
                  height={step.iconHeight}
                  loading="lazy"
                  decoding="async"
                />
                {i < APPROACH.length - 1 ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className={styles.stepLink}
                    src="/our_services/web/connect.svg"
                    alt=""
                    width={173.25}
                    height={41.39}
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
              </span>
              <span className={styles.stepNumber}>{two(i)}.</span>
              <h4 className={styles.stepHeading}>{step.heading}</h4>
              <p className={styles.stepBody}>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </InView>
  );
}

export default function Services() {
  return (
    <>
      <OurServices />
      <GrowthJourney />
    </>
  );
}
