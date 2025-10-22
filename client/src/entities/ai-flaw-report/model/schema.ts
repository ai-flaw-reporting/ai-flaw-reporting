import { z } from "zod";
import { FORM_VALUES } from "./constants";
import { STEP_ORDER } from "./step-config";
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
      email: z.union([z.string().email(), z.string().length(0)]).optional(),
      org: z.string().optional(),
      country: z.string().optional(),
    }),
    system: z.object({
      platform: z.string().min(1),
      platformOther: z.string().optional(),
      model: z.string().optional(),
      version: z.string().optional(),
      accessMethod: z.string().optional(),
      accessMethodOther: z.string().optional(),
      notSure: z.boolean().default(false),
    }),
  })
  .refine(
    (data) => {
      if (
        data.system.platform === FORM_VALUES.OTHER &&
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
      if (!data.system.notSure && !data.system.model?.trim()) {
        return false;
      }
      return true;
    },
    {
      path: ["system", "model"],
    },
  )
  .refine(
    (data) => {
      if (
        data.system.accessMethod === FORM_VALUES.OTHER &&
        !data.system.accessMethodOther?.trim()
      ) {
        return false;
      }
      return true;
    },
    {
      path: ["system", "accessMethodOther"],
    },
  )
  .refine(
    (data) => {
      if (
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
        .optional()
        .transform((val) => val?.trim())
        .refine(
          (val) => {
            if (!val || val === "") return true;
            try {
              new URL(val);
              return true;
            } catch {
              return false;
            }
          },
          { message: "Please enter a valid URL" },
        )
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

// Create a dynamic schema that considers CSAM context
export const createEvidenceSchema = (csamInvolved: boolean) => {
  if (csamInvolved) {
    // When CSAM is involved, all fields are optional
    return z.object({
      stepsToReproduce: z.string().optional().or(z.literal("")),
      proofOfConcept: z.string().optional().or(z.literal("")),
      attachments: z.array(z.instanceof(File)).optional().default([]),
    });
  }

  // When CSAM is not involved, require stepsToReproduce
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

export const aiFlawReportSchema = z.object({
  step: z.enum(STEP_ORDER as [FormStep, ...FormStep[]]),
  classifyReport: classifyReportSchema,
  reporterDetails: reporterDetailsSchema,
  incidentDescription: incidentDescriptionSchema,
  evidence: evidenceAndReproductionSchema,
});
