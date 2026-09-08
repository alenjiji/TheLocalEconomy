/**
 * Copy for the Services page.
 *
 * As elsewhere in this build, the words live here rather than in JSX so they
 * can be edited without touching markup.
 */

/** The seven dimensions the practice works across. */
export const LEVERS: string[] = [
  "Marketing",
  "Sales",
  "Profit",
  "Systems",
  "Delegation",
  "Business Leadership",
  "Expansion",
];

/** Sectors served — deliberately broad, which is the point of the heading. */
export const SECTORS: string[] = [
  "Retail & Trade",
  "Manufacturing SMEs",
  "Professional Services",
  "F&B and Hospitality",
  "Real Estate & Infra",
  "D2C & Startups",
];

/**
 * A step in "Know Our Approach".
 *
 * `icon` is one of the exported line drawings under /public/our_services/web.
 * The four are drawn at one common scale rather than fitted to a common box —
 * the comp sizes them straight off their viewBoxes, so a wide drawing is wide
 * and a tall one is tall — which is why the intrinsic size travels with them.
 *
 * The newline in `heading` is the comp's own line break; the layout honours it
 * with `white-space: pre-line`, and it still reads as one line of text.
 */
export type ApproachStep = {
  id: string;
  heading: string;
  body: string;
  icon: string;
  iconWidth: number;
  iconHeight: number;
};

export const APPROACH: ApproachStep[] = [
  {
    id: "discovery",
    heading: "Discovery\nConversation",
    body: "We listen first. Understand where you are and where you want to go.",
    icon: "/our_services/web/discovery.svg",
    iconWidth: 123.2,
    iconHeight: 97.08,
  },
  {
    id: "blueprint",
    heading: "Custom Growth\nBlueprint",
    body: "A tailored roadmap built for your business, your goals, your timeline.",
    icon: "/our_services/web/custom_growth.svg",
    iconWidth: 94.56,
    iconHeight: 110.47,
  },
  {
    id: "partnership",
    heading: "Long-Term\nPartnership",
    body: "We walk the journey with you, from local ambition to global standards.",
    icon: "/our_services/web/partnership.svg",
    iconWidth: 129.23,
    iconHeight: 80.33,
  },
  {
    id: "coaching",
    heading: "Regular Business\nCoaching Classes",
    body: "Join the many businesses who acquire invaluable business lessons together.",
    icon: "/our_services/web/regular_business_coaching.svg",
    iconWidth: 117.7,
    iconHeight: 116.32,
  },
];
