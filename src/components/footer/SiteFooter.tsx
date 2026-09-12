import Link from "next/link";

import InView from "@/components/motion/InView";
import ConsultationButton from "@/components/ui/ConsultationButton";
import styles from "./SiteFooter.module.css";
import { CONTACT_ROWS, PROGRAMME_LINKS, QUICK_LINKS } from "@/lib/footer";

/**
 * Anything that stays on the site routes through `next/link`; a `tel:`,
 * `mailto:` or another origin leaves it, and has to be a plain anchor.
 */
const isInternal = (href: string) => href.startsWith("/");

/**
 * Site footer, rebuilt 1:1 from `design-source/web_tle.png` (comp rows
 * 5183–5613) with the exports in `public/footer/`.
 *
 * Two bands on one canvas: the cyan call to action and the dark link deck.
 * The headline and the copyright line ship as outlined SVG, so they are placed
 * as images with their text on `alt`.
 */
export default function SiteFooter() {
  return (
    <InView as="footer" className={styles.footer} amount={0.15}>
      {/* --- Call to action ------------------------------------------------ */}
      <div className={styles.cta} id="consultation">
        {/* The band paints full-bleed; its contents sit on the centred stage. */}
        <div className={styles.stage}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={`${styles.ctaText} u-rise`}
          src="/footer/text_1.svg"
          alt="Ready to Transform Your Business? Let's build the business you envisioned."
          width={895}
          height={92}
            loading="lazy"
            decoding="async"
          />
        {/* The one consultation button that must not point at `#consultation`:
            it lives inside that band, so scrolling to it would do nothing.
            This is the end of the journey, so it takes the action. */}
        <ConsultationButton
          className={`${styles.ctaButton} u-rise`}
          href="mailto:info@thelocaleconomy.in?subject=Consultation%20request"
        />
        </div>
      </div>

      {/* --- Link deck ------------------------------------------------------ */}
      <div className={styles.deck}>
        {/* `display: contents` at desktop, one grid cell once the deck flows. */}
        <div className={styles.brand}>
        <Link className={`${styles.logoLink} u-rise`} href="/" aria-label="The Local Economy — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.logo}
            src="/hero/logo.svg"
            alt="The Local Economy"
            width={194}
            height={59}
            loading="lazy"
            decoding="async"
          />
        </Link>
        <p className={`${styles.tagline} u-rise`} style={{ "--d": 1 } as React.CSSProperties}>
          Together, we can tackle complex business challenges and turn local vision into lasting commercial success.
        </p>
        </div>

        <span className={styles.rule} style={{ "--x": 795.7 } as React.CSSProperties} />
        <span className={styles.rule} style={{ "--x": 1079.16 } as React.CSSProperties} />

        <nav className={`${styles.column} ${styles.quick} u-rise`} style={{ "--d": 2 } as React.CSSProperties} aria-labelledby="footer-quick">
          <h2 id="footer-quick" className={styles.columnHeading}>
            Quick Links
          </h2>
          <ul>
            {QUICK_LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className={`${styles.column} ${styles.programmes} u-rise`} style={{ "--d": 3 } as React.CSSProperties} aria-labelledby="footer-programmes">
          <h2 id="footer-programmes" className={styles.columnHeading}>
            Programmes
          </h2>
          <ul>
            {PROGRAMME_LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className={`${styles.column} ${styles.contact} u-rise`}
          id="contact"
          style={{ "--d": 4 } as React.CSSProperties}
        >
          <h2 className={styles.columnHeading}>Contact Us</h2>
          <ul className={styles.contactList}>
            {CONTACT_ROWS.map((c) => {
              const lines = Array.isArray(c.label) ? c.label : [c.label];
              /* The address is read aloud as one string, not four. */
              const spoken = lines.join(" ");
              const body = lines.map((line, i) => (
                <span key={i} className={styles.contactLine}>
                  {line}
                </span>
              ));
              const shared = {
                className: `${styles.contactLink} ${Array.isArray(c.label) ? styles.contactBlock : ""}`,
                style: { "--lift": c.iconLift } as React.CSSProperties,
                "aria-label": Array.isArray(c.label) ? spoken : undefined,
              };
              return (
                <li
                  key={c.id}
                  className={Array.isArray(c.label) ? styles.contactAddress : undefined}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={styles.contactIcon}
                    src={c.icon.src}
                    alt=""
                    width={c.icon.width}
                    height={c.icon.height}
                    style={
                      {
                        "--w": c.icon.width,
                        "--h": c.icon.height,
                        "--lift": c.iconLift,
                      } as React.CSSProperties
                    }
                    loading="lazy"
                    decoding="async"
                  />
                  {isInternal(c.href) ? (
                    <Link {...shared} href={c.href}>
                      {body}
                    </Link>
                  ) : (
                    <a
                      {...shared}
                      href={c.href}
                      target={c.external ? "_blank" : undefined}
                      rel={c.external ? "noopener noreferrer" : undefined}
                    >
                      {body}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <span className={styles.divider} aria-hidden="true" />

        {/* `display: contents` at desktop, a real row once the deck flows. */}
        <div className={styles.base}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.copyright}
          src="/footer/text_2.svg"
          alt="© 2025 The Local Economy. All Rights Reserved."
          width={300}
          height={13}
            loading="lazy"
            decoding="async"
          />
        <p className={styles.legal}>
          <Link href="/privacy">Privacy Policy</Link>
          <span aria-hidden="true">|</span>
          <Link href="/terms">Terms &amp; Conditions</Link>
        </p>
        </div>
      </div>
    </InView>
  );
}
