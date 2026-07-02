import { useMutation } from "@tanstack/react-query";
import type { AiFlawReportSchema } from "../types";

type CertSubmissionResponse = {
  success: boolean;
  response?: string;
  stderr?: string;
  error?: string;
};

async function submitToCert(
  data: AiFlawReportSchema,
): Promise<CertSubmissionResponse> {
  // Strip File attachments — not JSON-serializable
  const { evidence, ...rest } = data;
  const { attachments: _unused, ...evidenceRest } = evidence;
  void _unused;

  const response = await fetch("/api/submit-cert", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: { ...rest, evidence: evidenceRest } }),
  });

  const result = (await response.json()) as CertSubmissionResponse;

  if (!result.success) {
    throw new Error(result.error ?? `CERT submission failed: ${response.status}`);
  }

  return result;
}

export function useSubmitCertMutation() {
  return useMutation({ mutationFn: submitToCert });
}
