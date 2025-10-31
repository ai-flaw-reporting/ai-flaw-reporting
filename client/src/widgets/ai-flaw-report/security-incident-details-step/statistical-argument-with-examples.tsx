import Image from "next/image";
import { useWatch } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Item, ItemContent, ItemTitle } from "~/components/ui/item";
import { Textarea } from "~/components/ui/textarea";
import {
  DISCOVERY_NARRATIVE_FIELD,
  useAiFlawFormContext,
} from "~/entities/ai-flaw-report";

export function StatisticalArgumentWithExamples() {
  const { control } = useAiFlawFormContext();

  const realWorldHarm = useWatch({
    control,
    name: "classifyReport.real_world_harm",
  });

  const maliciousUse = useWatch({
    control,
    name: "classifyReport.malicious_use",
  });

  if (realWorldHarm && maliciousUse) {
    return null;
  }

  return (
    <Item variant="outline" className="form-item-card">
      <ItemContent className="space-y-8">
        <ItemTitle className="form-title flex items-baseline gap-4">
          <Image
            src={DISCOVERY_NARRATIVE_FIELD.icon}
            alt=""
            width={26}
            height={26}
            aria-hidden="true"
          />
          {DISCOVERY_NARRATIVE_FIELD.title}{" "}
          <span className="text-error-600"> *</span>
        </ItemTitle>

        <FormField
          control={control}
          name="securityDetails.discoveryNarrative"
          render={({ field }) => (
            <FormItem className="form-item-field">
              {DISCOVERY_NARRATIVE_FIELD.label && (
                <FormLabel className="form-label">
                  {DISCOVERY_NARRATIVE_FIELD.label}
                </FormLabel>
              )}

              <FormControl>
                <Textarea
                  placeholder={DISCOVERY_NARRATIVE_FIELD.placeholder}
                  rows={DISCOVERY_NARRATIVE_FIELD.rows}
                  className="text-md min-h-[141px] w-full resize-none pr-10 dark:bg-white dark:text-gray-800"
                  {...field}
                />
              </FormControl>
              {DISCOVERY_NARRATIVE_FIELD.description && (
                <FormDescription className="text-gray-600 dark:text-gray-100">
                  {DISCOVERY_NARRATIVE_FIELD.description}
                </FormDescription>
              )}
            </FormItem>
          )}
        />
      </ItemContent>
    </Item>
  );
}
