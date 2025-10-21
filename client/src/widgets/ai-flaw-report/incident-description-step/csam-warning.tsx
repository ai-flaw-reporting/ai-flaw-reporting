import { useWatch } from "react-hook-form";

import { useAiFlawFormContext } from "~/entities/ai-flaw-report";

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
