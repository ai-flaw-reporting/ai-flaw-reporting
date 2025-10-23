import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import { useEffect } from "react";

import {
  useAiFlawFormContext,
  MITIGATION_NOTES_FIELD,
} from "~/entities/ai-flaw-report";

export function MitigationNotes() {
  const { control, setValue } = useAiFlawFormContext();

  useEffect(() => {
    return () => {
      setValue("impactAssessment.mitigationNotes", "");
    };
  }, [setValue]);

  return (
    <FormField
      control={control}
      name="impactAssessment.mitigationNotes"
      render={({ field }) => (
        <FormItem className="form-item-field">
          <FormLabel className="form-label">
            {MITIGATION_NOTES_FIELD.label}
          </FormLabel>
          <FormControl>
            <Textarea
              {...field}
              placeholder={MITIGATION_NOTES_FIELD.placeholder}
              className="min-h-32 resize-none pr-10"
              maxLength={MITIGATION_NOTES_FIELD.maxLength}
            />
          </FormControl>
          <FormDescription className="form-description">
            {MITIGATION_NOTES_FIELD.description}
          </FormDescription>
        </FormItem>
      )}
    />
  );
}
