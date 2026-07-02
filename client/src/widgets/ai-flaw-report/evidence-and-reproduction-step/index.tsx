import Image from "next/image";
import { useWatch } from "react-hook-form";

import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";

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
      <div className="flex items-center justify-center gap-2">
        <Image
          src="/icons/warning-triangle.svg"
          alt=""
          width={22}
          height={20}
          className="shrink-0"
          aria-hidden="true"
        />
        <p className="text-sm font-medium text-gray-500">
          Please do not include sensitive information, especially CSAM or
          personal data
        </p>
      </div>
    </div>
  );
}
