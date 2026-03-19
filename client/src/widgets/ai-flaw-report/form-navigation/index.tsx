"use client";

import { useCallback } from "react";
import { useWatch } from "react-hook-form";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "~/components/ui/button";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import { useFormStep } from "~/entities/ai-flaw-report/model/hooks/useFormStep";
import { useStepNavigation } from "~/entities/ai-flaw-report/model/hooks/useStepNavigation";
import { STEP_CONFIGS } from "~/entities/ai-flaw-report/model/step-config";
import type { AiFlawReportSchema } from "~/entities/ai-flaw-report/model/types";

export function FormNavigation() {
  const { control, trigger } = useAiFlawFormContext();
  const currentStep = useWatch({ control, name: "step" });

  useFormStep(currentStep);
  const { isLastStep, goToNextStep, goToPreviousStep, isFirstStep } =
    useStepNavigation();

  const handleNextStep = useCallback(async () => {
    const stepConfig = STEP_CONFIGS[currentStep];
    if (stepConfig?.formField) {
      await trigger(stepConfig.formField as keyof AiFlawReportSchema);
    }
    goToNextStep();
  }, [currentStep, trigger, goToNextStep]);

  const isSuccessStep = currentStep === "SUBMISSION_SUCCESS";
  if (isSuccessStep) return null;

  const isReviewStep = currentStep === "REVIEW_AND_SUBMIT_REPORT";

  return (
    <nav className="mx-auto flex max-w-[1056px] justify-between">
      <Button
        type="button"
        onClick={goToPreviousStep}
        disabled={isFirstStep}
        aria-label="Go to previous step"
        className="bg-indigo-500 text-white hover:bg-indigo-500/90 focus-visible:ring-indigo-500/25 disabled:bg-indigo-200"
      >
        <ChevronLeft aria-hidden="true" size={20} className="!h-5 !w-5" />{" "}
        Previous
      </Button>
      {!isLastStep && !isReviewStep && (
        <Button
          type="button"
          onClick={handleNextStep}
          aria-label="Go to next step"
          className="bg-indigo-500 text-white hover:bg-indigo-500/90 focus-visible:ring-indigo-500/25"
        >
          Next Step{" "}
          <ChevronRight aria-hidden="true" size={20} className="!h-5 !w-5" />
        </Button>
      )}
    </nav>
  );
}
