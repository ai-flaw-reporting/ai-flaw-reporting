import { Badge } from "~/components/ui/badge";
import { formatStakeholder } from "~/entities/ai-flaw-report/lib/utils";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";

export default function Stakeholders() {
  const { getValues } = useAiFlawFormContext();

  const stakeholders = getValues("impactAssessment.affectedStakeholders");
  if (!stakeholders?.length) return <span className="text-gray-600">—</span>;

  return (
    <div className="flex flex-wrap gap-2">
      {stakeholders.map((stakeholder, index) => (
        <Badge
          key={`${stakeholder}-${index}`}
          variant="outline"
          className="badge capitalize"
        >
          {formatStakeholder(stakeholder)}
        </Badge>
      ))}
    </div>
  );
}
