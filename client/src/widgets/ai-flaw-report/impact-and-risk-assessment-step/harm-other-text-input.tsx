import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
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
          <FormLabel className="form-label">
            Please specify other type of harm{" "}
            <span className="text-error-600">*</span>
          </FormLabel>
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
