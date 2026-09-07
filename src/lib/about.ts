/**
 * Copy for the About Us page.
 *
 * Kept out of the markup for the same reason the rest of this build does it:
 * the client edits words here, not in JSX.
 */

export type AboutStat = {
  id: string;
  icon: { src: string; width: number; height: number };
  /** Counted up on scroll; a leading figure animates, the rest is a suffix. */
  value: string;
  tone: "amber" | "cyan";
  caption: string;
};

/** The same four figures the landing page carries, and the same marks. */
export const ABOUT_STATS: AboutStat[] = [
  {
    id: "reach",
    icon: { src: "/section_3/el_1.svg", width: 64.58, height: 60.54 },
    value: "10K",
    tone: "amber",
    caption: "Indian businesses we aim to transform",
  },
  {
    id: "coverage",
    icon: { src: "/section_3/el_2.svg", width: 70.69, height: 65.4 },
    value: "360°",
    tone: "cyan",
    caption: "Complete business growth coverage",
  },
  {
    id: "pillars",
    icon: { src: "/section_3/el_3.svg", width: 64.75, height: 61.74 },
    value: "7",
    tone: "amber",
    caption: "Core growth dimensions we work on",
  },
  {
    id: "focus",
    icon: { src: "/section_3/el_4.svg", width: 66.7, height: 61.2 },
    value: "SME",
    tone: "cyan",
    caption: "Focus: India's backbone businesses",
  },
];

export type Pillar = { id: string; label: string; heading: string; body: string };

export const ABOUT_PILLARS: Pillar[] = [
  {
    id: "mission",
    label: "Mission",
    heading: "Transforming 10,000 Indian Businesses to Global Standards",
    body: "To equip every Indian SME with world-class strategies, systems, and skills. So local businesses compete, win, and thrive on the global stage.",
  },
  {
    id: "vision",
    label: "Vision",
    heading: "A Thriving, Sustainable Business Ecosystem Across India",
    body: "We envision an India where ambitious business owners are supported, skilled, and structured for sustainable growth, from the first sale to the hundredth hire.",
  },
  {
    id: "thinking",
    label: "How We Think",
    heading: "Sustainable Growth Over Shortcuts",
    body: "We build foundations, not facades. Sales systems, not just campaigns. Leadership teams, not just lone owners. Growth that compounds, not peaks and crashes.",
  },
  {
    id: "promise",
    label: "Our Promise",
    heading: "Your Success is Our Business",
    body: "We don't clock out when the session ends. We're invested in your outcomes, because your wins are our credibility, and your growth is our purpose.",
  },
];

export type Belief = { id: string; label: string; quote: string; tone: "cyan" | "amber" };

export const ABOUT_BELIEFS: Belief[] = [
  {
    id: "belief",
    label: "The Local Economy Belief",
    quote: "A business that cannot run without its owner is a job in disguise. We're here to change that.",
    tone: "cyan",
  },
  {
    id: "standard",
    label: "The Local Economy Standard",
    quote: "Global standards are not reserved for just MNCs. Every Indian entrepreneur deserves the same strategic advantage.",
    tone: "amber",
  },
];
