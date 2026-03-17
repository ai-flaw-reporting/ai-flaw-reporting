export const REPORT_SUMMARY_CONFIG = {
  title: "Report Summary",
  icon: "/icons/form/document.svg",
  reportType: "Report Type",
  aiSystem: "AI System(s)",
  riskAssessment: "Risk Assessment",
  classification: "Classification Flags",
  affectedStakeholders: "Affected Stakeholders",
  harmClassification: "Harm Classification",
  disclosurePlan: "Disclosure Plan",
  filesUploaded: "Files Uploaded",
  modeOfDetection: "Mode of detection",
  issueDescription: "Issue Description",
};

export const DOWNLOAD_REPORT_CONFIG = {
  title: "Download Report",
  icon: "/icons/form/download.svg",
  description:
    "Download a machine-readable copy of your report for your records or to share with other organizations.",
  buttonText: "Download Report",
};

export type StakeholderConfig = {
  name: string;
  description: string;
  /**
   * Condition function to determine if stakeholder should be visible
   * Returns true if stakeholder should be shown
   */
  isVisible?: (formData: {
    platforms?: string[];
    models?: string[];
    realWorldHarm?: boolean;
    huggingFaceModels?: string[];
  }) => boolean;
  /**
   * Whether this stakeholder is selectable (can be checked)
   * If false, stakeholder is shown but cannot be selected
   */
  isSelectable?: boolean;
  /** When true, shows "Makes Report Public" badge */
  makesReportPublic?: boolean;
  /** External link to the organization's security/reporting policy */
  policyUrl?: string;
  /** Warning text shown when this org is toggled on and makes report public */
  publicWarning?: string;
};

export const SUBMIT_STAKEHOLDERS_CONFIG = {
  title: "Submit to Organizations",
  icon: "/icons/form/plane.svg",
  description:
    "Toggle organizations to include in your submission. We've pre-selected relevant organizations based on your report.",
  stakeholders: [
    {
      name: "OpenAI",
      description: "Reports related to OpenAI products and models",
      isVisible: ({ platforms }) =>
        platforms?.includes("OpenAI (ChatGPT, API, Playground)") ?? false,
      isSelectable: true,
      policyUrl: "https://openai.com/policies/coordinated-vulnerability-disclosure-policy/",
    },
    {
      name: "Anthropic",
      description: "Reports related to Anthropic products and models",
      isVisible: ({ platforms }) =>
        platforms?.includes("Anthropic (Claude, API)") ?? false,
      isSelectable: true,
      policyUrl: "https://www.anthropic.com/responsible-disclosure-policy",
    },
    {
      name: "Google",
      description: "Reports related to Google AI products and models",
      isVisible: ({ platforms }) =>
        platforms?.includes("Google (Gemini, AI Studio, Bard)") ?? false,
      isSelectable: true,
      policyUrl: "https://bughunters.google.com/about/rules/6171833274204160/google-and-alphabet-vulnerability-reward-program-vrp-rules",
    },
    {
      name: "Meta",
      description: "Reports related to Meta AI products and models",
      isVisible: ({ platforms }) =>
        platforms?.includes("Meta (LLaMA)") ?? false,
      isSelectable: true,
      policyUrl: "https://www.facebook.com/whitehat",
    },
    {
      name: "Microsoft",
      description: "Reports related to Microsoft AI products and models",
      isVisible: ({ platforms }) =>
        platforms?.includes("Microsoft (Copilot, Azure AI)") ?? false,
      isSelectable: true,
      policyUrl: "https://www.microsoft.com/en-us/msrc/bounty",
    },
    {
      name: "Cohere",
      description: "Reports related to Cohere products and models",
      isVisible: ({ platforms }) => platforms?.includes("Cohere") ?? false,
      isSelectable: true,
      policyUrl: "https://cohere.com/security",
    },
    {
      name: "Other models provided by HuggingFace cards",
      description:
        "Reports related to models from HuggingFace",
      isVisible: ({ models, huggingFaceModels }) => {
        if (!models?.length || !huggingFaceModels?.length) return false;
        return models.some((model) => huggingFaceModels.includes(model));
      },
      isSelectable: true,
      policyUrl: "https://huggingface.co/docs/hub/security",
    },
    {
      name: "AI Incident Database",
      description: "Public database tracking AI incidents and harms",
      isVisible: () => true,
      isSelectable: true,
      makesReportPublic: true,
      publicWarning: "Your report will be made public immediately upon submission.",
      policyUrl: "https://incidentdatabase.ai/",
    },
    {
      name: "General AI Flaw Database",
      description: "Central repository for AI flaw reports",
      isVisible: () => true,
      isSelectable: true,
      makesReportPublic: true,
      publicWarning: "Your report will be made public after 30 days.",
      policyUrl: "https://aiflaw.org/",
    },
    {
      name: "AI Safety Institute",
      description: "Government body for AI safety research and policy",
      isVisible: () => true,
      isSelectable: true,
      policyUrl: "https://www.aisi.gov.uk/",
    },
    {
      name: "NIST AI Risk Management",
      description: "National Institute of Standards and Technology AI risk framework",
      isVisible: () => true,
      isSelectable: true,
      policyUrl: "https://www.nist.gov/artificial-intelligence",
    },
    {
      name: "CISA",
      description: "Cybersecurity and Infrastructure Security Agency",
      isVisible: () => true,
      isSelectable: true,
      policyUrl: "https://www.cisa.gov/coordinated-vulnerability-disclosure-process",
    },
    {
      name: "MITRE",
      description: "MITRE ATT&CK framework for AI threat classification",
      isVisible: () => true,
      isSelectable: false,
      policyUrl: "https://atlas.mitre.org/",
    },
    {
      name: "CERT",
      description: "CERT Coordination Center vulnerability reporting",
      isVisible: () => true,
      isSelectable: false,
      policyUrl: "https://www.kb.cert.org/vuls/report/",
    },
    {
      name: "AVID",
      description: "AI Vulnerability Database for documented AI risks",
      isVisible: ({ realWorldHarm }) => realWorldHarm === true,
      isSelectable: true,
      policyUrl: "https://avidml.org/",
    },
    {
      name: "AIID",
      description: "AI Incident Database tracking real-world AI harms",
      isVisible: ({ realWorldHarm }) => realWorldHarm === true,
      isSelectable: true,
      makesReportPublic: true,
      publicWarning: "Your report will be made public upon submission.",
      policyUrl: "https://incidentdatabase.ai/",
    },
  ] as StakeholderConfig[],
};

export const PLATFORM_TO_STAKEHOLDER_MAP: Record<string, string> = {
  "OpenAI (ChatGPT, API, Playground)": "OpenAI",
  "Google (Gemini, AI Studio, Bard)": "Google",
  "Anthropic (Claude, API)": "Anthropic",
  Cohere: "Cohere",
  "AI Incident Database": "AI Incident Database",
  "US AI Safety Institute": "AI Safety Institute",
};
