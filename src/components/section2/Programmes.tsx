import TotalBizFixLockup from "./TotalBizFixLockup";
import BusinessCheckupLockup from "./BusinessCheckupLockup";
import styles from "./Programmes.module.css";
import { PROGRAMME_CARDS } from "@/lib/programmes";

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

/**
 * "Comprehensive Brand Programmes", rebuilt 1:1 from
 * `public/design/web_tle.png` with the exports in `public/section_2/`.
 *
 * The comp runs a light band behind the top two thirds of the cards and a
 * grained near-black ground behind the rest, so the cards straddle the seam.
 */
export default function Programmes() {
  const [bizFix, checkup, consultancy] = PROGRAMME_CARDS;

  return (
    <section className={styles.section} aria-labelledby="programmes-heading">
      {/* Knocks the white studio backdrop out of the consultancy photo, which
          was exported flattened onto white. Luminance becomes alpha, then the
          transfer table inverts it with a steep ramp so only near-white drops
          out. The region is pinned to the bounding box: the default -10% bleed
          would turn its transparent margin into opaque black. */}
      <svg className={styles.defs} aria-hidden="true" focusable="false">
        <filter
          id="knockout-white"
          x="0"
          y="0"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0.2126 0.7152 0.0722 0 0"
          />
          <feComponentTransfer result="knocked">
            <feFuncA
              type="table"
              tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0.5 0 0"
            />
          </feComponentTransfer>
          {/* Clip back to the source's own alpha — inverting luminance turns the
              transparent edge of the filter region into opaque black otherwise. */}
          <feComposite in="knocked" in2="SourceGraphic" operator="in" />
        </filter>
      </svg>

      {/* `display: contents` in comp mode, so the band and heading keep
          positioning against the section; a real block once the layout
          re-flows, so the band can wrap the heading instead. */}
      <div className={styles.head}>
        <div className={styles.band} aria-hidden="true" />
        <h2 id="programmes-heading" className={styles.heading}>
          Comprehensive Brand Programmes
        </h2>
        <Flourish className={styles.flourish} />
      </div>

      <div className={styles.cards}>
        {/* --- Total Biz Fix --------------------------------------------- */}
        <article className={`${styles.card} ${styles.cardDark}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.bizFixPortrait}
            src="/section_2/img_1.webp"
            alt="Prasanth Sukumaran"
            width={768}
            height={1254}
          />
          <TotalBizFixLockup className={styles.bizFixLockup} />
          <p className={styles.bizFixBody}>{bizFix.body}</p>
          <p className={styles.bizFixName}>Prasanth Sukumaran</p>
          <p className={styles.bizFixRole}>Business Coach</p>
          <a className={`${styles.cta} ${styles.ctaBizFix}`} href={bizFix.cta.href}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={bizFix.cta.art} alt={bizFix.cta.label} width={257} height={40} />
          </a>
        </article>

        {/* --- 360° Business Checkup ------------------------------------- */}
        <article className={`${styles.card} ${styles.cardLight}`}>
          <div className={styles.checkupPhoto}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/section_2/Prasanth-B&W.webp"
              alt="Prasanth Sukumaran presenting the 360° Business Consulting framework"
              width={1391}
              height={1402}
            />
          </div>
          <BusinessCheckupLockup className={styles.checkupLockup} />
          <span className={styles.checkupRule} aria-hidden="true" />
          <p className={styles.checkupBody}>{checkup.body}</p>
          <a className={styles.cta} href={checkup.cta.href}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={checkup.cta.art} alt={checkup.cta.label} width={257} height={40} />
          </a>
        </article>

        {/* --- Consultancy ----------------------------------------------- */}
        <article className={`${styles.card} ${styles.cardDark}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.consultancyArt}
            src="/section_2/Img_2.webp"
            alt="Prasanth Sukumaran shaking hands with a client across a meeting table"
            width={1536}
            height={1024}
          />
          <h3 className={styles.consultancyHeading}>Consultancy</h3>
          <p className={styles.consultancyBody}>{consultancy.body}</p>
          <a className={styles.cta} href={consultancy.cta.href}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={consultancy.cta.art} alt={consultancy.cta.label} width={257} height={40} />
          </a>
        </article>
      </div>
    </section>
  );
}
