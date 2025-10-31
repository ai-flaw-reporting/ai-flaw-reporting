import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";

import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import { MITIGATION_NOTES_FIELD } from "~/entities/ai-flaw-report/model/form-data/impact-assessment-fields-config";

export function MitigationNotes() {
  const { control } = useAiFlawFormContext();

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
