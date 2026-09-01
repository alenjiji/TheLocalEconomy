import Link from "next/link";

import ConsultationButton from "@/components/ui/ConsultationButton";
import styles from "./NavBar.module.css";
import { NAV_ITEMS } from "@/lib/design";

export default function NavBar() {
  return (
    <header className={styles.nav}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.shadow}
        src="/hero/navbar_dropshadow.svg"
        alt=""
        aria-hidden="true"
      />

      <Link href="/" aria-label="The Local Economy — home">
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

      <button className={styles.menuButton} type="button" aria-label="Open menu">
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}
