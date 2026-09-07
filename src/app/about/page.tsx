import type { Metadata } from "next";

import SiteHeader from "@/components/nav/SiteHeader";
import SiteFooter from "@/components/footer/SiteFooter";
import About from "@/components/about/About";
import Cursor from "@/components/ui/Cursor";
import TouchFeedback from "@/components/ui/TouchFeedback";

export const metadata: Metadata = {
  title: "About Us — The Local Economy",
  description:
    "Not just a consultancy. A growth engine for businesses, built for Indian SMEs competing on the world stage.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <About />
      </main>
      <SiteFooter />
      {/* Both no-op on the pointer type they are not for. */}
      <Cursor />
      <TouchFeedback />
    </>
  );
}
