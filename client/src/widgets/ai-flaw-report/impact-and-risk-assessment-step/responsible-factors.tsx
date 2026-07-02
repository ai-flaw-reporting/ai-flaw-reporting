import { Settings } from "lucide-react";
import { useWatch } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Item, ItemContent, ItemTitle } from "~/components/ui/item";
import { Textarea } from "~/components/ui/textarea";
import { FORM_VALUES } from "~/entities/ai-flaw-report/model/constants";
import { safeIncludes } from "~/lib/form-field-utils";

import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import {
  RESPONSIBLE_FACTORS_FIELD,
  RESPONSIBLE_FACTORS_OTHER_TEXT_FIELD,
} from "~/entities/ai-flaw-report/model/form-data/impact-assessment-fields-config";

function ToggleChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-sm font-semibold transition-colors ${
        selected
          ? "border-blue-400 bg-blue-500 text-white"
          : "border-gray-200 bg-white text-gray-800 hover:border-gray-300"
      }`}
    >
      {label}
    </button>
  );
}

function ResponsibleFactorsOtherText() {
  const { control } = useAiFlawFormContext();

  const otherText = useWatch({
    control,
    name: "impactAssessment.responsibleFactorsOtherText",
  });

  return (
    <FormField
      control={control}
      name="impactAssessment.responsibleFactorsOtherText"
      render={({ field }) => (
        <FormItem className="form-item-field">
          <FormLabel className="form-label">
            {RESPONSIBLE_FACTORS_OTHER_TEXT_FIELD.label}{" "}
            <span className="text-error-600">*</span>
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Textarea
                {...field}
                placeholder={RESPONSIBLE_FACTORS_OTHER_TEXT_FIELD.placeholder}
                className="min-h-[100px] resize-none pb-6"
                maxLength={RESPONSIBLE_FACTORS_OTHER_TEXT_FIELD.maxLength}
              />
              <span className="absolute bottom-2 left-3 text-sm text-gray-400">
                {(otherText ?? "").length}/
                {RESPONSIBLE_FACTORS_OTHER_TEXT_FIELD.maxLength}
              </span>
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export function ResponsibleFactors() {
  const { control } = useAiFlawFormContext();

  const responsibleFactors = useWatch({
    control,
    name: "impactAssessment.responsibleFactors",
  });

  const showOtherText = safeIncludes(
    responsibleFactors,
    FORM_VALUES.OTHER_LOWERCASE,
  );

  return (
    <Item variant="outline" className="form-item-card">
      <ItemContent className="space-y-4">
        <ItemTitle className="form-title flex items-baseline gap-4">
          <Settings className="size-5 text-gray-600" aria-hidden="true" />
          <span>{RESPONSIBLE_FACTORS_FIELD.title}</span>
        </ItemTitle>
        <FormField
          control={control}
          name="impactAssessment.responsibleFactors"
          render={({ field }) => {
            const values: string[] = Array.isArray(field.value)
              ? field.value
              : [];

            const handleToggle = (optionValue: string) => {
              const next = values.includes(optionValue)
                ? values.filter((v) => v !== optionValue)
                : [...values, optionValue];
              field.onChange(next);
            };

            return (
              <FormItem className="form-item-field">
                <FormLabel className="form-label mb-4">
                  {RESPONSIBLE_FACTORS_FIELD.label}
                </FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {RESPONSIBLE_FACTORS_FIELD.options.map((option) => (
                        <ToggleChip
                          key={option.value}
                          label={option.label}
                          selected={values.includes(option.value)}
                          onClick={() => handleToggle(option.value)}
                        />
                      ))}
                    </div>
                    {showOtherText && <ResponsibleFactorsOtherText />}
                  </div>
                </FormControl>
              </FormItem>
            );
          }}
        />
      </ItemContent>
    </Item>
  );
}
