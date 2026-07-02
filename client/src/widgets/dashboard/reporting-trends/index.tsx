import { ReportsOverTime } from "./reports-over-time";
import { IssueCategories } from "./issue-categories";

export function ReportingTrends() {
  return (
    <section
      aria-label="Reporting trends"
      className="bg-[#F1F5F9]/50 px-6 py-12 dark:bg-gray-900 lg:px-21"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6 lg:h-[460px] lg:flex-row lg:items-stretch">
        <ReportsOverTime />
        <IssueCategories />
      </div>
    </section>
  );
}
