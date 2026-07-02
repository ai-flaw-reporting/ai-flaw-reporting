"use client";

import { useImpactByNumbers } from "~/entities/dashboard/model/hooks/use-impact-by-numbers";
import { StatCard } from "~/entities/dashboard/ui/stat-card";

export function ImpactByNumbers() {
  const { impactByNumbers } = useImpactByNumbers();

  return (
    <dl className="flex flex-col gap-8 md:flex-row">
      {impactByNumbers.map((item) => (
        <StatCard key={item.label} {...item} />
      ))}
    </dl>
  );
}
