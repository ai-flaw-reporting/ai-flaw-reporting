"use client";

import { useStepsValidation } from "~/entities/ai-flaw-report/model/hooks/useStepsValidation";

export function IncompleteSectionsWarning() {
  const { incompleteStepNames } = useStepsValidation();

  if (incompleteStepNames.length === 0) return null;

  return (
    <p className="text-sm font-medium text-red-600 dark:text-red-400">
      Incomplete sections: {incompleteStepNames.join(", ")}
    </p>
  );
}
