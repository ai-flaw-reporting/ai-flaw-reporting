"use client";

import { useEffect, useRef } from "react";
import { useWatch } from "react-hook-form";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "~/components/ui/button";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import { useFormStep } from "~/entities/ai-flaw-report/model/hooks/useFormStep";
import { useStepNavigation } from "~/entities/ai-flaw-report/model/hooks/useStepNavigation";
import { STEP_CONFIGS_WITH_SCHEMAS } from "~/entities/ai-flaw-report/model/constants";
import type { AiFlawReportSchema } from "~/entities/ai-flaw-report/model/types";

export function FormNavigation() {
  const { control, reset, trigger } = useAiFlawFormContext();
  const currentStep = useWatch({ control, name: "step" });
  const loadedStepsRef = useRef<Set<string>>(new Set());
  const rafIdRef = useRef<number | null>(null);
  const currentStepRef = useRef(currentStep);

  const { loadSavedData } = useFormStep(currentStep);
  const { isLastStep, canGoNext, goToNextStep, goToPreviousStep, isFirstStep } =
    useStepNavigation();

  // Keep currentStepRef in sync with currentStep
  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  useEffect(() => {
    // Clear the loaded steps when step changes
    loadedStepsRef.current.clear();
    // Cancel any pending animation frame
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, [currentStep]);

  useEffect(() => {
    const stepConfig = STEP_CONFIGS_WITH_SCHEMAS[currentStep];
    const stepId = stepConfig.id;

    // Only load data once per step to prevent race conditions
    if (loadedStepsRef.current.has(stepId)) {
      return;
    }

    // Delay data loading to ensure conditional fields are registered
    // Use requestAnimationFrame to wait for React to finish rendering
    // Double RAF ensures we wait for the next paint cycle where conditional fields are registered
    rafIdRef.current = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Double-check we're still on the same step before loading
        const currentStepConfig =
          STEP_CONFIGS_WITH_SCHEMAS[currentStepRef.current];
        if (currentStepConfig.id !== stepId) {
          rafIdRef.current = null;
          return;
        }

        // Check again if we've already loaded (race condition protection)
        if (loadedStepsRef.current.has(stepId)) {
          rafIdRef.current = null;
          return;
        }

        const savedData = loadSavedData();

        if (savedData != null) {
          const formField = stepConfig.formField;

          // Use reset with just the saved data for this field, don't merge with current data
          const fieldData = (savedData as Record<string, unknown>)[formField];

          if (fieldData) {
            // Reset only the specific field, not the entire form
            reset((prevData) => ({
              ...prevData,
              [formField]: fieldData,
            }));

            // Trigger validation for the field to update validation state
            // This ensures the Next button state is updated correctly
            void trigger(formField as keyof AiFlawReportSchema).then(() => {
              loadedStepsRef.current.add(stepId);
            });
          } else {
            loadedStepsRef.current.add(stepId);
          }
        } else {
          loadedStepsRef.current.add(stepId);
        }
        rafIdRef.current = null;
      });
    });

    return () => {
      // Cancel animation frame on cleanup
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [reset, trigger, currentStep, loadSavedData]);

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
      {!isLastStep && (
        <Button
          type="button"
          onClick={goToNextStep}
          aria-label="Go to next step"
          disabled={!canGoNext}
          className="bg-indigo-500 text-white hover:bg-indigo-500/90 focus-visible:ring-indigo-500/25 disabled:bg-indigo-200"
        >
          Next{" "}
          <ChevronRight aria-hidden="true" size={20} className="!h-5 !w-5" />
        </Button>
      )}
    </nav>
  );
}
