"use client";

import { useEffect, useMemo, useRef } from "react";
import { useWatch } from "react-hook-form";

import {
  FORM_VALUES,
  useAiFlawFormContext,
  createAiModelSelectField,
  createAiModelInputField,
} from "~/entities/ai-flaw-report";
import { getPlatformsModels } from "~/entities/ai-flaw-report/lib/get-platforms-models";
import { useHuggingFaceModels } from "~/features/ai-flaw-report/multi-step-form/models-context";

import { FormFieldRenderer } from "./form-field-renderer";

export function AiModelField() {
  const { control, setValue, getValues } = useAiFlawFormContext();
  const huggingFaceModels = useHuggingFaceModels();

  const selectedPlatforms = useWatch({
    control,
    name: "reporterDetails.system.platforms",
  });

  const notSure = useWatch({
    control,
    name: "reporterDetails.system.notSure",
  }) as boolean | undefined;

  const modelOptions = getPlatformsModels(selectedPlatforms, huggingFaceModels);
  const isRequired = !notSure;

  const allowedModelIds = useMemo<string[]>(() => {
    // normalize to an array of string ids
    return (modelOptions ?? []).map((opt: string | { value: string }) =>
      typeof opt === "string" ? opt : opt.value,
    );
  }, [modelOptions]);

  const fieldConfig = useMemo(() => {
    if (selectedPlatforms?.includes(FORM_VALUES.OTHER)) {
      return createAiModelInputField(isRequired);
    }
    return createAiModelSelectField(modelOptions, isRequired);
  }, [selectedPlatforms, modelOptions, isRequired]);

  // Skip first effect run after mount
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    if (!selectedPlatforms?.length) return;

    // Get current selected models from the form
    const current = getValues("reporterDetails.system.models") ?? [];

    if (!Array.isArray(current) || current.length === 0) return;

    // Filter to models still allowed by the newly selected platforms
    const allowed = new Set(allowedModelIds);
    const next = current.filter((id) => allowed.has(id));

    // Only update if something changed (prevents unnecessary rerenders)
    if (next.length !== current.length) {
      setValue("reporterDetails.system.models", next, {
        shouldValidate: true,
      });
    }
  }, [selectedPlatforms, allowedModelIds, getValues, setValue]);

  return (
    <FormFieldRenderer
      name={fieldConfig.name}
      control={control}
      config={fieldConfig}
    />
  );
}
