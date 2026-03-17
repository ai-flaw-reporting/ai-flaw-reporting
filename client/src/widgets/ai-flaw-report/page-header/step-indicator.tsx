import { useWatch } from "react-hook-form";

import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import { STEP_ORDER } from "~/entities/ai-flaw-report/model/step-config";

const VISIBLE_STEPS = STEP_ORDER.filter((s) => s !== "SUBMISSION_SUCCESS");

export function StepIndicator() {
  const { control } = useAiFlawFormContext();
  const currentStep = useWatch({ control, name: "step" });

  if (currentStep === "SUBMISSION_SUCCESS") {
    return (
      <p className="text-xl font-medium text-green-600 dark:text-green-400">
        Submitted
      </p>
    );
  }

  const currentStepIndex = VISIBLE_STEPS.indexOf(currentStep);
  const totalSteps = VISIBLE_STEPS.length;

  return (
    <p className="text-xl font-medium text-gray-500 dark:text-gray-400">
      Step {currentStepIndex + 1} of {totalSteps}
    </p>
  );
}
