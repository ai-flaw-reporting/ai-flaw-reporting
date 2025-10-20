"use client";

import {
  useAiFlawFormContext,
  type AiFlawReportSchema,
} from "~/entities/ai-flaw-report";

import {
  CurrentStepRenderer,
  FormHeader,
  FormNavigation,
} from "~/widgets/ai-flaw-report";

export function MultiStepAiFlawReportForm() {
  const { handleSubmit } = useAiFlawFormContext();

  const onSubmit = (data: AiFlawReportSchema) => {
    console.log(data);
  };

  return (
    <section aria-label="AI Flaw Report Form" className="space-y-8 p-8">
      <FormHeader />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-[792px] space-y-4"
      >
        <CurrentStepRenderer />
      </form>
      <FormNavigation />
    </section>
  );
}
