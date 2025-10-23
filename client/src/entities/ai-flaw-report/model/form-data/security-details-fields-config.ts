import type { FieldConfig } from "../types";

export type SecurityDetailsFieldName =
  | "securityDetails.substrateRelationship"
  | "securityDetails.incidentLocation"
  | "securityDetails.harmNarrative"
  | "securityDetails.attackerResources"
  | "securityDetails.attackerResourcesOther"
  | "securityDetails.attackerObjectives"
  | "securityDetails.attackerObjectivesOther"
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
  title: "Real-World incident details",
  icon: "/icons/form/tree.svg",
  label: "Substrate Relationship",
  placeholder: "Choose an option",
  description:
    "Tell us if you saw this, were hurt by this built the system, or other",
  type: "select",
  options: [
    { value: "ai_system", label: "AI system" },
    { value: "human_operator", label: "Human operator" },
    { value: "third_party_integration", label: "Third-party integration" },
    { value: "other", label: "Other" },
  ] as const,
};

export const INCIDENT_LOCATION_FIELD = {
  name: "securityDetails.incidentLocation",
  label: "Incident Location(s)",
  placeholder: "Enter location and press Enter",
  description:
    "Enter the place (city, country) where this incident took place. Hit enter after typing the location info.",
  type: "input",
};

export const HARM_NARRATIVE_FIELD = {
  name: "securityDetails.harmNarrative",
  label: "Harm Narrative",
  placeholder:
    "Explain why the incident is harmful and how the flaw caused it.",
  type: "textarea",
  rows: 4,
  maxLength: 500,
};

export const ATTACKER_RESOURCES_FIELD = {
  name: "securityDetails.attackerResources",
  title: "Malignant Actor details",
  icon: "/icons/form/mask.svg",
  label: "Attackers Resources",
  placeholder: "Choose an option",
  description: "Select the types of access or control the attacker has",
  type: "select",
  options: [
    { value: "individual_user", label: "Individual user" },
    { value: "organization", label: "Organization" },
    { value: "automated_script_bot", label: "Automated script/bot" },
    { value: "unknown", label: "Unknown" },
    { value: "other", label: "Other" },
  ] as const,
};

export const ATTACKER_RESOURCES_OTHER_FIELD = {
  name: "securityDetails.attackerResourcesOther",
  label: "Other attacker resource",
  placeholder: "Please specify",
  type: "input",
};

export const ATTACKER_OBJECTIVES_FIELD = {
  name: "securityDetails.attackerObjectives",
  label: "Attacker Objectives",
  placeholder: "Choose an option",
  description: "Select what the attacker is trying to achieve",
  type: "select",
  options: [
    { value: "financial_gain", label: "Financial gain" },
    { value: "reputation_damage", label: "Reputation damage" },
    { value: "data_exfiltration", label: "Data exfiltration" },
    { value: "model_poisoning", label: "Model poisoning" },
    { value: "misuse_demonstration", label: "Misuse demonstration" },
    { value: "other", label: "Other" },
  ] as const,
};

export const ATTACKER_OBJECTIVES_OTHER_FIELD = {
  name: "securityDetails.attackerObjectivesOther",
  label: "Other attacker objective",
  placeholder: "Please specify",
  type: "input",
};

export const DETECTION_METHOD_FIELD = {
  name: "securityDetails.detectionMethod",
  title: "Security incident details",
  icon: "/icons/form/robot.svg",
  label: "Detection",
  placeholder: "Select the options",
  description:
    "Describe methods you used to discover or observe this incident.",
  type: "select",
  options: [
    { value: "manual_review", label: "Manual review" },
    { value: "automated_monitoring", label: "Automated monitoring" },
    { value: "user_report", label: "User report" },
    { value: "unknown", label: "Unknown" },
  ] as const,
};

export const DISCOVERY_NARRATIVE_FIELD = {
  name: "securityDetails.discoveryNarrative",
  title: "Statistical Argument with Examples",
  icon: "/icons/form/refresh.svg",
  label: "Explain with examples why this flaw is likely to reoccur.",
  description:
    "Include exact prompts, settings, and conditions. Use numbered steps for clarity.",
  type: "textarea",
  rows: 6,
};
