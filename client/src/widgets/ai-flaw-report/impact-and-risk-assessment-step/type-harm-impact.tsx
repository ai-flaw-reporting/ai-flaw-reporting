import { FormControl, FormField, FormItem } from "~/components/ui/form";
import { Item, ItemContent, ItemTitle } from "~/components/ui/item";
import { CheckboxCard } from "~/components/ui/checkbox";
import { FORM_VALUES } from "~/entities/ai-flaw-report/model/constants";
import {
  safeIncludes,
  createArrayCheckboxHandler,
} from "~/lib/form-field-utils";
import {
  HARM_TYPES_FIELD,
  useAiFlawFormContext,
} from "~/entities/ai-flaw-report";
import { HarmOtherTextInput } from "./harm-other-text-input";

import Image from "next/image";

export function TypeOfHarmImpact() {
  const { control } = useAiFlawFormContext();

  return (
    <Item variant="outline" className="form-item-card">
      <ItemContent className="space-y-8">
        <ItemTitle className="form-title flex items-baseline gap-4">
          <Image
            src={HARM_TYPES_FIELD.icon}
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
          {HARM_TYPES_FIELD.title} <span className="text-error-600"> *</span>
        </ItemTitle>
        <FormField
          control={control}
          name="impactAssessment.harmTypes"
          render={({ field }) => {
            const handleCheckboxChange = createArrayCheckboxHandler(
              field.value,
              field.onChange,
            );

            return (
              <FormItem className="form-item-field">
                <FormControl>
                  <div className="space-y-8">
                    <ul className="grid grid-cols-2 gap-1.5">
                      {HARM_TYPES_FIELD.options.map((option) => (
                        <li key={option.value} className="h-full">
                          <CheckboxCard
                            className="h-full min-h-[120px]"
                            checked={safeIncludes(field.value, option.value)}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange(
                                checked as boolean,
                                option.value,
                              )
                            }
                          >
                            <div className="space-y-2">
                              <h3 className="text-md font-semibold text-gray-900">
                                {option.label}
                              </h3>
                              <p className="text-md font-bold text-gray-700">
                                {option.description}
                              </p>
                            </div>
                          </CheckboxCard>
                        </li>
                      ))}
                    </ul>

                    {safeIncludes(field.value, FORM_VALUES.OTHER_LOWERCASE) && (
                      <HarmOtherTextInput />
                    )}
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
