"use client";

import { useWatch } from "react-hook-form";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  FORM_AUTOSAVE_DELAY,
  getFormSaveStatus,
  SAVE_STATUS,
  saveFormSaveStatus,
  STEP_CONFIGS_WITH_SCHEMAS,
  useAiFlawFormContext,
  createEvidenceSchema,
  type AiFlawReportSchema,
  type FormStep,
  type SaveStatus,
} from "~/entities/ai-flaw-report";

export function useFormStep(stepKey: FormStep) {
  const { formState, getFieldState, getValues } = useAiFlawFormContext();

  const saveTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>(SAVE_STATUS.SAVED);

  const stepConfig = STEP_CONFIGS_WITH_SCHEMAS[stepKey];
  const formField = stepConfig.formField as keyof AiFlawReportSchema;

  const formData = useWatch<AiFlawReportSchema>({
    name: formField,
  }) as AiFlawReportSchema[typeof formField] | undefined;

  const fieldState = getFieldState(formField, formState);

  const isStepValid = (() => {
    // Special handling for evidence step with CSAM context
    if (stepKey === "EVIDENCE_AND_REPRODUCTION") {
      const csamInvolved = getValues("classifyReport.csam_involved");
      // If CSAM is involved, always consider the step valid (evidence collection is skipped)
      if (csamInvolved) {
        return true;
      }

      // If CSAM is not involved, validate normally
      if (!formData) return false;
      const dynamicSchema = createEvidenceSchema(csamInvolved);
      const validationResult = dynamicSchema.safeParse(formData);
      return validationResult.success;
    }

    // For other steps, validate normally
    if (!formData) return false;

    if (stepConfig.schema) {
      const validationResult = stepConfig.schema.safeParse(formData);
      return validationResult.success;
    }

    return !fieldState.invalid && formData !== undefined;
  })();

  const isNextDisabled = !isStepValid;

  useEffect(() => {
    console.log(`[useFormStep] Effect triggered for step: ${stepKey}`);
    console.log(`[useFormStep] Current formData:`, formData);

    if (!formData) {
      console.log(
        `[useFormStep] No formData, skipping save for step: ${stepKey}`,
      );
      return;
    }

    setSaveStatus(SAVE_STATUS.SAVING);

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    console.log("Saving data for step:", stepKey, formData);

    saveTimeoutRef.current = setTimeout(() => {
      try {
        const dataToSave = {
          step: stepKey,
          [formField]: formData,
        };
        console.log("Data to save:", dataToSave);

        saveFormSaveStatus(dataToSave, stepConfig.id);

        setSaveStatus(SAVE_STATUS.SAVED);
      } catch {
        setSaveStatus(SAVE_STATUS.SAVED);
      }
    }, FORM_AUTOSAVE_DELAY);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [formData, stepKey, formField, stepConfig.id]);

  const loadSavedData = useCallback(() => {
    return getFormSaveStatus(stepConfig.id);
  }, [stepConfig.id]);

  return {
    formData,
    stepConfig,
    isStepValid,
    isNextDisabled,
    loadSavedData,
    saveStatus,
  };
}
