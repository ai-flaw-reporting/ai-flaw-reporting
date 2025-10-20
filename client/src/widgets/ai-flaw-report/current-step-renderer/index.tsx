import { useWatch } from "react-hook-form";

import { useAiFlawFormContext } from "~/entities/ai-flaw-report";

import { ClassifyReportStep } from "../classify-report-step";

const placeholderStep = () => <p>This step will be implemented soon.</p>;

const STEP_COMPONENTS = {
  CLASSIFY_REPORT: ClassifyReportStep,
  REPORTER_AND_SYSTEM_DETAILS: placeholderStep,
  FLAW_INCIDENT_DESCRIPTION: placeholderStep,
  EVIDENCE_AND_REPRODUCTION: placeholderStep,
  IMPACT_AND_RISK_ASSESSMENT: placeholderStep,
  SECURITY_INCIDENT_DETAILS: placeholderStep,
  DISCLOSURE_PLAN: placeholderStep,
  REVIEW_AND_SUBMIT_REPORT: placeholderStep,
} as const;

export function CurrentStepRenderer() {
  const { control } = useAiFlawFormContext();
  const currentStep = useWatch({ control, name: "step" });

  const CurrentStepComponent = STEP_COMPONENTS[currentStep];

  return <CurrentStepComponent />;
}
