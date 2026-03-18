"use client";

import { useWatch } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

import {
  FORM_AUTOSAVE_DELAY,
  SAVE_STATUS,
  STEP_CONFIGS_WITH_SCHEMAS,
} from "../constants";
import {
  createEvidenceSchema,
  createSecurityIncidentDetailsSchema,
} from "../schema";
import type { AiFlawReportSchema, FormStep, SaveStatus } from "../types";
import { useAiFlawFormContext } from "./useAiFlawFormContext";
import { saveFormSaveStatus } from "../../lib/utils";
import { useAiFlawFormState } from "./useAiFlawFormState";

export function useFormStep(stepKey: FormStep) {
  const { getFieldState, getValues } = useAiFlawFormContext();
  const formState = useAiFlawFormState();

  const saveTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>(SAVE_STATUS.SAVED);

  const stepConfig = STEP_CONFIGS_WITH_SCHEMAS[stepKey];
  const formField = stepConfig.formField as keyof AiFlawReportSchema;

  const formData = useWatch<AiFlawReportSchema>({
    name: formField,
  });

  const csamInvolved = useWatch<AiFlawReportSchema>({
    name: "classifyReport.csam_involved" as keyof AiFlawReportSchema,
  }) as boolean | undefined;

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

    // Special handling for security incident details step
    if (stepKey === "SECURITY_INCIDENT_DETAILS") {
      const realWorldHarm = getValues("classifyReport.real_world_harm");
      const maliciousUse = getValues("classifyReport.malicious_use");

      if (!formData) return false;
      const dynamicSchema = createSecurityIncidentDetailsSchema(
        realWorldHarm,
        maliciousUse,
      );
      const validationResult = dynamicSchema.safeParse(formData);
      return validationResult.success;
    }

    // For other steps, validate normally
    if (!formData) return false;

    if (stepConfig.schema) {
      // Check if schema is a function (dynamic schema)
      if (typeof stepConfig.schema === "function") {
        // For dynamic schemas, we need to handle them in special cases above
        return true;
      }
      const validationResult = stepConfig.schema.safeParse(formData);
      return validationResult.success;
    }

    return !fieldState.invalid && formData !== undefined;
  })();

  const isNextDisabled = !isStepValid;

  useEffect(() => {
    if (stepKey === "EVIDENCE_AND_REPRODUCTION" && csamInvolved) {
      saveFormSaveStatus(
        { [formField]: { csam_skipped: true } },
        stepConfig.id,
      );
    }
  }, [stepKey, csamInvolved, formField, stepConfig.id]);

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

  return {
    formData,
    stepConfig,
    isStepValid,
    isNextDisabled,
    saveStatus,
  };
}
