export const STEP_CONFIGS = {
  CLASSIFY_REPORT: {
    id: "classify-report",
    title: "Classify Report",
    badgeTitle: "Classify",
    description: "Help us understand the severity and nature of this issue",
    formField: "classifyReport",
  },
  REPORTER_AND_SYSTEM_DETAILS: {
    id: "reporter-and-system-details",
    title: "Reporter & System Details",
    badgeTitle: "Details",
    description:
      "Tell us about yourself and the AI system where you found this issue",
    formField: "reporterDetails",
  },
  FLAW_INCIDENT_DESCRIPTION: {
    id: "flaw-incident-description",
    title: "Flaw/Incident Description",
    badgeTitle: "Description",
    description: "Describe the issue you encountered in detail",
    formField: "incidentDescription",
  },
  EVIDENCE_AND_REPRODUCTION: {
    id: "evidence-and-reproduction",
    title: "Evidence & Reproduction",
    badgeTitle: "Evidence",
    description: "Help others understand and reproduce this issue",
    formField: "evidence",
  },
  IMPACT_AND_RISK_ASSESSMENT: {
    id: "impact-and-risk-assessment",
    title: "Impact & Risk Assessment",
    badgeTitle: "Impact",
    description: "Help us understand the severity and scope of this issue",
    formField: "impactAssessment",
  },
  SECURITY_INCIDENT_DETAILS: {
    id: "security-incident-details",
    title: "Additional Details",
    badgeTitle: "Additional",
    description:
      "Tell us about yourself and the AI system where you found this issue",
    formField: "securityDetails",
  },
  DISCLOSURE_PLAN: {
    id: "disclosure-plan",
    title: "Disclosure Plan",
    badgeTitle: "Disclosure",
    description: "Help us understand your intentions for public disclosure",
    formField: "disclosurePlan",
  },
  REVIEW_AND_SUBMIT_REPORT: {
    id: "review-and-submit-report",
    title: "Review & Submit Report",
    badgeTitle: "Review",
    description: "Review your report and choose how to submit it",
    formField: "reviewReport",
  },
  SUBMISSION_SUCCESS: {
    id: "submission-success",
    title: "Report Successfully Filed",
    badgeTitle: "Success",
    description: "Your report has been filed and cannot be modified",
    formField: "reviewReport",
  },
} as const;

export const STEP_ORDER = Object.keys(STEP_CONFIGS) as Array<
  keyof typeof STEP_CONFIGS
>;
