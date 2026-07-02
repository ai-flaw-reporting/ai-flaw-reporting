import Hero from "./_components/hero";
import HowItWorks from "./_components/hero/components/cards-container";
import ReportingOrgs from "./_components/reporting-orgs";

export default function HomePage() {
  return (
    <main className="flex-1">
      <Hero />
      <HowItWorks />
      <ReportingOrgs />
    </main>
  );
}
