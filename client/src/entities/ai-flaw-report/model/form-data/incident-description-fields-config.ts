import type { FieldConfig } from "../types";

export type IncidentDescriptionFieldName =
  | "incidentDescription.issueDescription"
  | "incidentDescription.expectedBehavior"
  | "incidentDescription.actualBehavior"
  | "incidentDescription.policyViolation.url"
  | "incidentDescription.policyViolation.reason";

export type IncidentDescriptionFieldConfig = FieldConfig & {
  name: IncidentDescriptionFieldName;
  title: string;
  icon: string;
  rows?: number;
  maxLength?: number;
};

export const ISSUE_DESCRIPTION_FIELD: IncidentDescriptionFieldConfig = {
  name: "incidentDescription.issueDescription",
  title: "Issue Description",
  icon: "/icons/form/document.svg",
  label: "Describe the flaw or incident",
  type: "textarea",
  rows: 3,
  maxLength: 5000,
  placeholder:
    "Provide a clear, detailed description of the issue you encountered. Include what happened, when it happened, and any relevant context...",
  description:
    "Be as specific as possible. This helps developers understand and reproduce the issue.",
  required: true,
};

export const EXPECTED_BEHAVIOR_FIELD: IncidentDescriptionFieldConfig = {
  name: "incidentDescription.expectedBehavior",
  title: "Expected Behavior",
  icon: "/icons/form/shield-success.svg",
  label: "What should have happened?",
  type: "textarea",
  rows: 3,
  maxLength: 5000,
  placeholder:
    "What outcome did you expect, and how should the system have responded or handled the situation if functioning properly?",
};

export const ACTUAL_BEHAVIOR_FIELD: IncidentDescriptionFieldConfig = {
  name: "incidentDescription.actualBehavior",
  title: "Actual Behavior",
  icon: "/icons/form/shield-error.svg",
  label: "What actually happened?",
  type: "textarea",
  rows: 3,
  maxLength: 5000,
  placeholder: "How did the system behave differently from what you expected?",
};

export const POLICY_VIOLATION_FIELDS = {
  title: "Policy Violations",
  icon: "/icons/form/warning-outline.svg",
  description: "Select any policies or guidelines that this issue may violate:",
  url: {
    name: "incidentDescription.policyViolation.url",
    label: "Policy / Guideline Link",
    type: "input",
    inputType: "url",
    placeholder: "Enter policy/guideline URL",
  } as IncidentDescriptionFieldConfig,
  reason: {
    name: "incidentDescription.policyViolation.reason",
    label: "Why is this a policy violation?",
    type: "textarea",
    rows: 3,
    maxLength: 2000,
    placeholder: "Explain how this issue violates the selected policy...",
    description: "This could be an explanation text for this field.",
  } as IncidentDescriptionFieldConfig,
};
