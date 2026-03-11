import { Badge } from "~/components/ui/badge";
import SummaryField from "./summary-field";
import { REPORT_SUMMARY_CONFIG } from "~/entities/ai-flaw-report/model/form-data/review-and-submit-fields-config";
import { getAiSystem } from "~/entities/ai-flaw-report/lib/utils";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";

export default function AiSystemBadge() {
  const { getValues } = useAiFlawFormContext();
  const formData = getValues("reporterDetails");

  const aiSystems = getAiSystem(formData);
  if (!aiSystems?.length) return <span className="text-gray-600">—</span>;

  return (
    <SummaryField label={REPORT_SUMMARY_CONFIG.aiSystem}>
      <div className="flex flex-wrap gap-2">
        {aiSystems.map((system) => (
          <Badge key={system} className="badge" variant="outline">
            {system}
          </Badge>
        ))}
      </div>
    </SummaryField>
  );
}
