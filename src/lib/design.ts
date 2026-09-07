/**
 * Geometry lifted from the reference comp (`design-source/web_tle.png`).
 *
 * The comp is 6000px wide and the exported artwork (e.g. `navbar_bg.svg`) is
 * authored on a 1440pt artboard, so every number below is in *design units* —
 * 1 unit === 1px at a 1440px viewport. The layout scales by multiplying each
 * unit by the CSS custom property `--u` (see `globals.css`).
 */
export const DESIGN_WIDTH = 1440;

/** Hero runs from the top of the page to the first section break in the comp. */
export const HERO_HEIGHT = 956;

/** Height of the solid `#191919` bar, taken from `navbar_bg.svg`. */
export const NAV_HEIGHT = 144.56;

export const COLORS = {
  navBackground: "#191919",
  heroBackground: "#282727",
  navLink: "#8c8c8c",
  navLinkActive: "#ffffff",
  accent: "#f5a623",
  accentBorder: "#ffc166",
  cyan: "#00adee",
  dotIdle: "#d3d3d3",
} as const;

export type NavItem = {
  label: string;
  href: string;
};

/*
 * Each item used to carry its own measured `left`, taken off the comp. That
 * only works for the five items the comp draws: a sixth has nowhere to go, and
 * every position would have to be re-measured by hand to make room. The row
 * lays itself out now, anchored where the comp starts it — see `.links` in
 * `SiteHeader.module.css`.
 */
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Programmes", href: "/#programmes" },
  { label: "Testimonial", href: "/#testimonial" },
  { label: "Our Sevices", href: "/services" },
  { label: "Contact Us", href: "/#contact" },
];

/**
 * Which link reads as current.
 *
 * Three cases, because the nav mixes three kinds of destination:
 *
 * - A section anchor is current when that section is the one being read, which
 *   only the header can know — it passes the id in as `section`.
 * - "Home" is current on the landing page while no section has been reached,
 *   so the mark starts there and hands over as you scroll rather than sitting
 *   on Home the whole way down.
 * - A page path is current on its own path.
 */
export function isNavItemActive(item: NavItem, pathname: string, section?: string | null) {
  const onLanding = pathname === "/";
  if (item.href.startsWith("/#")) return onLanding && section === item.href.slice(2);
  if (item.href === "/") return onLanding && !section;
  return pathname === item.href || pathname === `${item.href}/`;
}

/** The section ids the nav tracks, in the order they appear on the page. */
export const NAV_SECTION_IDS = NAV_ITEMS.filter((i) => i.href.startsWith("/#")).map((i) =>
  i.href.slice(2),
);

/** Number of slides the hero carousel advertises in the comp. */
export const HERO_SLIDE_COUNT = 4;

/** Zero-based index of the slide highlighted in the comp. */
export const HERO_ACTIVE_SLIDE = 2;
