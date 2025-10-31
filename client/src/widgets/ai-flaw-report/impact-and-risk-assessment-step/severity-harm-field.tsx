import { Item, ItemContent, ItemTitle } from "~/components/ui/item";
import Image from "next/image";
import { Slider } from "~/components/ui/slider";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "~/components/ui/form";

import { SeverityHarmBadge } from "./severity-harm-badge";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import { SEVERITY_OF_HARM_FIELD } from "~/entities/ai-flaw-report/model/form-data/impact-assessment-fields-config";

export function SeverityHarmField() {
  const { control } = useAiFlawFormContext();
  const options = SEVERITY_OF_HARM_FIELD.options;

  return (
    <Item variant="outline" className="form-item-card flex-1">
      <ItemContent className="space-y-8">
        <div className="flex items-center justify-between">
          <ItemTitle className="form-title flex items-baseline gap-4">
            {SEVERITY_OF_HARM_FIELD.icon && (
              <Image
                src={SEVERITY_OF_HARM_FIELD.icon}
                alt=""
                width={26.21}
                height={24.57}
                aria-hidden="true"
              />
            )}
            <span className="text-nowrap">
              {SEVERITY_OF_HARM_FIELD.title}{" "}
              <span className="text-error-600">*</span>
            </span>
          </ItemTitle>
          <SeverityHarmBadge />
        </div>

        <FormField
          control={control}
          name="impactAssessment.severityOfHarm"
          render={({ field: { value, onChange } }) => {
            const idx = options.findIndex((opt) => opt === value);
            const current = idx >= 0 ? idx : 0;

            return (
              <FormItem className="form-item-field">
                <FormControl>
                  <div className="space-y-3.5">
                    <FormLabel className="form-label font-bold">
                      {SEVERITY_OF_HARM_FIELD.label}
                    </FormLabel>
                    <Slider
                      value={[current]}
                      onValueChange={(v) => {
                        if (v[0] !== undefined) {
                          onChange(options[v[0]]);
                        }
                      }}
                      max={options.length - 1}
                      step={1}
                      className="mb-2 w-full"
                    />
                    <div className="flex justify-between text-sm font-bold text-gray-600">
                      <span className="text-center capitalize">
                        {SEVERITY_OF_HARM_FIELD.minValue}
                      </span>
                      <span className="text-center capitalize">
                        {SEVERITY_OF_HARM_FIELD.maxValue}
                      </span>
                    </div>
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
