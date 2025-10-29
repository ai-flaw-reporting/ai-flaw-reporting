import ReportsTable from "./reports-table";

export function RecentReports() {
  return (
    <section className="bg-gray-modern-50 space-y-12 px-8 py-16 text-center dark:bg-gray-900">
      <div className="space-y-4">
        <h2 className="dashboard-title">Recent Reports</h2>
        <p className="dashboard-subtitle">
          Latest AI system flaws reported by our community
        </p>
      </div>
      <ReportsTable />
    </section>
  );
}
