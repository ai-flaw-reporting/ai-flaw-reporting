import { useWatch } from "react-hook-form";

import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import {
  EMBARGO_DETAILS_FIELD,
  PUBLIC_DISCLOSURE_INTENT_VALUES,
} from "~/entities/ai-flaw-report/model/form-data/disclosure-plan-fields-config";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Item, ItemContent, ItemTitle } from "~/components/ui/item";
import { Textarea } from "~/components/ui/textarea";

export function EmbargoDetails() {
  const { control } = useAiFlawFormContext();

  const publicDisclosureIntent = useWatch({
    control,
    name: "disclosurePlan.publicDisclosureIntent",
  });

  if (publicDisclosureIntent !== PUBLIC_DISCLOSURE_INTENT_VALUES.YES) {
    return null;
  }

  return (
    <Item variant="outline" className="form-item-card">
      <ItemContent className="space-y-4">
        <ItemTitle className="form-title flex items-baseline gap-4">
          <EMBARGO_DETAILS_FIELD.icon className="text-warning-400" />
          {EMBARGO_DETAILS_FIELD.title}
          <span className="text-error-600">*</span>
        </ItemTitle>

        <FormField
          control={control}
          name="disclosurePlan.embargoDetails"
          render={({ field }) => (
            <FormItem className="form-item-field">
              <FormLabel className="form-label">
                {EMBARGO_DETAILS_FIELD.label}{" "}
                <span className="text-error-600">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={EMBARGO_DETAILS_FIELD.placeholder}
                  rows={EMBARGO_DETAILS_FIELD.rows}
                  maxLength={EMBARGO_DETAILS_FIELD.maxLength}
                  className="text-md min-h-[141px] w-full resize-none pr-10 dark:bg-white dark:text-gray-800"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-gray-600 dark:text-gray-100">
                {EMBARGO_DETAILS_FIELD.description}
              </FormDescription>
            </FormItem>
          )}
        />
      </ItemContent>
    </Item>
  );
}
