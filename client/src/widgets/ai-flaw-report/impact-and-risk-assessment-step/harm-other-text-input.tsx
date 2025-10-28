import { FormControl, FormField, FormItem } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report";

export function HarmOtherTextInput() {
  const { control } = useAiFlawFormContext();

  return (
    <FormField
      control={control}
      name="impactAssessment.harmOtherText"
      render={({ field }) => (
        <FormItem className="form-item-field">
          <FormControl>
            <Input
              placeholder="Please specify other type of harm..."
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
