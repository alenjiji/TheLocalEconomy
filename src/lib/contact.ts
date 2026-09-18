/**
 * How to reach The Local Economy, and the enquiry form's options.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * Every phone number, address and link to the business on the site comes from
 * this file — the footer, the course's "Join Now", the contact page. Change a
 * detail here and it changes everywhere.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const CONTACT = {
  /** As printed. */
  phoneDisplay: "+91-8086441054",
  /** For `tel:` links. */
  phoneE164: "+918086441054",
  /** International format, digits only, as wa.me wants it. */
  whatsapp: "918086441054",
  email: "info@thelocaleconomy.in",
  /**
   * One component to a line, the way a letter is addressed. The building name
   * is left off because the logo beside every use of this already carries it.
   * Post town and PIN are held together with non-breaking spaces.
   */
  addressLines: [
    "Ground Floor, MSS Arcade",
    "TC No. 73/1970-2",
    "Manacaud Market Junction",
    "Manacaud",
    "Thiruvananthapuram - 695009",
  ],
  mapUrl: "https://maps.app.goo.gl/ecNTg59LoHG8Rhsc6",
} as const;

/** A wa.me link that opens a chat with the business, message already typed. */
export const whatsappLink = (message: string) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;

/** A mailto link with the subject and body filled in. */
export const mailtoLink = (subject: string, body = "") =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}${
    body ? `&body=${encodeURIComponent(body)}` : ""
  }`;

/* -------------------------------------------------------------------------- */
/* The enquiry form                                                            */
/* -------------------------------------------------------------------------- */

/** What an enquiry can be about. `id` is what `?interest=` on the URL selects. */
export const INTERESTS = [
  { id: "consultation", label: "Book a Consultation" },
  { id: "total-biz-fix", label: "Total BIZ FIX" },
  { id: "business-checkup", label: "360° Business Checkup" },
  { id: "consultancy", label: "Consultancy" },
  { id: "course", label: "Business Mastery Course" },
  { id: "other", label: "Something else" },
] as const;

export type InterestId = (typeof INTERESTS)[number]["id"];

export const CONTACT_PREFERENCES = [
  { id: "whatsapp", label: "WhatsApp" },
  { id: "call", label: "Phone call" },
  { id: "email", label: "Email" },
] as const;

export type ContactPreference = (typeof CONTACT_PREFERENCES)[number]["id"];

/**
 * Where every "Book a Consultation" on the site goes: the enquiry form, with
 * the consultation already chosen. `#enquiry` is the form itself, so from the
 * contact page a button scrolls to it rather than reloading.
 */
export const CONSULTATION_HREF = "/contact?interest=consultation#enquiry";

/** The contact page, with a given interest preselected. */
export const enquiryHref = (interest: InterestId) => `/contact?interest=${interest}#enquiry`;

/**
 * The Netlify form.
 *
 * Netlify only accepts submissions for a form it found in the deployed HTML,
 * and it finds forms by reading static files — so `public/__forms.html` holds a
 * copy with exactly these field names, and the page posts there. Add or rename
 * a field and that file has to change with it, or Netlify drops the field.
 */
export const FORM_NAME = "contact";
export const FORM_ENDPOINT = "/__forms.html";
