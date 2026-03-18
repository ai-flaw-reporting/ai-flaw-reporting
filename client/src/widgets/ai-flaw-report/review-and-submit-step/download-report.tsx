import { Item, ItemContent, ItemTitle } from "~/components/ui/item";
import Image from "next/image";
import { FileText, Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { DOWNLOAD_REPORT_CONFIG } from "~/entities/ai-flaw-report/model/form-data/review-and-submit-fields-config";
import { useDownloadReport } from "~/entities/ai-flaw-report/model/hooks/useDownloadReport";
import { IncompleteSectionsWarning } from "./incomplete-sections-warning";

function DownloadReportButton() {
  const { downloadReport, isDownloading } = useDownloadReport();

  return (
    <Button
      type="button"
      variant="outline"
      className="flex max-h-7 w-fit cursor-pointer items-center gap-1.5 rounded-[6px] !px-3 !py-1 text-sm font-medium hover:!bg-white"
      onClick={downloadReport}
      disabled={isDownloading}
    >
      {isDownloading ? (
        <Loader2
          className="size-4.5 animate-spin text-gray-800"
          aria-hidden="true"
        />
      ) : (
        <FileText className="size-4.5 text-gray-800" aria-hidden="true" />
      )}
      {isDownloading ? "Generating..." : DOWNLOAD_REPORT_CONFIG.buttonText}
    </Button>
  );
}

export function DownloadReport() {
  return (
    <Item variant="outline" className="form-item-card">
      <ItemContent className="gap-0 space-y-2">
        <ItemTitle className="form-title flex items-baseline gap-4">
          <Image
            src={DOWNLOAD_REPORT_CONFIG.icon}
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
          {DOWNLOAD_REPORT_CONFIG.title}
        </ItemTitle>
        <p className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-100">
          {DOWNLOAD_REPORT_CONFIG.description}
        </p>
        <DownloadReportButton />
        <IncompleteSectionsWarning />
      </ItemContent>
    </Item>
  );
}
