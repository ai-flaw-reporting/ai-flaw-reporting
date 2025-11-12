import type { FieldConfig } from "../types";

export type SecurityDetailsFieldName =
  | "securityDetails.substrateRelationship"
  | "securityDetails.substrateRelationshipOther"
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
  label: "Reporter Relationship",
  placeholder: "Choose an option",
  type: "select",
  options: [
    { value: "affected_stakeholder", label: "Affected stakeholder" },
    { value: "independent_observer", label: "Independent observer" },
    { value: "system_developer", label: "System developer" },
    { value: "other", label: "Other" },
  ] as const,
};

export const SUBSTRATE_RELATIONSHIP_OTHER_FIELD = {
  name: "securityDetails.substrateRelationshipOther",
  label: "Other reporter relationship",
  placeholder: "Please specify",
  type: "input",
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
  title: "Malign Actor details",
  icon: "/icons/form/mask.svg",
  label: "Attackers Resources",
  placeholder: "Choose an option",
  description: "Select the types of access or control the attacker has",
  type: "select",
  options: [
    {
      value: "training_data_feedback_control",
      label: "Training data/feedback control",
    },
    {
      value: "model_system_supply_chain_control",
      label: "Model/system supply chain control",
    },
    {
      value: "direct_query_access_white_box",
      label: "Direct query access — white-box",
    },
    {
      value: "direct_query_access_black_box",
      label: "Direct query access — black-box",
    },
    {
      value: "direct_query_access_grey_box",
      label: "Direct query access — grey-box",
    },
    {
      value: "application_plugin_supply_chain_control",
      label: "Application/plugin supply chain control",
    },
    {
      value: "application_plugin_output_control",
      label: "Application/plugin output control",
    },
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
    { value: "availability_breakdown", label: "Availability breakdown" },
    { value: "integrity_violation", label: "Integrity violation" },
    { value: "privacy_compromise", label: "Privacy compromise" },
    { value: "abuse_violation", label: "Abuse violation" },
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
    { value: "user_observation", label: "User observation" },
    { value: "monitoring", label: "Monitoring" },
    { value: "testing", label: "Testing" },
    { value: "external_report", label: "External report" },
    { value: "automated_analysis", label: "Automated analysis" },
    { value: "unknown", label: "Unknown" },
  ] as const,
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
