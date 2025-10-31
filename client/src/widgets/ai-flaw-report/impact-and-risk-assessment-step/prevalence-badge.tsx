import { useWatch } from "react-hook-form";

import { Badge } from "~/components/ui/badge";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";
import { PREVALENCE_FIELD } from "~/entities/ai-flaw-report/model/form-data/impact-assessment-fields-config";

export function PrevalenceBadge() {
  const { control } = useAiFlawFormContext();
  const selected = useWatch({ control, name: "impactAssessment.prevalence" });

  return (
    <Badge variant="outline" className="max-h-[25.76px] capitalize">
      {selected ?? PREVALENCE_FIELD.minValue}
    </Badge>
  );
}
