"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import ConsultationButton from "@/components/ui/ConsultationButton";
import styles from "./SiteHeader.module.css";
import { NAV_ITEMS } from "@/lib/design";

/**
 * The site header.
 *
 * It has two faces. Over the hero it is the bar the comp draws — full height,
 * with the logo, links and CTA on their measured coordinates. Once the page
 * scrolls it compacts into a shorter flow row and stays pinned, so navigation
 * is reachable from anywhere rather than only at the very top.
 *
 * Below 900px it collapses to a button that opens a panel; the burger is a
 * real control now rather than a drawn one.
 */
export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      setScrolled(window.scrollY > 80);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

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
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${
        open ? styles.open : ""
      }`}
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
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    className={`${styles.link} ${item.active ? styles.linkActive : ""}`}
                    style={
                      {
                        "--left": item.left,
                        "--baseline": item.active ? 82.3 : 89.4,
                      } as React.CSSProperties
                    }
                    href={item.href}
                    aria-current={item.active ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ConsultationButton className={styles.cta} href="#consultation" />

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
                <a href={item.href} onClick={close} aria-current={item.active ? "page" : undefined}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ConsultationButton className={styles.panelCta} href="#consultation" />
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
