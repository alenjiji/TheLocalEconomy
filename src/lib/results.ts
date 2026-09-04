/**
 * "What Changes When You Work With TLE?" — comp rows 2272–4308.
 *
 * Every number is a design unit measured off `design-source/web_tle.png`.
 *
 * Three of the bodies carry soft hyphens (U+00AD) at the exact points the comp
 * breaks them. Automatic hyphenation cannot work once the text is split into
 * per-character spans for the typing animation — the browser will not hyphenate
 * across element boundaries — so the breaks are made explicit instead.
 * The comp hand-places each roadmap step, so each carries its own left edge,
 * top and measure rather than sharing a grid.
 */

export type Stat = {
  id: string;
  icon: { src: string; width: number; height: number };
  /** Icon left edge and top, in design units. */
  iconX: number;
  iconY: number;
  value: string;
  tone: "amber" | "cyan";
  /** Left edge and first-line top of the value + caption column. */
  textX: number;
  /** The value sits a hair left of the caption; digits carry a wider bearing. */
  valueX: number;
  captionTop: number;
  caption: string;
  captionWidth: number;
};

export const STATS: Stat[] = [
  {
    id: "reach",
    icon: { src: "/section_3/el_1.svg", width: 64.58, height: 60.54 },
    iconX: 87.2,
    iconY: 2336.4,
    value: "10K",
    tone: "amber",
    textX: 188.2,
    valueX: 185.2,
    captionTop: 2419.64,
    caption: "Indian businesses we aim to transform",
    captionWidth: 155,
  },
  {
    id: "coverage",
    icon: { src: "/section_3/el_2.svg", width: 70.69, height: 65.4 },
    iconX: 420.16,
    iconY: 2331.6,
    value: "360°",
    tone: "cyan",
    textX: 528.1,
    valueX: 527.1,
    captionTop: 2419.88,
    caption: "Complete business growth coverage",
    captionWidth: 155,
  },
  {
    id: "pillars",
    icon: { src: "/section_3/el_3.svg", width: 64.75, height: 61.74 },
    iconX: 750.64,
    iconY: 2335.2,
    value: "7 Core",
    tone: "amber",
    textX: 867.8,
    valueX: 865.8,
    captionTop: 2412.2,
    caption: "growth dimensions we work on",
    captionWidth: 120,
  },
  {
    id: "focus",
    icon: { src: "/section_3/el_4.svg", width: 66.36, height: 65.51 },
    iconX: 1110.96,
    iconY: 2331.36,
    value: "SME",
    tone: "cyan",
    textX: 1224.6,
    valueX: 1223.6,
    captionTop: 2419.64,
    caption: "Focus: India's backbone businesses",
    captionWidth: 135,
  },
];

/** Divider rules between the stat cells. */
export const STAT_RULES = [392.5, 717.5, 1074.5];

export type Step = {
  id: string;
  number: string;
  label: string;
  heading: string;
  body: string;
  /**
   * Where on the curve this step's marker sits, as a fraction of the path's
   * length. The coordinates are read off the exported `snake.svg` at build
   * time rather than measured by hand, so a marker cannot drift off the line.
   */
  at: number;
  /** Which way the marker's stem points, and so where the copy sits. */
  side: "above" | "below" | "right";
  /** Measure the copy wraps at, in design units. */
  width: number;
  /** Nudges that keep the block clear of the curve, in design units. */
  dx?: number;
  dy?: number;
};

export const STEPS: Step[] = [
  {
    id: "vision",
    number: "01.",
    label: "Vision",
    heading: "A Purpose to Leap Ahead",
    body: "Helps you set a clear and attainable vision for your brand that enables sustainable, long-term growth.",
    at: 0.0395,
    side: "above",
    width: 200,
  },
  {
    id: "marketing",
    number: "02.",
    label: "Marketing",
    heading: "A Brand Worth Remembering",
    body: "Targeted messages that cut through the noise, build authority, and attract your ideal, high-value clients.",
    at: 0.2,
    side: "above",
    width: 262,
    dy: -12,
  },
  {
    id: "sales",
    number: "03.",
    label: "Sales",
    heading: "Sales that Scale Without You",
    body: "Positioning that makes you the obvious choice in your category, locally and beyond.",
    at: 0.273,
    side: "below",
    width: 300,
    dy: 12,
  },
  {
    id: "profit",
    number: "04.",
    label: "Profit",
    heading: "Profit, not just revenue",
    body: "More money in the bank. Real margins. A business that actually rewards its owner.",
    at: 0.4355,
    side: "below",
    /* Sits in the pocket between the curve's two flanks: narrow enough to fit
       between them, and pushed past the neck where they close in. */
    width: 200,
    dx: 8,
    dy: 30,
  },
  {
    id: "system",
    number: "05.",
    label: "System",
    heading: "Systems That Run the Show",
    body: "Standard operating procedures, delegation frameworks, and workflows for consistency and freedom.",
    at: 0.5275,
    side: "right",
    width: 214,
  },
  {
    id: "leadership",
    number: "06.",
    label: "Leadership",
    heading: "Decisions Made With Clarity",
    body: "New markets, new verticals, new cities, with a structured roadmap, no chaos and zero guesswork.",
    at: 0.6005,
    side: "right",
    /* The pocket right of the descent and left of the climb to 08. */
    /* Pushed down rather than 05 being pushed up: the two share this side of
       the descent, and lifting 05 took its heading off the top of the canvas. */
    width: 194,
    dx: 14,
    dy: 45,
  },
  {
    id: "expansion",
    number: "07.",
    label: "Expansion",
    heading: "Expansion is in Order",
    body: "Know exactly where you are, where you're going, and the precise steps to get there.",
    at: 0.728,
    side: "below",
    width: 348,
  },
  {
    id: "result",
    number: "08.",
    label: "Result",
    heading: "Total Business Clarity",
    body: "With the core pillars aligned, gain the confidence and clarity to run a self-sustaining, highly profitable enterprise.",
    at: 0.9255,
    side: "below",
    width: 220,
    dx: 40,
  },
];

/** Section origin in comp rows, so offsets can be written as absolute rows. */
export const RESULTS_TOP = 2272;
export const RESULTS_HEIGHT = 2036;
