"use client";

import styles from "./ConsultationButton.module.css";
import { useLiquid } from "./useLiquid";

/** Arrow lifted verbatim from `public/hero/navbar_Button.svg`. */
const ARROW =
  "M299.11,16.76l-1.76,1.73,2.92,2.85c.46.46.99.93,1.59,1.43.6.5,1.2.98,1.79,1.43.26.2.5.38.74.56-.21-.04-.42-.09-.65-.13-.41-.07-.83-.13-1.25-.18-.42-.05-.83-.07-1.23-.07h-13.08v2.5h13.08c.4,0,.81-.02,1.23-.07.42-.05.84-.11,1.25-.18.23-.04.43-.08.64-.12-.1.08-.21.15-.32.24-.42.32-.86.66-1.32,1.03-.46.37-.91.74-1.33,1.1-.43.37-.81.72-1.15,1.05l-2.92,2.85,1.77,1.73,9.02-8.88-9.03-8.88Z";

/**
 * The amber "Book a Consultation" button, shared by the nav bar and the
 * footer's call to action — the comp draws them identically.
 */
export default function ConsultationButton({
  href = "#consultation",
  className,
}: {
  href?: string;
  className?: string;
}) {
  const { liquidStyle, liquidProps } = useLiquid<HTMLAnchorElement>();

  return (
    <a
      className={`${styles.cta} u-liquid u-liquid-amber ${className ?? ""}`}
      href={href}
      {...liquidProps}
      style={liquidStyle}
    >
      <span className={styles.label}>Book a Consultation</span>
      <svg
        className={`${styles.arrow} u-liquid-arrow`}
        viewBox="288.18 16.75 19.95 17.76"
        aria-hidden="true"
        focusable="false"
      >
        <path d={ARROW} />
      </svg>
    </a>
  );
}
