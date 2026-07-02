import { RealWorldIncidentDetails } from "./real-world-incident-details";
import { MalignantActorDetails } from "./malignant-actor-details";
import { StatisticalArgumentWithExamples } from "./statistical-argument-with-examples";
import { DiscoveryContext } from "./discovery-context";

export function SecurityIncidentDetailsStep() {
  return (
    <div className="space-y-4">
      <RealWorldIncidentDetails />
      <MalignantActorDetails />
      <DiscoveryContext />
      <StatisticalArgumentWithExamples />
    </div>
  );
}
