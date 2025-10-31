import { useWatch } from "react-hook-form";

import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";

import { ClassifyReportStep } from "../classify-report-step";
import { ReporterDetailsStep } from "../reporter-details-step";
import { IncidentDescriptionStep } from "../incident-description-step";
import { EvidenceAndReproductionStep } from "../evidence-and-reproduction-step";
import { ImpactAndRiskAssessmentStep } from "../impact-and-risk-assessment-step";
import { SecurityIncidentDetailsStep } from "../security-incident-details-step";
import { DisclosurePlanStep } from "../disclosure-plan-step";
import { ReviewAndSubmitStep } from "../review-and-submit-step";

const STEP_COMPONENTS = {
  CLASSIFY_REPORT: ClassifyReportStep,
  REPORTER_AND_SYSTEM_DETAILS: ReporterDetailsStep,
  FLAW_INCIDENT_DESCRIPTION: IncidentDescriptionStep,
  EVIDENCE_AND_REPRODUCTION: EvidenceAndReproductionStep,
  IMPACT_AND_RISK_ASSESSMENT: ImpactAndRiskAssessmentStep,
  SECURITY_INCIDENT_DETAILS: SecurityIncidentDetailsStep,
  DISCLOSURE_PLAN: DisclosurePlanStep,
  REVIEW_AND_SUBMIT_REPORT: ReviewAndSubmitStep,
} as const;

export function CurrentStepRenderer() {
  const { control } = useAiFlawFormContext();
  const currentStep = useWatch({ control, name: "step" });

  const CurrentStepComponent = STEP_COMPONENTS[currentStep];

  return <CurrentStepComponent />;
}
