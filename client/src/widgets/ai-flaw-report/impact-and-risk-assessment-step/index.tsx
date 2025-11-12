import { SeverityHarmField } from "./severity-harm-field";
import { PrevalenceField } from "./prevalence-field";
import { HarmType } from "./harm-type";
import { TypeOfHarmImpact } from "./type-harm-impact";
import { AffectedStakeholders } from "./affected-stakeholders";

export function ImpactAndRiskAssessmentStep() {
  return (
    <div className="space-y-4">
      <HarmType />
      <TypeOfHarmImpact />
      <AffectedStakeholders />
      <div className="flex flex-row gap-4">
        <SeverityHarmField />
        <PrevalenceField />
      </div>
    </div>
  );
}
