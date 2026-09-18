import type { Metadata } from "next";

/**
 * Everything a crawler is told about the site.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * The share card itself is `public/og.jpg`, drawn by `scripts/make-og-image.mjs`.
 * Edit that script and re-run it; nothing here needs touching.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Where the site is served from.
 *
 * Open Graph will not take a relative image — a crawler has only the tag, not
 * the page it came from — so `og:image` has to be absolute, and this is what
 * Next resolves the relative paths against.
 *
 * Netlify puts the deploy's own address in `URL` at build time, so a branch
 * preview advertises itself rather than production. Set NEXT_PUBLIC_SITE_URL
 * to override, and change the fallback when the live domain is switched on.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.URL ??
  "https://thelocaleconomypreview.netlify.app";

export const SITE_NAME = "The Local Economy";

export const SITE_DESCRIPTION =
  "Total transformation of your business with our one-month programme. Brand, strategy and mindset coaching for local business owners in Kerala.";

/**
 * 1200x630 is the frame every platform crops its preview from.
 *
 * Declaring the dimensions matters as much as the file: WhatsApp decides
 * between the wide card and a little square thumbnail before it has fetched
 * the image, and with nothing to go on it picks the thumbnail.
 */
const OG_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "The Local Economy — total transformation of your business with our one-month programme.",
};

/**
 * Title and description for one page, with the social tags filled in to match.
 *
 * `openGraph` replaces its parent's wholesale rather than merging into it, so
 * a page that sets only `title` would otherwise keep the home page's card and
 * the home page's words. Going through here means a shared link always
 * describes the page it points at.
 */
export function pageMetadata({
  title,
  description,
  path = "/",
  extra,
}: {
  title: string;
  description: string;
  /** Leading-slash path, used for the canonical and `og:url`. */
  path?: string;
  extra?: Metadata;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: path,
      locale: "en_IN",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
    ...extra,
  };
}
