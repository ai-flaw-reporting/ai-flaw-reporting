import { useImpactByNumbers } from "~/entities/dashboard/model/hooks/use-impact-by-numbers";
import { StatCard } from "~/entities/dashboard/ui/stat-card";

export function ImpactByNumbers() {
  const { impactByNumbers } = useImpactByNumbers();

  return (
    <section
      aria-labelledby="impact-heading"
      className="bg-gray-modern-50 space-y-12 px-8 py-16 text-center dark:bg-gray-800"
    >
      <div className="space-y-4">
        <h2 id="impact-heading" className="dashboard-title">
          Impact by the Numbers
        </h2>
        <p className="dashboard-subtitle">
          Our community's efforts in AI accountability
        </p>
      </div>

      <dl className="flex justify-center gap-8">
        {impactByNumbers.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </dl>
    </section>
  );
}
