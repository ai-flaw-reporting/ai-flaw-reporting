import { Badge } from "~/components/ui/badge";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";

export default function ModeOfDetection() {
  const { getValues } = useAiFlawFormContext();
  const discoveryContext = getValues("impactAssessment.discoveryContext");

  if (!discoveryContext) return <span className="text-sm text-gray-600">—</span>;

  return (
    <Badge variant="outline" className="badge capitalize">
      {discoveryContext}
    </Badge>
  );
}
