import { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { X } from "lucide-react";

import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import { FORM_VALUES } from "~/entities/ai-flaw-report/model/constants";
import { ACCESS_METHOD_SELECT_FIELD } from "~/entities/ai-flaw-report/model/form-data/access-method-fields-config";
import { ACCESS_METHOD_INPUT_FIELD } from "~/entities/ai-flaw-report/model/form-data/access-method-fields-config";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

import { FieldTooltip } from "~/components/field-tooltip";
import { FormFieldRenderer } from "~/components/form-field-renderer";

export function AccessMethodField() {
  const { control, setValue } = useAiFlawFormContext();

  const selectedAccessMethod = useWatch({
    control,
    name: "reporterDetails.system.accessMethod",
  });

  useEffect(() => {
    if (selectedAccessMethod !== FORM_VALUES.OTHER) {
      setValue("reporterDetails.system.accessMethodOther", "");
    }
  }, [selectedAccessMethod, setValue]);

  const showOtherInput = selectedAccessMethod === FORM_VALUES.OTHER;

  return (
    <>
      <FormFieldRenderer
        name={ACCESS_METHOD_SELECT_FIELD.name}
        control={control}
        config={ACCESS_METHOD_SELECT_FIELD}
      />
      {showOtherInput && (
        <FormField
          control={control}
          name={ACCESS_METHOD_INPUT_FIELD.name}
          render={({ field }) => (
            <FormItem className="form-item-select">
              <FormLabel className="form-label">
                {ACCESS_METHOD_INPUT_FIELD.label}
                <span className="ml-1 text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    placeholder={ACCESS_METHOD_INPUT_FIELD.placeholder}
                    className="dark:bg-white dark:text-gray-800"
                    required
                  />
                  <FieldTooltip
                    ariaLabel={`${ACCESS_METHOD_INPUT_FIELD.label} help`}
                    text=""
                    className={ACCESS_METHOD_INPUT_FIELD.tooltipClassName}
                  />
                  <button
                    type="button"
                    aria-label="Clear other access method"
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-500"
                    onClick={() => {
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
      )}
    </>
  );
}
