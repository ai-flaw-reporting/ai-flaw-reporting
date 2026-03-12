import type { FieldConfig } from "../types";

export type ImpactAssessmentFieldName =
  | "impactAssessment.severityOfHarm"
  | "impactAssessment.prevalence"
  | "impactAssessment.harmType"
  | "impactAssessment.documentedHarmCwe"
  | "impactAssessment.harmTypes"
  | "impactAssessment.harmOtherText"
  | "impactAssessment.specificImpactTypes"
  | "impactAssessment.affectedStakeholders"
  | "impactAssessment.stakeholdersOtherText"
  | "impactAssessment.aiCompanyInvolved"
  | "impactAssessment.mitigationNotes"
  | "impactAssessment.discoveryContext"
  | "impactAssessment.responsibleFactors"
  | "impactAssessment.responsibleFactorsOtherText";

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
  options: [
    "not_sure",
    "negligible",
    "low",
    "medium",
    "high",
    "critical",
  ] as const,
  type: "input",
  minValue: "not_sure",
  maxValue: "critical",
};

export const PREVALENCE_FIELD = {
  name: "impactAssessment.prevalence",
  title: "Prevalence",
  icon: "/icons/form/prevalence.svg",
  label: "How common is this issue?",
  options: [
    "not_sure",
    "isolated",
    "rare",
    "occasional",
    "common",
    "widespread",
  ] as const,
  type: "input",
  minValue: "not_sure",
  maxValue: "widespread",
};

export const HARM_OPTION_VALUE = {
  DOCUMENTED: "documented",
  NEW: "new",
} as const;

export const HARM_TYPE_FIELD = {
  name: "impactAssessment.harmType",
  title: "Harm Classification",
  icon: "/icons/form/document.svg",
  label: "Is this harm already documented or is it a new type of harm?",
  type: "input",
  options: [
    {
      value: HARM_OPTION_VALUE.DOCUMENTED,
      label: "Documented Harm",
      description: "The harm matches an existing category in ",
    },
    {
      value: HARM_OPTION_VALUE.NEW,
      label: "New Harm",
      description: "The harm is not already a category in ",
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
      value: "psychological_harm",
      label: "Psychological Harm",
      description: "Mental distress, anxiety, trauma",
    },
    {
      value: "financial_harm",
      label: "Financial Harm",
      description: "Economic losses, fraud, theft",
    },
    {
      value: "reputational_harm",
      label: "Reputational Harm",
      description: "Damage to reputation or standing",
    },
    {
      value: "physical_harm",
      label: "Physical Harm",
      description: "Bodily injury or physical danger",
    },
    {
      value: "rights_violations",
      label: "Rights Violations",
      description: "Civil rights, privacy violations",
    },
    {
      value: "discrimination",
      label: "Discrimination",
      description: "Bias against protected groups",
    },
    {
      value: "misinformation",
      label: "Misinformation",
      description: "Spread of false information",
    },
    {
      value: "other",
      label: "Other",
      description: "Other types of harm",
    },
  ] as const,
};

