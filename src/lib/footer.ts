/**
 * Footer content and geometry — comp rows 5183–5613.
 *
 * Vertical offsets are the ink top of each row in design units, taken from the
 * comp. The contact rows are the exception: the real postal address runs to
 * four lines, so that column is laid out in flow and only its icons carry
 * numbers.
 */
export type FooterLink = { label: string; href: string };

/*
 * Paths are absolute so these work from every page, not just the landing one:
 * a bare "#programmes" in the footer of /about points at an anchor that page
 * does not have.
 */
export const QUICK_LINKS: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Programmes", href: "/#programmes" },
  { label: "Testimonial", href: "/#testimonial" },
  { label: "Our Services", href: "/services" },
  { label: "Contact Us", href: "/#contact" },
];

/*
 * Every programme is described on the services page — there are no per
 * programme pages yet — so they all land there rather than on anchors that do
 * not exist. Give any of them its own page and only this list changes.
 */
export const PROGRAMME_LINKS: FooterLink[] = [
  { label: "Total BIZ FIX", href: "/services" },
  { label: "360° Business Checkup", href: "/services" },
  { label: "Consultancy", href: "/services" },
  { label: "SME Business Coaching", href: "/services" },
  { label: "360° Growth Framework", href: "/services" },
];

export type ContactRow = {
  id: string;
  icon: { src: string; width: number; height: number };
  /**
   * The row's text. An array is a postal address: each entry is a line the
   * comp's column is too narrow to hold on one, and each may wrap again.
   */
  label: string | string[];
  href: string;
  /** Opens away from the site, so it needs the noopener treatment. */
  external?: boolean;
  /**
   * How far the icon's top sits above the text's cap top, in design units.
   *
   * The comp pitches the text rows an even 38 apart, so the rows themselves
   * are laid out by the stylesheet; only the icons need a number each, because
   * every mark is a different height and was optically centred by hand.
   */
  iconLift: number;
};

export const CONTACT_ROWS: ContactRow[] = [
  {
    id: "phone",
    icon: { src: "/footer/icon_1.svg", width: 15.56, height: 15.59 },
    label: "+91-8086441054",
    href: "tel:+918086441054",
    iconLift: 3.84,
  },
  {
    id: "email",
    icon: { src: "/footer/icon_2.svg", width: 16.63, height: 11.7 },
    label: "info@thelocaleconomy.in",
    href: "mailto:info@thelocaleconomy.in",
    iconLift: 1.28,
  },
  {
    id: "address",
    icon: { src: "/footer/icon_3.svg", width: 14.4, height: 17.02 },
    /*
     * One address component to a line, the way a letter is addressed: the
     * column is far too narrow to hold the whole thing, and breaking it
     * deliberately beats letting it wrap mid-phrase. The building name is left
     * off because the logo directly above already carries it. Post town and
     * PIN are one unit, held together with non-breaking spaces.
     */
    label: [
      "Ground Floor, MSS Arcade",
      "TC No. 73/1970-2",
      "Manacaud Market Junction",
      "Manacaud",
      "Thiruvananthapuram\u00a0-\u00a0695009",
    ],
    href: "https://maps.app.goo.gl/ecNTg59LoHG8Rhsc6",
    external: true,
    iconLift: 3.52,
  },
  {
    id: "social",
    icon: { src: "/footer/icon_4.svg", width: 15.36, height: 15.36 },
    label: "Let's Connect!",
    href: "/#consultation",
    iconLift: 2.08,
  },
];

/** Section origin in comp rows. */
export const FOOTER_TOP = 5183;
export const FOOTER_HEIGHT = 430.1;
/**
 * Top of the dark link deck, in comp rows.
 *
 * Nothing imports it any more — the deck's offsets are written straight into
 * the stylesheet — but it is the row every one of them was measured from, and
 * it is what makes those numbers checkable against the comp.
 */
export const DECK_TOP = 5320.4;
