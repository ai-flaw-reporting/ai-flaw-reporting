import { useWatch } from "react-hook-form";

import { useAiFlawFormContext } from "~/entities/ai-flaw-report";

import { StepsToReproduceField } from "./steps-to-reproduce-field";
import { ProofOfConceptField } from "./proof-of-concept-field";
import { FileAttachmentsField } from "./file-attachments-field";
import { EvidenceCollectionSkipped } from "./evidence-collection-skipped";

export function EvidenceAndReproductionStep() {
  const { control } = useAiFlawFormContext();

  const csamInvolved = useWatch({
    control,
    name: "classifyReport.csam_involved",
  });

  if (csamInvolved) {
    return <EvidenceCollectionSkipped />;
  }

  return (
    <div className="space-y-4">
      <StepsToReproduceField />
      <ProofOfConceptField />
      <FileAttachmentsField />
    </div>
  );
}
