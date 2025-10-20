import {
  useAiFlawFormContext,
  CLASSIFY_REPORT_QUESTIONS,
} from "~/entities/ai-flaw-report";

import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

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

  const labelClass =
    "text-xl leading-[30px] font-semibold text-gray-800 dark:text-white";
  const descriptionClass =
    "text-sm font-medium text-gray-400 dark:text-gray-100";
  const formItemClass = "dark:border-gray-500 dark:bg-gray-800";
  const radioItemClass =
    "h-30 w-full dark:data-[state=unchecked]:bg-gray-800 dark:text-white text-2xl leading-8";

  return (
    <>
      {CLASSIFY_REPORT_QUESTIONS.map((question) => (
        <FormField
          key={question.name}
          control={control}
          name={question.name}
          render={({ field }) => (
            <FormItem className={formItemClass}>
              <FormLabel className={labelClass}>{question.label}</FormLabel>
              <FormDescription className={descriptionClass}>
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
                    className={cn(radioItemClass, question.yesClassName)}
                  >
                    Yes
                  </RadioGroupItem>
                  <RadioGroupItem
                    variant="yesno"
                    value="false"
                    checked={field.value === false}
                    className={radioItemClass}
                  >
                    No
                  </RadioGroupItem>
                </RadioGroup>
              </FormControl>
              {question.showCsamWarning && <CsamWarning />}
            </FormItem>
          )}
        />
      ))}
    </>
  );
}
