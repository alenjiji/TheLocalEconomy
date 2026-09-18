import InView from "@/components/motion/InView";
import LiquidLink from "@/components/ui/LiquidLink";
import EnquiryForm from "./EnquiryForm";
import { CONTACT, mailtoLink, whatsappLink } from "@/lib/contact";
import styles from "./Contact.module.css";

/** The dip-and-rise rule the build repeats under every section eyebrow. */
function Flourish({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 182.36 10.08" aria-hidden="true">
      <path
        d="M182.36.5h-78.46c-1.14,0-2.23.45-3.03,1.26l-6.57,6.57c-1.68,1.68-4.39,1.68-6.07,0l-6.57-6.57c-.8-.8-1.9-1.26-3.03-1.26H0"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
      />
    </svg>
  );
}

/** Line icons for the direct channels, drawn to one 24-unit box. */
const ICONS = {
  whatsapp: (
    <path
      d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2Zm4.3 12.3c-.2.5-1 1-1.5 1.1-.4.1-.9.1-1.4 0a13 13 0 0 1-1.3-.5 10 10 0 0 1-3.8-3.4 4.3 4.3 0 0 1-.9-2.3c0-1.1.6-1.6.8-1.9.2-.2.4-.3.6-.3h.4c.1 0 .3 0 .5.4l.7 1.6c0 .1.1.3 0 .4l-.2.4-.4.4c-.1.1-.2.3-.1.5.1.2.6 1 1.3 1.6.9.8 1.6 1 1.9 1.1.2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.5-.1l1.5.7c.2.1.4.2.4.3.1.1.1.6-.2 1.1Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  phone: (
    <path d="M6.6 3.5h2.6l1.4 3.8-1.8 1.2a11 11 0 0 0 6.7 6.7l1.2-1.8 3.8 1.4v2.6a2 2 0 0 1-2.2 2A16.6 16.6 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />
  ),
  email: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.8 7 8.2 6 8.2-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
};

function Icon({ name }: { name: keyof typeof ICONS }) {
  return (
    <svg
      className={styles.channelIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

/**
 * The contact page: the enquiry form, and every way to reach the business
 * directly beside it.
 *
 * Built from the services page's furniture — the grained ground, the amber
 * eyebrow and flourish, the white headline with its one cyan phrase, the dark
 * bordered card — so it reads as the same site rather than a bolted-on form.
 */
export default function ContactPage() {
  return (
    <InView as="section" className={styles.section} amount={0.05} aria-labelledby="contact-heading">
      <div className={styles.inner}>
        <p className={`${styles.eyebrow} u-rise`}>Contact Us</p>
        <Flourish className={`${styles.flourish} u-rise`} />

        <h1 id="contact-heading" className={`${styles.heading} u-rise`} style={{ "--d": 1 } as React.CSSProperties}>
          Let&rsquo;s Talk About
          <span className={styles.headingLine}>
            <span className={styles.cyan}>Your Business</span>.
          </span>
        </h1>

        <p className={`${styles.lede} u-rise`} style={{ "--d": 2 } as React.CSSProperties}>
          Tell us where your business is and where you want it to go. The Local Economy team will
          get back to you — or reach us directly, whichever suits you.
        </p>

        <div className={styles.layout}>
          <div
            id="enquiry"
            className={`${styles.formCard} u-rise`}
            style={{ "--d": 3 } as React.CSSProperties}
          >
            <EnquiryForm />
          </div>

          <aside
            className={`${styles.direct} u-rise`}
            style={{ "--d": 4 } as React.CSSProperties}
            aria-labelledby="direct-heading"
          >
            <h2 id="direct-heading" className={styles.directHeading}>
              Prefer to talk <span className={styles.amber}>directly</span>?
            </h2>
            <p className={styles.directLede}>We&rsquo;re a message or a call away.</p>

            <LiquidLink
              className={styles.whatsapp}
              tone="cyan"
              href={whatsappLink("Hi The Local Economy, I'd like to know more about how you can help my business.")}
            >
              <Icon name="whatsapp" />
              <span>Chat on WhatsApp</span>
            </LiquidLink>

            <ul className={styles.channels}>
              <li>
                <a className={styles.channel} href={`tel:${CONTACT.phoneE164}`}>
                  <Icon name="phone" />
                  <span className={styles.channelText}>
                    <span className={styles.channelLabel}>Call us</span>
                    <span className={styles.channelValue}>{CONTACT.phoneDisplay}</span>
                  </span>
                </a>
              </li>
              <li>
                <a className={styles.channel} href={mailtoLink("Enquiry from the website")}>
                  <Icon name="email" />
                  <span className={styles.channelText}>
                    <span className={styles.channelLabel}>Email us</span>
                    <span className={styles.channelValue}>{CONTACT.email}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  className={styles.channel}
                  href={CONTACT.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="pin" />
                  <span className={styles.channelText}>
                    <span className={styles.channelLabel}>Visit us</span>
                    <span className={styles.channelValue}>
                      The Local Economy
                      {CONTACT.addressLines.map((line) => (
                        <span key={line} className={styles.addressLine}>
                          {line}
                        </span>
                      ))}
                    </span>
                    <span className={styles.channelMore}>Open in Google Maps</span>
                  </span>
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </InView>
  );
}
