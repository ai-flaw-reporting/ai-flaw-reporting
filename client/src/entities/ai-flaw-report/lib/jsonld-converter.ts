import { createHash } from "~/lib/hash";
import type { AiFlawReportSchema } from "../model/types";

type AISystem = {
  id: string;
  name: string;
  version: string;
  displayName: string;
  systemType: "known" | "unknown";
};

type ProcessedReport = {
  reportId: string;
  aiSystems: AISystem[];
  createdAt: string;
  flawDescription: string;
  policyViolation: string;
  prevalence: string;
  severity: string;
  impacts: string[];
  specificHarmTypes: string[];
  impactedStakeholders: string[];
  reportTypes: string[];
  reporterEmail?: string;
  securityData?: Record<string, string | undefined>;
  evidenceData?: Record<string, string | undefined>;
  disclosureIntent?: string;
  disclosureTimeline?: string;
  disclosureLink?: string;
  disclosureChannels: string[];
  realWorldHarm: boolean;
  maliciousUse: boolean;
  csamInvolved: boolean;
  rawData: Record<string, unknown>;
};

function processReport(
  formData: AiFlawReportSchema,
  metadata: Record<string, string>,
): ProcessedReport {
  const createdAt = metadata.createdAt ?? new Date().toISOString();
  const reportId = `AFL-${createHash(createdAt).slice(0, 8)}`;

  const systems = formData.reporterDetails?.systems ?? [];
  const aiSystems: AISystem[] = systems.length
    ? systems.map((s) => {
        const displayName = s.model ? `${s.platform} - ${s.model}` : s.platform;
        return {
          id: `https://ai-reports.org/systems/${s.platform.replace(/\s/g, "_")}`,
          name: s.platform,
          version: s.model ?? "",
          displayName,
          systemType: "known" as const,
        };
      })
    : [
        {
          id: `https://ai-reports.org/reports/${reportId}/unknown-system`,
          name: "Unknown System",
          version: "",
          displayName: "Unknown System",
          systemType: "unknown" as const,
        },
      ];

  const classify = formData.classifyReport ?? {};
  const reportTypes: string[] = [];
  if (classify.malicious_use) reportTypes.push("Malicious Use");
  if (classify.real_world_harm) reportTypes.push("Real-World Incidents");
  if (!reportTypes.length) reportTypes.push("General Report");

  const impact = formData.impactAssessment;
  const harmTypes = [...(impact?.harmTypes ?? [])];
  if (impact?.harmOtherText) harmTypes.push(impact.harmOtherText);

  const security = formData.securityDetails;
  const securityData = security
    ? {
        substrate_relationship: security.substrateRelationship,
        attacker_resources: security.attackerResources,
        attacker_objectives: security.attackerObjectives,
        detection_method: security.detectionMethod,
        discovery_narrative: security.discoveryNarrative,
      }
    : undefined;

  const evidence = formData.evidence;
  const evidenceData = evidence
    ? { steps_to_reproduce: evidence.stepsToReproduce }
    : undefined;

  const disclosure = formData.disclosurePlan;
  const disclosureIntentMap: Record<string, string> = {
    yes: "Yes",
    no: "No",
    undecided: "Undecided",
    already: "Already Public",
  };

  const policyViolation = formData.incidentDescription?.policyViolation;
  const policyViolationText =
    typeof policyViolation === "object"
      ? (policyViolation?.reason ?? "Not specified")
      : "Not specified";

  return {
    reportId,
    aiSystems,
    createdAt,
    flawDescription:
      formData.incidentDescription?.issueDescription ??
      "No description provided",
    policyViolation: policyViolationText,
    prevalence: impact?.prevalence ?? "Unknown",
    severity: impact?.severityOfHarm ?? "Unknown",
    impacts: impact?.harmType ? [impact.harmType] : [],
    specificHarmTypes: harmTypes,
    impactedStakeholders: impact?.affectedStakeholders ?? [],
    reportTypes,
    reporterEmail: formData.reporterDetails?.reporter?.email,
    securityData,
    evidenceData,
    disclosureIntent: disclosure?.publicDisclosureIntent
      ? (disclosureIntentMap[disclosure.publicDisclosureIntent] ??
        disclosure.publicDisclosureIntent)
      : undefined,
    disclosureTimeline: disclosure?.disclosureTimeline,
    disclosureLink: disclosure?.disclosureLink,
    disclosureChannels: formData.reviewReport?.selectedStakeholders ?? [],
    realWorldHarm: classify.real_world_harm ?? false,
    maliciousUse: classify.malicious_use ?? false,
    csamInvolved: classify.csam_involved ?? false,
    rawData: formData as unknown as Record<string, unknown>,
  };
}

