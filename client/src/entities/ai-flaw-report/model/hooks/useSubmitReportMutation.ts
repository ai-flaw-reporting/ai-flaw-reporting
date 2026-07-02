import { useMutation } from "@tanstack/react-query";
import type { AiFlawReportSchema } from "../types";
import { getReportType } from "../../lib/utils";
import { env } from "~/env";

type SubmitReportResponse = { data?: { documentId?: string } };

function transformFormDataToApiFormat(data: AiFlawReportSchema) {
  const { evidence, ...rest } = data;
  const { attachments: _unused, ...evidenceRest } = evidence;
  void _unused;

  const metadata = {
    createdAt: new Date().toISOString(),
    schemaVersion: "1.0",
    reportType: getReportType(data),
  };

  return { ...rest, metadata, evidence: evidenceRest };
}

async function submitReport(
  data: AiFlawReportSchema,
  signal?: AbortSignal,
): Promise<SubmitReportResponse> {
  const endpoint = `${env.NEXT_PUBLIC_STRAPI_URL}/api/reports`;

  const attachments = data.evidence?.attachments || [];
  const hasFiles = attachments.length > 0;
  const transformedData = transformFormDataToApiFormat(data);

  const timeoutMs = hasFiles ? 60000 : 30000;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  // Abort on both timeout and external signal
  signal?.addEventListener("abort", () => controller.abort());

  try {
    let response: Response;

    if (hasFiles) {
      const formData = new FormData();
      formData.append("data", JSON.stringify(transformedData));
      attachments.forEach((file) => {
        formData.append("evidence.attachments", file);
      });

      response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });
    } else {
      response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: transformedData }),
        signal: controller.signal,
      });
    }

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to submit report: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    return response.json() as Promise<SubmitReportResponse>;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error(
          `Request timeout: The server took too long to respond (${timeoutMs / 1000}s). Please check your connection and try again.`,
        );
      }
      if (
        error.message.includes("Failed to fetch") ||
        error.message.includes("NetworkError")
      ) {
        throw new Error(
          "Network error: Unable to reach the server. Please check your internet connection and try again.",
        );
      }
      throw error;
    }
    throw new Error("An unknown error occurred while submitting the report");
  }
}

export function useSubmitReportMutation() {
  return useMutation({
    mutationFn: (data: AiFlawReportSchema) => submitReport(data),
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });
}
