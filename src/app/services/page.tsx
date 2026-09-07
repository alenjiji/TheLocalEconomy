import type { Metadata } from "next";

import SiteHeader from "@/components/nav/SiteHeader";
import SiteFooter from "@/components/footer/SiteFooter";
import Services from "@/components/services/Services";
import Cursor from "@/components/ui/Cursor";
import TouchFeedback from "@/components/ui/TouchFeedback";

export const metadata: Metadata = {
  title: "Services — The Local Economy",
  description:
    "Seven levers, one support system. Marketing, sales, profit, systems, delegation, leadership and expansion, worked as one.",
};

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Services />
      </main>
      <SiteFooter />
      {/* Both no-op on the pointer type they are not for. */}
      <Cursor />
      <TouchFeedback />
    </>
  );
}
