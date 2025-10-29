import type { Metadata } from "next";
import { DashboardHero } from "~/widgets/dashboard/hero";
import { ImpactByNumbers } from "~/widgets/dashboard/impact-by-numbers";
import { RecentReports } from "~/widgets/dashboard/recent-reports";
import { ReportingTrends } from "~/widgets/dashboard/reporting-trends";
import { ReportBanner } from "~/widgets/resources/banner";

export const metadata: Metadata = {
  title: "AI Flaw Reporting Dashboard",
  description:
    "Explore the AI Flaw Reporting Dashboard. View past reports and patterns to understand the impact of AI flaws.",
  openGraph: {
    title: "AI Flaw Reporting Dashboard",
    description:
      "Explore the AI Flaw Reporting Dashboard. View past reports and patterns to understand the impact of AI flaws.",
    type: "website",
  },
};

export default function DashboardPage() {
  return (
    <main>
      <section id="dashboard" aria-labelledby="dashboard-title">
        <header className="space-y-8 bg-[#edf3fc] px-8 py-24 dark:bg-gray-900">
          <DashboardHero />
        </header>
        <ImpactByNumbers />
        <ReportingTrends />
        <RecentReports />
        <ReportBanner className="dark:bg-gray-800" />
      </section>
    </main>
  );
}
