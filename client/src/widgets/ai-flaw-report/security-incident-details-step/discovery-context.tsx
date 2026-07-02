import { FormControl, FormField, FormItem } from "~/components/ui/form";
import { Item, ItemContent, ItemTitle } from "~/components/ui/item";
import { CheckboxCard } from "~/components/ui/checkbox";

import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import { DISCOVERY_CONTEXT_FIELD } from "~/entities/ai-flaw-report/model/form-data/impact-assessment-fields-config";

export function DiscoveryContext() {
  const { control } = useAiFlawFormContext();

  return (
    <Item variant="outline" className="form-item-card">
      <ItemContent className="space-y-4">
        <ItemTitle className="form-title">
          <span>{DISCOVERY_CONTEXT_FIELD.title}</span>
        </ItemTitle>
        <FormField
          control={control}
          name="impactAssessment.discoveryContext"
          render={({ field }) => (
            <FormItem className="form-item-field">
              <p className="text-md mb-3.5 font-medium text-gray-500">
                {DISCOVERY_CONTEXT_FIELD.label}
              </p>
              <FormControl>
                <ul className="grid grid-cols-1 gap-1.5 md:grid-cols-3">
                  {DISCOVERY_CONTEXT_FIELD.options.map((option) => (
                    <li key={option.value} className="h-full">
                      <CheckboxCard
                        checked={field.value === option.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked ? option.value : "");
                        }}
                      >
                        <div className="space-y-2">
                          <h3 className="text-md font-semibold text-gray-900">
                            {option.label}
                          </h3>
                          <p className="text-md text-gray-700">
                            {option.description}
                          </p>
                        </div>
                      </CheckboxCard>
                    </li>
                  ))}
                </ul>
              </FormControl>
            </FormItem>
          )}
        />
      </ItemContent>
    </Item>
  );
}
