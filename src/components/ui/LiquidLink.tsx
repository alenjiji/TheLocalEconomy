"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { useLiquid } from "./useLiquid";

/**
 * A link that floods with the liquid hover fill.
 *
 * `u-liquid` in globals.css only draws the fill; it takes `useLiquid` to start
 * it from where the pointer came in. That hook needs a client component, which
 * a server-rendered page cannot provide inline — so the class alone does
 * nothing there, and this wrapper is what such a page uses instead.
 *
 * Anything that leaves the site (http, tel:, mailto:) is a plain anchor, and an
 * http one opens in a new tab.
 */
export default function LiquidLink({
  href,
  tone,
  className,
  children,
  ariaLabel,
}: {
  href: string;
  tone: "amber" | "cyan";
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const { liquidStyle, liquidProps } = useLiquid<HTMLAnchorElement>();
  const shared = {
    className: `${className ?? ""} u-liquid u-liquid-${tone}`,
    style: liquidStyle,
    "data-cursor": tone,
    "aria-label": ariaLabel,
    ...liquidProps,
  };

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...shared}>
        {children}
      </Link>
    );
  }

  const web = href.startsWith("http");
  return (
    <a
      href={href}
      target={web ? "_blank" : undefined}
      rel={web ? "noopener noreferrer" : undefined}
      {...shared}
    >
      {children}
    </a>
  );
}
