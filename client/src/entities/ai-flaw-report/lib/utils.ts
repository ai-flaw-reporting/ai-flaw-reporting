import { SAVE_STATUS_KEY_PREFIX, FORM_VALUES } from "../model/constants";

export const saveFormSaveStatus = (dataToSave: unknown, stepId: string) => {
  localStorage.setItem(
    `${SAVE_STATUS_KEY_PREFIX}${stepId}`,
    JSON.stringify(dataToSave),
  );
};

export const getFormSaveStatus = (stepId: string): unknown => {
  const saved = localStorage.getItem(`${SAVE_STATUS_KEY_PREFIX}${stepId}`);
  return saved ? JSON.parse(saved) : null;
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

export function getAiSystem(formData: {
  reporterDetails?: {
    system?: {
      platform?: string;
      platformOther?: string;
    };
  };
}): string | undefined {
  const platform = formData?.reporterDetails?.system?.platform;
  return platform === FORM_VALUES.OTHER
    ? formData?.reporterDetails?.system?.platformOther
    : platform;
}

export function formatStakeholder(stakeholder: string): string {
  return stakeholder.replace(/_/g, " ");
}
