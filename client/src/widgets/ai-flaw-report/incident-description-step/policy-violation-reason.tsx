import { useWatch } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import { POLICY_VIOLATION_FIELDS } from "~/entities/ai-flaw-report/model/form-data/incident-description-fields-config";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import { getSafeArray } from "~/lib/form-field-utils";

export function PolicyViolationReason() {
  const { control } = useAiFlawFormContext();

  const policyUrl = useWatch({
    control,
    name: POLICY_VIOLATION_FIELDS.url.name,
  });

  const urls = getSafeArray<string>(policyUrl);
  const shouldShowReason = urls.some((url) => url?.trim());

  if (!shouldShowReason) return null;

  return (
    <FormField
      control={control}
      name={POLICY_VIOLATION_FIELDS.reason.name}
      render={({ field }) => (
        <FormItem className="form-item-field">
          <FormLabel className="form-label dark:text-gray-200">
            {POLICY_VIOLATION_FIELDS.reason.label}
          </FormLabel>
          <FormControl>
            <Textarea
              {...field}
              value={field.value ?? ""}
              rows={POLICY_VIOLATION_FIELDS.reason.rows}
              maxLength={POLICY_VIOLATION_FIELDS.reason.maxLength}
              placeholder={POLICY_VIOLATION_FIELDS.reason.placeholder}
              className="min-h-32 !text-base font-normal placeholder:!text-base placeholder:!leading-6 dark:border-gray-500 dark:bg-gray-800 dark:placeholder:text-gray-500"
            />
          </FormControl>

          {POLICY_VIOLATION_FIELDS.reason.description && (
            <FormDescription className="form-description">
              {POLICY_VIOLATION_FIELDS.reason.description}
            </FormDescription>
          )}
        </FormItem>
      )}
    />
  );
}
