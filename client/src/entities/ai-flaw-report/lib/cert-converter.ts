import type { AiFlawReportSchema } from "../model/types";

function getSystemsArray(
  reporterDetails: AiFlawReportSchema["reporterDetails"],
): string[] {
  const systems: string[] = [];
  const entries = reporterDetails?.systems ?? [];
  for (const entry of entries) {
    if (entry.platform) systems.push(entry.platform);
    if (entry.model) systems.push(entry.model);
  }
  return systems;
}

function buildVulDescription(data: AiFlawReportSchema): string {
  const parts: string[] = [];

  const classify = data.classifyReport;
  if (classify) {
    const types: string[] = [];
    if (classify.real_world_harm) types.push("Real-World Harm");
    if (classify.malicious_use) types.push("Malicious Use");
    if (types.length) parts.push(`Report Type: ${types.join(", ")}`);
  }

  const incident = data.incidentDescription;
  if (incident?.issueDescription) {
    parts.push(`\nIssue Description:\n${incident.issueDescription}`);
  }

  const policy = incident?.policyViolation;
  if (policy?.reason) {
    parts.push(`\nPolicy Violation Reason:\n${policy.reason}`);
  }

  const impact = data.impactAssessment;
  if (impact) {
    parts.push(`\nSeverity: ${impact.severityOfHarm ?? "N/A"}`);
    parts.push(`Prevalence: ${impact.prevalence ?? "N/A"}`);
    parts.push(`Harm Type: ${impact.harmType ?? "N/A"}`);

    if (impact.harmTypes?.length) {
      parts.push(`Specific Harm Types: ${impact.harmTypes.join(", ")}`);
    }
    if (impact.affectedStakeholders?.length) {
      parts.push(
        `Affected Stakeholders: ${impact.affectedStakeholders.join(", ")}`,
      );
    }
    if (impact.documentedHarmCwe) {
      parts.push(`CWE Classification: ${impact.documentedHarmCwe}`);
    }
    if (impact.harmOtherText) {
      parts.push(`Additional Harm Details: ${impact.harmOtherText}`);
    }
  }

  return parts.join("\n");
}

function buildVulExploit(data: AiFlawReportSchema): string {
  const parts: string[] = [];

  if (data.evidence?.stepsToReproduce) {
    parts.push(`Steps to Reproduce:\n${data.evidence.stepsToReproduce}`);
  }

  if (data.securityDetails?.attackerResources) {
    parts.push(
      `\nAttacker Resources Required:\n${data.securityDetails.attackerResources}`,
    );
  }

  return parts.length
    ? parts.join("\n\n")
    : "See vulnerability description for details.";
}

function buildVulImpact(data: AiFlawReportSchema): string {
  if (data.classifyReport?.malicious_use) {
    const parts: string[] = [];
    if (data.securityDetails?.attackerObjectives) {
      parts.push(
        `Attacker Objectives: ${data.securityDetails.attackerObjectives}`,
      );
    }
    const policy = data.incidentDescription?.policyViolation;
    if (policy?.reason) {
      parts.push(`\nContext: ${policy.reason}`);
    }
    return parts.length
      ? parts.join("\n")
      : "Malicious use potential identified.";
  }
  return "N/A - This vulnerability does not involve a malign actor.";
}

function buildVulDiscovery(data: AiFlawReportSchema): string {
  const parts: string[] = [];

  if (data.securityDetails?.discoveryNarrative) {
    parts.push(
      `Discovery Narrative:\n${data.securityDetails.discoveryNarrative}`,
    );
  }
  if (data.evidence?.stepsToReproduce) {
    parts.push(`\nReproduction Steps:\n${data.evidence.stepsToReproduce}`);
  }

  return parts.length
    ? parts.join("\n\n")
    : "See evidence section for details.";
}

function buildDisclosurePlans(data: AiFlawReportSchema): string {
  const disclosure = data.disclosurePlan;
  if (!disclosure) return "";

  const parts: string[] = [];

  if (disclosure.publicDisclosureIntent) {
    parts.push(
      `Public Disclosure Intent: ${disclosure.publicDisclosureIntent}`,
    );
  }
  if (disclosure.disclosureTimeline) {
    parts.push(`Timeline: ${disclosure.disclosureTimeline}`);
  }
  if (disclosure.disclosureDatepicker) {
    parts.push(`Planned Disclosure Date: ${disclosure.disclosureDatepicker}`);
  }
  if (disclosure.embargoDetails) {
    parts.push(`Embargo Details: ${disclosure.embargoDetails}`);
  }

  return parts.join("\n");
}

function determineIcsImpact(data: AiFlawReportSchema): boolean {
  const stakeholders = data.impactAssessment?.affectedStakeholders ?? [];
  const indicators = [
    "critical_systems",
    "critical_infrastructure",
    "operational_technology",
  ];
  const joined = stakeholders.join(" ").toLowerCase();
  return indicators.some((i) => joined.includes(i));
}

export function convertToCert(data: AiFlawReportSchema): string {
  const systems = getSystemsArray(data.reporterDetails);
  const multipleVendors = systems.length > 1;
  const productName = systems[0] ?? "Unknown System";
  const otherVendors = systems.slice(1).join("\r\n");
  const productVersion = systems.length
    ? systems.join("\r\n")
    : "Not specified";

  const reporter = data.reporterDetails?.reporter;
  const classify = data.classifyReport;
  const disclosure = data.disclosurePlan;

  const hasEmbargo = !!disclosure?.embargoDetails?.trim();
  const vulDisclose =
    disclosure?.publicDisclosureIntent?.toLowerCase() === "yes" && !hasEmbargo;

  const vinceReport = {
    comm_attempt: false,
    first_contact: "",
    vendor_communication: "",
    why_no_attempt: "3",
    please_explain:
      "Vulnerability report forwarded from the AI Flaw Report form.",
    vendor_name: "",
    multiplevendors: multipleVendors,
    other_vendors: otherVendors,
    product_name: productName,
    product_version: productVersion,
    ics_impact: determineIcsImpact(data),
    ai_ml_system: true,
    vul_description: buildVulDescription(data),
    vul_exploit: buildVulExploit(data),
    vul_impact: buildVulImpact(data),
    vul_discovery: buildVulDiscovery(data),
    vul_public: false,
    public_references: "",
    vul_exploited: classify?.real_world_harm ?? false,
    exploit_references: "",
    vul_disclose: vulDisclose,
    disclosure_plans: buildDisclosurePlans(data),
    user_file: "",
    contact_name: "",
    contact_org: reporter?.org ?? "",
    contact_email: reporter?.email ?? "",
    contact_phone: "",
    share_release: false,
    credit_release: false,
    reporter_pgp: "",
    tracking: "",
    comments: "",
    cisa_please: false,
  };

  return JSON.stringify(vinceReport, null, 2);
}
