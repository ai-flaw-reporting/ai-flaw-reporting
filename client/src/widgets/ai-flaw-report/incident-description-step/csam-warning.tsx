"use client";

import { useWatch } from "react-hook-form";

import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";

import { CsamWarning as CsamWarningComponent } from "../csam-warning";

export function CsamWarning() {
  const { control } = useAiFlawFormContext();

  const csamInvolved = useWatch({
    control,
    name: "classifyReport.csam_involved",
  });

  if (!csamInvolved) return null;

  return <CsamWarningComponent />;
}
