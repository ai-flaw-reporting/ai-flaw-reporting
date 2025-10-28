import { useWatch } from "react-hook-form";
import { X } from "lucide-react";

import {
  FORM_VALUES,
  useAiFlawFormContext,
  ACCESS_METHOD_SELECT_FIELD,
  ACCESS_METHOD_INPUT_FIELD,
} from "~/entities/ai-flaw-report";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

import { FieldTooltip } from "~/components/field-tooltip";
import { FormFieldRenderer } from "./form-field-renderer";

export function AccessMethodField() {
  const { control, setValue } = useAiFlawFormContext();

  const selectedAccessMethod = useWatch({
    control,
    name: "reporterDetails.system.accessMethod",
  });

  if (selectedAccessMethod === FORM_VALUES.OTHER) {
    return (
      <FormField
        control={control}
        name={ACCESS_METHOD_INPUT_FIELD.name}
        render={({ field }) => (
          <FormItem className="form-item-select">
            <FormLabel className="form-label">
              {ACCESS_METHOD_INPUT_FIELD.label}
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  {...field}
                  value={field.value ?? ""}
                  placeholder={ACCESS_METHOD_INPUT_FIELD.placeholder}
                  className="dark:bg-white dark:text-gray-800"
                />
                <FieldTooltip
                  ariaLabel={`${ACCESS_METHOD_INPUT_FIELD.label} help`}
                  text="Help text placeholder"
                  className={ACCESS_METHOD_INPUT_FIELD.tooltipClassName}
                />
                <button
                  type="button"
                  aria-label="Clear and go back to select"
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-500"
                  onClick={() => {
                    setValue("reporterDetails.system.accessMethod", "");
                    setValue("reporterDetails.system.accessMethodOther", "");
                  }}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    );
  }

  return (
    <FormFieldRenderer
      name={ACCESS_METHOD_SELECT_FIELD.name}
      control={control}
      config={ACCESS_METHOD_SELECT_FIELD}
    />
  );
}
