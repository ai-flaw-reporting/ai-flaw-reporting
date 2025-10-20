import { useMemo } from "react";
import { useWatch } from "react-hook-form";
import Image from "next/image";

import {
  FORM_VALUES,
  useAiFlawFormContext,
  AI_SYSTEM_PLATFORM_FIELD,
  createVersionFieldConfig,
} from "~/entities/ai-flaw-report";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Checkbox } from "~/components/ui/checkbox";
import { Item, ItemContent, ItemTitle } from "~/components/ui/item";

import { AccessMethodField } from "./access-method-field";
import { AiModelField } from "./ai-model-field";
import { FormFieldRenderer } from "./form-field-renderer";

export function AiSystemInfo() {
  const { control } = useAiFlawFormContext();

  const selectedAccessMethod = useWatch({
    control,
    name: "reporterDetails.system.accessMethod",
  });

  const isVersionRequired =
    !!selectedAccessMethod && selectedAccessMethod !== FORM_VALUES.OTHER;

  const versionFieldConfig = useMemo(
    () => createVersionFieldConfig(isVersionRequired),
    [isVersionRequired],
  );

  return (
    <Item variant="outline" className="form-item-card">
      <ItemContent className="space-y-4">
        <ItemTitle className="form-title flex items-baseline gap-4">
          <Image
            src="/icons/form/robot.svg"
            alt=""
            aria-hidden="true"
            width={24}
            height={24}
          />
          AI System Information
        </ItemTitle>

        <FormFieldRenderer
          name={AI_SYSTEM_PLATFORM_FIELD.name}
          control={control}
          config={AI_SYSTEM_PLATFORM_FIELD}
        />

        <AiModelField />

        <AccessMethodField />

        <FormFieldRenderer
          name={versionFieldConfig.name}
          control={control}
          config={versionFieldConfig}
          inputClassName="dark:bg-white dark:text-gray-800"
        />

        <FormField
          control={control}
          name="reporterDetails.system.notSure"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 border-none bg-transparent p-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="dark:border-gray-300 dark:bg-white"
                />
              </FormControl>
              <FormLabel className="cursor-pointer text-sm font-normal text-gray-800 dark:text-gray-50">
                I'm not sure about the technical details
              </FormLabel>
            </FormItem>
          )}
        />
      </ItemContent>
    </Item>
  );
}
