"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";

import { useLiquid } from "@/components/ui/useLiquid";
import {
  CONTACT_PREFERENCES,
  FORM_ENDPOINT,
  FORM_NAME,
  INTERESTS,
  mailtoLink,
  whatsappLink,
  type ContactPreference,
  type InterestId,
} from "@/lib/contact";
import styles from "./Contact.module.css";

type Fields = {
  name: string;
  phone: string;
  email: string;
  business: string;
  city: string;
  interest: InterestId;
  preference: ContactPreference;
  message: string;
};

type Errors = Partial<Record<"name" | "phone" | "email", string>>;

const EMPTY: Fields = {
  name: "",
  phone: "",
  email: "",
  business: "",
  city: "",
  interest: "consultation",
  preference: "whatsapp",
  message: "",
};

/** Ten digits is an Indian mobile; a country code or a landline code adds more. */
const digits = (s: string) => s.replace(/\D/g, "");

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please tell us your name.";
  const d = digits(f.phone);
  if (d.length < 10 || d.length > 13) e.phone = "Please enter a phone number we can reach you on.";
  if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) {
    e.email = "That email address doesn't look right.";
  }
  if (f.preference === "email" && !f.email.trim()) {
    e.email = "Add an email address so we can reply by email.";
  }
  return e;
}

const labelOf = <T extends { id: string; label: string }>(list: readonly T[], id: string) =>
  list.find((x) => x.id === id)?.label ?? id;

