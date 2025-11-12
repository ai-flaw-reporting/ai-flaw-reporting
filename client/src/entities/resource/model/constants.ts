export const SCOPE_TYPES = {
  SECURITY_VULNERABILITY: "Security Vulnerability",
  INCIDENT: "Incident",
  AI_SAFETY_HAZARD: "AI Safety Hazard",
  AI_SAFETY: "AI Safety",
} as const;

export const ORGANIZATION_TYPES = {
  GOVERNMENT_AGENCY: "Government Agency",
  CIVIL_SOCIETY: "Civil Society",
  AI_DEVELOPER: "AI Developer",
  INCIDENT_DATABASE: "Incident Database",
} as const;

export const BADGE_VARIANTS = {
  ERROR: "error",
  WARNING: "warning",
  DEFAULT: "default",
} as const;

export const FORM_SCOPE_OPTIONS = [
  SCOPE_TYPES.SECURITY_VULNERABILITY,
  SCOPE_TYPES.INCIDENT,
  SCOPE_TYPES.AI_SAFETY_HAZARD,
] as const;

export const ORGANIZATION_TYPE_OPTIONS = [
  ORGANIZATION_TYPES.GOVERNMENT_AGENCY,
  ORGANIZATION_TYPES.CIVIL_SOCIETY,
  ORGANIZATION_TYPES.AI_DEVELOPER,
  ORGANIZATION_TYPES.INCIDENT_DATABASE,
] as const;

export const URL_PARAMS = {
  FORM_SCOPE: "formScope",
  ORGANIZATION_TYPE: "organizationType",
} as const;

export const DEFAULT_FILTERS = {
  formScope: null,
  organizationType: null,
} as const;
