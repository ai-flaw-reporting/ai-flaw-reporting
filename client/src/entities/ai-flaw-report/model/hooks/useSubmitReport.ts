import { useWatch } from "react-hook-form";
import { useAiFlawFormContext } from "./useAiFlawFormContext";

export function useSubmitReport() {
  const { control, formState } = useAiFlawFormContext();

  const selectedStakeholders = useWatch({
    control,
    name: "reviewReport.selectedStakeholders",
  });

  const csamAcknowledgment = useWatch({
    control,
    name: "classifyReport.csam_acknowledgment",
  });

  const csamInvolved = useWatch({
    control,
    name: "classifyReport.csam_involved",
  });

  const isSubmitDisabled =
    (csamInvolved && !csamAcknowledgment) || !selectedStakeholders?.length;

  return {
    isSubmitted: formState.isSubmitted,
    isSubmitting: formState.isSubmitting,
    selectedStakeholders: selectedStakeholders ?? [],
    csamInvolved,
    csamAcknowledgment,
    isSubmitDisabled,
  };
}
