"use client";

import { HuggingFaceModelsProvider } from "./models-context";
import { FormHeader } from "~/widgets/ai-flaw-report/form-header";
import { CurrentStepRenderer } from "~/widgets/ai-flaw-report/current-step-renderer";
import { FormNavigation } from "~/widgets/ai-flaw-report/form-navigation";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import type { AiFlawReportSchema } from "~/entities/ai-flaw-report/model/types";

export function MultiStepAiFlawReportForm({
  huggingFaceModels,
}: {
  huggingFaceModels: string[];
}) {
  const { handleSubmit } = useAiFlawFormContext();
  const onSubmit = (data: AiFlawReportSchema) => {
    console.log(data);
  };

  return (
    <HuggingFaceModelsProvider models={huggingFaceModels}>
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
    </HuggingFaceModelsProvider>
  );
}
