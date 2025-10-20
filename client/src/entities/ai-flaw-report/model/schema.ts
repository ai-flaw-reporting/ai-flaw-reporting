import { z } from "zod";
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

export const aiFlawReportSchema = z.object({
  step: z.enum(STEP_ORDER as [FormStep, ...FormStep[]]),
  classifyReport: classifyReportSchema,
});
