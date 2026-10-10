import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";

import SiteHeader from "@/components/nav/SiteHeader";
import SiteFooter from "@/components/footer/SiteFooter";
import Services from "@/components/services/Services";
import TouchFeedback from "@/components/ui/TouchFeedback";

export const metadata: Metadata = pageMetadata({
  title: "Services — The Local Economy",
  description:
    "Seven levers, one support system. Marketing, sales, profit, systems, delegation, leadership and expansion, worked as one.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Services />
      </main>
      <SiteFooter />
      {/* A no-op on the pointer type it is not for: the ripple never fires
          for a mouse. */}
      <TouchFeedback />
    </>
  );
}
