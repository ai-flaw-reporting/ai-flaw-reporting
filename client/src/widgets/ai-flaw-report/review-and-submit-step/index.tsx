import { ReportSummary } from "./report-summary";
import { DownloadReport } from "./download-report";
import { SubmitStakeholders } from "./submit-stakeholders";
import { CsamWarning } from "../csam-warning";

export function ReviewAndSubmitStep() {
  return (
    <div className="space-y-4">
      <ReportSummary />
      <CsamWarning />
      <DownloadReport />
      <SubmitStakeholders />
    </div>
  );
}