/** The enquiry as a message: the WhatsApp hand-off and the email fallback both send this. */
function summary(f: Fields) {
  return [
    "New enquiry from the website\n",
    `Name: ${f.name.trim()}`,
    `Phone: ${f.phone.trim()}`,
    f.email.trim() && `Email: ${f.email.trim()}`,
    f.business.trim() && `Business: ${f.business.trim()}`,
    f.city.trim() && `City: ${f.city.trim()}`,
    `Interested in: ${labelOf(INTERESTS, f.interest)}`,
    `Prefers: ${labelOf(CONTACT_PREFERENCES, f.preference)}`,
    f.message.trim() && `\nMessage:\n${f.message.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function Arrow() {
  return (
    <svg className="u-liquid-arrow" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 12h15M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The enquiry form.
 *
 * It posts to Netlify Forms — see `FORM_ENDPOINT` in lib/contact — which keeps
 * every submission and emails the business. The automated WhatsApp alert is a
 * Netlify function that runs on each submission (`netlify/functions`).
 *
 * The success screen also offers to send the same enquiry on WhatsApp from the
 * visitor's own phone. That works with nothing configured at all, and it is
 * what a business that lives on WhatsApp will see first.
 */
export default function EnquiryForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [sent, setSent] = useState<Fields | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const { liquidStyle, liquidProps } = useLiquid<HTMLButtonElement>();

  // `?interest=total-biz-fix` and the like, from the buttons around the site.
  // Read after mount: this page is exported as static HTML, so the query string
  // is not known when it is built.
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("interest");
    if (wanted && INTERESTS.some((i) => i.id === wanted)) {
      setFields((f) => ({ ...f, interest: wanted as InterestId }));
    }
  }, []);

  // Move focus to the outcome, so a keyboard or screen-reader user lands on it.
  useEffect(() => {
    if (status === "sent" || status === "failed") resultRef.current?.focus();
  }, [status]);

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((f) => ({ ...f, [key]: value }));
    // Clear a field's complaint as soon as it is being fixed.
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    const first = (["name", "phone", "email"] as const).find((k) => found[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    const body = new URLSearchParams({
      "form-name": FORM_NAME,
      "bot-field": (formRef.current?.elements.namedItem("bot-field") as HTMLInputElement)?.value ?? "",
      name: fields.name.trim(),
      phone: fields.phone.trim(),
      email: fields.email.trim(),
      business: fields.business.trim(),
      city: fields.city.trim(),
      interest: labelOf(INTERESTS, fields.interest),
      preference: labelOf(CONTACT_PREFERENCES, fields.preference),
      message: fields.message.trim(),
    });

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSent(fields);
      setFields(EMPTY);
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent" && sent) {
    const first = sent.name.trim().split(/\s+/)[0];
    const how = { whatsapp: "on WhatsApp", call: "with a call", email: "by email" }[sent.preference];
    return (
      <div className={styles.result} ref={resultRef} tabIndex={-1} role="status">
        <svg className={styles.resultMark} viewBox="0 0 64 64" aria-hidden="true">
          <circle className={styles.resultRing} cx="32" cy="32" r="29" pathLength="1" />
          <path className={styles.resultTick} d="M20 33.5l8 8 16-17" pathLength="1" />
        </svg>
        <h2 className={styles.resultHeading}>Thank you, {first}.</h2>
        <p className={styles.resultBody}>
          Your enquiry is with The Local Economy. We&rsquo;ll get back to you {how} shortly.
        </p>
        <p className={styles.resultNote}>Want a faster reply? Send the same details on WhatsApp.</p>
        <div className={styles.resultActions}>
          <a
            className={styles.resultPrimary}
            href={whatsappLink(summary(sent))}
            target="_blank"
            rel="noopener noreferrer"
          >
            Send on WhatsApp
            <Arrow />
          </a>
          <button
            className={styles.resultSecondary}
            type="button"
            onClick={() => {
              setStatus("idle");
              setSent(null);
            }}
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  const failed = status === "failed";

  return (
    <form
      ref={formRef}
      className={styles.form}
      name={FORM_NAME}
      method="POST"
      noValidate
      onSubmit={submit}
      aria-describedby={failed ? `${id}-failed` : undefined}
    >
      <div className={styles.formHead}>
        <h2 className={styles.formHeading}>Send us an enquiry</h2>
        <p className={styles.formLede}>
          Fields marked <span className={styles.required}>*</span> are required.
        </p>
      </div>

      {/* Netlify's spam trap. Hidden from people and screen readers; a bot that
          fills it in gets its submission quietly discarded. */}
      <p className={styles.honeypot} aria-hidden="true">
        <label>
          Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className={styles.row}>
        <Field id={`${id}-name`} label="Full name" required error={errors.name}>
          <input
            id={`${id}-name`}
            className={styles.input}
            name="name"
            type="text"
            autoComplete="name"
            value={fields.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${id}-name-error` : undefined}
            required
          />
        </Field>
        <Field id={`${id}-phone`} label="Phone / WhatsApp" required error={errors.phone}>
          <input
            id={`${id}-phone`}
            className={styles.input}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91"
            value={fields.phone}
            onChange={(e) => set("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${id}-phone-error` : undefined}
            required
          />
        </Field>
      </div>

      <div className={styles.row}>
        <Field id={`${id}-email`} label="Email" error={errors.email}>
          <input
            id={`${id}-email`}
            className={styles.input}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={fields.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${id}-email-error` : undefined}
          />
        </Field>
        <Field id={`${id}-business`} label="Business name">
          <input
            id={`${id}-business`}
            className={styles.input}
            name="business"
            type="text"
            autoComplete="organization"
            value={fields.business}
            onChange={(e) => set("business", e.target.value)}
          />
        </Field>
      </div>

      <Field id={`${id}-city`} label="City / town">
        <input
          id={`${id}-city`}
          className={styles.input}
          name="city"
          type="text"
          autoComplete="address-level2"
          value={fields.city}
          onChange={(e) => set("city", e.target.value)}
        />
      </Field>

      <fieldset className={styles.group}>
        <legend className={styles.label}>
          I&rsquo;m interested in <span className={styles.required}>*</span>
        </legend>
        <div className={styles.chips}>
          {INTERESTS.map((opt) => (
            <label key={opt.id} className={styles.chip}>
              <input
                className={styles.chipInput}
                type="radio"
                name="interest"
                value={opt.id}
                checked={fields.interest === opt.id}
                onChange={() => set("interest", opt.id)}
              />
              <span className={styles.chipFace}>{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.label}>Best way to reach you</legend>
        <div className={styles.segments}>
          {CONTACT_PREFERENCES.map((opt) => (
            <label key={opt.id} className={styles.segment}>
              <input
                className={styles.chipInput}
                type="radio"
                name="preference"
                value={opt.id}
                checked={fields.preference === opt.id}
                onChange={() => set("preference", opt.id)}
              />
              <span className={styles.segmentFace}>{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field id={`${id}-message`} label="How can we help?">
        <textarea
          id={`${id}-message`}
          className={`${styles.input} ${styles.textarea}`}
          name="message"
          rows={5}
          maxLength={1500}
          placeholder="A little about your business and what you'd like to change."
          value={fields.message}
          onChange={(e) => set("message", e.target.value)}
        />
      </Field>

      {failed ? (
        <div
          className={styles.failed}
          id={`${id}-failed`}
          ref={resultRef}
          tabIndex={-1}
          role="alert"
        >
          <p>
            <strong>That didn&rsquo;t go through.</strong> Your details are still here — try again,
            or send them to us directly:
          </p>
          <p className={styles.failedActions}>
            <a href={whatsappLink(summary(fields))} target="_blank" rel="noopener noreferrer">
              Send on WhatsApp
            </a>
            <a href={mailtoLink("Enquiry from the website", summary(fields))}>Send by email</a>
          </p>
        </div>
      ) : null}

      <button
        className={`${styles.submit} u-liquid u-liquid-amber`}
        type="submit"
        disabled={status === "sending"}
        data-cursor="amber"
        {...liquidProps}
        style={liquidStyle}
      >
        <span>{status === "sending" ? "Sending…" : "Send Enquiry"}</span>
        {status === "sending" ? <span className={styles.spinner} aria-hidden="true" /> : <Arrow />}
      </button>

      <p className={styles.privacy}>
        We&rsquo;ll only use these details to reply to your enquiry.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`${styles.field} ${error ? styles.fieldInvalid : ""}`}>
      <label className={styles.label} htmlFor={id}>
        {label} {required ? <span className={styles.required}>*</span> : null}
      </label>
      {children}
      {error ? (
        <p className={styles.error} id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
