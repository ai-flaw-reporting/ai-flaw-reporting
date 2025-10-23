import {
  ATTACKER_OBJECTIVES_OTHER_FIELD,
  useAiFlawFormContext,
} from "~/entities/ai-flaw-report";

import { FormControl, FormItem, FormLabel } from "~/components/ui/form";
import { FormField } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useWatch } from "react-hook-form";

export function AttackerObjectivesField() {
  const { control } = useAiFlawFormContext();

  const attackerObjectives = useWatch({
    control,
    name: "securityDetails.attackerObjectives",
  });

  if (attackerObjectives !== "other") return null;

  return (
    <FormField
      control={control}
      name="securityDetails.attackerObjectivesOther"
      render={({ field }) => (
        <FormItem className="form-item-field">
          <FormLabel className="form-label">
            {ATTACKER_OBJECTIVES_OTHER_FIELD.label}
          </FormLabel>
          <FormControl>
            <Input
              placeholder={ATTACKER_OBJECTIVES_OTHER_FIELD.placeholder}
              className="text-md w-full dark:bg-white dark:text-gray-800"
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
