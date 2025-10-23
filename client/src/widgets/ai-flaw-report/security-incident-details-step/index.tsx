import { RealWorldIncidentDetails } from "./real-world-incident-details";
import { MalignantActorDetails } from "./malignant-actor-details";
import { SecurityIncidentDetails } from "./security-incident-details";
import { StatisticalArgumentWithExamples } from "./statistical-argument-with-examples";

export function SecurityIncidentDetailsStep() {
  return (
    <div className="space-y-4">
      <RealWorldIncidentDetails />
      <MalignantActorDetails />
      <SecurityIncidentDetails />
      <StatisticalArgumentWithExamples />
    </div>
  );
}
