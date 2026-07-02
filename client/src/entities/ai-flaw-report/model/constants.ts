import {
  classifyReportSchema,
  reporterDetailsSchema,
  incidentDescriptionSchema,
  evidenceAndReproductionSchema,
  impactAndRiskAssessmentSchema,
  createSecurityIncidentDetailsSchema,
  disclosurePlanSchema,
  reviewReportSchema,
} from "./schema";
import { STEP_CONFIGS } from "./step-config";
import type { PolicyLink } from "./types";

export const STEP_STATUS = {
  UPCOMING: "UPCOMING",
  CURRENT: "CURRENT",
  COMPLETED: "COMPLETED",
} as const;

export const BADGE_VARIANTS = {
  [STEP_STATUS.UPCOMING]: "outline",
  [STEP_STATUS.CURRENT]: "default",
  [STEP_STATUS.COMPLETED]: "success",
} as const;

export const SAVE_STATUS = {
  SAVING: "SAVING",
  SAVED: "SAVED",
} as const;

export const SAVE_STATUS_COLORS = {
  [SAVE_STATUS.SAVING]: "bg-indigo-500",
  [SAVE_STATUS.SAVED]: "bg-[#51b781]",
} as const;

export const SAVE_STATUS_TEXT = {
  [SAVE_STATUS.SAVING]: "Saving…",
  [SAVE_STATUS.SAVED]: "Auto-saving",
} as const;

export const SAVE_STATUS_KEY_PREFIX = "ai-flaw-report-";

export const FORM_AUTOSAVE_DELAY = 150; // 150ms

export const FORM_VALUES = {
  OTHER: "Other",
  OTHER_LOWERCASE: "other",
} as const;

export const STEP_CONFIGS_WITH_SCHEMAS = {
  ...STEP_CONFIGS,
  CLASSIFY_REPORT: {
    ...STEP_CONFIGS.CLASSIFY_REPORT,
    schema: classifyReportSchema,
  },
  REPORTER_AND_SYSTEM_DETAILS: {
    ...STEP_CONFIGS.REPORTER_AND_SYSTEM_DETAILS,
    schema: reporterDetailsSchema,
  },
  FLAW_INCIDENT_DESCRIPTION: {
    ...STEP_CONFIGS.FLAW_INCIDENT_DESCRIPTION,
    schema: incidentDescriptionSchema,
  },
  EVIDENCE_AND_REPRODUCTION: {
    ...STEP_CONFIGS.EVIDENCE_AND_REPRODUCTION,
    schema: evidenceAndReproductionSchema,
  },
  IMPACT_AND_RISK_ASSESSMENT: {
    ...STEP_CONFIGS.IMPACT_AND_RISK_ASSESSMENT,
    schema: impactAndRiskAssessmentSchema,
  },
  SECURITY_INCIDENT_DETAILS: {
    ...STEP_CONFIGS.SECURITY_INCIDENT_DETAILS,
    schema: createSecurityIncidentDetailsSchema,
  },
  DISCLOSURE_PLAN: {
    ...STEP_CONFIGS.DISCLOSURE_PLAN,
    schema: disclosurePlanSchema,
  },
  REVIEW_AND_SUBMIT_REPORT: {
    ...STEP_CONFIGS.REVIEW_AND_SUBMIT_REPORT,
    schema: reviewReportSchema,
  },
  SUBMISSION_SUCCESS: {
    ...STEP_CONFIGS.SUBMISSION_SUCCESS,
    schema: undefined,
  },
} as const;

export const POLICIES: Record<string, PolicyLink[]> = {
  openai: [
    {
      label: "OpenAI Usage Policies",
      url: "https://openai.com/policies/usage-policies/",
    },
    {
      label: "OpenAI Terms of Use",
      url: "https://openai.com/policies/terms-of-use/",
    },
  ],
  google: [
    {
      label: "Google AI Use Policy",
      url: "https://policies.google.com/terms/generative-ai/use-policy",
    },
    {
      label: "Google Terms of Service",
      url: "https://policies.google.com/terms",
    },
  ],
  microsoft: [
    {
      label: "Microsoft Responsible AI",
      url: "https://www.microsoft.com/en-us/ai/responsible-ai",
    },
    {
      label: "Microsoft Services Agreement",
      url: "https://www.microsoft.com/en-us/servicesagreement",
    },
  ],
  meta: [
    {
      label: "Meta AI Responsible Use",
      url: "https://ai.meta.com/static-resource/responsible-use-guide/",
    },
    {
      label: "Meta Terms of Service",
      url: "https://www.facebook.com/terms/",
    },
  ],
  anthropic: [
    {
      label: "Anthropic Usage Policy",
      url: "https://www.anthropic.com/legal/aup",
    },
    {
      label: "Anthropic Bug Bounty",
      url: "https://hackerone.com/anthropic-vdp?type=team",
    },
    {
      label: "Anthropic Disclosure Policy",
      url: "https://www.anthropic.com/responsible-disclosure-policy",
    },
  ],
};
