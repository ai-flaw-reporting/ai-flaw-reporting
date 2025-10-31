import { useWatch } from "react-hook-form";
import { useMemo } from "react";

import {
  createVersionFieldConfig,
  FORM_VALUES,
  useAiFlawFormContext,
} from "~/entities/ai-flaw-report";

import { FormFieldRenderer } from "./form-field-renderer";

export function VersionEndpointDetails() {
  const { control } = useAiFlawFormContext();

  const selectedAccessMethod = useWatch({
    control,
    name: "reporterDetails.system.accessMethod",
  });

  const notSure = useWatch({
    control,
    name: "reporterDetails.system.notSure",
  });

  const isVersionRequired =
    !notSure &&
    !!selectedAccessMethod &&
    selectedAccessMethod !== FORM_VALUES.OTHER;

  const versionFieldConfig = useMemo(
    () => createVersionFieldConfig(isVersionRequired),
    [isVersionRequired],
  );

  return (
    <FormFieldRenderer
      name={versionFieldConfig.name}
      control={control}
      config={versionFieldConfig}
      inputClassName="dark:bg-white dark:text-gray-800"
    />
  );
}
