"use client";

import { useCallback } from "react";
import { useWatch } from "react-hook-form";

import { useAiFlawFormContext } from "./useAiFlawFormContext";
import { STEP_ORDER } from "../step-config";
import type { FormStep } from "../types";

const NAVIGABLE_STEPS = STEP_ORDER.filter(
  (s): s is Exclude<FormStep, "SUBMISSION_SUCCESS"> =>
    s !== "SUBMISSION_SUCCESS",
);

export function useStepNavigation() {
  const { control, setValue } = useAiFlawFormContext();
  const currentStep = useWatch({ control, name: "step" });

  const isSuccessStep = currentStep === "SUBMISSION_SUCCESS";
  const currentStepIndex = isSuccessStep
    ? -1
    : NAVIGABLE_STEPS.indexOf(currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep =
    isSuccessStep || currentStepIndex === NAVIGABLE_STEPS.length - 1;

  const goToNextStep = useCallback(() => {
    if (isLastStep || isSuccessStep) return;

    const nextStep = NAVIGABLE_STEPS[currentStepIndex + 1];
    if (nextStep) {
      setValue("step", nextStep);
    }
  }, [currentStepIndex, isLastStep, isSuccessStep, setValue]);

  const goToPreviousStep = useCallback(() => {
    if (isFirstStep || isSuccessStep) return;

    const prevStep = NAVIGABLE_STEPS[currentStepIndex - 1];
    if (prevStep) setValue("step", prevStep);
  }, [currentStepIndex, isFirstStep, isSuccessStep, setValue]);

  return {
    currentStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    goToNextStep,
    goToPreviousStep,
    stepOrder: STEP_ORDER,
    totalSteps: STEP_ORDER.length,
  };
}
