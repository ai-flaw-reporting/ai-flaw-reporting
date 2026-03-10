"use client";

import type { PropsWithChildren } from "react";
import { AiFlawReportFooter } from "~/widgets/ai-flaw-report/page-footer";
import { HeaderLayout } from "~/widgets/ai-flaw-report/page-header/header-layout";

export default function FormLayout({ children }: PropsWithChildren) {
  return (
    <>
      <HeaderLayout />
      {children}
      <AiFlawReportFooter />
    </>
  );
}
