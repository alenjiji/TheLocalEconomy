/**
 * Slides for the growth carousel that follows the programme cards, measured
 * off `public/design/web_tle.png` (comp rows 1780–2272).
 *
 * `bodyWidth` is the measure the comp wraps each body at, in design units —
 * the comp gives every slide its own, so they are carried per slide.
 *
 * Note the button exports are not in slide order: `button_1.svg` carries "See
 * What We Do" and `button_3.svg` carries "Join for Business Success".
 */
export type InkSpan = { text: string; tone?: "cyan" | "amber" };

export type GrowthSlide = {
  id: string;
  icon: {
    src: string;
    width: number;
    height: number;
    alt: string;
    /**
     * Left inset of the icon from the slide's content edge. The comp optically
     * aligns each mark rather than flushing it, so this differs per slide.
     */
    inset: number;
  };
  /** Label beside the icon; wraps at `LABEL_WIDTH`. */
  label: InkSpan[];
  headline: InkSpan[];
  body: string;
  bodyWidth: number;
  cta: { href: string; label: string; art: string };
};

/** Every slide's icon label wraps at the same measure in the comp. */
export const LABEL_WIDTH = 140;

export const GROWTH_SLIDES: GrowthSlide[] = [
  {
    id: "transformation",
    icon: {
      src: "/section2_extend/element_1.svg",
      width: 63.1,
      height: 63.13,
      alt: "",
      inset: 0,
    },
    label: [{ text: "Business Transformation ", tone: "cyan" }, { text: "Platform" }],
    headline: [
      { text: "Local Roots. " },
      { text: "Global", tone: "cyan" },
      { text: " Standards." },
    ],
    body: "Where India's best businesses learn to think, operate, and grow like world-class enterprises.",
    bodyWidth: 316,
    cta: {
      href: "#business-transformation",
      label: "Join for Business Success",
      art: "/section2_extend/button_3.svg",
    },
  },
  {
    id: "growth-framework",
    icon: {
      src: "/section2_extend/element_2.svg",
      width: 55.21,
      height: 61.83,
      alt: "",
      inset: 10.1,
    },
    label: [{ text: "360° Growth ", tone: "amber" }, { text: "Framework" }],
    headline: [{ text: "We Mean\u2003" }, { text: "Business.", tone: "amber" }],
    body: "Sales, profit, systems, leadership, we build the complete machinery that takes your business from local to legendary.",
    bodyWidth: 341,
    cta: {
      href: "#growth-framework",
      label: "Start the Journey",
      art: "/section2_extend/button_2.svg",
    },
  },
  {
    id: "sme-coaching",
    icon: {
      src: "/section2_extend/element_3.svg",
      width: 68.17,
      height: 61.83,
      alt: "",
      inset: 9.9,
    },
    label: [{ text: "SME " }, { text: "Business Coaching", tone: "cyan" }],
    headline: [
      { text: "Stop Running. " },
      { text: "Start Building.", tone: "cyan" },
    ],
    body: "We turn busy business owners into confident business leaders with systems, strategy, and lasting growth.",
    bodyWidth: 368,
    cta: {
      href: "#sme-coaching",
      label: "See What We Do",
      art: "/section2_extend/button_1.svg",
    },
  },
];

/** The comp shows seven dots with the third lit. */
export const GROWTH_SLIDE_COUNT = 7;
export const GROWTH_ACTIVE_SLIDE = 2;
