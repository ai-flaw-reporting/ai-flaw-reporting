export function DashboardHero() {
  return (
    <div className="max-w-[640px] space-y-4">
      <h1
        id="dashboard-title"
        className="text-[36px] leading-[44px] font-bold text-gray-900 dark:text-white"
      >
        Flaw &amp; Incident Database
      </h1>
      <p className="text-lg leading-8 text-gray-500 dark:text-gray-300">
        Track public reports on AI system flaws, biases, and security issues.
        Our community-driven platform promotes transparency and accountability
        in artificial intelligence.
      </p>
    </div>
  );
}
