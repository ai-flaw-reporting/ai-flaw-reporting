import { useWatch } from "react-hook-form";

import { Badge } from "~/components/ui/badge";

import {
  PREVALENCE_FIELD,
  useAiFlawFormContext,
} from "~/entities/ai-flaw-report";

export function PrevalenceBadge() {
  const { control } = useAiFlawFormContext();
  const selected = useWatch({ control, name: "impactAssessment.prevalence" });

  return (
    <Badge variant="outline" className="max-h-[25.76px] capitalize">
      {selected ?? PREVALENCE_FIELD.minValue}
    </Badge>
  );
}
