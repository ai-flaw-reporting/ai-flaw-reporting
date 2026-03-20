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
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import {
  ATTACKER_RESOURCES_FIELD,
  ATTACKER_OBJECTIVES_FIELD,
  DETECTION_METHOD_FIELD,
} from "~/entities/ai-flaw-report/model/form-data/security-details-fields-config";

export function MalignantActorDetails() {
  const { control } = useAiFlawFormContext();

  const maliciousUse = useWatch({
    control,
    name: "classifyReport.malicious_use",
  });

  if (!maliciousUse) return null;

  return (
    <Item variant="outline" className="form-item-card">
      <ItemContent className="space-y-8">
        <ItemTitle className="form-title flex items-baseline gap-4">
          <Image
            src={ATTACKER_RESOURCES_FIELD.icon}
            alt=""
            width={26}
            height={26}
            aria-hidden="true"
          />
          {ATTACKER_RESOURCES_FIELD.title}
        </ItemTitle>

        <FormField
          control={control}
          name="securityDetails.attackerObjectives"
          render={({ field }) => (
            <FormItem className="form-item-field">
              <FormLabel className="form-label">
                {ATTACKER_OBJECTIVES_FIELD.label}{" "}
                <span className="text-error-600">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={ATTACKER_OBJECTIVES_FIELD.placeholder}
                  rows={ATTACKER_OBJECTIVES_FIELD.rows}
                  className="text-md min-h-[100px] w-full resize-none pr-10 dark:bg-white dark:text-gray-800"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-gray-600 dark:text-gray-100">
                {ATTACKER_OBJECTIVES_FIELD.description}
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="securityDetails.attackerResources"
          render={({ field }) => (
            <FormItem className="form-item-field">
              <FormLabel className="form-label">
                {ATTACKER_RESOURCES_FIELD.label}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={ATTACKER_RESOURCES_FIELD.placeholder}
                  rows={ATTACKER_RESOURCES_FIELD.rows}
                  className="text-md min-h-[100px] w-full resize-none pr-10 dark:bg-white dark:text-gray-800"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-gray-600 dark:text-gray-100">
                {ATTACKER_RESOURCES_FIELD.description}
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="securityDetails.detectionMethod"
          render={({ field }) => (
            <FormItem className="form-item-field">
              <FormLabel className="form-label">
                {DETECTION_METHOD_FIELD.label}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={DETECTION_METHOD_FIELD.placeholder}
                  rows={DETECTION_METHOD_FIELD.rows}
                  className="text-md min-h-[100px] w-full resize-none pr-10 dark:bg-white dark:text-gray-800"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-gray-600 dark:text-gray-100">
                {DETECTION_METHOD_FIELD.description}
              </FormDescription>
            </FormItem>
          )}
        />
      </ItemContent>
    </Item>
  );
}
