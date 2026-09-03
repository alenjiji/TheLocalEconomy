import InView from "@/components/motion/InView";
import PointerParallax from "@/components/motion/PointerParallax";
import PillButton from "@/components/ui/PillButton";
import TotalBizFixLockup from "./TotalBizFixLockup";
import BusinessCheckupLockup from "./BusinessCheckupLockup";
import styles from "./Programmes.module.css";
import { PROGRAMME_CARDS } from "@/lib/programmes";

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

/**
 * "Comprehensive Brand Programmes", rebuilt 1:1 from
 * `design-source/web_tle.png` with the exports in `public/section_2/`.
 *
 * The comp runs a light band behind the top two thirds of the cards and a
 * grained near-black ground behind the rest, so the cards straddle the seam.
 */
export default function Programmes() {
  const [bizFix, checkup, consultancy] = PROGRAMME_CARDS;

  return (
    <InView as="section" className={styles.section} amount={0.12} aria-labelledby="programmes-heading">
      {/* `display: contents` in comp mode, so the band and heading keep
          positioning against the section; a real block once the layout
          re-flows, so the band can wrap the heading instead. */}
      <div className={styles.head}>
        <div className={styles.band} data-surface="light" aria-hidden="true" />
        <h2 id="programmes-heading" className={`${styles.heading} u-rise`}>
          Comprehensive Brand Programmes
        </h2>
        <Flourish className={`${styles.flourish} u-rise`} style={{ "--d": 1 } as React.CSSProperties} />
      </div>

      <PointerParallax className={styles.cards}>
        {/* --- Total Biz Fix --------------------------------------------- */}
        <article
          className={`${styles.card} ${styles.cardDark} u-rise`}
          data-parallax
          style={{ "--d": 2 } as React.CSSProperties}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.bizFixPortrait}
            src="/section_2/img_1.webp"
            alt="Prasanth Sukumaran"
            width={768}
            height={1254}
            loading="lazy"
            decoding="async"
          />
          <TotalBizFixLockup className={styles.bizFixLockup} />
          <p className={styles.bizFixBody}>{bizFix.body}</p>
          <p className={styles.bizFixName}>Prasanth Sukumaran</p>
          <p className={styles.bizFixRole}>Business Coach</p>
          <PillButton
            className={styles.cta}
            href={bizFix.cta.href}
            label={bizFix.cta.label}
            tone={bizFix.cta.tone}
            width={256.58}
            labelX={bizFix.cta.labelX}
            arrowX={bizFix.cta.arrowX}
          />
        </article>

        {/* --- 360° Business Checkup ------------------------------------- */}
        <article
          className={`${styles.card} ${styles.cardLight} u-rise`}
          data-surface="light"
          data-parallax
          style={{ "--d": 3 } as React.CSSProperties}
        >
          <div className={styles.checkupPhoto}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/section_2/Prasanth-B&W.webp"
              alt="Prasanth Sukumaran presenting the 360° Business Consulting framework"
              width={1391}
              height={1402}
            loading="lazy"
            decoding="async"
          />
          </div>
          <BusinessCheckupLockup className={styles.checkupLockup} />
          <span className={styles.checkupRule} aria-hidden="true" />
          <p className={styles.checkupBody}>{checkup.body}</p>
          <PillButton
            className={styles.cta}
            href={checkup.cta.href}
            label={checkup.cta.label}
            tone={checkup.cta.tone}
            width={256.58}
            labelX={checkup.cta.labelX}
            arrowX={checkup.cta.arrowX}
          />
        </article>

        {/* --- Consultancy ----------------------------------------------- */}
        <article
          className={`${styles.card} ${styles.cardDark} u-rise`}
          data-parallax
          style={{ "--d": 4 } as React.CSSProperties}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.consultancyArt}
            src="/section_2/Img_2-cutout.webp"
            alt="Prasanth Sukumaran shaking hands with a client across a meeting table"
            width={1536}
            height={1024}
            loading="lazy"
            decoding="async"
          />
          <h3 className={styles.consultancyHeading}>Consultancy</h3>
          <p className={styles.consultancyBody}>{consultancy.body}</p>
          <PillButton
            className={styles.cta}
            href={consultancy.cta.href}
            label={consultancy.cta.label}
            tone={consultancy.cta.tone}
            width={256.58}
            labelX={consultancy.cta.labelX}
            arrowX={consultancy.cta.arrowX}
          />
        </article>
      </PointerParallax>
    </InView>
  );
}
