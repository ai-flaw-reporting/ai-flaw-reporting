import Image from "next/image";
import { Link } from "lucide-react";

import {
  useAiFlawFormContext,
  POLICY_VIOLATION_FIELDS,
} from "~/entities/ai-flaw-report";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Item, ItemContent, ItemTitle } from "~/components/ui/item";
import { FieldTooltip } from "~/components/field-tooltip";

import { ProviderBadge } from "./provider-badge";
import { PolicyViolationReason } from "./policy-violation-reason";

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
                  <Link
                    className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-500"
                    aria-hidden="true"
                  />
                  <ProviderBadge url={field.value ?? ""} />
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    type="url"
                    placeholder={POLICY_VIOLATION_FIELDS.url.placeholder}
                    className="pl-10 !text-base placeholder:!text-base placeholder:!leading-6 dark:border-gray-500 dark:placeholder:text-gray-500"
                  />
                  <FieldTooltip
                    text="Help text placeholder"
                    ariaLabel="Policy URL help"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <PolicyViolationReason />
      </ItemContent>
    </Item>
  );
}
