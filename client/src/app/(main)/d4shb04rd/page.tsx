import type { Metadata } from "next";
import { DashboardHero } from "~/widgets/dashboard/hero";
import { ImpactByNumbers } from "~/widgets/dashboard/impact-by-numbers";
import { RecentReports } from "~/widgets/dashboard/recent-reports";
import { ReportingTrends } from "~/widgets/dashboard/reporting-trends";
import { ReportBanner } from "~/widgets/resources/banner";

export const metadata: Metadata = {
  title: "Flaw & Incident Database",
  description:
    "Explore the Flaw & Incident Database. View past reports and patterns to understand the impact of AI flaws.",
  openGraph: {
    title: "Flaw & Incident Database",
    description:
      "Explore the Flaw & Incident Database. View past reports and patterns to understand the impact of AI flaws.",
    type: "website",
  },
};

export default function DashboardPage() {
  return (
    <main>
      <section
        aria-labelledby="dashboard-title"
        className="bg-gray-modern-50 px-6 py-16 dark:bg-gray-900 lg:px-21"
      >
        <div className="mx-auto max-w-[1280px] space-y-12">
          <DashboardHero />
          <div className="rounded-lg border border-blue-200 bg-blue-50 px-5 py-4 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200">
            <p className="text-sm leading-6">
              <span className="font-semibold">Reports are being sent to concerned organizations.</span>{" "}
              Below are the analytics of reports submitted in private so far. Acknowledged and addressed flaws will be made public after concerned developers respond to them.
            </p>
          </div>
          <ImpactByNumbers />
        </div>
      </section>

      <section id="dashboard">
        <ReportingTrends />
        <RecentReports />
        <ReportBanner />
      </section>
    </main>
  );
}
