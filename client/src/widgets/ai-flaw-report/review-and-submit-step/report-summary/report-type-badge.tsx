import { Badge } from "~/components/ui/badge";
import SummaryField from "./summary-field";
import { REPORT_SUMMARY_CONFIG } from "~/entities/ai-flaw-report/model/form-data/review-and-submit-fields-config";
import { getReportType } from "~/entities/ai-flaw-report/lib/utils";
import { useAiFlawFormContext } from "~/entities/ai-flaw-report/model/hooks/useAiFlawFormContext";

export default function ReportTypeBadge() {
  const { getValues } = useAiFlawFormContext();
  const formData = getValues("classifyReport");
  return (
    <SummaryField label={REPORT_SUMMARY_CONFIG.reportType}>
      <Badge className="badge" variant="outline">
        {getReportType({ classifyReport: formData })}
      </Badge>
    </SummaryField>
  );
}
