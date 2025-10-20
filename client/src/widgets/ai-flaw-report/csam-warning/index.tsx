import { useCallback } from "react";
import { useWatch } from "react-hook-form";

import { useAiFlawFormContext } from "~/entities/ai-flaw-report";

import { Item } from "~/components/ui/item";

import { CsamWarningHeader } from "./csam-warning-header";
import { CsamWarningContent } from "./csam-warning-content";
import { CsamWarningActions } from "./csam-warning-actions";

export function CsamWarning() {
  const { control, setValue } = useAiFlawFormContext();

  const csamInvolved = useWatch({
    control,
    name: "classifyReport.csam_involved",
  });

  const handleDismiss = useCallback(() => {
    setValue("classifyReport.csam_involved", false);
    setValue("classifyReport.csam_acknowledgment", false);
  }, [setValue]);

  if (!csamInvolved) {
    return null;
  }

  return (
    <Item
      variant="danger"
      role="alert"
      className="relative flex flex-col gap-3"
    >
      <CsamWarningHeader onDismiss={handleDismiss} />
      <CsamWarningContent />
      <CsamWarningActions onDismiss={handleDismiss} />
    </Item>
  );
}
