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
    srcMp4: "/testimonials/video/local_economy_portrait.mp4",
    poster: "",
  },
  {
    id: "nirappil",
    name: "Rajendra Prasad",
    role: "CEO",
    company: "Nirappil Group",
    src: "/testimonials/video/2nd_content9_x16.webm",
    srcMp4: "/testimonials/video/2nd_content9_x16.mp4",
    poster: "",
  },
];

/** How many cards the reel shows at once on a wide screen. */
export const TESTIMONIALS_PER_VIEW = 2;

/** Which page the reel opens on. */
export const TESTIMONIALS_ACTIVE = 0;
