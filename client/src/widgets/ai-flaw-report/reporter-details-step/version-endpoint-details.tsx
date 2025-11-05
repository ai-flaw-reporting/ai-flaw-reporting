import { useWatch } from "react-hook-form";
import { useMemo } from "react";

import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import { FORM_VALUES } from "~/entities/ai-flaw-report/model/constants";
import { createVersionFieldConfig } from "~/entities/ai-flaw-report/model/form-data/ai-system-fields-config";

import { FormFieldRenderer } from "~/components/form-field-renderer";

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
