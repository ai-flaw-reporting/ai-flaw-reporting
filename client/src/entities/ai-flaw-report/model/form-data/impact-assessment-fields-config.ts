import { FORM_VALUES } from "../constants";
import type { FieldConfig } from "../types";

export type ImpactAssessmentFieldName =
  | "impactAssessment.severityOfHarm"
  | "impactAssessment.prevalence"
  | "impactAssessment.harmType"
  | "impactAssessment.harmTypes"
  | "impactAssessment.harmOtherText"
  | "impactAssessment.specificImpactTypes"
  | "impactAssessment.affectedStakeholders"
  | "impactAssessment.stakeholdersOtherText"
  | "impactAssessment.aiCompanyInvolved"
  | "impactAssessment.mitigationNotes";

export type ImpactAssessmentFieldConfig = FieldConfig & {
  name: string;
  title?: string;
  icon?: string;
  rows?: number;
  maxLength?: number;
  options?: { value: string; label: string; description?: string }[];
  minValue?: string;
  maxValue?: string;
};

export const SEVERITY_OF_HARM_FIELD = {
  name: "impactAssessment.severityOfHarm",
  title: "Severity of Harm",
  icon: "/icons/form/warning-outline.svg",
  label: "How severe is the potential harm?",
  options: ["negligible", "minor", "moderate", "severe", "critical"] as const,
  type: "input",
  minValue: "Negligible",
  maxValue: "Critical",
};

export const PREVALENCE_FIELD = {
  name: "impactAssessment.prevalence",
  title: "Prevalence",
  icon: "/icons/form/prevalence.svg",
  label: "How common is this issue?",
  options: ["rare", "uncommon", "common", "widespread"] as const,
  type: "input",
  minValue: "Rare",
  maxValue: "Widespread",
};

export const HARM_OPTION_VALUE = {
  DOCUMENTED: "documented",
  NEW: "new",
} as const;

export const HARM_TYPE_FIELD = {
  name: "impactAssessment.harmType",
  title: "Harm Type",
  icon: "/icons/form/document.svg",
  label: "Select the type of harm",
  type: "input",
  options: [
    {
      value: HARM_OPTION_VALUE.DOCUMENTED,
      label: "Documented Harm",
      description: "Save my login details for next time.",
    },
    {
      value: HARM_OPTION_VALUE.NEW,
      label: "New Harm",
      description: "Save my login details for next time.",
    },
  ] as const,
};

export const HARM_TYPES_FIELD = {
  name: "impactAssessment.harmTypes",
  title: "Type of Harm/Impact",
  icon: "/icons/form/circle.svg",
  label: "Select all types of harm or impact that apply:",
  type: "input",
  options: [
    {
      value: "psychological",
      label: "Psychological Harm",
      description: "Mental distress, anxiety, trauma",
    },
    {
      value: "reputational",
      label: "Reputational Harm",
      description: "Damage to reputation or standing",
    },
    {
      value: "rights_violation",
      label: "Rights Violations",
      description: "Civil rights, privacy violations",
    },
    {
      value: "misinformation",
      label: "Misinformation",
      description: "Spread of false information",
    },
    {
      value: "financial_harm",
      label: "Financial Harm",
      description: "Economic losses, fraud, theft",
    },
    {
      value: "physical_harm",
      label: "Physical Harm",
      description: "Bodily injury or physical danger",
    },
    {
      value: "discrimination",
      label: "Discrimination",
      description: "Bias against protected groups",
    },
    {
      value: FORM_VALUES.OTHER_LOWERCASE,
      label: "Other",
      description: "Other types of harm",
    },
  ] as const,
};

export const SPECIFIC_IMPACT_TYPES_FIELD: ImpactAssessmentFieldConfig = {
  name: "impactAssessment.specificImpactTypes",
  title: "Specific Impact Types",
  icon: "/icons/form/arrow.svg",
  label:
    "Select the specific types of harm that apply based on your impact selections.",
  type: "input",
  options: [],
};

export const AFFECTED_STAKEHOLDERS_FIELD = {
  name: "impactAssessment.affectedStakeholders",
  title: "Affected Stakeholders",
  icon: "/icons/form/stakeholders.svg",
  label: "Select all types of harm or impact that apply:",
  type: "input",
  options: [
    {
      value: "end_users",
      label: "End Users",
      description: "People using the AI system",
    },
    {
      value: "ai_company",
      label: "AI Company",
      description: "Organization providing the service",
    },
    {
      value: "researchers",
      label: "Researchers",
      description: "AI safety and security researchers",
    },
    {
      value: "general_public",
      label: "General Public",
      description: "Broader society impact",
    },
    {
      value: "specific_groups",
      label: "Specific Groups",
      description: "Targeted communities or demographics",
    },

    {
      value: "critical_systems",
      label: "Discrimination",
      description: "Critical systems and services",
    },
    {
      value: FORM_VALUES.OTHER_LOWERCASE,
      label: "Other",
      description: "Other affected parties",
    },
  ] as const,
};

export const AI_COMPANY_OPTIONS = [
  { id: "openai", label: "OpenAI" },
  { id: "google", label: "Google" },
  { id: "anthropic", label: "Anthropic" },
  { id: "meta", label: "Meta" },
  { id: "microsoft", label: "Microsoft" },
  { id: "xai", label: "xAI" },
  { id: "huggingface", label: "Hugging Face" },
  { id: "groq", label: "Groq" },
  { id: "perplexity", label: "Perplexity AI" },
  { id: "cohere", label: "Cohere" },
  { id: "replicate", label: "Replicate" },
  { id: "together", label: "Together AI" },
  { id: "mistral", label: "Mistral" },
  { id: "ai-incident-db", label: "AI Incident Database" },
  { id: "aiaaic", label: "AIAAIC Repository" },
  { id: "avid", label: "AI Vulnerability Database (AVID)" },
  { id: "oecd", label: "OECD AI Policy Observatory" },
  { id: "other", label: "Other" },
] as const;

export const AI_COMPANY_INVOLVED_FIELD = {
  name: "impactAssessment.aiCompanyInvolved",
  label: "AI Company involved",
  type: "select",
  options: AI_COMPANY_OPTIONS,
  placeholder: "Select AI companies",
};

export const MITIGATION_NOTES_FIELD = {
  name: "impactAssessment.mitigationNotes",
  label: "Any embargo or coordination requirements?",
  type: "textarea",
  maxLength: 2000,
  placeholder:
    "Describe any coordination with vendors, embargo periods, or special disclosure requirements....",
  description:
    "This helps coordinate responsible disclosure with affected parties",
};
