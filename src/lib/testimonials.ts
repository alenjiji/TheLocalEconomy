/**
 * The testimonial reel.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * TO ADD OR SWAP A FILM: edit the list below. Nothing else needs touching — the
 * component reads this file and nothing else. Drop the files in
 * `public/testimonials/video/` and reference them as
 * `/testimonials/video/<name>.webm`.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Every entry renders as a card whatever its `src`; an empty `src` shows the
 * placeholder frame with the play button, so the section stands up before a
 * single film has landed. The films are portrait — 9:16 — and the cards are cut
 * to suit them.
 */
export type Testimonial = {
  id: string;
  /** The person speaking. */
  name: string;
  /** Their title, shown with the company. */
  role: string;
  company: string;
  /** Optional line under the company; only rendered when present. */
  motto?: string;
  /**
   * Public path to the WebM. Empty falls back to the placeholder frame.
   *
   * It must be VP9 **Profile 0** — 8-bit, 4:2:0. Phones only decode Profile 0
   * (and, on recent chips, Profile 2); a Profile 3 file — 10-bit 4:2:2, which
   * is what an editing timeline exports by default — plays on a desktop through
   * a software decoder and silently refuses on every phone. Check a new film
   * with `ffprobe -show_entries stream=profile,pix_fmt <file>` before adding it.
   */
  src: string;
  /**
   * H.264 MP4 of the same film, offered after the WebM. Safari's WebM support
   * is recent and partial, so this is what actually plays on an older iPhone.
   */
  srcMp4?: string;
  /**
   * Poster frame, shown until the film is played. Without one the gradient
   * placeholder stands in; with one it steps back to a scrim over the picture.
   */
  poster: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "auto-grade",
    name: "Mohamed Ashraf",
    role: "CEO",
    company: "Auto Grade",
    motto: "Definitely for nature",
    src: "/testimonials/video/local_economy_portrait.webm",
    srcMp4: "/testimonials/video/local_economy_portrait.mp4",
    poster: "/testimonials/video/auto_grade_thumb.jpg",
  },
  {
    id: "nirappil",
    name: "Rajendra Prasad",
    role: "CEO",
    company: "Nirappil Group",
    src: "/testimonials/video/2nd_content9_x16.webm",
    srcMp4: "/testimonials/video/2nd_content9_x16.mp4",
    poster: "/testimonials/video/nirappil_thumb.jpg",
  },
];

/** How many cards the reel shows at once on a wide screen. */
export const TESTIMONIALS_PER_VIEW = 2;

/** Which page the reel opens on. */
export const TESTIMONIALS_ACTIVE = 0;

/* -------------------------------------------------------------------------- */
/* The written testimonial                                                     */
/* -------------------------------------------------------------------------- */

/**
 * A stretch of the quote. `mark` sets it in the brand amber — used sparingly,
 * once per paragraph, on the line that carries the paragraph's point.
 */
export type QuoteRun = { text: string; mark?: boolean };

export type WrittenStory = {
  name: string;
  role: string;
  company: string;
  portrait: string;
  /** Describes the person, not the photograph; screen readers get the quote. */
  portraitAlt: string;
  /** One entry to a paragraph. */
  body: QuoteRun[][];
};

/**
 * Prakash V V's letter, as sent.
 *
 * The only editorial change is "Cost-effective" set lower case, which reads as
 * a slip of the shift key mid-sentence rather than anything meant. The
 * apostrophes are the typographic ones, and the quoted words keep their
 * quotation marks because the shift between them is the point being made.
 */
export const WRITTEN_STORY: WrittenStory = {
  name: "Prakash V V",
  role: "Founder",
  company: "Super Wash Laundry",
  portrait: "/testimonials/prakash_testimonial.webp",
  portraitAlt: "Prakash V V, founder of Super Wash Laundry",
  body: [
    [
      { text: "What I loved most about Local Economy is their " },
      { text: "360-degree training approach", mark: true },
      {
        text: ". It\u2019s not just about marketing or sales \u2014 they cover everything a local business owner needs.",
      },
    ],
    [
      {
        text: "Especially, the sessions on Business Strategies and Mindset, were eye-opening for me. They helped me shift ",
      },
      {
        text: "from a \u2018shop owner\u2019 mindset to a true \u2018entrepreneur\u2019 mindset",
        mark: true,
      },
      {
        text: ". The strategies are not theoretical; they are practical, cost-effective, and made for local economies like ours in Kerala.",
      },
    ],
    [
      { text: "If you are a local business owner feeling stuck, this Academy is " },
      { text: "the turning point you need", mark: true },
      { text: ". It\u2019s a complete ecosystem for growth." },
    ],
  ],
};
