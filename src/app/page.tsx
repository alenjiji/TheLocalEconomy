import SiteHeader from "@/components/nav/SiteHeader";
import Hero from "@/components/hero/Hero";
import Programmes from "@/components/section2/Programmes";
import GrowthCarousel from "@/components/section3/GrowthCarousel";
import Results from "@/components/section4/Results";
import SiteFooter from "@/components/footer/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Programmes />
        <GrowthCarousel />
        <Results />
      </main>
      <SiteFooter />
    </>
  );
}
