/**
 * Footer content and geometry — comp rows 5183–5613.
 *
 * Vertical offsets are the ink top of each row in design units, taken from the
 * comp; the contact rows in particular are not evenly pitched, so each carries
 * its own.
 */
export type FooterLink = { label: string; href: string };

export const QUICK_LINKS: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "#about" },
  { label: "Programmes", href: "#programmes" },
  { label: "Testimonial", href: "#testimonial" },
  { label: "Blog", href: "#blog" },
  { label: "Contact Us", href: "#contact" },
];

export const PROGRAMME_LINKS: FooterLink[] = [
  { label: "Total BIZ FIX", href: "#total-biz-fix" },
  { label: "360° Business Checkup", href: "#business-checkup" },
  { label: "Consultancy", href: "#consultancy" },
  { label: "SME Business Coaching", href: "#sme-coaching" },
  { label: "360° Growth Framework", href: "#growth-framework" },
];

export type ContactRow = {
  id: string;
  icon: { src: string; width: number; height: number };
  label: string;
  href: string;
  /**
   * Icon top and text cap-top, in comp rows. The text rows are pitched an even
   * 38 apart; the icons are not, because each mark is a different height.
   */
  iconY: number;
  textY: number;
};

export const CONTACT_ROWS: ContactRow[] = [
  {
    id: "phone",
    icon: { src: "/footer/icon_1.svg", width: 15.56, height: 15.59 },
    label: "+91 62345 67890",
    href: "tel:+916234567890",
    iconY: 5408.16,
    textY: 5412,
  },
  {
    id: "email",
    icon: { src: "/footer/icon_2.svg", width: 16.63, height: 11.7 },
    label: "hello@thelocaleconomy.in",
    href: "mailto:hello@thelocaleconomy.in",
    iconY: 5448.72,
    textY: 5450,
  },
  {
    id: "address",
    icon: { src: "/footer/icon_3.svg", width: 14.4, height: 17.02 },
    label: "Kochi, Kerala, India",
    href: "#location",
    iconY: 5484.48,
    textY: 5488,
  },
  {
    id: "social",
    icon: { src: "/footer/icon_4.svg", width: 15.36, height: 15.36 },
    label: "Let's Connect!",
    href: "#connect",
    iconY: 5523.92,
    textY: 5526,
  },
];

/** Section origin in comp rows. */
export const FOOTER_TOP = 5183;
export const FOOTER_HEIGHT = 430.1;
/** Top of the dark link deck, which the deck's own offsets are measured from. */
export const DECK_TOP = 5320.4;
