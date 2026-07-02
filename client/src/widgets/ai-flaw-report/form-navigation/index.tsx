"use client";

import { useCallback } from "react";
import { useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "~/components/ui/button";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import { useFormStep } from "~/entities/ai-flaw-report/model/hooks/useFormStep";
import { useStepNavigation } from "~/entities/ai-flaw-report/model/hooks/useStepNavigation";
import { STEP_CONFIGS } from "~/entities/ai-flaw-report/model/step-config";
import type { AiFlawReportSchema } from "~/entities/ai-flaw-report/model/types";

export function FormNavigation() {
  const router = useRouter();
  const { control, trigger } = useAiFlawFormContext();
  const currentStep = useWatch({ control, name: "step" });
  const csamInvolved = useWatch({
    control,
    name: "classifyReport.csam_involved",
  });

  useFormStep(currentStep);
  const { isLastStep, goToNextStep, goToPreviousStep, isFirstStep } =
    useStepNavigation();

  const isCsamBlocked =
    currentStep === "CLASSIFY_REPORT" && csamInvolved === true;

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
        onClick={
          isFirstStep
            ? () => router.push("/introduction-ai-flaw-report")
            : goToPreviousStep
        }
        aria-label="Go to previous step"
        className="bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-gray-300 disabled:bg-gray-300"
      >
        <ChevronLeft aria-hidden="true" size={20} className="!h-5 !w-5" />{" "}
        Previous
      </Button>
      {!isLastStep && !isReviewStep && (
        <Button
          type="button"
          onClick={handleNextStep}
          disabled={isCsamBlocked}
          aria-label="Go to next step"
          className="bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          Next Step{" "}
          <ChevronRight aria-hidden="true" size={20} className="!h-5 !w-5" />
        </Button>
      )}
    </nav>
  );
}
