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

import { CsamBlockModal } from "../csam-block-modal";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import { CLASSIFY_REPORT_QUESTIONS } from "~/entities/ai-flaw-report/model/form-data/classify-report-questions";

export function ClassifyReportStep() {
  const { control } = useAiFlawFormContext();

  const descriptionClassName =
    "text-sm font-light text-gray-400 dark:text-gray-100";

  return (
    <>
      <div className="space-y-4 text-sm font-normal text-gray-600 dark:text-gray-100">
        <p>
          You are welcome to report any broadly-scoped flaw, vulnerability, or
          incident relating to an AI system or model. We encourage reports with
          demonstrable risks, harms, or systematic concerns related to
          general-purpose AI systems.
        </p>
        <p>This form will:</p>
        <ul>
          <li className="list-inside list-disc">
            Help you generate a comprehensive, machine-readable report, informed
            by security best practices.
          </li>
          <li className="list-inside list-disc">
            Elicit details that will make it easier to review and triage.
          </li>
          <li className="list-inside list-disc">
            Provide the option to automatically submit your report to a list of
            the venues relevant for your flaw.
          </li>
        </ul>
        <p>
          This form creates a report for you. Reports are handled in strict
          confidence, and will not be saved or sent unless you choose to submit
          them.
        </p>
      </div>
      <CsamBlockModal />
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
              </FormItem>
            )}
          />
        </Item>
      ))}
    </>
  );
}
