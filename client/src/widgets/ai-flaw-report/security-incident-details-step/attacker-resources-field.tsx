import {
  ATTACKER_RESOURCES_OTHER_FIELD,
  FORM_VALUES,
  useAiFlawFormContext,
} from "~/entities/ai-flaw-report";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormField,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useWatch } from "react-hook-form";

export function AttackerResourcesField() {
  const { control } = useAiFlawFormContext();

  const attackerResources = useWatch({
    control,
    name: "securityDetails.attackerResources",
  });

  if (attackerResources !== FORM_VALUES.OTHER_LOWERCASE) return null;

  return (
    <FormField
      control={control}
      name="securityDetails.attackerResourcesOther"
      render={({ field }) => (
        <FormItem className="form-item-field">
          <FormLabel className="form-label">
            {ATTACKER_RESOURCES_OTHER_FIELD.label}
          </FormLabel>
          <FormControl>
            <Input
              placeholder={ATTACKER_RESOURCES_OTHER_FIELD.placeholder}
              className="text-md w-full dark:bg-white dark:text-gray-800"
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