function serializeToJsonLd(report: ProcessedReport): Record<string, unknown> {
  const systemNames = report.aiSystems.map((s) => s.displayName);

  const jsonld: Record<string, unknown> = {
    "@context": [
      "https://schema.org/",
      {
        flare: "https://ai-reports.org/schema/",
        aiSystem: "flare:aiSystem",
        severity: "flare:severity",
        prevalence: "flare:prevalence",
        impacts: "flare:impacts",
        reportType: "flare:reportType",
      },
    ],
    "@type": "flare:AIFlawReport",
    "@id": `https://ai-reports.org/reports/${report.reportId}`,
    name: `AI Flaw Report: ${systemNames.join(", ")}`,
    description: report.flawDescription,
    aiSystem: report.aiSystems.map((s) => ({
      "@type": "schema:SoftwareApplication",
      "@id": s.id,
      name: s.name,
      version: s.version,
      description: s.displayName,
    })),
    severity: report.severity,
    prevalence: report.prevalence,
    impacts: report.impacts,
    reportType: report.reportTypes,
    dateCreated: report.createdAt,
    identifier: report.reportId,
    "flare:policyViolation": report.policyViolation,
  };

  if (report.reporterEmail) {
    jsonld.author = {
      "@type": "schema:Person",
      email: report.reporterEmail,
    };
  }

  if (report.impactedStakeholders.length) {
    jsonld["flare:impactedStakeholders"] = report.impactedStakeholders;
  }

  if (report.specificHarmTypes.length) {
    jsonld["flare:specificHarmTypes"] = report.specificHarmTypes;
  }

  jsonld["flare:classification"] = {
    "@type": "flare:ThreatClassification",
    "flare:realWorldHarm": report.realWorldHarm,
    "flare:maliciousUse": report.maliciousUse,
    "flare:csamInvolved": report.csamInvolved,
  };

  if (report.securityData) {
    const sec: Record<string, unknown> = {
      "@type": "flare:SecurityIncident",
    };
    if (report.securityData.substrate_relationship)
      sec["flare:substrateRelationship"] =
        report.securityData.substrate_relationship;
    if (report.securityData.attacker_resources)
      sec["flare:attackerResources"] = report.securityData.attacker_resources;
    if (report.securityData.attacker_objectives)
      sec["flare:attackerObjectives"] = report.securityData.attacker_objectives;
    if (report.securityData.detection_method)
      sec["flare:detectionMethod"] = report.securityData.detection_method;
    if (report.securityData.discovery_narrative)
      sec["flare:discoveryNarrative"] = report.securityData.discovery_narrative;
    jsonld["flare:securityAspect"] = sec;
  }

  if (report.evidenceData) {
    jsonld["flare:evidence"] = {
      "@type": "flare:Evidence",
      "flare:stepsToReproduce": report.evidenceData.steps_to_reproduce,
    };
  }

  const disclosure: Record<string, unknown> = {
    "@type": "flare:DisclosurePlan",
  };
  if (report.disclosureIntent)
    disclosure["flare:intent"] = report.disclosureIntent;
  if (report.disclosureTimeline)
    disclosure["flare:timeline"] = report.disclosureTimeline;
  if (report.disclosureLink)
    disclosure["flare:link"] = report.disclosureLink;
  if (report.disclosureChannels.length)
    disclosure["flare:channels"] = report.disclosureChannels;
  jsonld["flare:disclosure"] = disclosure;

  jsonld["flare:raw"] = report.rawData;

  return jsonld;
}

export function convertToJsonLd(
  formData: AiFlawReportSchema,
  metadata: Record<string, string>,
): string {
  const processed = processReport(formData, metadata);
  const jsonld = serializeToJsonLd(processed);
  return JSON.stringify(jsonld, null, 2);
}
