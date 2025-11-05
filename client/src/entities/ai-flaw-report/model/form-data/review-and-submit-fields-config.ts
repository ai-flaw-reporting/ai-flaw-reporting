export const REPORT_SUMMARY_CONFIG = {
  title: "Report Summary",
  icon: "/icons/form/document.svg",
  reportType: "Report Type",
  aiSystem: "AI System(s)",
  riskAssessment: "Risk Assessment",
  classification: "Classification",
  affectedStakeholders: "Affected Stakeholders",
};

export const DOWNLOAD_REPORT_CONFIG = {
  title: "Download Report",
  icon: "/icons/form/download.svg",
  description:
    "Download a machine-readable copy of your report for your records or to share with other organizations.",
  buttonText: "Download JSON Report",
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
};

export const SUBMIT_STAKEHOLDERS_CONFIG = {
  title: "Submit to Stakeholders",
  icon: "/icons/form/plane.svg",
  description:
    "Choose organizations to notify about this issue. We recommend coordinating with relevant AI developers and safety organizations.",
  stakeholders: [
    {
      name: "General AI Flaw Database",
      description: "Flaws that may be relevant to HuggingFace models",
      // Always visible
      isVisible: () => true,
      isSelectable: true,
    },
    {
      name: "OpenAI",
      description: "Flaws that may be relevant to OpenAI models",
      isVisible: ({ platforms }) =>
        platforms?.includes("OpenAI (ChatGPT, API, Playground)") ?? false,
      isSelectable: true,
    },
    {
      name: "Anthropic",
      description: "Flaws that may be relevant to Anthropic models",
      isVisible: ({ platforms }) =>
        platforms?.includes("Anthropic (Claude, API)") ?? false,
      isSelectable: true,
    },
    {
      name: "Google",
      description: "Flaws that may be relevant to Google models",
      isVisible: ({ platforms }) =>
        platforms?.includes("Google (Gemini, AI Studio, Bard)") ?? false,
      isSelectable: true,
    },
    {
      name: "Cohere",
      description: "Flaws that may be relevant to Cohere models",
      isVisible: ({ platforms }) => platforms?.includes("Cohere") ?? false,
      isSelectable: true,
    },
    {
      name: "Other models provided by HuggingFace cards",
      description:
        "When user selects a model that is fetched from the HuggingFace API",
      isVisible: ({ models, huggingFaceModels }) => {
        if (!models?.length || !huggingFaceModels?.length) return false;
        return models.some((model) => huggingFaceModels.includes(model));
      },
      isSelectable: true,
    },
    {
      name: "MITRE",
      description: "Flaws that may be relevant to MITRE models",
      // Always visible but not selectable
      isVisible: () => true,
      isSelectable: false,
    },
    {
      name: "CERT",
      description: "Flaws that may be relevant to CERT models",
      // Always visible but not selectable
      isVisible: () => true,
      isSelectable: false,
    },
    {
      name: "AVID",
      description: "Flaws that may be relevant to AVID models",
      isVisible: ({ realWorldHarm }) => realWorldHarm === true,
      isSelectable: true,
    },
    {
      name: "AIID",
      description: "Flaws that may be relevant to AIID models",
      isVisible: ({ realWorldHarm }) => realWorldHarm === true,
      isSelectable: true,
    },
    {
      name: "AI Incident Database",
      description: "Flaws that may be relevant to AI Incident Database models",
      isVisible: () => true,
      isSelectable: true,
    },
    {
      name: "AI Safety Institute",
      description: "Flaws that may be relevant to AI Safety Institute models",
      isVisible: () => true,
      isSelectable: true,
    },
    {
      name: "Other Organizations",
      description: "Flaws that may be relevant to other organizations",
      isVisible: () => true,
      isSelectable: true,
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
