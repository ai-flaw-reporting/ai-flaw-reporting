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
      email: z
        .string()
        .email()
        .optional()
        .transform((val) => val?.trim().toLowerCase())
        .refine(
          (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
          "Invalid email format",
        ),
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

export const aiFlawReportSchema = z.object({
  step: z.enum(STEP_ORDER as [FormStep, ...FormStep[]]),
  classifyReport: classifyReportSchema,
  reporterDetails: reporterDetailsSchema,
});
