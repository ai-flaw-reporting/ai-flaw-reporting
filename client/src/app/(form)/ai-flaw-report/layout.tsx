"use client";

import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import { FormProvider, useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AiFlawReportHeader } from "~/widgets/ai-flaw-report/page-header";
import { AiFlawReportFooter } from "~/widgets/ai-flaw-report/page-footer";
import type { AiFlawReportSchema } from "~/entities/ai-flaw-report/model/types";
import { aiFlawReportSchema } from "~/entities/ai-flaw-report/model/schema";
import {
  STEP_ORDER,
  STEP_CONFIGS,
} from "~/entities/ai-flaw-report/model/step-config";
import { getFormSaveStatus } from "~/entities/ai-flaw-report/lib/utils";

export default function FormLayout({ children }: PropsWithChildren) {
  const form = useForm<AiFlawReportSchema>({
    resolver: zodResolver(aiFlawReportSchema) as Resolver<AiFlawReportSchema>,
    mode: "onBlur",
    defaultValues: {
      step: STEP_ORDER[0], // CLASSIFY_REPORT
      classifyReport: { csam_acknowledgment: false },
      reporterDetails: { systems: [] },
    },
  });

  const { reset } = form;

  useEffect(() => {
    const savedFields: Partial<AiFlawReportSchema> = {};

    for (const stepKey of STEP_ORDER) {
      if (stepKey === "SUBMISSION_SUCCESS") continue;
      const config = STEP_CONFIGS[stepKey];
      const saved = getFormSaveStatus(config.id) as Record<
        string,
        unknown
      > | null;
      const fieldValue = saved?.[config.formField];
      if (fieldValue != null) {
        (savedFields as Record<string, unknown>)[config.formField] = fieldValue;
      }
    }

    if (Object.keys(savedFields).length > 0) {
      reset((prev) => ({ ...prev, ...savedFields }));
    }
    // form.reset is a stable RHF reference; empty-dep array is intentional —
    // this runs once on mount to restore localStorage data.
  }, []);

  return (
    <FormProvider {...form}>
      <AiFlawReportHeader />

      {children}
      <AiFlawReportFooter />
    </FormProvider>
  );
}
