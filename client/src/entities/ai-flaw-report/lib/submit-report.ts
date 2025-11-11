import type { AiFlawReportSchema } from "../model/types";
import { env } from "~/env";

/**
 * Transforms form data to match the API expected format
 * Removes File objects from the data (they'll be sent separately)
 */
function transformFormDataToApiFormat(data: AiFlawReportSchema): Omit<
  AiFlawReportSchema,
  "evidence"
> & {
  evidence: Omit<AiFlawReportSchema["evidence"], "attachments">;
} {
  // Create a deep copy and remove File objects from evidence.attachments
  const { evidence, ...rest } = data;
  const { attachments: _unused, ...evidenceRest } = evidence;
  void _unused; // Explicitly mark as intentionally unused

  return {
    ...rest,
    evidence: evidenceRest,
  };
}

/**
 * Creates an AbortController with a timeout
 * Returns both the controller and a cleanup function to clear the timeout
 */
function createTimeoutController(timeoutMs: number): {
  controller: AbortController;
  cleanup: () => void;
} {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);
  const cleanup = () => clearTimeout(timeoutId);
  return { controller, cleanup };
}

/**
 * Submits the AI flaw report to the API
 * Handles both JSON and multipart/form-data based on whether files are present
 */
export async function submitReport(data: AiFlawReportSchema): Promise<unknown> {
  const apiUrl = env.NEXT_PUBLIC_STRAPI_URL;
  const endpoint = `${apiUrl}/api/reports`;

  const attachments = data.evidence?.attachments || [];
  const hasFiles = attachments.length > 0;

  // Transform data to remove File objects
  const transformedData = transformFormDataToApiFormat(data);

  // Create timeout controller (60 seconds for file uploads, 30 seconds for JSON)
  const timeoutMs = hasFiles ? 60000 : 30000;
  const { controller, cleanup } = createTimeoutController(timeoutMs);

  try {
    let response: Response;

    if (hasFiles) {
      // Use multipart/form-data when files are present
      const formData = new FormData();

      // Add the JSON data as a string
      formData.append("data", JSON.stringify(transformedData));

      // Add each file attachment
      attachments.forEach((file) => {
        formData.append("evidence.attachments", file);
      });

      response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });
    } else {
      // Use application/json when no files are present
      // Wrap in 'data' property for consistency with multipart format
      response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: transformedData }),
        signal: controller.signal,
      });
    }

    // Clear timeout since request completed
    cleanup();

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to submit report: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    return response.json();
  } catch (error) {
    // Clear timeout on error
    cleanup();

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error(
          `Request timeout: The server took too long to respond (${timeoutMs / 1000}s). Please check your connection and try again.`,
        );
      }
      // Check for network errors
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
