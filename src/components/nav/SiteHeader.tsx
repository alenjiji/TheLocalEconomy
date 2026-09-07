"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import ConsultationButton from "@/components/ui/ConsultationButton";
import styles from "./SiteHeader.module.css";
import { isNavItemActive, NAV_ITEMS, NAV_SECTION_IDS } from "@/lib/design";

/**
 * The site header.
 *
 * It has two faces. Over the hero it is the bar the comp draws — full height,
 * with the logo, links and CTA on their measured coordinates. As the page
 * scrolls it compacts into a shorter pinned bar, so navigation is reachable
 * from anywhere rather than only at the very top.
 *
 * The compaction is scroll-linked rather than a state flip: `--p` runs 0 → 1
 * over the first `COMPACT_OVER` pixels and every value the bar animates is a
 * calc off it, so the bar follows the scroll frame by frame instead of easing
 * to a second layout after a threshold is crossed. `scrolled` is kept only for
 * the things that have no business being continuous (the state attribute).
 *
 * Below 900px it collapses to a button that opens a panel; the burger is a
 * real control now rather than a drawn one.
 */

/** Scroll distance, in px, over which the bar finishes compacting. */
const COMPACT_OVER = 160;

export default function SiteHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  /** Which tracked section is currently being read; null above the first. */
  const [section, setSection] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;
    let last = -1;
    const onLanding = pathname === "/";
    if (!onLanding) setSection(null);

    const read = () => {
      frame = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / COMPACT_OVER));
      // Writing the same value back every frame would dirty style for nothing.
      if (Math.abs(p - last) > 0.001) {
        last = p;
        headerRef.current?.style.setProperty("--p", p.toFixed(4));
      }
      setScrolled(p > 0.02);

      /*
       * The section being read is the last one whose top has crossed the line
       * just under the bar — not whichever happens to be most visible. That
       * keeps the mark where it is through the sections the nav has no entry
       * for, instead of dropping to nothing between them, and it hands over at
       * the moment a heading reaches the top rather than halfway through.
       */
      if (!onLanding) return;
      const line = (headerRef.current?.getBoundingClientRect().height ?? 0) + 24;
      let current: string | null = null;
      for (const id of NAV_SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }

      /*
       * The last section on the page can never satisfy that test: the contact
       * block sits near the foot of the document, so there is nothing below it
       * to scroll past and its top stops 600-odd pixels short of the line.
       * Once the page has bottomed out, the current section is simply the last
       * tracked one still on screen.
       */
      const doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
        for (const id of NAV_SECTION_IDS) {
          const el = document.getElementById(id);
          if (!el) continue;
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > line) current = id;
        }
      }

      setSection(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  // While the panel is open the page behind it should not scroll, and Escape
  // should always get you out.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${open ? styles.open : ""}`}
      data-state={scrolled ? "compact" : "top"}
    >
      <div className={styles.bar}>
        <div className={styles.stage}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.shadow}
            src="/hero/navbar_dropshadow.svg"
            alt=""
            aria-hidden="true"
          />

          <Link className={styles.logoLink} href="/" aria-label="The Local Economy — home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.logo}
              src="/hero/logo.svg"
              alt="The Local Economy"
              width={170}
              height={51}
            />
          </Link>

          <nav aria-label="Primary">
            <ul className={styles.links}>
              {NAV_ITEMS.map((item) => {
                const active = isNavItemActive(item, pathname, section);
                return (
                <li key={item.href}>
                  <Link
                    className={`${styles.link} ${active ? styles.linkActive : ""}`}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
                );
              })}
            </ul>
          </nav>

          <ConsultationButton className={styles.cta} href="/#consultation" />

          <button
            className={styles.menuButton}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* The panel stays in the DOM so it can transition; `inert` keeps its
          links out of the tab order while it is closed. */}
      <div
        id="site-menu"
        className={styles.panel}
        inert={!open ? true : undefined}
        aria-hidden={!open}
      >
        <nav aria-label="Primary, mobile">
          <ul>
            {NAV_ITEMS.map((item, i) => (
              <li key={item.href} style={{ "--i": i } as React.CSSProperties}>
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={isNavItemActive(item, pathname, section) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ConsultationButton className={styles.panelCta} href="/#consultation" />
      </div>

      <button
        className={styles.scrim}
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={close}
      />
    </header>
  );
}
