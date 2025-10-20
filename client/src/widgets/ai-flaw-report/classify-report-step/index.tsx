import {
  useAiFlawFormContext,
  CLASSIFY_REPORT_QUESTIONS,
} from "~/entities/ai-flaw-report";

import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

import { Item } from "~/components/ui/item";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";

import { cn } from "~/lib/utils";

import { CsamWarning } from "../csam-warning";

export function ClassifyReportStep() {
  const { control } = useAiFlawFormContext();

  const descriptionClassName =
    "text-sm font-light text-gray-400 dark:text-gray-100";

  return (
    <>
      {CLASSIFY_REPORT_QUESTIONS.map((question) => (
        <Item key={question.name} variant="outline" className="form-item-card">
          <FormField
            control={control}
            name={question.name}
            render={({ field }) => (
              <FormItem className="w-full border-none bg-transparent p-0">
                <FormLabel className="form-title">{question.label}</FormLabel>
                <FormDescription className={descriptionClassName}>
                  {question.description}
                </FormDescription>
                <FormControl>
                  <RadioGroup
                    value={field.value?.toString()}
                    onValueChange={(value) => field.onChange(value === "true")}
                    className="flex gap-4"
                  >
                    <RadioGroupItem
                      variant="yesno"
                      value="true"
                      checked={field.value === true}
                      className={cn("form-radio-item", question.yesClassName)}
                    >
                      Yes
                    </RadioGroupItem>
                    <RadioGroupItem
                      variant="yesno"
                      value="false"
                      checked={field.value === false}
                      className="form-radio-item"
                    >
                      No
                    </RadioGroupItem>
                  </RadioGroup>
                </FormControl>
                {question.showCsamWarning && <CsamWarning />}
              </FormItem>
            )}
          />
        </Item>
      ))}
    </>
  );
}
