import { FormControl, FormField, FormItem } from "~/components/ui/form";
import { Item, ItemContent, ItemFooter, ItemTitle } from "~/components/ui/item";
import { CheckboxCard } from "~/components/ui/checkbox";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report";
import {
  safeIncludes,
  createArrayCheckboxHandler,
} from "~/lib/form-field-utils";
import Image from "next/image";
import { SUBMIT_STAKEHOLDERS_CONFIG } from "~/entities/ai-flaw-report/model/form-data/review-and-submit-fields-config";
import { SubmitButton } from "./submit-button";

export function SubmitStakeholders() {
  const { control } = useAiFlawFormContext();

  return (
    <Item variant="outline" className="form-item-card">
      <ItemContent className="gap-4">
        <ItemTitle className="form-title flex items-baseline gap-4">
          <Image
            src={SUBMIT_STAKEHOLDERS_CONFIG.icon}
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
          {SUBMIT_STAKEHOLDERS_CONFIG.title}
        </ItemTitle>
        <p className="text-sm font-normal text-gray-600 dark:text-gray-100">
          {SUBMIT_STAKEHOLDERS_CONFIG.description}
        </p>
        <FormField
          control={control}
          name="reviewReport.selectedStakeholders"
          render={({ field }) => {
            const handleCheckboxChange = createArrayCheckboxHandler(
              field.value,
              field.onChange,
            );

            return (
              <FormItem className="form-item-field">
                <FormControl>
                  <ul className="space-y-1.5">
                    {SUBMIT_STAKEHOLDERS_CONFIG.stakeholders.map(
                      (stakeholder) => (
                        <li key={stakeholder.name}>
                          <CheckboxCard
                            className="data-[state=checked]:border-indigo-600"
                            iconClassName="text-indigo-600"
                            checked={safeIncludes(
                              field.value,
                              stakeholder.name,
                            )}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange(
                                checked as boolean,
                                stakeholder.name,
                              )
                            }
                          >
                            <div className="space-y-4">
                              <h3 className="text-md font-semibold text-gray-900">
                                {stakeholder.name}
                              </h3>
                              <p className="text-sm font-normal text-nowrap text-gray-600">
                                {stakeholder.description}
                              </p>
                            </div>
                          </CheckboxCard>
                        </li>
                      ),
                    )}
                  </ul>
                </FormControl>
              </FormItem>
            );
          }}
        />
      </ItemContent>
      <ItemFooter className="flex flex-col gap-4">
        <SubmitButton />
      </ItemFooter>
    </Item>
  );
}
