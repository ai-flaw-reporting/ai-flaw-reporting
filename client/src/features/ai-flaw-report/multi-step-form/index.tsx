"use client";

import { useWatch } from "react-hook-form";
import { useCallback } from "react";
import { HuggingFaceModelsProvider } from "./models-context";
import { SubmissionProvider, useSubmission } from "./submission-context";
import { FormHeader } from "~/widgets/ai-flaw-report/form-header";
import { CurrentStepRenderer } from "~/widgets/ai-flaw-report/current-step-renderer";
import { FormNavigation } from "~/widgets/ai-flaw-report/form-navigation";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import type { AiFlawReportSchema } from "~/entities/ai-flaw-report/model/types";
import { useSubmitReportMutation } from "~/entities/ai-flaw-report/model/hooks/useSubmitReportMutation";
import { useSubmitCertMutation } from "~/entities/ai-flaw-report/model/hooks/useSubmitCertMutation";
import { clearAllFormSaveStatus } from "~/entities/ai-flaw-report/lib/utils";
import { cn } from "~/lib/utils";

function FormContent({
  children,
  huggingFaceModels,
}: {
  children: React.ReactNode;
  huggingFaceModels: string[];
}) {
  const { handleSubmit, control, reset, setValue } = useAiFlawFormContext();
  const currentStep = useWatch({ control, name: "step" });

  const {
    setSubmitError,
    setIsSubmitSuccessful,
    setReportId,
    setSubmittedOrganizations,
    formRef,
  } = useSubmission();

  const { mutateAsync } = useSubmitReportMutation();
  const { mutateAsync: submitToCert } = useSubmitCertMutation();

  const onSubmit = useCallback(
    async (data: AiFlawReportSchema) => {
      if (currentStep !== "REVIEW_AND_SUBMIT_REPORT") return;

      setSubmitError(null);
      setIsSubmitSuccessful(false);

      try {
        const result = await mutateAsync(data);

        const documentId = result.data?.documentId ?? null;
        setReportId(documentId ?? null);

        const selectedStakeholders = data.reviewReport?.selectedStakeholders ?? [];
        setSubmittedOrganizations(selectedStakeholders);
        setIsSubmitSuccessful(true);

        if (selectedStakeholders.includes("CERT")) {
          submitToCert(data).catch((err: unknown) => {
            console.error("CERT/VINCE submission failed:", err);
          });
        }
        clearAllFormSaveStatus();

        setValue("step", "SUBMISSION_SUCCESS" as AiFlawReportSchema["step"]);
      } catch (error) {
        setSubmitError(
          error instanceof Error ? error.message : "Failed to submit report",
        );
        console.error("Error submitting report:", error);
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
    },
    [
      currentStep,
      mutateAsync,
      submitToCert,
      setSubmitError,
      setIsSubmitSuccessful,
      setReportId,
      setSubmittedOrganizations,
      setValue,
      reset,
    ],
  );

  const isSuccessStep = currentStep === "SUBMISSION_SUCCESS";

  return (
    <HuggingFaceModelsProvider models={huggingFaceModels}>
      <section
        aria-label="AI Flaw Report Form"
        className={cn(
          "space-y-8 p-8",
          isSuccessStep && "flex flex-1 flex-col bg-white p-0 dark:bg-gray-900",
        )}
      >
        {!isSuccessStep && <FormHeader />}
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className={cn(
            "mx-auto max-w-[792px] space-y-4",
            isSuccessStep &&
              "flex max-w-none flex-1 items-center justify-center",
          )}
        >
          {children}
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
      <FormContent huggingFaceModels={huggingFaceModels}>
        <CurrentStepRenderer />
      </FormContent>
    </SubmissionProvider>
  );
}
