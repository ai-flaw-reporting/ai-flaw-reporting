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

export const SUBMIT_STAKEHOLDERS_CONFIG = {
  title: "Submit to Stakeholders",
  icon: "/icons/form/plane.svg",
  description:
    "Choose organizations to notify about this issue. We recommend coordinating with relevant AI developers and safety organizations.",
  stakeholders: [
    {
      name: "HuggingFace AI Flaw Database",
      description: "Flaws that may be relevant to HuggingFace models",
    },
    {
      name: "OpenAI",
      description: "Flaws that may be relevant to OpenAI models",
    },
    {
      name: "AI Incident Database",
      description: "Flaws that may be relevant to AI Incident Database models",
    },
    {
      name: "Partnership on AI",
      description: "Flaws that may be relevant to AI Incident Database models",
    },
    {
      name: "AI Safety Institute",
      description: "Flaws that may be relevant to AI Incident Database models",
    },
    {
      name: "Other Organizations",
      description: "Flaws that may be relevant to AI Incident Database models",
    },
  ],
};

export const PLATFORM_TO_STAKEHOLDER_MAP: Record<string, string> = {
  "OpenAI (ChatGPT, API, Playground)": "OpenAI",
  "Hugging Face": "HuggingFace AI Flaw Database",
  "AI Incident Database": "AI Incident Database",
  "US AI Safety Institute": "AI Safety Institute",
};
