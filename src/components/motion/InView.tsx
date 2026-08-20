"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Marks its subtree with `data-inview` once it scrolls into view.
 *
 * Animations key off that attribute rather than being started from JS, so the
 * timelines stay declarative in CSS and nothing runs while the section is
 * still off-screen.
 */
export default function InView({
  as: Tag = "div",
  className,
  children,
  /** Fraction of the element that must be showing before it fires. */
  amount = 0.2,
  /** Keep the flag once it has fired; set false to re-run on every entry. */
  once = true,
  ...rest
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  amount?: number;
  once?: boolean;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No observer (or the user has asked for stillness): show the end state.
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setSeen(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          if (once) io.disconnect();
        } else if (!once) {
          setSeen(false);
        }
      },
      { threshold: amount, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [amount, once]);

  return (
    <Tag ref={ref} className={className} data-inview={seen ? "true" : undefined} {...rest}>
      {children}
    </Tag>
  );
}
