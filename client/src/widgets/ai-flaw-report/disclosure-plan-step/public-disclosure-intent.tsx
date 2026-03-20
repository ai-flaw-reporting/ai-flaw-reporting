import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Item, ItemContent, ItemTitle } from "~/components/ui/item";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import {
  PUBLIC_DISCLOSURE_INTENT_FIELD,
  PUBLIC_DISCLOSURE_INTENT_VALUES,
} from "~/entities/ai-flaw-report/model/form-data/disclosure-plan-fields-config";
import { useWatch } from "react-hook-form";
import { useEffect, useRef } from "react";

export function PublicDisclosureIntent() {
  const { control, setValue } = useAiFlawFormContext();
  const previousIntentRef = useRef<string | undefined>(undefined);

  const publicDisclosureIntent = useWatch({
    control,
    name: "disclosurePlan.publicDisclosureIntent",
  });

  useEffect(() => {
    const isYesOrAlready =
      publicDisclosureIntent === PUBLIC_DISCLOSURE_INTENT_VALUES.YES ||
      publicDisclosureIntent === PUBLIC_DISCLOSURE_INTENT_VALUES.ALREADY;

    // Always clear datepicker when intent changes
    if (
      previousIntentRef.current !== undefined &&
      previousIntentRef.current !== publicDisclosureIntent
    ) {
      setValue("disclosurePlan.disclosureDatepicker", "", {
        shouldValidate: false,
      });
    }

    if (!isYesOrAlready) {
      setValue("disclosurePlan.embargoDetails", "", {
        shouldValidate: false,
      });
    }

    if (!isYesOrAlready) {
      setValue("disclosurePlan.disclosureTimeline", "", {
        shouldValidate: false,
      });
    }

    if (publicDisclosureIntent !== PUBLIC_DISCLOSURE_INTENT_VALUES.ALREADY) {
      setValue("disclosurePlan.disclosureLink", "", {
        shouldValidate: false,
      });
    }

    previousIntentRef.current = publicDisclosureIntent;
  }, [publicDisclosureIntent, setValue]);

  return (
    <Item variant="outline" className="form-item-card">
      <ItemContent className="space-y-4">
        <ItemTitle className="form-title flex items-baseline gap-4">
          <PUBLIC_DISCLOSURE_INTENT_FIELD.icon className="text-gray-800" />
          {PUBLIC_DISCLOSURE_INTENT_FIELD.title}
        </ItemTitle>

        <FormField
          control={control}
          name="disclosurePlan.publicDisclosureIntent"
          render={({ field }) => (
            <FormItem className="gap-4 border-none p-0 dark:bg-gray-800">
              <FormLabel className="form-label">
                {PUBLIC_DISCLOSURE_INTENT_FIELD.label}{" "}
                <span className="text-error-600">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col gap-1.5"
                >
                  {PUBLIC_DISCLOSURE_INTENT_FIELD.options?.map((option) => (
                    <RadioGroupItem
                      key={option.value}
                      value={option.value}
                      variant="card"
                      className="w-full"
                    >
                      <div className="flex items-center gap-4">
                        <option.icon className="text-gray-800" />
                        {option.label}
                      </div>
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
      </ItemContent>
    </Item>
  );
}
