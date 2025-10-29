import Image from "next/image";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { ChipsRow } from "~/components/ui/chips-row";
import { Item, ItemContent, ItemTitle } from "~/components/ui/item";
import { FieldTooltip } from "~/components/field-tooltip";
import { getSafeArray } from "~/lib/form-field-utils";

import { PolicyViolationReason } from "./policy-violation-reason";
import { Link } from "lucide-react";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import { POLICY_VIOLATION_FIELDS } from "~/entities/ai-flaw-report/model/form-data/incident-description-fields-config";

export function PolicyViolationSection() {
  const { control } = useAiFlawFormContext();

  return (
    <Item variant="outline" className="form-item-card">
      <ItemContent className="space-y-6">
        <div>
          <ItemTitle className="form-title flex items-baseline gap-4">
            {POLICY_VIOLATION_FIELDS.icon && (
              <Image
                src={POLICY_VIOLATION_FIELDS.icon}
                alt=""
                aria-hidden="true"
                width={24}
                height={24}
              />
            )}
            {POLICY_VIOLATION_FIELDS.title}
          </ItemTitle>
          {POLICY_VIOLATION_FIELDS.description && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-50">
              {POLICY_VIOLATION_FIELDS.description}
            </p>
          )}
        </div>

        <FormField
          control={control}
          name={POLICY_VIOLATION_FIELDS.url.name}
          render={({ field }) => (
            <FormItem className="form-item-field">
              <FormLabel className="form-label">
                {POLICY_VIOLATION_FIELDS.url.label}
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <ChipsRow
                    data={POLICY_VIOLATION_FIELDS.urlOptions}
                    value={getSafeArray<string>(field.value)}
                    onValueChange={field.onChange}
                    placeholder={POLICY_VIOLATION_FIELDS.url.placeholder}
                    className="!text-base placeholder:!text-base placeholder:!leading-6 dark:border-gray-500 dark:placeholder:text-gray-500"
                    icon={
                      <Link
                        className="h-5 w-5 text-gray-500"
                        aria-hidden="true"
                      />
                    }
                  />
                  <FieldTooltip
                    text="Help text placeholder"
                    ariaLabel="Policy URL help"
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <PolicyViolationReason />
      </ItemContent>
    </Item>
  );
}
