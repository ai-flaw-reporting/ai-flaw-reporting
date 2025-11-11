"use client";

import { useWatch } from "react-hook-form";
import { HuggingFaceModelsProvider } from "./models-context";
import { SubmissionProvider, useSubmission } from "./submission-context";
import { FormHeader } from "~/widgets/ai-flaw-report/form-header";
import { CurrentStepRenderer } from "~/widgets/ai-flaw-report/current-step-renderer";
import { FormNavigation } from "~/widgets/ai-flaw-report/form-navigation";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import type { AiFlawReportSchema } from "~/entities/ai-flaw-report/model/types";
import { submitReport } from "~/entities/ai-flaw-report/lib/submit-report";
import { STEP_ORDER } from "~/entities/ai-flaw-report/model/step-config";

function FormContent({ huggingFaceModels }: { huggingFaceModels: string[] }) {
  const { handleSubmit, control, reset } = useAiFlawFormContext();
  const { setSubmitError } = useSubmission();
  const currentStep = useWatch({ control, name: "step" });

  const onSubmit = async (data: AiFlawReportSchema) => {
    // Only allow submission on the final step
    const isLastStep = currentStep === STEP_ORDER[STEP_ORDER.length - 1];
    if (!isLastStep) {
      return;
    }

    setSubmitError(null);

    try {
      await submitReport(data);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to submit report",
      );
      console.error("Error submitting report:", error);
      // Reset the submitted state on error so the form can be resubmitted
      reset(
        { ...data },
        {
          keepValues: true,
          keepErrors: false,
          keepDirty: false,
          keepIsSubmitted: false,
          keepTouched: false,
          keepIsValid: false,
          keepSubmitCount: false,
        },
      );
    }
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

export function MultiStepAiFlawReportForm({
  huggingFaceModels,
}: {
  huggingFaceModels: string[];
}) {
  return (
    <SubmissionProvider>
      <FormContent huggingFaceModels={huggingFaceModels} />
    </SubmissionProvider>
  );
}
