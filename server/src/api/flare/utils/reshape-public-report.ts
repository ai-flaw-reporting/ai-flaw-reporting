import type { FlattenedReport } from "../../report/content-types/report/types";

export const reshapePublicReport = (flatData: FlattenedReport) => ({
  id: flatData.id,
  documentId: flatData.documentId,
  createdAt: flatData.createdAt,
  updatedAt: flatData.updatedAt,
  metadata: {
    createdAt: flatData.metadata_createdAt,
    schemaVersion: flatData.metadata_schemaVersion,
    reportType: flatData.metadata_reportType,
  },
  classifyReport: {
    real_world_harm: flatData.classify_realWorldHarm,
    malicious_use: flatData.classify_maliciousUse,
    csam_involved: flatData.classify_csamInvolved,
  },
  systemConfigurations: flatData.system_configurations ?? [],
  incidentDescription: {
    issueDescription: flatData.incident_issueDescription,
    expectedBehavior: flatData.incident_expectedBehavior,
    actualBehavior: flatData.incident_actualBehavior,
    policyViolation: {
      urls: flatData.incident_policyViolationUrls,
      reason: flatData.incident_policyViolationReason,
    },
  },
  evidence: {
    stepsToReproduce: flatData.evidence_stepsToReproduce,
    proofOfConcept: flatData.evidence_proofOfConcept,
    attachments: flatData.evidence_attachments,
  },
  impactAssessment: {
    severityOfHarm: flatData.impact_severityOfHarm,
    prevalence: flatData.impact_prevalence,
    harmType: flatData.impact_harmType,
    harmTypes: flatData.impact_harmTypes,
    affectedStakeholders: flatData.impact_affectedStakeholders,
    harmOtherText: flatData.impact_harmOtherText,
    aiCompanyInvolved: flatData.impact_aiCompanyInvolved,
    mitigationNotes: flatData.impact_mitigationNotes,
    documentedHarmCwe: flatData.impact_documentedHarmCwe,
    discoveryContext: flatData.impact_discoveryContext,
    responsibleFactors: flatData.impact_responsibleFactors,
    responsibleFactorsOtherText: flatData.impact_responsibleFactorsOtherText,
  },
  securityDetails: {
    attackerResources: flatData.security_attackerResources,
    attackerObjectives: flatData.security_attackerObjectives,
    discoveryNarrative: flatData.security_discoveryNarrative,
    substrateRelationship: flatData.security_substrateRelationship,
    incidentLocation: flatData.security_incidentLocation,
    harmNarrative: flatData.security_harmNarrative,
    detectionMethod: flatData.security_detectionMethod,
  },
  disclosurePlan: {
    publicDisclosureIntent: flatData.disclosure_publicDisclosureIntent,
    embargoDetails: flatData.disclosure_embargoDetails,
    disclosureTimeline: flatData.disclosure_disclosureTimeline,
    disclosureDatepicker: flatData.disclosure_disclosureDatepicker,
    disclosureLink: flatData.disclosure_disclosureLink,
  },
});
