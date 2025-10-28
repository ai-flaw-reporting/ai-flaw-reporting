import { Badge } from "~/components/ui/badge";
import SummaryField from "./summary-field";
import { REPORT_SUMMARY_CONFIG } from "~/entities/ai-flaw-report/model/form-data/review-and-submit-fields-config";
import { getAiSystem } from "~/entities/ai-flaw-report/lib/utils";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";

export default function AiSystemBadge() {
  const { getValues } = useAiFlawFormContext();
  const formData = getValues("reporterDetails");
  return (
    <SummaryField label={REPORT_SUMMARY_CONFIG.aiSystem}>
      <Badge className="badge" variant="outline">
        {getAiSystem({ reporterDetails: formData })}
      </Badge>
    </SummaryField>
  );
}
