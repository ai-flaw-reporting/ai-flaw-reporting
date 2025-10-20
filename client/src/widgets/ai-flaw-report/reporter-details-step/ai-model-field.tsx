import { useMemo } from "react";
import { useWatch } from "react-hook-form";

import {
  FORM_VALUES,
  useAiFlawFormContext,
  usePlatformModels,
  createAiModelSelectField,
  createAiModelInputField,
} from "~/entities/ai-flaw-report";

import { FormFieldRenderer } from "./form-field-renderer";

export function AiModelField() {
  const { control } = useAiFlawFormContext();
  const { getModelsForPlatform } = usePlatformModels();

  const selectedPlatform = useWatch({
    control,
    name: "reporterDetails.system.platform",
  }) as string | undefined;

  const notSure = useWatch({
    control,
    name: "reporterDetails.system.notSure",
  }) as boolean | undefined;

  const modelOptions = getModelsForPlatform(selectedPlatform);
  const isRequired = !notSure;

  const fieldConfig = useMemo(() => {
    if (selectedPlatform === FORM_VALUES.OTHER) {
      return createAiModelInputField(isRequired);
    }
    return createAiModelSelectField(modelOptions, isRequired);
  }, [selectedPlatform, modelOptions, isRequired]);

  return (
    <FormFieldRenderer
      name={fieldConfig.name}
      control={control}
      config={fieldConfig}
    />
  );
}
