import SiteHeader from "@/components/nav/SiteHeader";
import Hero from "@/components/hero/Hero";
import Programmes from "@/components/section2/Programmes";
import GrowthCarousel from "@/components/section3/GrowthCarousel";
import CourseOffer from "@/components/course/CourseOffer";
import Results from "@/components/section4/Results";
import SiteFooter from "@/components/footer/SiteFooter";
import Cursor from "@/components/ui/Cursor";
import TouchFeedback from "@/components/ui/TouchFeedback";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Programmes />
        <GrowthCarousel />
        <CourseOffer />
        <Results />
      </main>
      <SiteFooter />
      {/* Both no-op on the pointer type they are not for: the cursor never
          mounts anything on a touch screen, the ripple never fires for a
          mouse. */}
      <Cursor />
      <TouchFeedback />
    </>
  );
}
