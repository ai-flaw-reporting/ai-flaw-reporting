import { useWatch } from "react-hook-form";

import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import { STEP_ORDER } from "~/entities/ai-flaw-report/model/step-config";

export function StepIndicator() {
  const { control } = useAiFlawFormContext();
  const currentStep = useWatch({ control, name: "step" });

  const currentStepIndex = STEP_ORDER.indexOf(currentStep);
  const totalSteps = STEP_ORDER.length;

  return (
    <p className="text-xl font-medium text-gray-500 dark:text-gray-400">
      Step {currentStepIndex + 1} of {totalSteps}
    </p>
  );
}
