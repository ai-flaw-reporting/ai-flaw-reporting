import { SeverityHarmField } from "./severity-harm-field";
import { PrevalenceField } from "./prevalence-field";
import { HarmType } from "./harm-type";
import { TypeOfHarmImpact } from "./type-harm-impact";
import { AffectedStakeholders } from "./affected-stakeholders";
import { DiscoveryContext } from "./discovery-context";
import { ResponsibleFactors } from "./responsible-factors";

export function ImpactAndRiskAssessmentStep() {
  return (
    <div className="space-y-4">
      <HarmType />
      <TypeOfHarmImpact />
      <AffectedStakeholders />
      <div className="flex flex-col items-start gap-4 md:flex-row">
        <DiscoveryContext />
        <ResponsibleFactors />
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <SeverityHarmField />
        <PrevalenceField />
      </div>
      <p className="text-center text-sm text-gray-500">
        Your assessment helps prioritize and categorize this issue for
        appropriate response
      </p>
    </div>
  );
}
