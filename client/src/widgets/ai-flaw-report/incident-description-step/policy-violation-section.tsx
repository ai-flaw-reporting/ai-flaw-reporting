import Image from "next/image";
import { Link as LucideLink } from "lucide-react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import { Item, ItemContent, ItemTitle } from "~/components/ui/item";
import { FieldTooltip } from "~/components/field-tooltip";

import { PolicyViolationReason } from "./policy-violation-reason";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import { POLICY_VIOLATION_FIELDS } from "~/entities/ai-flaw-report/model/form-data/incident-description-fields-config";
import { Input } from "~/components/ui/input";
import { getPolicyLinks } from "~/entities/ai-flaw-report/lib/policy-links";
import Link from "next/link";
import { getSafeArray } from "~/lib/form-field-utils";

export function PolicyViolationSection() {
  const { control, getValues } = useAiFlawFormContext();

  const systemEntries = getValues("reporterDetails.systems") ?? [];
  const selectedPlatforms = systemEntries.map((s) => s.platform);
  const policyLinks = getPolicyLinks(getSafeArray<string>(selectedPlatforms));

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
                  <LucideLink
                    className="absolute top-1/2 left-3 z-10 h-5 w-5 -translate-y-1/2 text-gray-500"
                    aria-hidden="true"
                  />
                  <Input
                    placeholder={POLICY_VIOLATION_FIELDS.url.placeholder}
                    className="pl-10 !text-base placeholder:!text-base placeholder:!leading-6 dark:border-gray-500 dark:placeholder:text-gray-500"
                    {...field}
                  />
                  <FieldTooltip text="" ariaLabel="Policy URL help" />
                </div>
              </FormControl>
              <FormMessage />
              {!!policyLinks.length && (
                <ul className="mt-2.5 flex flex-wrap gap-2">
                  {policyLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-25 rounded-sm bg-indigo-500 px-2 py-[5px] text-xs leading-4.5 font-medium capitalize"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </FormItem>
          )}
        />

        <PolicyViolationReason />
      </ItemContent>
    </Item>
  );
}
