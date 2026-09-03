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
  /** Left edge, label cap-top and measure, all in design units. */
  x: number;
  y: number;
  width: number;
  /**
   * The comp's gap between the sub-head and the body is not consistent across
   * the eight steps; this nudges it per step, in design units.
   */
  bodyOffset?: number;
};

export const STEPS: Step[] = [
  {
    id: "vision",
    number: "01.",
    label: "Vision",
    heading: "A Purpose to Leap Ahead",
    body: "Helps you set a clear and attainable vision for your brand that enables sustainable, long-term growth.",
    x: 117.7,
    y: 3228.3,
    width: 312,
    bodyOffset: -9,
  },
  {
    id: "marketing",
    number: "02.",
    label: "Marketing",
    heading: "A Brand Worth Remembering",
    body: "Targeted messages that cut through the noise, build authority, and attract your ideal, high-value clients.",
    x: 169.9,
    y: 3461.9,
    width: 176,
  },
  {
    id: "sales",
    number: "03.",
    label: "Sales",
    heading: "Sales that Scale Without You",
    body: "Positioning that makes you the obvi­ous choice in your category, locally and beyond.",
    x: 482.6,
    y: 3419.8,
    width: 172,
  },
  {
    id: "profit",
    number: "04.",
    label: "Profit",
    heading: "Profit, not just revenue",
    body: "More money in the bank. Real margins. A business that actually rewards its owner.",
    x: 448.2,
    y: 3735.1,
    width: 262,
    bodyOffset: -9,
  },
  {
    id: "system",
    number: "05.",
    label: "System",
    heading: "Systems That Run the Show",
    body: "Standard operating procedures, delega­tion frameworks, and workflows for consis­tency and freedom.",
    x: 730.8,
    y: 3228.3,
    /* A shade wider than the comp measures: splitting the text into
       per-character spans loses kerning between letters, so the same words
       take marginally more room. */
    width: 323,
    bodyOffset: -9,
  },
  {
    id: "leadership",
    number: "06.",
    label: "Leadership",
    heading: "Decisions Made With Clarity",
    body: "New markets, new verticals, new cities, with a structured roadmap, no chaos and zero guesswork.",
    x: 785.6,
    y: 3461.9,
    width: 186,
  },
  {
    id: "expansion",
    number: "07.",
    label: "Expansion",
    heading: "Expansion is in Order",
    body: "Know exactly where you are, where you're going, and the precise steps to get there.",
    x: 1083.6,
    y: 3461.9,
    width: 201,
    bodyOffset: -8,
  },
  {
    id: "result",
    number: "08.",
    label: "Result",
    heading: "Total Business Clarity",
    body: "With the core pillars aligned, gain the confidence and clarity to run a self-sustaining, highly profitable en­terprise.",
    x: 1049.3,
    y: 3735.1,
    width: 291,
    bodyOffset: 1,
  },
];

/** Section origin in comp rows, so offsets can be written as absolute rows. */
export const RESULTS_TOP = 2272;
export const RESULTS_HEIGHT = 2036;
