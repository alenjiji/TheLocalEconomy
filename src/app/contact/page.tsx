import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";

import SiteHeader from "@/components/nav/SiteHeader";
import SiteFooter from "@/components/footer/SiteFooter";
import ContactPage from "@/components/contact/ContactPage";
import TouchFeedback from "@/components/ui/TouchFeedback";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us — The Local Economy",
  description:
    "Tell us about your business and we will get back to you. Or reach The Local Economy directly on WhatsApp, by phone or by email.",
  path: "/contact",
});

export default function Contact() {
  return (
    <>
      <SiteHeader />
      <main>
        <ContactPage />
      </main>
      <SiteFooter />
      {/* A no-op on the pointer type it is not for: the ripple never fires
          for a mouse. */}
      <TouchFeedback />
    </>
  );
}
