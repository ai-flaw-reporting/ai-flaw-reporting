import { useWatch } from "react-hook-form";
import { Badge } from "~/components/ui/badge";
import { SEVERITY_OF_HARM_FIELD } from "~/entities/ai-flaw-report/model/form-data/impact-assessment-fields-config";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";

export function SeverityHarmBadge() {
  const { control } = useAiFlawFormContext();

  const selected = useWatch({
    control,
    name: "impactAssessment.severityOfHarm",
  });

  return (
    <Badge variant="outline" className="max-h-[25.76px] capitalize">
      {selected ?? SEVERITY_OF_HARM_FIELD.minValue}
    </Badge>
  );
}
