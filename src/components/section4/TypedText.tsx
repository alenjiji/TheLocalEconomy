import { Fragment, type CSSProperties } from "react";

import type { TypedChar } from "@/lib/motion";
import styles from "./Roadmap.module.css";

/**
 * Renders a pre-scheduled string one character at a time.
 *
 * Every character is laid out from the start and only its opacity changes, so
 * the comp's justified line breaks never shift while the text types in.
 *
 * Spaces stay plain text nodes rather than spans: wrapping them (or swapping
 * in non-breaking spaces) removes the browser's soft-wrap opportunities and
 * the paragraph runs straight past its measure instead of wrapping.
 */
export default function TypedText({ chars }: { chars: TypedChar[] }) {
  // Assistive tech gets the whole string in one piece; the per-character spans
  // are decoration.
  const text = chars.map((c) => c.char).join("");

  return (
    <>
      <span className={styles.srOnly}>{text}</span>
      {chars.map((c, i) =>
        c.char === " " ? (
          <Fragment key={i}> </Fragment>
        ) : (
          <span
            key={i}
            className={styles.char}
            style={{ "--at": `${Math.round(c.at)}ms` } as CSSProperties}
            aria-hidden="true"
          >
            {c.char}
          </span>
        ),
      )}
    </>
  );
}
