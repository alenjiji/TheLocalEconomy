/**
 * The course offer that sits between the growth carousel and the results
 * section, and the payment details its overlay shows.
 *
 * Everything a client would want to edit lives here rather than in the markup.
 */

export type CourseMeta = { id: string; icon: "modules" | "language" | "access"; label: string };

export const COURSE = {
  title: "Business Mastery Course",
  /** Rendered on its own line under the title. */
  subtitle: "Malayalam",
  provider: "The Local Economy",
  blurb:
    "The programme Prasanth teaches in the room, recorded end to end. Work through it at your own pace and keep it for good.",
  meta: [
    { id: "modules", icon: "modules", label: "2 modules" },
    { id: "language", icon: "language", label: "Malayalam" },
    { id: "access", icon: "access", label: "Lifetime access" },
  ] as CourseMeta[],
  price: { amount: "1,999.00", was: "4,500", currency: "₹" },
  /**
   * The preview film. 1080x1920, so the frame it sits in is portrait.
   *
   * It is 21MB, so nothing is fetched until someone presses play — see the
   * `preload="none"` in `CourseOffer`. Drop a poster frame at `poster` and it
   * replaces the placeholder art behind the play button.
   */
  video: { src: "/course/video-01.webm", poster: "", width: 1080, height: 1920 },
} as const;

/**
 * Payment details shown on the overlay.
 *
 * `upiId` and `payee` are read off the client's own Google Pay QR. VERIFY BOTH
 * AGAINST THE ACCOUNT BEFORE THIS GOES LIVE — a wrong handle here sends money
 * to the wrong person, and nothing downstream can catch that.
 *
 * `qr` is the image the overlay shows, and it hard-codes the amount inside the
 * UPI URI — so it has to be regenerated whenever `COURSE.price` changes, or a
 * buyer's app will prefill a figure the page never quoted. Regenerate with:
 *
 *   tools/qrcodegenerator/venv/bin/python tools/qrcodegenerator/generate_qr.py \
 *     "prasanthkel@okhdfcbank" "Prasanth" -a 1999.00 -o qrcode.svg
 *
 * The overlay falls back to a labelled slot if the file is missing, so the UPI
 * ID on screen is always enough to complete a payment on its own.
 */
export const PAYMENT = {
  payee: "Prasanth P Nair",
  upiId: "prasanthkel@okhdfcbank",
  qr: "/payment/upi-qr.svg",
  note: "Business Mastery Course",
  /** Where a buyer sends proof once they have paid. */
  confirmTo: "hello@thelocaleconomy.in",
  /**
   * Logos for the apps that accept the QR. Drop the marks in at these paths;
   * until then each renders as its initial in a brand-coloured tile.
   */
  apps: [
    { id: "gpay", name: "Google Pay", logo: "/payment/upi-gpay.svg" },
    { id: "phonepe", name: "PhonePe", logo: "/payment/upi-phonepe.svg" },
    { id: "paytm", name: "Paytm", logo: "/payment/upi-paytm.svg" },
    { id: "bhim", name: "BHIM UPI", logo: "/payment/upi-bhim.svg" },
  ],
} as const;
