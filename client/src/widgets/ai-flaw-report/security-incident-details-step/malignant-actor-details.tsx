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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  ATTACKER_RESOURCES_FIELD,
  ATTACKER_OBJECTIVES_FIELD,
  useAiFlawFormContext,
} from "~/entities/ai-flaw-report";
import { AttackerResourcesField } from "./attacker-resources-field";
import { AttackerObjectivesField } from "./attacker-objectives-field";

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
          name="securityDetails.attackerResources"
          render={({ field }) => (
            <FormItem className="form-item-field">
              <FormLabel className="form-label">
                {ATTACKER_RESOURCES_FIELD.label}
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="text-md w-full dark:bg-white dark:text-gray-800">
                    <SelectValue
                      placeholder={ATTACKER_RESOURCES_FIELD.placeholder}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {ATTACKER_RESOURCES_FIELD.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription className="text-gray-600 dark:text-gray-100">
                {ATTACKER_RESOURCES_FIELD.description}
              </FormDescription>
            </FormItem>
          )}
        />

        <AttackerResourcesField />

        <FormField
          control={control}
          name="securityDetails.attackerObjectives"
          render={({ field }) => (
            <FormItem className="form-item-field">
              <FormLabel className="form-label">
                {ATTACKER_OBJECTIVES_FIELD.label}
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="text-md w-full dark:bg-white dark:text-gray-800">
                    <SelectValue
                      placeholder={ATTACKER_OBJECTIVES_FIELD.placeholder}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {ATTACKER_OBJECTIVES_FIELD.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription className="text-gray-600 dark:text-gray-100">
                {ATTACKER_OBJECTIVES_FIELD.description}
              </FormDescription>
            </FormItem>
          )}
        />

        <AttackerObjectivesField />
      </ItemContent>
    </Item>
  );
}
