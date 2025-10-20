"use client";

import { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  useAiFlawFormContext,
  useFormStep,
  useStepNavigation,
} from "~/entities/ai-flaw-report";

import { Button } from "~/components/ui/button";

export function FormNavigation() {
  const { control, reset } = useAiFlawFormContext();
  const currentStep = useWatch({ control, name: "step" });

  const { loadSavedData } = useFormStep(currentStep);
  const { isLastStep, canGoNext, goToNextStep, goToPreviousStep, isFirstStep } =
    useStepNavigation();

  useEffect(() => {
    const savedData = loadSavedData();
    if (savedData) {
      reset(savedData);
    }
  }, [reset, loadSavedData, currentStep]);

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
      <Button
        type="button"
        onClick={goToNextStep}
        aria-label="Go to next step"
        disabled={!canGoNext}
        className="bg-indigo-500 text-white hover:bg-indigo-500/90 focus-visible:ring-indigo-500/25 disabled:bg-indigo-200"
      >
        {isLastStep ? "Submit" : "Next"}{" "}
        <ChevronRight aria-hidden="true" size={20} className="!h-5 !w-5" />
      </Button>
    </nav>
  );
}
