/**
 * The three programme pages: /programmes/total-biz-fix, /business-checkup and
 * /consultancy.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WHAT IS HERE, AND WHERE IT CAME FROM
 *
 * No copy was written for these pages, so every line is taken from material
 * the business already publishes, and nothing is invented:
 *
 *   - Each summary is that programme's card on the home page, word for word.
 *   - The Checkup's six areas are read off the "360° Business Consulting"
 *     framework card Prasanth holds in the programme's own photograph.
 *   - The Biz Fix outcomes are the home page's "What Changes" roadmap.
 *   - The Consultancy levers and sectors are the services page's.
 *   - The approach steps, on every page, are the services page's.
 *
 * Replace any of it here as real programme detail — duration, format, fees,
 * what a session covers — is written; the pages need no other change.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type { InterestId } from "./contact";
import { LEVERS, SECTORS } from "./services";
import { STEPS } from "./results";

export type Ink = { text: string; tone?: "amber" | "cyan" };

export type ProgrammeSlug = "total-biz-fix" | "business-checkup" | "consultancy";

export type FocusItem = { kicker?: string; title: string; body?: string };

export type ProgrammePage = {
  slug: ProgrammeSlug;
  /** Plain name, for the tab, the share card and the other-programmes list. */
  name: string;
  interest: InterestId;
  headline: Ink[];
  summary: string;
  /** A phrase inside `summary` to set heavier. */
  emphasis?: string;
  /** A second line under the summary. */
  byline?: string;
  facts: { label: string; value: string }[];
  cta: { label: string; tone: "amber" | "cyan" };
  focus: {
    eyebrow: string;
    heading: Ink[];
    lede: string;
    items: FocusItem[];
    /** Numbered cards with a body, or short labelled tiles. */
    layout: "cards" | "tiles";
    /** An optional closing list under the items, e.g. the sectors served. */
    also?: { heading: Ink[]; items: string[] };
  };
};

export const PROGRAMME_PAGES: ProgrammePage[] = [
  {
    slug: "total-biz-fix",
    name: "Total BIZ FIX",
    interest: "total-biz-fix",
    headline: [{ text: "Total " }, { text: "BIZ FIX", tone: "amber" }],
    summary:
      "Your profit, accounts and sales, all cleared up in 30 days. An annual month-by-month programme.",
    byline: "With Prasanth Sukumaran, Ace Business Coach.",
    facts: [
      { label: "Clears up", value: "Profit, accounts & sales" },
      { label: "First results", value: "In 30 days" },
      { label: "Runs", value: "Month by month, all year" },
    ],
    cta: { label: "Join the Programme", tone: "amber" },
    focus: {
      eyebrow: "What You Gain",
      heading: [{ text: "What Changes When You " }, { text: "Work With TLE", tone: "cyan" }, { text: "?" }],
      lede: "Our clients don't just grow, they transform. Here is what changes when The Local Economy becomes your growth partner.",
      layout: "cards",
      items: STEPS.map((s) => ({
        kicker: `${s.number} ${s.label}`,
        title: s.heading,
        // The roadmap carries soft hyphens for its own typesetting; not needed here.
        body: s.body.replace(/­/g, ""),
      })),
    },
  },
  {
    slug: "business-checkup",
    name: "360° Business Checkup",
    interest: "business-checkup",
    headline: [{ text: "360° " }, { text: "Business Checkup", tone: "cyan" }],
    summary: "An online personal diagnostic programme built for Kerala's business owners.",
    facts: [
      { label: "Format", value: "Online" },
      { label: "Approach", value: "Personal diagnostic" },
      { label: "Built for", value: "Kerala's business owners" },
    ],
    cta: { label: "Find your Cure", tone: "cyan" },
    focus: {
      eyebrow: "The 360° View",
      heading: [{ text: "Every Side of Your Business, " }, { text: "Examined", tone: "cyan" }, { text: "." }],
      lede: "The checkup looks at a business the way the 360° framework does: six areas, taken together, because none of them works on its own.",
      layout: "cards",
      items: [
        { kicker: "01", title: "Strategy", body: "Vision, planning & positioning." },
        { kicker: "02", title: "Operations", body: "Process, systems & daily efficiency." },
        { kicker: "03", title: "People", body: "Team, leadership & culture." },
        { kicker: "04", title: "Finance", body: "Financial planning, cash flow & profitability." },
        { kicker: "05", title: "Marketing & Sales", body: "Branding, lead generation & growth." },
        { kicker: "06", title: "Technology", body: "Tools, automation & digital enablement." },
      ],
    },
  },
  {
    slug: "consultancy",
    name: "Consultancy",
    interest: "consultancy",
    headline: [{ text: "Consultancy", tone: "amber" }],
    summary:
      "Consult in person with Prasanth Sukumaran for solutions at all stages of your business growth.",
    emphasis: "Prasanth Sukumaran",
    facts: [
      { label: "Format", value: "In person" },
      { label: "With", value: "Prasanth Sukumaran" },
      { label: "For", value: "Every stage of growth" },
    ],
    cta: { label: "Book a Consultation", tone: "amber" },
    focus: {
      eyebrow: "Where We Help",
      heading: [{ text: "Seven Levers. " }, { text: "One Support System", tone: "cyan" }, { text: "." }],
      lede: "We don't believe in half-measures. The Local Economy works across every critical dimension of your business, because sustainable growth is never the result of fixing just one thing.",
      layout: "tiles",
      items: LEVERS.map((title, i) => ({ kicker: String(i + 1).padStart(2, "0"), title })),
      also: {
        heading: [{ text: "Any Business is " }, { text: "Our Business", tone: "amber" }],
        items: SECTORS,
      },
    },
  },
];

export const programmePage = (slug: string) => PROGRAMME_PAGES.find((p) => p.slug === slug);

export const programmeHref = (slug: ProgrammeSlug) => `/programmes/${slug}`;
