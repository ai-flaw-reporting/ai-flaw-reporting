import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Item, ItemContent, ItemTitle } from "~/components/ui/item";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import { PUBLIC_DISCLOSURE_INTENT_FIELD } from "~/entities/ai-flaw-report/model/form-data/disclosure-plan-fields-config";

export function PublicDisclosureIntent() {
  const { control } = useAiFlawFormContext();

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
                {PUBLIC_DISCLOSURE_INTENT_FIELD.label}
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
