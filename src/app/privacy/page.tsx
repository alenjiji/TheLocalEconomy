import type { Metadata } from "next";

import SiteHeader from "@/components/nav/SiteHeader";
import SiteFooter from "@/components/footer/SiteFooter";
import LegalPage from "@/components/legal/LegalPage";
import Cursor from "@/components/ui/Cursor";
import TouchFeedback from "@/components/ui/TouchFeedback";
import styles from "@/components/legal/LegalPage.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy — The Local Economy",
  description: "How The Local Economy handles the details you share with us.",
  // Left out of search until the real policy is written: an unfinished legal
  // page is not something anyone should be able to find and rely on.
  robots: { index: false, follow: true },
};

/*
 * PLACEHOLDER. Replace the body below with the policy your legal adviser
 * writes; the frame, metadata and footer link need no further changes. Take the
 * `robots` line out at the same time.
 */
export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <LegalPage title="Privacy Policy">
          <p>
            The Local Economy&rsquo;s full privacy policy is being prepared and will be published on
            this page. It will set out what we collect when you get in touch or join a programme,
            what we do with it, how long we keep it, and how you can ask us to change or remove it.
          </p>
          <div className={styles.notice}>
            <p>
              Until it is published, if you have a question about how your details are handled,
              write to{" "}
              <a href="mailto:info@thelocaleconomy.in?subject=Privacy%20question">
                info@thelocaleconomy.in
              </a>{" "}
              and we will answer you directly.
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
