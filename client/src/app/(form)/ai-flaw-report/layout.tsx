"use client";

import type { PropsWithChildren } from "react";
import { FormProvider, useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AiFlawReportHeader } from "~/widgets/ai-flaw-report/page-header";
import { AiFlawReportFooter } from "~/widgets/ai-flaw-report/page-footer";
import type { AiFlawReportSchema } from "~/entities/ai-flaw-report/model/types";
import { aiFlawReportSchema } from "~/entities/ai-flaw-report/model/schema";
import { STEP_ORDER } from "~/entities/ai-flaw-report/model/step-config";
import { HeaderLayout } from "~/widgets/ai-flaw-report/page-header/header-layout";

export default function FormLayout({ children }: PropsWithChildren) {
  const form = useForm<AiFlawReportSchema>({
    resolver: zodResolver(aiFlawReportSchema) as Resolver<AiFlawReportSchema>,
    mode: "onBlur",
    defaultValues: {
      step: STEP_ORDER[0], // CLASSIFY_REPORT
      classifyReport: { csam_acknowledgment: false },
      reporterDetails: { system: { notSure: false } },
    },
  });

  return (
    <FormProvider {...form}>
      <HeaderLayout>
        <AiFlawReportHeader />
      </HeaderLayout>
      {children}
      <AiFlawReportFooter />
    </FormProvider>
  );
}
