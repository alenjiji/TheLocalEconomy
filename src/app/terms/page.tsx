import type { Metadata } from "next";

import SiteHeader from "@/components/nav/SiteHeader";
import SiteFooter from "@/components/footer/SiteFooter";
import LegalPage from "@/components/legal/LegalPage";
import Cursor from "@/components/ui/Cursor";
import TouchFeedback from "@/components/ui/TouchFeedback";
import styles from "@/components/legal/LegalPage.module.css";

export const metadata: Metadata = {
  title: "Terms & Conditions — The Local Economy",
  description: "The terms that apply to The Local Economy's programmes and services.",
  // See the note in `privacy/page.tsx`.
  robots: { index: false, follow: true },
};

/*
 * PLACEHOLDER. Replace the body below with the terms your legal adviser writes,
 * and take the `robots` line out at the same time.
 */
export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <LegalPage title="Terms & Conditions">
          <p>
            The terms that apply to The Local Economy&rsquo;s programmes, consultations and courses
            are being prepared and will be published on this page. They will cover what is included
            in each programme, payment and refunds, scheduling, and the responsibilities on both
            sides.
          </p>
          <div className={styles.notice}>
            <p>
              Until they are published, the terms of any engagement are the ones set out in writing
              when you book. For a copy, or for anything you would like clarified first, write to{" "}
              <a href="mailto:info@thelocaleconomy.in?subject=Terms%20question">
                info@thelocaleconomy.in
              </a>
              .
            </p>
          </div>
        </LegalPage>
      </main>
      <SiteFooter />
      {/* Both no-op on the pointer type they are not for. */}
      <Cursor />
      <TouchFeedback />
    </>
  );
}
