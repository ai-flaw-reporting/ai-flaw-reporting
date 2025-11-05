import Image from "next/image";

import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import { AI_SYSTEM_PLATFORM_FIELD } from "~/entities/ai-flaw-report/model/form-data/ai-system-fields-config";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Checkbox } from "~/components/ui/checkbox";
import { Item, ItemContent, ItemTitle } from "~/components/ui/item";

import { AccessMethodField } from "./access-method-field";
import { FormFieldRenderer } from "~/components/form-field-renderer";
import { VersionEndpointDetails } from "./version-endpoint-details";
import { AiModelField } from "./ai-model-field";

export function AiSystemInfo() {
  const { control } = useAiFlawFormContext();

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

        <VersionEndpointDetails />

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
