import { Item, ItemContent, ItemTitle } from "~/components/ui/item";
import { Separator } from "~/components/ui/separator";

import { REPORT_SUMMARY_CONFIG } from "~/entities/ai-flaw-report/model/form-data/review-and-submit-fields-config";

import ReportSummaryHeader from "./report-summary-header";
import SummaryField from "./summary-field";
import RiskAssessment from "./risk-assessment";
import Classification from "./classification";
import Stakeholders from "./stakeholders";
import ReportTypeBadge from "./report-type-badge";
import AiSystemBadge from "./ai-system-badge";
import HarmClassification from "./harm-classification";
import DisclosurePlanSummary from "./disclosure-plan-summary";
import FilesUploaded from "./files-uploaded";
import ModeOfDetection from "./mode-of-detection";
import IssueDescription from "./issue-description";

export function ReportSummary() {
  return (
    <Item variant="outline" className="form-item-card">
        <ItemContent className="min-w-0 gap-4">
        <ItemTitle className="flex w-full items-center justify-between">
          <ReportSummaryHeader
            title={REPORT_SUMMARY_CONFIG.title}
            iconSrc={REPORT_SUMMARY_CONFIG.icon}
          />
        </ItemTitle>

        <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="min-w-0 space-y-4">
            <ReportTypeBadge />

            <AiSystemBadge />

            <SummaryField label={REPORT_SUMMARY_CONFIG.riskAssessment}>
              <RiskAssessment />
            </SummaryField>

            <SummaryField label={REPORT_SUMMARY_CONFIG.harmClassification}>
              <HarmClassification />
            </SummaryField>

            <SummaryField label={REPORT_SUMMARY_CONFIG.modeOfDetection}>
              <ModeOfDetection />
            </SummaryField>
          </div>

          <div className="min-w-0 space-y-4">
            <SummaryField label={REPORT_SUMMARY_CONFIG.classification}>
              <Classification />
            </SummaryField>

            <SummaryField label={REPORT_SUMMARY_CONFIG.affectedStakeholders}>
              <Stakeholders />
            </SummaryField>

            <SummaryField label={REPORT_SUMMARY_CONFIG.filesUploaded}>
              <FilesUploaded />
            </SummaryField>

            <SummaryField label={REPORT_SUMMARY_CONFIG.disclosurePlan}>
              <DisclosurePlanSummary />
            </SummaryField>
          </div>
        </dl>

        <Separator />

        <SummaryField label={REPORT_SUMMARY_CONFIG.issueDescription}>
          <IssueDescription />
        </SummaryField>
      </ItemContent>
    </Item>
  );
}
