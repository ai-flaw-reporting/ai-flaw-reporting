import type z from "zod";
import type {
  SAVE_STATUS,
  STEP_CONFIGS_WITH_SCHEMAS,
  STEP_STATUS,
} from "./constants";
import type { aiFlawReportSchema, classifyReportSchema } from "./schema";

export type FormStep = keyof typeof STEP_CONFIGS_WITH_SCHEMAS;

export type StepConfig = (typeof STEP_CONFIGS_WITH_SCHEMAS)[FormStep] & {
  schema?: z.ZodSchema;
};

export type StepSchema = z.ZodSchema | undefined;

export type ClassifyReportSchema = z.infer<typeof classifyReportSchema>;
export type AiFlawReportSchema = z.infer<typeof aiFlawReportSchema>;

export type StepStatus = (typeof STEP_STATUS)[keyof typeof STEP_STATUS];
export type SaveStatus = (typeof SAVE_STATUS)[keyof typeof SAVE_STATUS];
