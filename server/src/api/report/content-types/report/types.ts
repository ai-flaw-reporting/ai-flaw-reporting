/**
 * Type definitions for AI Flaw Report
 */

export type FlattenedReport = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  step: string;
  metadata_createdAt?: string;
  metadata_schemaVersion?: string;
  metadata_reportType?: string;
  classify_realWorldHarm?: boolean;
  classify_maliciousUse?: boolean;
  classify_csamInvolved?: boolean;
  classify_csamAcknowledgment?: boolean;
  reporter_email?: string;
  reporter_org?: string;
  reporter_country?: string;
  system_configurations?: Array<{
    platform: string;
    model: string;
    accessMethod?: string;
    version?: string;
  }>;
  incident_issueDescription?: string;
  incident_expectedBehavior?: string;
  incident_actualBehavior?: string;
  incident_policyViolationUrl?: string;
  incident_policyViolationReason?: string;
  evidence_stepsToReproduce?: string;
  evidence_proofOfConcept?: string;
  evidence_attachments?: number[];
  impact_severityOfHarm?: string;
  impact_prevalence?: string;
  impact_harmType?: string;
  impact_harmTypes?: string[];
  impact_affectedStakeholders?: string[];
  impact_harmOtherText?: string;
  impact_aiCompanyInvolved?: string[];
  impact_mitigationNotes?: string;
  impact_documentedHarmCwe?: string;
  impact_discoveryContext?: string;
  impact_responsibleFactors?: string[];
  impact_responsibleFactorsOtherText?: string;
  security_attackerResources?: string;
  security_attackerObjectives?: string;
  security_attackerObjectivesOther?: string;
  security_discoveryNarrative?: string;
  security_substrateRelationship?: string;
  security_incidentLocation?: string[];
  security_harmNarrative?: string;
  security_detectionMethod?: string;
  disclosure_publicDisclosureIntent?: string;
  disclosure_embargoDetails?: string;
  disclosure_disclosureTimeline?: string;
  disclosure_disclosureDatepicker?: string;
  review_publicDisclosureIntent?: string;
  review_embargoDetails?: string;
  review_disclosureTimeline?: string;
  review_disclosureDatepicker?: string;
  review_selectedStakeholders?: string[];
};

export type ReshapedReportData = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  metadata: {
    createdAt?: string;
    schemaVersion?: string;
    reportType?: string;
  };
  step: string;
  classifyReport: {
    real_world_harm?: boolean;
    malicious_use?: boolean;
    csam_involved?: boolean;
    csam_acknowledgment?: boolean;
  };
  reporterDetails: {
    reporter: {
      email?: string;
      org?: string;
      country?: string;
    };
    systems: Array<{
      platform: string;
      model: string;
      accessMethod?: string;
      version?: string;
    }>;
  };
  incidentDescription: {
    issueDescription?: string;
    expectedBehavior?: string;
    actualBehavior?: string;
    policyViolation: {
      url?: string;
      reason?: string;
    };
  };
  evidence: {
    stepsToReproduce?: string;
    proofOfConcept?: string;
    attachments?: number[];
  };
  impactAssessment: {
    severityOfHarm?: string;
    prevalence?: string;
    harmType?: string;
    harmTypes?: string[];
    affectedStakeholders?: string[];
    harmOtherText?: string;
    aiCompanyInvolved?: string[];
    mitigationNotes?: string;
    documentedHarmCwe?: string;
    discoveryContext?: string;
    responsibleFactors?: string[];
    responsibleFactorsOtherText?: string;
  };
  securityDetails: {
    attackerResources?: string;
    attackerObjectives?: string;
    attackerObjectivesOther?: string;
    discoveryNarrative?: string;
    substrateRelationship?: string;
    incidentLocation?: string[];
    harmNarrative?: string;
    detectionMethod?: string;
  };
  disclosurePlan: {
    publicDisclosureIntent?: string;
    embargoDetails?: string;
    disclosureTimeline?: string;
    disclosureDatepicker?: string;
  };
  reviewReport: {
    publicDisclosureIntent?: string;
    embargoDetails?: string;
    disclosureTimeline?: string;
    disclosureDatepicker?: string;
  };
};
