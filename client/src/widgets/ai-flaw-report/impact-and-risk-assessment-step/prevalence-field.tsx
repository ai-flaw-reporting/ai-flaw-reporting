import { Item, ItemContent, ItemTitle } from "~/components/ui/item";
import Image from "next/image";
import { Slider } from "~/components/ui/slider";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "~/components/ui/form";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import { PREVALENCE_FIELD } from "~/entities/ai-flaw-report/model/form-data/impact-assessment-fields-config";

export function PrevalenceField() {
  const { control } = useAiFlawFormContext();

  const { options } = PREVALENCE_FIELD;

  return (
    <Item variant="outline" className="form-item-card flex-1">
      <ItemContent className="space-y-8">
        <div className="flex items-center justify-between">
          <ItemTitle className="form-title flex items-baseline gap-4">
            {PREVALENCE_FIELD.icon && (
              <Image
                src={PREVALENCE_FIELD.icon}
                alt=""
                width={24}
                height={24}
                aria-hidden="true"
              />
            )}
            <span className="text-nowrap">{PREVALENCE_FIELD.title}</span>
          </ItemTitle>
        </div>

        <FormField
          control={control}
          name="impactAssessment.prevalence"
          render={({ field: { value, onChange } }) => {
            const idx = options.findIndex((opt) => opt === value);
            const current = idx >= 0 ? idx : 0;
            const selectedKey = options[current] ?? options[0];
            const selectedLabel = selectedKey.replace(/_/g, " ");
            const selectedDescription =
              PREVALENCE_FIELD.descriptions[selectedKey] ?? "";

            return (
              <FormItem className="form-item-field">
                <FormControl>
                  <div className="space-y-3.5">
                    <FormLabel className="form-label font-bold">
                      {PREVALENCE_FIELD.label}
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
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm font-bold text-gray-600">
                      <span className="text-center capitalize">
                        {PREVALENCE_FIELD.minValue.replace(/_/g, " ")}
                      </span>
                      <span className="text-center capitalize">
                        {PREVALENCE_FIELD.maxValue}
                      </span>
                    </div>
                    <div className="space-y-1 pt-2 text-center">
                      <p className="text-sm font-bold text-blue-600 capitalize">
                        Selected: {selectedLabel}
                      </p>
                      {selectedDescription && (
                        <p className="text-sm text-gray-600">
                          <span className="capitalize">{selectedLabel}</span>
                          {" - "}
                          {selectedDescription}
                        </p>
                      )}
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
