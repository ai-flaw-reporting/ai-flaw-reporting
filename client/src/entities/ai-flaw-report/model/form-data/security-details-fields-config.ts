import type { FieldConfig } from "../types";

export type SecurityDetailsFieldName =
  | "securityDetails.substrateRelationship"
  | "securityDetails.incidentLocation"
  | "securityDetails.harmNarrative"
  | "securityDetails.attackerResources"
  | "securityDetails.attackerObjectives"
  | "securityDetails.detectionMethod"
  | "securityDetails.discoveryNarrative";

export type SecurityDetailsFieldConfig = FieldConfig & {
  name: string;
  title?: string;
  icon?: string;
  rows?: number;
  maxLength?: number;
  options?: { value: string; label: string; description?: string }[];
};

export const SUBSTRATE_RELATIONSHIP_FIELD = {
  name: "securityDetails.substrateRelationship",
  title: "Incident Details",
  icon: "/icons/form/tree.svg",
  label: "Your relationship to affected parties",
  placeholder: "e.g. Affected stakeholder, Independent observer",
  type: "input",
};

export const INCIDENT_LOCATION_FIELD = {
  name: "securityDetails.incidentLocation",
  label: "Geographic location",
  placeholder: "e.g. San Francisco, CA, USA",
  type: "input",
};

export const HARM_NARRATIVE_FIELD = {
  name: "securityDetails.harmNarrative",
  label: "Describe the harm that occurred",
  placeholder:
    "Explain what harm occurred, why the incident is harmful, and how the flaw caused it.",
  type: "textarea",
  rows: 6,
  maxLength: 2000,
};

export const ATTACKER_RESOURCES_FIELD: SecurityDetailsFieldConfig & {
  icon: string;
} = {
  name: "securityDetails.attackerResources",
  title: "Threat Actor Exploitation Details",
  icon: "/icons/form/mask.svg",
  label: "Required attacker resources",
  placeholder:
    "e.g. technical skill, special access, insider knowledge, compute resources",
  description:
    "Describe the resources an attacker would need to exploit this flaw.",
  type: "textarea",
  rows: 4,
};

export const ATTACKER_OBJECTIVES_FIELD: SecurityDetailsFieldConfig = {
  name: "securityDetails.attackerObjectives",
  label: "What could an attacker accomplish?",
  placeholder:
    "e.g. data exfiltration, service disruption, unauthorized access",
  description: "Describe what an attacker could achieve by exploiting this flaw.",
  type: "textarea",
  rows: 4,
};

export const DETECTION_METHOD_FIELD: SecurityDetailsFieldConfig = {
  name: "securityDetails.detectionMethod",
  label: "How could this be detected?",
  placeholder:
    "e.g. log monitoring, anomaly detection, user reports, automated testing",
  description:
    "Describe methods to detect or prevent exploitation of this flaw.",
  type: "textarea",
  rows: 4,
};

export const DISCOVERY_NARRATIVE_FIELD = {
  name: "securityDetails.discoveryNarrative",
  title: "Statistical Argument with Examples",
  icon: "/icons/form/refresh.svg",
  label: "",
  placeholder: "Explain with examples why this flaw is likely to reoccur.",
  description: "",
  type: "textarea",
  rows: 6,
};
