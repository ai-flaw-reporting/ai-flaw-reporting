import { Badge } from "~/components/ui/badge";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";

export default function RiskAssessment() {
  const { getValues } = useAiFlawFormContext();

  const severity = getValues("impactAssessment.severityOfHarm");
  const prevalence = getValues("impactAssessment.prevalence");

  return (
    <div className="space-x-2">
      <Badge
        variant="outline"
        className="bg-error-600 text-gray-25 border-error-600 dark:border-error-600 rounded-[6px] px-2 py-[3px] text-xs font-bold capitalize"
      >
        Severity: {severity ?? "—"}
      </Badge>
      <Badge variant="outline" className="badge capitalize">
        Prevalence: {prevalence ?? "—"}
      </Badge>
    </div>
  );
}
