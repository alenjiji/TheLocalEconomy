"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./PaymentOverlay.module.css";
import { COURSE, PAYMENT } from "@/lib/course";

/**
 * The payment sheet behind "Buy Now".
 *
 * It is deliberately self-sufficient: the UPI ID is on screen as selectable
 * text with a copy control, so a buyer can pay from any app even before the QR
 * image is dropped in, and even if it fails to load.
 */
export default function PaymentOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [hasQr, setHasQr] = useState(true);
  const [copied, setCopied] = useState(false);
  // The sheet stays mounted so it can transition, but the QR should not be
  // fetched — and 404 in the console — until someone actually opens it.
  const [everOpened, setEverOpened] = useState(false);

  // Escape closes, the page behind does not scroll, and focus starts inside
  // the sheet rather than wherever the trigger left it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) setEverOpened(true);
    else setCopied(false);
  }, [open]);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PAYMENT.upiId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard blocked — the ID is on screen and selectable either way.
    }
  }, []);

  return (
    <div
      className={`${styles.root} ${open ? styles.open : ""}`}
      // `inert` keeps the sheet's controls out of the tab order while it is
      // closed but still in the DOM for the transition.
      inert={!open ? true : undefined}
      aria-hidden={!open}
    >
      <button className={styles.scrim} type="button" aria-label="Close payment" onClick={onClose} />

      <div
        className={styles.panel}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-heading"
      >
        <button
          className={styles.close}
          type="button"
          ref={closeRef}
          aria-label="Close payment"
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <p className={styles.eyebrow}>Scan to pay with any UPI app</p>
        <h2 id="payment-heading" className={styles.heading}>
          {COURSE.title}
        </h2>

        <p className={styles.amount}>
          <span className={styles.currency}>{COURSE.price.currency}</span>
          {COURSE.price.amount}
        </p>

        <div className={styles.qrCard} data-surface="light">
          {hasQr && everOpened ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              className={styles.qr}
              src={PAYMENT.qr}
              alt={`UPI payment QR code for ${PAYMENT.payee}`}
              width={512}
              height={512}
              onError={() => setHasQr(false)}
            />
          ) : (
            <div className={styles.qrSlot} role="img" aria-label="Payment QR code not yet added">
              <span>QR code</span>
              <span className={styles.qrSlotPath}>{PAYMENT.qr}</span>
            </div>
          )}

          <p className={styles.payee}>{PAYMENT.payee}</p>

          <p className={styles.upiRow}>
            <span className={styles.upiLabel}>UPI ID</span>
            <span className={styles.upiId}>{PAYMENT.upiId}</span>
            <button className={styles.copy} type="button" onClick={copy}>
              {copied ? "Copied" : "Copy"}
            </button>
          </p>
        </div>

        {/* Placeholders until the marks land at the paths in `lib/course.ts`. */}
        <ul className={styles.apps} aria-label="Works with">
          {PAYMENT.apps.map((app) => (
            <li key={app.id} className={styles.app}>
              <span className={styles.appMark} aria-hidden="true">
                {app.name.charAt(0)}
              </span>
              <span className={styles.appName}>{app.name}</span>
            </li>
          ))}
        </ul>

        <p className={styles.note}>
          Add <strong>{PAYMENT.note}</strong> and your phone number to the payment note, then send
          the receipt to{" "}
          <a href={`mailto:${PAYMENT.confirmTo}`}>{PAYMENT.confirmTo}</a> and we will open your
          access.
        </p>
      </div>
    </div>
  );
}
