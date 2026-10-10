import SiteHeader from "@/components/nav/SiteHeader";
import Hero from "@/components/hero/Hero";
import Programmes from "@/components/section2/Programmes";
import GrowthCarousel from "@/components/section3/GrowthCarousel";
import CourseOffer from "@/components/course/CourseOffer";
import Results from "@/components/section4/Results";
import Testimonials from "@/components/testimonials/Testimonials";
import SiteFooter from "@/components/footer/SiteFooter";
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
        <Testimonials />
      </main>
      <SiteFooter />
      {/* A no-op on the pointer type it is not for: the ripple never fires
          for a mouse. */}
      <TouchFeedback />
    </>
  );
}
