import Image from "next/image";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import { Item, ItemContent, ItemTitle } from "~/components/ui/item";

import { TitleTooltip } from "./title-tooltip";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import {
  ACTUAL_BEHAVIOR_FIELD,
  EXPECTED_BEHAVIOR_FIELD,
} from "~/entities/ai-flaw-report/model/form-data/incident-description-fields-config";

export function BehaviorFields() {
  const { control } = useAiFlawFormContext();

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <Item variant="outline" className="form-item-card-compact flex-1">
        <ItemContent className="space-y-4">
          <ItemTitle className="form-title flex items-center gap-4">
            <Image
              src={EXPECTED_BEHAVIOR_FIELD.icon}
              alt=""
              aria-hidden="true"
              width={20}
              height={23.8}
            />
            {EXPECTED_BEHAVIOR_FIELD.title}
            <TitleTooltip
              text="Describe the correct or intended outcome you expected from the AI system."
              ariaLabel="Expected Behavior help"
            />
          </ItemTitle>

          <FormField
            control={control}
            name={EXPECTED_BEHAVIOR_FIELD.name}
            render={({ field }) => (
              <FormItem className="form-item-field">
                <FormLabel className="form-label dark:text-gray-400">
                  {EXPECTED_BEHAVIOR_FIELD.label}
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ""}
                    rows={EXPECTED_BEHAVIOR_FIELD.rows}
                    maxLength={EXPECTED_BEHAVIOR_FIELD.maxLength}
                    placeholder={EXPECTED_BEHAVIOR_FIELD.placeholder}
                    className="min-h-45 !text-base font-normal placeholder:!text-base placeholder:!leading-6 placeholder:text-gray-400 dark:border-gray-500 dark:bg-gray-800"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </ItemContent>
      </Item>

      <Item variant="outline" className="form-item-card-compact flex-1">
        <ItemContent className="space-y-4">
          <ItemTitle className="form-title flex items-center gap-4">
            {ACTUAL_BEHAVIOR_FIELD.icon && (
              <Image
                src={ACTUAL_BEHAVIOR_FIELD.icon}
                alt=""
                aria-hidden="true"
                width={24}
                height={24}
              />
            )}
            {ACTUAL_BEHAVIOR_FIELD.title}
            <TitleTooltip
              text="Describe what the AI system actually did, including any incorrect or unexpected output."
              ariaLabel="Actual Behavior help"
            />
          </ItemTitle>

          <FormField
            control={control}
            name={ACTUAL_BEHAVIOR_FIELD.name}
            render={({ field }) => (
              <FormItem className="form-item-field">
                <FormLabel className="form-label dark:text-gray-400">
                  {ACTUAL_BEHAVIOR_FIELD.label}
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ""}
                    rows={ACTUAL_BEHAVIOR_FIELD.rows}
                    maxLength={ACTUAL_BEHAVIOR_FIELD.maxLength}
                    placeholder={ACTUAL_BEHAVIOR_FIELD.placeholder}
                    className="min-h-45 !text-base font-normal placeholder:!text-base placeholder:!leading-6 placeholder:text-gray-400 dark:border-gray-500 dark:bg-gray-800"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </ItemContent>
      </Item>
    </div>
  );
}
