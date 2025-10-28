import { useCallback } from "react";
import { useAiFlawFormContext } from "./useAiFlawFormContext";
import { getReportType } from "../../lib/utils";

export function useDownloadReport() {
  const { getValues } = useAiFlawFormContext();

  const downloadReport = useCallback(() => {
    const formData = getValues();
    if (!formData) return;

    const reportData = {
      metadata: {
        createdAt: new Date().toISOString(),
        schemaVersion: "1.0",
        reportType: getReportType(formData),
      },
      ...formData,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-")
      .slice(0, -5);

    const link = document.createElement("a");
    link.href = url;
    link.download = `ai-flaw-report-${timestamp}.json`;
    link.click();

    URL.revokeObjectURL(url);
  }, [getValues]);

  return { downloadReport };
}
