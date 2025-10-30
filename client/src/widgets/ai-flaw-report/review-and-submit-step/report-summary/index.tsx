import { Item, ItemContent, ItemTitle } from "~/components/ui/item";

import { REPORT_SUMMARY_CONFIG } from "~/entities/ai-flaw-report/model/form-data/review-and-submit-fields-config";

import ReportSummaryHeader from "./report-summary-header";
import SummaryField from "./summary-field";
import RiskAssessment from "./risk-assessment";
import Classification from "./classification";
import Stakeholders from "./stakeholders";
import ReportTypeBadge from "./report-type-badge";
import AiSystemBadge from "./ai-system-badge";

export function ReportSummary() {
  return (
    <Item variant="outline" className="form-item-card">
      <ItemContent className="gap-4">
        <ItemTitle className="flex w-full items-center justify-between">
          <ReportSummaryHeader
            title={REPORT_SUMMARY_CONFIG.title}
            iconSrc={REPORT_SUMMARY_CONFIG.icon}
          />
        </ItemTitle>

        <dl className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <ReportTypeBadge />

            <AiSystemBadge />

            <SummaryField label={REPORT_SUMMARY_CONFIG.riskAssessment}>
              <RiskAssessment />
            </SummaryField>
          </div>

          <div className="space-y-4">
            <SummaryField label={REPORT_SUMMARY_CONFIG.classification}>
              <Classification />
            </SummaryField>

            <SummaryField label={REPORT_SUMMARY_CONFIG.affectedStakeholders}>
              <Stakeholders />
            </SummaryField>
          </div>
        </dl>
      </ItemContent>
    </Item>
  );
}
