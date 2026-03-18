"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useWatch } from "react-hook-form";

import { STEP_CONFIGS_WITH_SCHEMAS } from "../constants";
import { STEP_ORDER, STEP_CONFIGS } from "../step-config";
import {
  createEvidenceSchema,
  createSecurityIncidentDetailsSchema,
} from "../schema";
import type { AiFlawReportSchema, FormStep } from "../types";
import { useAiFlawFormContext } from "./useAiFlawFormContext";
import { getFormSaveStatus } from "../../lib/utils";

const VALIDATABLE_STEPS = STEP_ORDER.filter(
  (s): s is Exclude<FormStep, "SUBMISSION_SUCCESS"> =>
    s !== "SUBMISSION_SUCCESS",
);

function getStepDataSources(
  formValues: AiFlawReportSchema,
  formField: keyof AiFlawReportSchema,
  stepId: string,
  mounted: boolean,
): unknown[] {
  const sources: unknown[] = [];

  const formData = formValues?.[formField];
  if (formData != null) sources.push(formData);

  if (mounted) {
    const saved = getFormSaveStatus(stepId) as Record<string, unknown> | null;
    const savedData = saved?.[formField];
    if (savedData != null) sources.push(savedData);
  }

  return sources;
}

function getClassifyData(
  formValues: AiFlawReportSchema,
  mounted: boolean,
): AiFlawReportSchema["classifyReport"] | null {
  const formData = formValues?.classifyReport;
  if (formData?.real_world_harm !== undefined) return formData;

  if (!mounted) return null;

  const saved = getFormSaveStatus(STEP_CONFIGS.CLASSIFY_REPORT.id) as Record<
    string,
    unknown
  > | null;
  return (
    (saved?.classifyReport as AiFlawReportSchema["classifyReport"]) ?? null
  );
}

export function useStepsValidation() {
  const { control } = useAiFlawFormContext();
  const formValues = useWatch({ control }) as AiFlawReportSchema;

  const [mounted, setMounted] = useState(false);
  const reviewVisitedRef = useRef(false);
  const currentStep = formValues?.step;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (currentStep === "REVIEW_AND_SUBMIT_REPORT") {
      reviewVisitedRef.current = true;
    }
  }, [currentStep]);

  if (
    mounted &&
    !reviewVisitedRef.current &&
    getFormSaveStatus(STEP_CONFIGS.REVIEW_AND_SUBMIT_REPORT.id)
  ) {
    reviewVisitedRef.current = true;
  }

  const stepsValidity = useMemo(() => {
    const result = {} as Record<FormStep, boolean>;

    const classifyData = getClassifyData(formValues, mounted);

    for (const stepKey of VALIDATABLE_STEPS) {
      const stepConfig = STEP_CONFIGS_WITH_SCHEMAS[stepKey];
      const formField = stepConfig.formField as keyof AiFlawReportSchema;
      const dataSources = getStepDataSources(
        formValues,
        formField,
        stepConfig.id,
        mounted,
      );

      if (stepKey === "EVIDENCE_AND_REPRODUCTION") {
        const csamInvolved = classifyData?.csam_involved;
        if (csamInvolved) {
          result[stepKey] = dataSources.length > 0;
          continue;
        }
        if (dataSources.length === 0) {
          result[stepKey] = false;
          continue;
        }
        const dynamicSchema = createEvidenceSchema(!!csamInvolved);
        result[stepKey] = dataSources.some(
          (d) => dynamicSchema.safeParse(d).success,
        );
        continue;
      }

      if (dataSources.length === 0) {
        result[stepKey] = false;
        continue;
      }

      if (stepKey === "SECURITY_INCIDENT_DETAILS") {
        const realWorldHarm = classifyData?.real_world_harm ?? false;
        const maliciousUse = classifyData?.malicious_use ?? false;
        const dynamicSchema = createSecurityIncidentDetailsSchema(
          realWorldHarm,
          maliciousUse,
        );
        result[stepKey] = dataSources.some(
          (d) => dynamicSchema.safeParse(d).success,
        );
        continue;
      }

      const schema = stepConfig.schema;
      if (schema && typeof schema !== "function") {
        result[stepKey] = dataSources.some(
          (d) => schema.safeParse(d).success,
        );
      } else {
        result[stepKey] = true;
      }
    }

    const allOtherStepsValid = VALIDATABLE_STEPS.every(
      (s) => s === "REVIEW_AND_SUBMIT_REPORT" || result[s],
    );
    result.REVIEW_AND_SUBMIT_REPORT =
      result.REVIEW_AND_SUBMIT_REPORT &&
      allOtherStepsValid &&
      reviewVisitedRef.current;

    result.SUBMISSION_SUCCESS = true;
    return result;
  }, [formValues, mounted]);

  const incompleteSteps = useMemo(() => {
    return VALIDATABLE_STEPS.filter(
      (step) => step !== "REVIEW_AND_SUBMIT_REPORT" && !stepsValidity[step],
    );
  }, [stepsValidity]);

  const incompleteStepNames = useMemo(() => {
    return incompleteSteps.map((step) => STEP_CONFIGS[step].badgeTitle);
  }, [incompleteSteps]);

  return { stepsValidity, incompleteSteps, incompleteStepNames };
}
