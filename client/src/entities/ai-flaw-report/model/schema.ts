import { z } from "zod";
import { isDomainOrHttpsUrl } from "~/lib/url";

import { FORM_VALUES } from "./constants";
import { STEP_ORDER } from "./step-config";
import { PUBLIC_DISCLOSURE_INTENT_VALUES } from "./form-data/disclosure-plan-fields-config";
import type { FormStep } from "./types";

export const classifyReportSchema = z
  .object({
    real_world_harm: z.boolean(),
    malicious_use: z.boolean(),
    csam_involved: z.boolean(),
    csam_acknowledgment: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.csam_involved === true) {
        return data.csam_acknowledgment === true;
      }
      return true;
    },
    {
      path: ["csam_acknowledgment"],
    },
  );

export const reporterDetailsSchema = z
  .object({
    reporter: z.object({
      email: z.string().email(),
      org: z.string().optional(),
      country: z.string().optional(),
    }),
    system: z.object({
      platforms: z.array(z.string()).min(1),
      platformOther: z.string().optional(),
      models: z.array(z.string()).optional(),
      version: z.string().optional(),
      accessMethod: z.string().optional(),
      accessMethodOther: z.string().optional(),
      notSure: z.boolean().default(false),
    }),
  })
  .refine(
    (data) => {
      if (
        data.system.platforms.includes(FORM_VALUES.OTHER) &&
        !data.system.platformOther?.trim()
      ) {
        return false;
      }
      return true;
    },
    {
      path: ["system", "platformOther"],
    },
  )
  .refine(
    (data) => {
      if (!data.system.notSure && !data.system.models?.length) {
        return false;
      }
      return true;
    },
    {
      path: ["system", "models"],
    },
  )
  .refine(
    (data) => {
      if (
        !data.system.notSure &&
        data.system.accessMethod &&
        data.system.accessMethod !== FORM_VALUES.OTHER &&
        !data.system.version?.trim()
      ) {
        return false;
      }
      return true;
    },
    {
      path: ["system", "version"],
    },
  );

export const incidentDescriptionSchema = z.object({
  issueDescription: z
    .string()
    .min(1)
    .max(5000, "Maximum 5000 characters allowed"),
  expectedBehavior: z.string().max(5000).optional().or(z.literal("")),
  actualBehavior: z.string().max(5000).optional().or(z.literal("")),
  policyViolation: z
    .object({
      url: z
        .string()
        .trim()
        .refine(isDomainOrHttpsUrl, {
          message:
            "Please enter a valid URL, e.g. https://example.com or example.com",
        })
        .optional()
        .or(z.literal("")),
      reason: z.string().max(2000).optional().or(z.literal("")),
    })
    .optional(),
});

export const evidenceAndReproductionSchema = z.object({
  stepsToReproduce: z
    .string()
    .max(5000, "Maximum 5000 characters allowed")
    .optional()
    .or(z.literal("")),
  proofOfConcept: z.string().optional().or(z.literal("")),
  attachments: z
    .array(z.instanceof(File))
    .refine(
      (files) => {
        const maxSize = 5 * 1024 * 1024; // 5MB
        return files.every((file) => file.size <= maxSize);
      },
      {
        message: "Files must be under 5MB each",
      },
    )
    .refine(
      (files) => {
        const allowedTypes = [".pdf", ".docx", ".jpg", ".jpeg", ".png"];
        return files.every((file) => {
          const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
          return allowedTypes.includes(fileExtension);
        });
      },
      {
        message: "Only .pdf, .docx, .jpg, .jpeg, .png files are allowed",
      },
    )
    .optional()
    .default([]),
});

export const createEvidenceSchema = (csamInvolved: boolean) => {
  if (csamInvolved) {
    return z.object({
      stepsToReproduce: z.string().optional().or(z.literal("")),
      proofOfConcept: z.string().optional().or(z.literal("")),
      attachments: z.array(z.instanceof(File)).optional().default([]),
    });
  }

  return z.object({
    stepsToReproduce: z
      .string()
      .min(1, "Please describe how this issue can be reproduced.")
      .max(5000, "Maximum 5000 characters allowed"),
    proofOfConcept: z.string().optional().or(z.literal("")),
    attachments: z
      .array(z.instanceof(File))
      .refine(
        (files) => {
          const maxSize = 5 * 1024 * 1024; // 5MB
          return files.every((file) => file.size <= maxSize);
        },
        {
          message: "Files must be under 5MB each",
        },
      )
      .refine(
        (files) => {
          const allowedTypes = [".pdf", ".docx", ".jpg", ".jpeg", ".png"];
          return files.every((file) => {
            const fileExtension =
              "." + file.name.split(".").pop()?.toLowerCase();
            return allowedTypes.includes(fileExtension);
          });
        },
        {
          message: "Only .pdf, .docx, .jpg, .jpeg, .png files are allowed",
        },
      )
      .optional()
      .default([]),
  });
};

