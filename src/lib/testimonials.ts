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
  /** Public path to the film. Empty falls back to the placeholder frame. */
  src: string;
  /** Optional poster frame; the placeholder art shows without one. */
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
    poster: "",
  },
  {
    id: "nirappil",
    name: "Rajendra Prasad",
    role: "CEO",
    company: "Nirappil Group",
    src: "/testimonials/video/2nd_content9_x16.webm",
    poster: "",
  },
];

/** How many cards the reel shows at once on a wide screen. */
export const TESTIMONIALS_PER_VIEW = 2;

/** Which page the reel opens on. */
export const TESTIMONIALS_ACTIVE = 0;
