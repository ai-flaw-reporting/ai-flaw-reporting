"use client";

import type { PropsWithChildren } from "react";
import { AiFlawReportFooter } from "~/widgets/ai-flaw-report/page-footer";
import { HeaderBack } from "~/widgets/ai-flaw-report/page-header/header-back";

export default function PageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <HeaderBack />
      {children}
      <AiFlawReportFooter />
    </>
  );
}
