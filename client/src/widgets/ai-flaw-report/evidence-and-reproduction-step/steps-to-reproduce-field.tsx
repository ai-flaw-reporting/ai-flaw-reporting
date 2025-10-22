import { Item, ItemContent, ItemTitle } from "~/components/ui/item";
import Image from "next/image";
import {
  EVIDENCE_FIELDS,
  useAiFlawFormContext,
} from "~/entities/ai-flaw-report";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";

export function StepsToReproduceField() {
  const { control } = useAiFlawFormContext();
  return (
    <Item variant="outline" className="form-item-card">
      <ItemContent className="space-y-8">
        <ItemTitle className="form-title flex items-baseline gap-4">
          {EVIDENCE_FIELDS.stepsToReproduce.icon && (
            <Image
              src={EVIDENCE_FIELDS.stepsToReproduce.icon}
              alt=""
              aria-hidden="true"
              width={20.42}
              height={26.81}
            />
          )}
          {EVIDENCE_FIELDS.stepsToReproduce.title}
        </ItemTitle>

        <FormField
          control={control}
          name={EVIDENCE_FIELDS.stepsToReproduce.name}
          render={({ field }) => (
            <FormItem className="form-item-field">
              <FormLabel className="form-label">
                {EVIDENCE_FIELDS.stepsToReproduce.label}
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={(field.value as string) ?? ""}
                  rows={EVIDENCE_FIELDS.stepsToReproduce.rows}
                  maxLength={EVIDENCE_FIELDS.stepsToReproduce.maxLength}
                  placeholder={EVIDENCE_FIELDS.stepsToReproduce.placeholder}
                  className="min-h-46 !text-base font-normal placeholder:!text-base placeholder:!leading-6 dark:border-gray-300 dark:bg-gray-800 dark:placeholder:text-gray-400"
                />
              </FormControl>
              {EVIDENCE_FIELDS.stepsToReproduce.description && (
                <FormDescription className="form-description font-normal text-gray-600 dark:text-gray-300">
                  {EVIDENCE_FIELDS.stepsToReproduce.description}
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      </ItemContent>
    </Item>
  );
}
