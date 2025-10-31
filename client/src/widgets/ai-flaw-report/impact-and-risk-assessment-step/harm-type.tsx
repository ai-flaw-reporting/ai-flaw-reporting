import {
  HARM_TYPE_FIELD,
  useAiFlawFormContext,
  HARM_OPTION_VALUE,
} from "~/entities/ai-flaw-report";

import { FormControl, FormField, FormItem } from "~/components/ui/form";
import { Item, ItemContent, ItemTitle } from "~/components/ui/item";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

export function HarmType() {
  const { control } = useAiFlawFormContext();

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
      </ItemContent>
    </Item>
  );
}
