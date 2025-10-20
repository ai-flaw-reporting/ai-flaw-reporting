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
  type AiFlawReportSchema,
  type FormStep,
  type SaveStatus,
} from "~/entities/ai-flaw-report";

export function useFormStep(stepKey: FormStep) {
  const { formState, getFieldState } = useAiFlawFormContext();

  const saveTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>(SAVE_STATUS.SAVED);

  const stepConfig = STEP_CONFIGS_WITH_SCHEMAS[stepKey];
  const formField = stepConfig.formField as keyof AiFlawReportSchema;

  const formData = useWatch<AiFlawReportSchema>({
    name: formField,
  }) as AiFlawReportSchema[typeof formField] | undefined;

  const fieldState = getFieldState(formField, formState);

  const isStepValid = (() => {
    if (!formData) return false;

    if (stepConfig.schema) {
      const validationResult = stepConfig.schema.safeParse(formData);
      return validationResult.success;
    }

    return !fieldState.invalid && formData !== undefined;
  })();

  const isNextDisabled = !isStepValid;

  useEffect(() => {
    if (!formData) return;

    setSaveStatus(SAVE_STATUS.SAVING);

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      try {
        const dataToSave = {
          step: stepKey,
          [formField]: formData,
        };

        saveFormSaveStatus(dataToSave, stepConfig.id);

        setSaveStatus(SAVE_STATUS.SAVED);
      } catch (error) {
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
