import Link from "next/link";

import InView from "@/components/motion/InView";
import PointerParallax from "@/components/motion/PointerParallax";
import LiquidLink from "@/components/ui/LiquidLink";
import TotalBizFixLockup from "@/components/section2/TotalBizFixLockup";
import BusinessCheckupLockup from "@/components/section2/BusinessCheckupLockup";
import { enquiryHref, whatsappLink } from "@/lib/contact";
import { APPROACH } from "@/lib/services";
import {
  PROGRAMME_PAGES,
  programmeHref,
  type Ink,
  type ProgrammePage,
  type ProgrammeSlug,
} from "@/lib/programmePages";
import styles from "./ProgrammeDetail.module.css";

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

function InkText({ spans }: { spans: Ink[] }) {
  return (
    <>
      {spans.map((s, i) => (
        <span key={i} className={s.tone ? styles[s.tone] : undefined}>
          {s.text}
        </span>
      ))}
    </>
  );
}

function Emphasised({ text, emphasis }: { text: string; emphasis?: string }) {
  const at = emphasis ? text.indexOf(emphasis) : -1;
  if (!emphasis || at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <strong>{emphasis}</strong>
      {text.slice(at + emphasis.length)}
    </>
  );
}

function Arrow() {
  return (
    <svg className="u-liquid-arrow" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 12h15M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2Zm4.3 12.3c-.2.5-1 1-1.5 1.1-.4.1-.9.1-1.4 0a13 13 0 0 1-1.3-.5 10 10 0 0 1-3.8-3.4 4.3 4.3 0 0 1-.9-2.3c0-1.1.6-1.6.8-1.9.2-.2.4-.3.6-.3h.4c.1 0 .3 0 .5.4l.7 1.6c0 .1.1.3 0 .4l-.2.4-.4.4c-.1.1-.2.3-.1.5.1.2.6 1 1.3 1.6.9.8 1.6 1 1.9 1.1.2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.5-.1l1.5.7c.2.1.4.2.4.3.1.1.1.6-.2 1.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * The programme's artwork, recomposed from its home-page card.
 *
 * The frame is a query container and everything inside is sized off its width,
 * so the same composition serves as the large panel in the opening and as the
 * thumbnail in "other programmes".
 */
function Art({ slug, compact }: { slug: ProgrammeSlug; compact?: boolean }) {
  return (
    <div
      className={`${styles.art} ${slug === "business-checkup" ? styles.artLight : styles.artDark} ${compact ? styles.artCompact : ""}`}
    >
      <div className={styles.artInner}>
        {slug === "total-biz-fix" ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.bizFixPortrait}
              src="/section_2/img_1.webp"
              alt=""
              width={768}
              height={1254}
            />
            <TotalBizFixLockup className={styles.bizFixLockup} />
            {compact ? null : (
              <p className={styles.artCaption}>
                <span className={styles.artName}>Prasanth Sukumaran</span>
                <span className={styles.artRole}>Ace Business Coach</span>
              </p>
            )}
          </>
        ) : null}

        {slug === "business-checkup" ? (
          <>
            <div className={styles.checkupPhoto}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/section_2/Prasanth-B&W.webp" alt="" width={1391} height={1402} />
            </div>
            <BusinessCheckupLockup className={styles.checkupLockup} />
          </>
        ) : null}

        {slug === "consultancy" ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.consultancyArt}
              src="/section_2/Img_2-cutout.webp"
              alt=""
              width={1536}
              height={1024}
            />
            <p className={styles.consultancyWord}>Consultancy</p>
            {compact ? null : (
              <p className={styles.artCaption}>
                <span className={styles.artRole}>In person with</span>
                <span className={styles.artName}>Prasanth Sukumaran</span>
              </p>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

/** One programme's page: the offer, what it covers, how we work, and the others. */
export default function ProgrammeDetail({ page }: { page: ProgrammePage }) {
  const others = PROGRAMME_PAGES.filter((p) => p.slug !== page.slug);
  const enquire = enquiryHref(page.interest);
  const chat = whatsappLink(`Hi The Local Economy, I'd like to know more about ${page.name}.`);

  return (
    <>
      {/* --- Opening ------------------------------------------------------ */}
      <InView as="section" className={styles.hero} amount={0.1} aria-labelledby="programme-heading">
        <div className={`${styles.inner} ${styles.heroGrid}`}>
          <div className={styles.heroText}>
            <p className={`${styles.eyebrow} ${styles.eyebrowStart} u-rise`}>Our Programmes</p>
            <Flourish className={`${styles.flourish} ${styles.flourishStart} u-rise`} />

            <h1
              id="programme-heading"
              className={`${styles.title} u-rise`}
              style={{ "--d": 1 } as React.CSSProperties}
            >
              <InkText spans={page.headline} />
            </h1>

            <p className={`${styles.summary} u-rise`} style={{ "--d": 2 } as React.CSSProperties}>
              <Emphasised text={page.summary} emphasis={page.emphasis} />
            </p>
            {page.byline ? (
              <p className={`${styles.byline} u-rise`} style={{ "--d": 2 } as React.CSSProperties}>
                {page.byline}
              </p>
            ) : null}

            <dl className={styles.facts}>
              {page.facts.map((f, i) => (
                <div
                  key={f.label}
                  className={`${styles.fact} u-rise`}
                  style={{ "--d": 3 + i } as React.CSSProperties}
                >
                  <dt className={styles.factLabel}>{f.label}</dt>
                  <dd className={styles.factValue}>{f.value}</dd>
                </div>
              ))}
            </dl>

            <div className={`${styles.actions} u-rise`} style={{ "--d": 6 } as React.CSSProperties}>
              <LiquidLink
                className={`${styles.primary} ${page.cta.tone === "cyan" ? styles.primaryCyan : ""}`}
                tone={page.cta.tone}
                href={enquire}
              >
                <span>{page.cta.label}</span>
                <Arrow />
              </LiquidLink>
              <a className={styles.secondary} href={chat} target="_blank" rel="noopener noreferrer">
                <WhatsAppGlyph />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>

          <PointerParallax className={`${styles.heroArt} u-pop`}>
            <div className={styles.lean} data-parallax>
              <Art slug={page.slug} />
            </div>
          </PointerParallax>
        </div>
      </InView>

      {/* --- What it covers ----------------------------------------------- */}
      <InView as="section" className={styles.focus} amount={0.08} aria-labelledby="focus-heading" data-surface="light">
        <div className={styles.inner}>
          <p className={`${styles.eyebrow} ${styles.eyebrowInk} u-rise`}>{page.focus.eyebrow}</p>
          <Flourish className={`${styles.flourish} ${styles.flourishInk} u-rise`} />
          <h2
            id="focus-heading"
            className={`${styles.heading} ${styles.headingInk} u-rise`}
            style={{ "--d": 1 } as React.CSSProperties}
          >
            <InkText spans={page.focus.heading} />
          </h2>
          <p className={`${styles.lede} ${styles.ledeInk} u-rise`} style={{ "--d": 2 } as React.CSSProperties}>
            {page.focus.lede}
          </p>

          <ul className={page.focus.layout === "cards" ? styles.cards : styles.tiles}>
            {page.focus.items.map((item, i) => (
              <li
                key={item.title}
                className={`${page.focus.layout === "cards" ? styles.card : styles.tile} u-rise`}
                style={{ "--d": Math.min(i + 3, 9) } as React.CSSProperties}
              >
                {item.kicker ? <span className={styles.kicker}>{item.kicker}</span> : null}
                <span className={styles.cardTitle}>{item.title}</span>
                {item.body ? <span className={styles.cardBody}>{item.body}</span> : null}
              </li>
            ))}
          </ul>

          {page.focus.also ? (
            <>
              <h3 className={`${styles.alsoHeading} u-rise`}>
                <InkText spans={page.focus.also.heading} />
              </h3>
              <ul className={styles.also}>
                {page.focus.also.items.map((item, i) => (
                  <li key={item} className={`${styles.alsoItem} u-rise`} style={{ "--d": i + 1 } as React.CSSProperties}>
                    {item}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </InView>

      {/* --- How we work -------------------------------------------------- */}
      <InView as="section" className={styles.approach} amount={0.12} aria-labelledby="approach-heading">
        <div className={styles.inner}>
          <p className={`${styles.eyebrow} u-rise`}>How We Work</p>
          <Flourish className={`${styles.flourish} u-rise`} />
          <h2 id="approach-heading" className={`${styles.heading} u-rise`} style={{ "--d": 1 } as React.CSSProperties}>
            Know Our <span className={styles.cyan}>Approach</span>
          </h2>

          <ol className={styles.steps}>
            {APPROACH.map((step, i) => (
              <li key={step.id} className={`${styles.step} u-rise`} style={{ "--d": i + 2 } as React.CSSProperties}>
                <span className={styles.stepIconBox}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={styles.stepIcon}
                    src={step.icon}
                    alt=""
                    width={step.iconWidth}
                    height={step.iconHeight}
                    style={{ "--iw": step.iconWidth, "--ih": step.iconHeight } as React.CSSProperties}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <span className={styles.stepNumber}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.stepHeading}>{step.heading.replace("\n", " ")}</span>
                <span className={styles.stepBody}>{step.body}</span>
              </li>
            ))}
          </ol>

          <div className={`${styles.actions} ${styles.actionsCentre} u-rise`}>
            <LiquidLink
              className={`${styles.primary} ${page.cta.tone === "cyan" ? styles.primaryCyan : ""}`}
              tone={page.cta.tone}
              href={enquire}
            >
              <span>{page.cta.label}</span>
              <Arrow />
            </LiquidLink>
            <a className={styles.secondary} href={chat} target="_blank" rel="noopener noreferrer">
              <WhatsAppGlyph />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>
      </InView>

      {/* --- The other two ------------------------------------------------ */}
      <InView as="section" className={styles.others} amount={0.15} aria-labelledby="others-heading" data-surface="light">
        <div className={styles.inner}>
          <h2 id="others-heading" className={`${styles.othersHeading} u-rise`}>
            Explore Our Other <span className={styles.ink}>Programmes</span>
          </h2>
          <ul className={styles.otherList}>
            {others.map((p, i) => (
              <li key={p.slug} className="u-rise" style={{ "--d": i + 1 } as React.CSSProperties}>
                <Link className={styles.other} href={programmeHref(p.slug)}>
                  <Art slug={p.slug} compact />
                  <span className={styles.otherText}>
                    <span className={styles.otherName}>{p.name}</span>
                    <span className={styles.otherSummary}>{p.summary}</span>
                    <span className={`${styles.otherMore} ${p.cta.tone === "cyan" ? styles.otherMoreCyan : ""}`}>
                      Go for More
                      <Arrow />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </InView>
    </>
  );
}
