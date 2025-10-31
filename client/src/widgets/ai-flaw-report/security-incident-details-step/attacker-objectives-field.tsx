import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import { ATTACKER_OBJECTIVES_OTHER_FIELD } from "~/entities/ai-flaw-report/model/form-data/security-details-fields-config";
import { FORM_VALUES } from "~/entities/ai-flaw-report/model/constants";

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

  if (attackerObjectives !== FORM_VALUES.OTHER_LOWERCASE) return null;

  return (
    <FormField
      control={control}
      name="securityDetails.attackerObjectivesOther"
      render={({ field }) => (
        <FormItem className="form-item-field">
          <FormLabel className="form-label">
            {ATTACKER_OBJECTIVES_OTHER_FIELD.label}{" "}
            <span className="text-error-600">*</span>
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
