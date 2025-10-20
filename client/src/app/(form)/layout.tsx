"use client";

import type { PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  aiFlawReportSchema,
  STEP_ORDER,
  type AiFlawReportSchema,
} from "~/entities/ai-flaw-report";

import {
  AiFlawReportHeader,
  AiFlawReportFooter,
} from "~/widgets/ai-flaw-report";

export default function FormLayout({ children }: PropsWithChildren) {
  const form = useForm<AiFlawReportSchema>({
    resolver: zodResolver(aiFlawReportSchema),
    mode: "onBlur",
    defaultValues: {
      step: STEP_ORDER[0], // CLASSIFY_REPORT
      classifyReport: { csam_acknowledgment: false },
      reporterDetails: { system: { notSure: false } },
    },
  });

  return (
    <FormProvider {...form}>
      <AiFlawReportHeader />
      {children}
      <AiFlawReportFooter />
    </FormProvider>
  );
}
