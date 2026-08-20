/**
 * Copy and geometry for the "Comprehensive Brand Programmes" section, measured
 * off `public/design/web_tle.png`. Offsets are card-relative design units; the
 * cards themselves are laid out on the shared 1280-wide content grid.
 */
export type ProgrammeCard = {
  id: string;
  /** Card surface: dark cards carry the grain texture, the light one does not. */
  tone: "dark" | "light";
  body: string;
  /** Width the body copy wraps at, so the line breaks match the comp. */
  bodyWidth: number;
  cta: { href: string; label: string; art: string };
};

export const PROGRAMME_CARDS: ProgrammeCard[] = [
  {
    id: "total-biz-fix",
    tone: "dark",
    body: "Your profit, accounts and sales, all cleared up in 30 days. An annual month-by-month programme.",
    bodyWidth: 190,
    cta: {
      href: "#total-biz-fix",
      label: "Join the Programme",
      art: "/section_2/total_biz_fix_cta.svg",
    },
  },
  {
    id: "business-checkup",
    tone: "light",
    body: "An online personal diagnostic programme built for Kerala's business owners.",
    bodyWidth: 170,
    cta: {
      href: "#business-checkup",
      label: "Find your Cure",
      art: "/section_2/360degreecta.svg",
    },
  },
  {
    id: "consultancy",
    tone: "dark",
    body: "Consult in person with Prasanth Sukumaran for solutions at all stages of your business growth.",
    bodyWidth: 312,
    cta: {
      href: "#consultancy",
      label: "Go for More",
      art: "/section_2/consultancy_cta.svg",
    },
  },
];

export const PROGRAMMES_COLORS = {
  band: "#b2b1b1",
  ground: "#0c0c0c",
  cardDark: "#272727",
  cardLight: "#d3d3d3",
  ink: "#2b2a2a",
  navy: "#0f2a3d",
  accent: "#f5a623",
  cyan: "#00adee",
} as const;
