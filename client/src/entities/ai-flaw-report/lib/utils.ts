import { SAVE_STATUS_KEY_PREFIX } from "../model/constants";
import type { AiFlawReportSchema } from "../model/types";

/**
 * Recursively removes File objects and File arrays from data to allow localStorage serialization.
 * Files cannot be stored in localStorage, so we strip them before saving.
 */
export const removeFilesFromData = (data: unknown): unknown => {
  if (data === null || data === undefined) {
    return data;
  }

  // Handle File objects - return undefined to remove them
  if (data instanceof File) {
    return undefined;
  }

  // Handle arrays
  if (Array.isArray(data)) {
    // Check if this is a File array (all items are Files)
    if (data.length > 0 && data[0] instanceof File) {
      return undefined; // Remove entire File array
    }
    // For other arrays, recursively process items
    return data
      .map((item) => removeFilesFromData(item))
      .filter((item) => item !== undefined);
  }

  // Handle objects
  if (typeof data === "object" && data !== null) {
    const cleaned: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      const cleanedValue = removeFilesFromData(value);
      // Only include the key if the cleaned value is not undefined
      if (cleanedValue !== undefined) {
        cleaned[key] = cleanedValue;
      }
    }
    return cleaned;
  }

  // For all other types (string, number, boolean, etc.), return as-is
  return data;
};

export const saveFormSaveStatus = (dataToSave: unknown, stepId: string) => {
  // Remove files before saving to localStorage
  const dataWithoutFiles = removeFilesFromData(dataToSave);

  localStorage.setItem(
    `${SAVE_STATUS_KEY_PREFIX}${stepId}`,
    JSON.stringify(dataWithoutFiles),
  );
};

export const getFormSaveStatus = (stepId: string): unknown => {
  const saved = localStorage.getItem(`${SAVE_STATUS_KEY_PREFIX}${stepId}`);
  return saved ? JSON.parse(saved) : null;
};

export const clearAllFormSaveStatus = () => {
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(SAVE_STATUS_KEY_PREFIX)) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach((key) => localStorage.removeItem(key));
};

export function getReportType(formData: {
  classifyReport?: {
    csam_involved?: boolean;
    malicious_use?: boolean;
    real_world_harm?: boolean;
  };
}): string {
  if (!formData?.classifyReport) return "Policy Violation";

  const { classifyReport } = formData;
  if (classifyReport?.csam_involved) return "CSAM";
  if (classifyReport?.malicious_use) return "Malicious Use";
  if (classifyReport?.real_world_harm) return "Real-World Harm";
  return "Policy Violation";
}

export function getAiSystem(
  formData: AiFlawReportSchema["reporterDetails"],
): string[] | undefined {
  if (!formData?.systems?.length) return undefined;
  return formData.systems.map((s) => {
    const parts = [s.platform, s.model];
    if (s.accessMethod) parts.push(s.accessMethod);
    return parts.join(" \u2192 ");
  });
}

export function formatStakeholder(stakeholder: string): string {
  return stakeholder.replace(/_/g, " ");
}
