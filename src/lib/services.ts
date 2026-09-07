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

export type ApproachStep = { id: string; heading: string; body: string };

export const APPROACH: ApproachStep[] = [
  {
    id: "discovery",
    heading: "Discovery Conversation",
    body: "We listen first. Understand where you are and where you want to go.",
  },
  {
    id: "blueprint",
    heading: "Custom Growth Blueprint",
    body: "A tailored roadmap built for your business, your goals, your timeline.",
  },
  {
    id: "partnership",
    heading: "Long-Term Partnership",
    body: "We walk the journey with you, from local ambition to global standards.",
  },
  {
    id: "coaching",
    heading: "Regular Business Coaching Classes",
    body: "Join the many businesses who acquire invaluable business lessons together.",
  },
];
