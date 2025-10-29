import { ReportsOverTime } from "./reports-over-time";
import { IssueCategories } from "./issue-categories";

export function ReportingTrends() {
  return (
    <section
      aria-labelledby="reporting-trends-heading"
      className="space-y-12 bg-[#F1F5F9]/30 px-8 py-16 text-center dark:bg-gray-900"
    >
      <div className="space-y-4">
        <h2 id="reporting-trends-heading" className="dashboard-title">
          Reporting Trends
        </h2>
        <p className="dashboard-subtitle">
          Insights into AI system vulnerabilities over time
        </p>
      </div>

      <div className="flex h-[428px] justify-center gap-8">
        <ReportsOverTime />
        <IssueCategories />
      </div>
    </section>
  );
}
