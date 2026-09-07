import type { ReactNode } from "react";

import InView from "@/components/motion/InView";
import styles from "./LegalPage.module.css";

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
 * The frame both legal pages share.
 *
 * Same furniture as every other section — grained ground, amber eyebrow over a
 * flourish, heading — but a single measure for the copy rather than a centred
 * display column, because these are documents to be read rather than looked at.
 */
export default function LegalPage({
  eyebrow = "Legal",
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <InView as="section" className={styles.section} amount={0.05} aria-labelledby="legal-heading">
      <div className={styles.inner}>
        <p className={`${styles.eyebrow} u-rise`}>{eyebrow}</p>
        <Flourish className={`${styles.flourish} u-rise`} />
        <h1 id="legal-heading" className={`${styles.heading} u-rise`} style={{ "--d": 1 } as React.CSSProperties}>
          {title}
        </h1>

        <div className={`${styles.body} u-rise`} style={{ "--d": 2 } as React.CSSProperties}>
          {children}
        </div>
      </div>
    </InView>
  );
}
