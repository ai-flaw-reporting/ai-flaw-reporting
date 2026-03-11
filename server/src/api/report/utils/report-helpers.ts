/**
 * Helper functions for flattening and reshaping report data
 */

import type {
  FlattenedReport,
  ReshapedReportData,
} from "../content-types/report/types";

export const flattenReport = (data: any) => ({
  step: data.step,
  // Metadata
  metadata_createdAt: data.metadata?.createdAt,
  metadata_schemaVersion: data.metadata?.schemaVersion,
  metadata_reportType: data.metadata?.reportType,
  // Classify Report
  classify_realWorldHarm: data.classifyReport?.real_world_harm,
  classify_maliciousUse: data.classifyReport?.malicious_use,
  classify_csamInvolved: data.classifyReport?.csam_involved,
  classify_csamAcknowledgment: data.classifyReport?.csam_acknowledgment,
  // Reporter Details
  reporter_email: data.reporterDetails?.reporter?.email,
  reporter_org: data.reporterDetails?.reporter?.org,
  reporter_country: data.reporterDetails?.reporter?.country,
  // System Configurations
  system_configurations: data.reporterDetails?.systems,
  // Incident Description
  incident_issueDescription: data.incidentDescription?.issueDescription,
  incident_expectedBehavior: data.incidentDescription?.expectedBehavior,
  incident_actualBehavior: data.incidentDescription?.actualBehavior,
  incident_policyViolationUrl: data.incidentDescription?.policyViolation?.url,
  incident_policyViolationReason:
    data.incidentDescription?.policyViolation?.reason,
  // Evidence
  evidence_stepsToReproduce: data.evidence?.stepsToReproduce,
  evidence_proofOfConcept: data.evidence?.proofOfConcept,
  evidence_attachments: data.evidence?.attachments,
  // Impact Assessment
  impact_severityOfHarm: data.impactAssessment?.severityOfHarm,
  impact_prevalence: data.impactAssessment?.prevalence,
  impact_harmType: data.impactAssessment?.harmType,
  impact_harmTypes: data.impactAssessment?.harmTypes,
  impact_affectedStakeholders: data.impactAssessment?.affectedStakeholders,
  impact_harmOtherText: data.impactAssessment?.harmOtherText,
  impact_aiCompanyInvolved: data.impactAssessment?.aiCompanyInvolved,
  impact_mitigationNotes: data.impactAssessment?.mitigationNotes,
  // Security Details
  security_attackerResources: data.securityDetails?.attackerResources,
  security_attackerObjectives: data.securityDetails?.attackerObjectives,
  security_attackerObjectivesOther:
    data.securityDetails?.attackerObjectivesOther,
  security_discoveryNarrative: data.securityDetails?.discoveryNarrative,
  security_substrateRelationship: data.securityDetails?.substrateRelationship,
  security_incidentLocation: data.securityDetails?.incidentLocation,
  security_harmNarrative: data.securityDetails?.harmNarrative,
  security_detectionMethod: data.securityDetails?.detectionMethod,
  // Disclosure Plan
  disclosure_publicDisclosureIntent:
    data.disclosurePlan?.publicDisclosureIntent,
  disclosure_embargoDetails: data.disclosurePlan?.embargoDetails,
  disclosure_disclosureTimeline: data.disclosurePlan?.disclosureTimeline,
  disclosure_disclosureDatepicker: data.disclosurePlan?.disclosureDatepicker,
  // Review Report
  review_publicDisclosureIntent: data.reviewReport?.publicDisclosureIntent,
  review_embargoDetails: data.reviewReport?.embargoDetails,
  review_disclosureTimeline: data.reviewReport?.disclosureTimeline,
  review_disclosureDatepicker: data.reviewReport?.disclosureDatepicker,
  review_selectedStakeholders: data.reviewReport?.selectedStakeholders,
});

export const reshapeReport = (flatData: FlattenedReport): ReshapedReportData => ({
  id: flatData.id,
  documentId: flatData.documentId,
  createdAt: flatData.createdAt,
  updatedAt: flatData.updatedAt,
  metadata: {
    createdAt: flatData.metadata_createdAt,
    schemaVersion: flatData.metadata_schemaVersion,
    reportType: flatData.metadata_reportType,
  },
  step: flatData.step,
  classifyReport: {
    real_world_harm: flatData.classify_realWorldHarm,
    malicious_use: flatData.classify_maliciousUse,
    csam_involved: flatData.classify_csamInvolved,
    csam_acknowledgment: flatData.classify_csamAcknowledgment,
  },
  reporterDetails: {
    reporter: {
      email: flatData.reporter_email,
      org: flatData.reporter_org,
      country: flatData.reporter_country,
    },
    systems: flatData.system_configurations ?? [],
  },
  incidentDescription: {
    issueDescription: flatData.incident_issueDescription,
    expectedBehavior: flatData.incident_expectedBehavior,
    actualBehavior: flatData.incident_actualBehavior,
    policyViolation: {
      url: flatData.incident_policyViolationUrl,
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
  },
  securityDetails: {
    attackerResources: flatData.security_attackerResources,
    attackerObjectives: flatData.security_attackerObjectives,
    attackerObjectivesOther: flatData.security_attackerObjectivesOther,
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
  },
  reviewReport: {
    publicDisclosureIntent: flatData.review_publicDisclosureIntent,
    embargoDetails: flatData.review_embargoDetails,
    disclosureTimeline: flatData.review_disclosureTimeline,
    disclosureDatepicker: flatData.review_disclosureDatepicker,
  },
});