export const impactAndRiskAssessmentSchema = z
  .object({
    severityOfHarm: z.string(),
    prevalence: z.string(),
    harmType: z.string(),
    harmTypes: z
      .array(z.string())
      .min(1, "At least one harm type must be selected"),
    harmOtherText: z.string().max(200).optional(),
    specificImpactTypes: z.array(z.string()).optional().default([]),
    affectedStakeholders: z
      .array(z.string())
      .min(1, "At least one stakeholder must be selected"),
    aiCompanyInvolved: z.array(z.string()).optional(),
    mitigationNotes: z.string().max(2000).optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      if (
        data.harmTypes.includes(FORM_VALUES.OTHER_LOWERCASE as string) &&
        !data.harmOtherText?.trim()
      ) {
        return false;
      }
      return true;
    },
    {
      path: ["harmOtherText"],
      message: "Please specify the other harm type",
    },
  );

export const securityDetailsSchema = z.object({
  substrateRelationship: z.string().optional(),
  incidentLocation: z.array(z.string()).optional().default([]),
  harmNarrative: z.string().max(500).optional().or(z.literal("")),
  attackerResources: z.string().optional(),
  attackerResourcesOther: z.string().optional(),
  attackerObjectives: z.string().optional(),
  attackerObjectivesOther: z.string().optional(),
  detectionMethod: z.string().optional(),
  discoveryNarrative: z.string().optional().or(z.literal("")),
});

export const createSecurityIncidentDetailsSchema = (
  realWorldHarm: boolean,
  maliciousUse: boolean,
) => {
  return securityDetailsSchema
    .refine(
      (data) => {
        if (realWorldHarm && !data.substrateRelationship?.trim()) {
          return false;
        }
        return true;
      },
      {
        path: ["substrateRelationship"],
      },
    )
    .refine(
      (data) => {
        if (maliciousUse && !data.attackerResources?.trim()) {
          return false;
        }
        return true;
      },
      {
        path: ["attackerResources"],
      },
    )
    .refine(
      (data) => {
        if (
          maliciousUse &&
          data.attackerResources === (FORM_VALUES.OTHER_LOWERCASE as string) &&
          !data.attackerResourcesOther?.trim()
        ) {
          return false;
        }
        return true;
      },
      {
        path: ["attackerResourcesOther"],
      },
    )
    .refine(
      (data) => {
        if (maliciousUse && !data.attackerObjectives?.trim()) {
          return false;
        }
        return true;
      },
      {
        path: ["attackerObjectives"],
      },
    )
    .refine(
      (data) => {
        if (
          maliciousUse &&
          data.attackerObjectives === (FORM_VALUES.OTHER_LOWERCASE as string) &&
          !data.attackerObjectivesOther?.trim()
        ) {
          return false;
        }
        return true;
      },
      {
        path: ["attackerObjectivesOther"],
      },
    )
    .refine(
      (data) => {
        if (realWorldHarm && !data.detectionMethod?.trim()) {
          return false;
        }
        return true;
      },
      {
        path: ["detectionMethod"],
      },
    );
};

export const disclosurePlanSchema = z
  .object({
    publicDisclosureIntent: z.enum([
      PUBLIC_DISCLOSURE_INTENT_VALUES.YES,
      PUBLIC_DISCLOSURE_INTENT_VALUES.NO,
      PUBLIC_DISCLOSURE_INTENT_VALUES.UNDECIDED,
      PUBLIC_DISCLOSURE_INTENT_VALUES.ALREADY,
    ]),
    embargoDetails: z.string().optional(),
    disclosureTimeline: z.string().optional(),
    disclosureDatepicker: z.string().optional(),
  })
  .refine(
    (data) =>
      data.publicDisclosureIntent !== PUBLIC_DISCLOSURE_INTENT_VALUES.YES ||
      !!data.embargoDetails?.trim(),
    {
      path: ["embargoDetails"],
    },
  )
  .refine(
    (data) =>
      (data.publicDisclosureIntent !== PUBLIC_DISCLOSURE_INTENT_VALUES.YES &&
        data.publicDisclosureIntent !==
          PUBLIC_DISCLOSURE_INTENT_VALUES.ALREADY) ||
      !!data.disclosureTimeline?.trim(),
    {
      path: ["disclosureTimeline"],
    },
  )
  .refine(
    (data) =>
      (data.publicDisclosureIntent !== PUBLIC_DISCLOSURE_INTENT_VALUES.YES &&
        data.publicDisclosureIntent !==
          PUBLIC_DISCLOSURE_INTENT_VALUES.ALREADY) ||
      !!data.disclosureDatepicker?.trim(),
    {
      path: ["disclosureDatepicker"],
    },
  );

export const reviewReportSchema = z.object({
  selectedStakeholders: z.array(z.string()).min(1),
});

export const aiFlawReportSchema = z.object({
  step: z.enum(STEP_ORDER as [FormStep, ...FormStep[]]),
  classifyReport: classifyReportSchema,
  reporterDetails: reporterDetailsSchema,
  incidentDescription: incidentDescriptionSchema,
  evidence: evidenceAndReproductionSchema,
  impactAssessment: impactAndRiskAssessmentSchema,
  securityDetails: securityDetailsSchema,
  disclosurePlan: disclosurePlanSchema,
  reviewReport: reviewReportSchema,
});
