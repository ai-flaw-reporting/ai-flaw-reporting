import PartnersCarousel from "../_components/partners-carousel";
import CtaSection from "./_components/cta-section";
import HeroSection from "./_components/hero-section";
import InfoCardsSection from "./_components/info-cards-section";
import OurSolutionSection from "./_components/our-solution-section";
import TeamSection from "./_components/team-section";
import WhoWeAreSection from "./_components/who-we-are-section";

export default function AboutUsPage() {
  return (
    <main className="flex-1 bg-white dark:bg-gray-900">
      <HeroSection />
      <OurSolutionSection />
      <TeamSection />
      <InfoCardsSection />
      <WhoWeAreSection />
      {/* <PartnersCarousel
        subtitle="Working alongside industry leaders and institutions to advance AI safety."
        showAboutLink={false}
      /> */}
      <CtaSection />
    </main>
  );
}
