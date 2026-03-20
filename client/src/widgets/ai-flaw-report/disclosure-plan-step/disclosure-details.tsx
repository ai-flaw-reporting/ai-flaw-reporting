"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { useWatch } from "react-hook-form";

import { cn } from "~/lib/utils";
import { isValidDate, isDisclosureDateDisabled } from "~/lib/date";

import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import {
  DISCLOSURE_DATEPICKER_FIELD,
  DISCLOSURE_LINK_FIELD,
  DISCLOSURE_TIMELINE_FIELD,
  PUBLIC_DISCLOSURE_INTENT_VALUES,
} from "~/entities/ai-flaw-report/model/form-data/disclosure-plan-fields-config";

import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Input } from "~/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Item, ItemContent, ItemTitle } from "~/components/ui/item";
import { FieldTooltip } from "~/components/field-tooltip";

export function DisclosureDetails() {
  const { control } = useAiFlawFormContext();

  const publicDisclosureIntent = useWatch({
    control,
    name: "disclosurePlan.publicDisclosureIntent",
  });

  if (
    publicDisclosureIntent !== PUBLIC_DISCLOSURE_INTENT_VALUES.YES &&
    publicDisclosureIntent !== PUBLIC_DISCLOSURE_INTENT_VALUES.ALREADY
  ) {
    return null;
  }

  return (
    <Item variant="outline" className="form-item-card">
      <ItemContent className="space-y-4">
        <ItemTitle className="form-title flex items-baseline gap-4">
          <Image
            src={DISCLOSURE_TIMELINE_FIELD.icon}
            alt=""
            aria-hidden="true"
            width={27}
            height={27}
          />
          {DISCLOSURE_TIMELINE_FIELD.title}
          <span className="text-error-600">*</span>
        </ItemTitle>

        <FormField
          control={control}
          name="disclosurePlan.disclosureTimeline"
          render={({ field }) => (
            <FormItem className="form-item-field">
              <FormLabel className="form-label">
                {DISCLOSURE_TIMELINE_FIELD.label}{" "}
                <span className="text-error-600">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder={DISCLOSURE_TIMELINE_FIELD.placeholder}
                    {...field}
                  />
                  <FieldTooltip text="" ariaLabel="Disclosure timeline help" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="disclosurePlan.disclosureDatepicker"
          render={({ field }) => {
            const selectedDate = isValidDate(field.value)
              ? new Date(field.value)
              : undefined;

            return (
              <FormItem className="form-item-field relative">
                <FormLabel className="form-label">
                  {DISCLOSURE_DATEPICKER_FIELD.label}{" "}
                  <span className="text-error-600">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <div className="relative">
                        <Button
                          variant="outline"
                          className={cn(
                            "text-md h-10.5 w-full pl-3 text-left font-normal text-gray-900 dark:hover:bg-white",
                          )}
                        >
                          {selectedDate
                            ? format(selectedDate, "PPP")
                            : DISCLOSURE_DATEPICKER_FIELD.placeholder}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                        <FieldTooltip
                          text=""
                          ariaLabel="Disclosure date help"
                          className="top-[13px] right-11"
                        />
                      </div>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => field.onChange(date?.toISOString())}
                      disabled={(date) =>
                        isDisclosureDateDisabled(date, publicDisclosureIntent)
                      }
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            );
          }}
        />

        {publicDisclosureIntent ===
          PUBLIC_DISCLOSURE_INTENT_VALUES.ALREADY && (
          <FormField
            control={control}
            name="disclosurePlan.disclosureLink"
            render={({ field }) => (
              <FormItem className="form-item-field">
                <FormLabel className="form-label">
                  {DISCLOSURE_LINK_FIELD.label}
                </FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder={DISCLOSURE_LINK_FIELD.placeholder}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}
      </ItemContent>
    </Item>
  );
}
