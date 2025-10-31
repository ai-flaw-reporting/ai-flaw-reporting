import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Item, ItemContent, ItemTitle } from "~/components/ui/item";
import { CheckboxCard } from "~/components/ui/checkbox";
import { FORM_VALUES } from "~/entities/ai-flaw-report/model/constants";
import {
  safeIncludes,
  createArrayCheckboxHandler,
} from "~/lib/form-field-utils";

import {
  AFFECTED_STAKEHOLDERS_FIELD,
  useAiFlawFormContext,
} from "~/entities/ai-flaw-report";

import Image from "next/image";
import { AiCompanyInvolved } from "./ai-company-involved";
import { MitigationNotes } from "./mitigation-notes";

export function AffectedStakeholders() {
  const { control } = useAiFlawFormContext();

  return (
    <Item variant="outline" className="form-item-card">
      <ItemContent className="space-y-8">
        <ItemTitle className="form-title flex items-baseline gap-4">
          <Image
            src={AFFECTED_STAKEHOLDERS_FIELD.icon}
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
          <span>
            {AFFECTED_STAKEHOLDERS_FIELD.title}{" "}
            <span className="text-error-600"> *</span>
          </span>
        </ItemTitle>
        <FormField
          control={control}
          name="impactAssessment.affectedStakeholders"
          render={({ field }) => {
            const handleCheckboxChange = createArrayCheckboxHandler(
              field.value,
              field.onChange,
            );

            return (
              <FormItem className="form-item-field">
                <FormLabel className="form-label mb-6.5">
                  {AFFECTED_STAKEHOLDERS_FIELD.label}
                </FormLabel>
                <FormControl>
                  <div className="space-y-8">
                    <ul className="grid grid-cols-2 gap-1.5">
                      {AFFECTED_STAKEHOLDERS_FIELD.options.map((option) => (
                        <li key={option.value}>
                          <CheckboxCard
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
                              <p className="text-md font-bold text-nowrap text-gray-700">
                                {option.description}
                              </p>
                            </div>
                          </CheckboxCard>
                        </li>
                      ))}
                    </ul>
                    {safeIncludes(field.value, FORM_VALUES.OTHER_LOWERCASE) && (
                      <div className="space-y-8">
                        <AiCompanyInvolved />
                        <MitigationNotes />
                      </div>
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