export const DOCUMENTED_HARM_CWE_FIELD = {
  name: "impactAssessment.documentedHarmCwe",
  type: "select",
  placeholder: "MITRE's CWE",
  options: [
    {
      value: "cwe-20",
      label: "CWE-20",
      description: "Improper Input Validation",
    },
    {
      value: "cwe-22",
      label: "CWE-22",
      description:
        "Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')",
    },
    {
      value: "cwe-77",
      label: "CWE-77",
      description:
        "Improper Neutralization of Special Elements used in a Command ('Command Injection')",
    },
    {
      value: "cwe-78",
      label: "CWE-78",
      description:
        "Improper Neutralization of Special Elements used in an OS Command ('OS Command Injection')",
    },
    {
      value: "cwe-79",
      label: "CWE-79",
      description:
        "Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')",
    },
    {
      value: "cwe-89",
      label: "CWE-89",
      description:
        "Improper Neutralization of Special Elements used in an SQL Command ('SQL Injection')",
    },
    {
      value: "cwe-94",
      label: "CWE-94",
      description: "Improper Control of Generation of Code ('Code Injection')",
    },
    {
      value: "cwe-119",
      label: "CWE-119",
      description:
        "Improper Restriction of Operations within the Bounds of a Memory Buffer",
    },
    { value: "cwe-125", label: "CWE-125", description: "Out-of-bounds Read" },
    {
      value: "cwe-190",
      label: "CWE-190",
      description: "Integer Overflow or Wraparound",
    },
    {
      value: "cwe-200",
      label: "CWE-200",
      description: "Exposure of Sensitive Information to an Unauthorized Actor",
    },
    {
      value: "cwe-269",
      label: "CWE-269",
      description: "Improper Privilege Management",
    },
    {
      value: "cwe-276",
      label: "CWE-276",
      description: "Incorrect Default Permissions",
    },
    {
      value: "cwe-287",
      label: "CWE-287",
      description: "Improper Authentication",
    },
    {
      value: "cwe-306",
      label: "CWE-306",
      description: "Missing Authentication for Critical Function",
    },
    {
      value: "cwe-352",
      label: "CWE-352",
      description: "Cross-Site Request Forgery (CSRF)",
    },
    {
      value: "cwe-400",
      label: "CWE-400",
      description: "Uncontrolled Resource Consumption",
    },
    { value: "cwe-416", label: "CWE-416", description: "Use After Free" },
    {
      value: "cwe-434",
      label: "CWE-434",
      description: "Unrestricted Upload of File with Dangerous Type",
    },
    {
      value: "cwe-476",
      label: "CWE-476",
      description: "NULL Pointer Dereference",
    },
    {
      value: "cwe-502",
      label: "CWE-502",
      description: "Deserialization of Untrusted Data",
    },
    { value: "cwe-787", label: "CWE-787", description: "Out-of-bounds Write" },
    {
      value: "cwe-798",
      label: "CWE-798",
      description: "Use of Hard-coded Credentials",
    },
    {
      value: "cwe-862",
      label: "CWE-862",
      description: "Missing Authorization",
    },
    {
      value: "cwe-863",
      label: "CWE-863",
      description: "Incorrect Authorization",
    },
    {
      value: "cwe-918",
      label: "CWE-918",
      description: "Server-Side Request Forgery (SSRF)",
    },
  ],
} as const;

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
  label: "Who might be affected by this issue?",
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
      label: "Infrastructure",
      description: "Critical systems and services",
    },
    {
      value: "other",
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
  label: "Specific names of affected stakeholders (if known):",
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
    "This helps us coordinate responsible disclosure with affected parties.",
};

export const DISCOVERY_CONTEXT_FIELD = {
  name: "impactAssessment.discoveryContext",
  title: "Discovery Context",
  label: "Where was this issue discovered?",
  type: "input",
  options: [
    {
      value: "testing_environment",
      label: "Testing Environment",
      description: "During research, testing, or evaluation",
    },
    {
      value: "real_world_usage",
      label: "Real-World Usage",
      description: "During normal use or production",
    },
  ] as const,
};

export const RESPONSIBLE_FACTORS_FIELD = {
  name: "impactAssessment.responsibleFactors",
  title: "Responsible Factors",
  icon: "/icons/form/settings.svg",
  label: "What might be responsible for this issue?",
  type: "input",
  options: [
    { value: "training_data_issues", label: "Training Data Issues" },
    { value: "model_architecture", label: "Model Architecture" },
    { value: "fine_tuning_process", label: "Fine-tuning Process" },
    { value: "system_design", label: "System Design" },
    { value: "user_interface", label: "User Interface" },
    { value: "content_filtering", label: "Content Filtering" },
    { value: "safety_measures", label: "Safety Measures" },
    { value: "user_misconfiguration", label: "User Misconfiguration" },
    { value: "third_party_integration", label: "Third-party Integration" },
    { value: "other", label: "Other" },
  ] as const,
};

export const RESPONSIBLE_FACTORS_OTHER_TEXT_FIELD = {
  name: "impactAssessment.responsibleFactorsOtherText",
  label: "Please describe the responsible factor",
  type: "textarea",
  maxLength: 400,
  placeholder: "Describe what you think affected stakeholders...",
};
