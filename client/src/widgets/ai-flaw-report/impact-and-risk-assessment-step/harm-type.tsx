import { useEffect, useRef, useMemo } from "react";
import { useWatch } from "react-hook-form";

import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import {
  HARM_TYPE_FIELD,
  HARM_OPTION_VALUE,
  DOCUMENTED_HARM_CWE_FIELD,
} from "~/entities/ai-flaw-report/model/form-data/impact-assessment-fields-config";

import { truncateText } from "~/lib/utils";
import { FormControl, FormField, FormItem } from "~/components/ui/form";
import { Item, ItemContent, ItemTitle } from "~/components/ui/item";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { FieldTooltip } from "~/components/field-tooltip";

export function HarmType() {
  const { control, setValue } = useAiFlawFormContext();

  const harmType = useWatch({
    control,
    name: "impactAssessment.harmType",
  });

  const documentedHarmCwe = useWatch({
    control,
    name: "impactAssessment.documentedHarmCwe",
  });

  const previousHarmTypeRef = useRef<string | undefined>(undefined);

  const isDocumentedHarm = harmType === HARM_OPTION_VALUE.DOCUMENTED;

  const truncatedSelectedText = useMemo(() => {
    const selectedOption = DOCUMENTED_HARM_CWE_FIELD.options.find(
      (option) => option.value === documentedHarmCwe,
    );
    return selectedOption
      ? truncateText(
          `${selectedOption.label} ${selectedOption.description}`,
          30,
        )
      : null;
  }, [documentedHarmCwe]);

  useEffect(() => {
    if (
      previousHarmTypeRef.current &&
      previousHarmTypeRef.current !== harmType
    ) {
      setValue("impactAssessment.documentedHarmCwe", "");
    }
    previousHarmTypeRef.current = harmType;
  }, [harmType, setValue]);

  return (
    <Item variant="outline" className="form-item-card">
      <ItemContent className="space-y-8">
        <ItemTitle className="form-title flex items-baseline">
          <span>
            {HARM_TYPE_FIELD.title} <span className="text-error-600">*</span>
          </span>
        </ItemTitle>
        <FormField
          control={control}
          name="impactAssessment.harmType"
          render={({ field }) => (
            <FormItem className="form-item-field">
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-4"
                >
                  <RadioGroupItem
                    variant="dots"
                    value={HARM_TYPE_FIELD.options[0].value}
                    checked={field.value === HARM_OPTION_VALUE.DOCUMENTED}
                    className="flex flex-1 items-start gap-2"
                  >
                    <div className="flex flex-col text-start">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-100">
                        {HARM_TYPE_FIELD.options[0].label}
                      </span>
                      {HARM_TYPE_FIELD.options[0].description && (
                        <span className="textgray-600 text-sm font-normal dark:text-gray-100">
                          {HARM_TYPE_FIELD.options[0].description}
                        </span>
                      )}
                    </div>
                  </RadioGroupItem>
                  <RadioGroupItem
                    variant="dots"
                    value={HARM_TYPE_FIELD.options[1].value}
                    checked={field.value === HARM_OPTION_VALUE.NEW}
                    className="flex flex-1 items-start gap-2"
                  >
                    <div className="flex flex-col text-start">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-100">
                        {HARM_TYPE_FIELD.options[1].label}
                      </span>
                      {HARM_TYPE_FIELD.options[1].description && (
                        <span className="textgray-600 text-sm font-normal dark:text-gray-100">
                          {HARM_TYPE_FIELD.options[1].description}
                        </span>
                      )}
                    </div>
                  </RadioGroupItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        {isDocumentedHarm && (
          <FormField
            control={control}
            name="impactAssessment.documentedHarmCwe"
            render={({ field }) => (
              <FormItem className="form-item-field">
                <FormControl>
                  <div className="relative max-w-[353px]">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="text-md w-full dark:bg-white dark:text-gray-800">
                        <SelectValue
                          placeholder={DOCUMENTED_HARM_CWE_FIELD.placeholder}
                        >
                          {truncatedSelectedText}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {DOCUMENTED_HARM_CWE_FIELD.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label} {option.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldTooltip
                      text="Select the CWE that applies to this incident"
                      ariaLabel="Documented Harm CWE help"
                      className="right-13"
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        )}
      </ItemContent>
    </Item>
  );
}
