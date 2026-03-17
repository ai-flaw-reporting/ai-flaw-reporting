import { useCallback, useState } from "react";
import JSZip from "jszip";
import { useAiFlawFormContext } from "./useAiFlawFormContext";
import { getReportType } from "../../lib/utils";
import { convertToJsonLd } from "../../lib/jsonld-converter";
import { convertToCert } from "../../lib/cert-converter";

export function useDownloadReport() {
  const { getValues } = useAiFlawFormContext();
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadReport = useCallback(async () => {
    const formData = getValues();
    if (!formData) return;

    setIsDownloading(true);

    try {
      const metadata = {
        createdAt: new Date().toISOString(),
        schemaVersion: "1.0",
        reportType: getReportType(formData),
      };

      const zip = new JSZip();

      // JSON-LD file
      const jsonLd = convertToJsonLd(formData, metadata);
      zip.file("report.jsonld", jsonLd);

      // CERT / VINCE format file
      const certJson = convertToCert(formData);
      zip.file("report-cert.json", certJson);

      // Original JSON report
      const { evidence, ...formDataWithoutFiles } = formData;
      const { attachments: _unused, ...evidenceRest } = evidence;
      void _unused;
      const cleanReportData = {
        metadata,
        ...formDataWithoutFiles,
        evidence: evidenceRest,
      };
      zip.file(
        "report.json",
        JSON.stringify(cleanReportData, null, 2),
      );

      // Attachments from Step 4
      const attachments = formData.evidence?.attachments ?? [];
      if (attachments.length > 0) {
        const attachmentsFolder = zip.folder("attachments");
        if (attachmentsFolder) {
          for (const file of attachments) {
            const buffer = await file.arrayBuffer();
            attachmentsFolder.file(file.name, buffer);
          }
        }
      }

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);

      const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-")
        .slice(0, -5);

      const link = document.createElement("a");
      link.href = url;
      link.download = `ai-flaw-report-${timestamp}.zip`;
      link.click();

      URL.revokeObjectURL(url);
    } finally {
      setIsDownloading(false);
    }
  }, [getValues]);

  return { downloadReport, isDownloading };
}
