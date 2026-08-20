/**
 * Geometry lifted from the reference comp (`public/design/web_tle.png`).
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
  /** Left edge of the rendered text box, in design units. */
  left: number;
  active?: boolean;
};

/**
 * Horizontal positions are the measured ink edges minus each string's left
 * side bearing in Inter, so the glyphs land exactly where the comp puts them.
 */
export const NAV_ITEMS: NavItem[] = [
  { label: "About Us", href: "#about", left: 301.09, active: true },
  { label: "Programmes", href: "#programmes", left: 424.23 },
  { label: "Testimonial", href: "#testimonial", left: 579.3 },
  { label: "Our sevices", href: "#services", left: 721.54 },
  { label: "Contact Us", href: "#contact", left: 868.62 },
];

/** Number of slides the hero carousel advertises in the comp. */
export const HERO_SLIDE_COUNT = 4;

/** Zero-based index of the slide highlighted in the comp. */
export const HERO_ACTIVE_SLIDE = 2;
