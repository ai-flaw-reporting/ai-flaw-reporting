import dynamic from "next/dynamic";
import { Download, Loader2 } from "lucide-react";
import { useSubmission } from "~/features/ai-flaw-report/multi-step-form/submission-context";
import { useDownloadReport } from "~/entities/ai-flaw-report/model/hooks/useDownloadReport";

const CheckCircleOutlineIcon = dynamic(() =>
  import("~/components/icons/check-circle-outline-icon").then(
    (mod) => mod.CheckCircleOutlineIcon,
  ),
);

function DownloadReportButton() {
  const { downloadReport, isDownloading } = useDownloadReport();

  return (
    <button
      type="button"
      onClick={downloadReport}
      disabled={isDownloading}
      className="mt-4 flex cursor-pointer items-center gap-2 text-base font-bold text-gray-900 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50 dark:text-white dark:hover:text-gray-200"
    >
      {isDownloading ? (
        <Loader2 className="size-5 animate-spin" aria-hidden="true" />
      ) : (
        <Download className="size-5" aria-hidden="true" color="currentColor" />
      )}
      {isDownloading ? "Generating..." : "Download Report"}
    </button>
  );
}

export function SubmissionSuccessStep() {
  const { submittedOrganizations } = useSubmission();

  return (
    <div className="flex flex-col items-center py-12 text-center">
      <CheckCircleOutlineIcon className="text-success-700 size-12" />

      <h1 className="mt-5 text-3xl font-bold text-gray-900 dark:text-white">
        Report Successfully Filed
      </h1>

      <p className="mt-4 max-w-lg text-sm leading-relaxed text-gray-600 dark:text-gray-300">
        Thank you for contributing to AI safety. Your report has been filed and
        cannot be modified. A confirmation has been sent to your email.
      </p>

      {submittedOrganizations.length > 0 && (
        <div className="mt-8">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Submitted to following organizations:
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {submittedOrganizations.map((org) => (
              <span
                key={org}
                className="rounded-full border border-gray-200 px-4 py-1 text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                {org}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="my-5 h-px w-full max-w-md bg-gray-200 dark:bg-gray-700" />

      <p className="max-w-md text-sm leading-relaxed text-gray-600 dark:text-gray-300">
        Download a machine-readable copy of your report for your records or to
        share with other organizations.
      </p>

      <DownloadReportButton />
    </div>
  );
}
