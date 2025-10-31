"use client";

import { useCallback } from "react";
import { useWatch } from "react-hook-form";

import { useAiFlawFormContext } from "./useAiFlawFormContext";
import { STEP_ORDER } from "../step-config";

import { useFormStep } from "./useFormStep";

export function useStepNavigation() {
  const { control, setValue } = useAiFlawFormContext();
  const currentStep = useWatch({ control, name: "step" });

  const { isNextDisabled } = useFormStep(currentStep);

  const currentStepIndex = STEP_ORDER.indexOf(currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === STEP_ORDER.length - 1;
  const canGoNext = !isNextDisabled;

  const goToNextStep = useCallback(() => {
    if (isLastStep || !canGoNext) return;

    const nextStep = STEP_ORDER[currentStepIndex + 1];
    if (nextStep) {
      setValue("step", nextStep);
    }
  }, [currentStepIndex, isLastStep, canGoNext, setValue]);

  const goToPreviousStep = useCallback(() => {
    if (isFirstStep) return;

    const prevStep = STEP_ORDER[currentStepIndex - 1];

    if (prevStep) setValue("step", prevStep);
  }, [currentStepIndex, isFirstStep, setValue]);

  return {
    currentStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    canGoNext,
    goToNextStep,
    goToPreviousStep,
    stepOrder: STEP_ORDER,
    totalSteps: STEP_ORDER.length,
  };
}
