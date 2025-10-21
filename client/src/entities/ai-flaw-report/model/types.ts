import type z from "zod";
import type {
  SAVE_STATUS,
  STEP_CONFIGS_WITH_SCHEMAS,
  STEP_STATUS,
} from "./constants";
import type {
  aiFlawReportSchema,
  classifyReportSchema,
  reporterDetailsSchema,
  incidentDescriptionSchema,
} from "./schema";

export type FormStep = keyof typeof STEP_CONFIGS_WITH_SCHEMAS;

export type StepConfig = (typeof STEP_CONFIGS_WITH_SCHEMAS)[FormStep] & {
  schema?: z.ZodSchema;
};

export type StepSchema = z.ZodSchema | undefined;

export type ClassifyReportSchema = z.infer<typeof classifyReportSchema>;
export type ReporterDetailsSchema = z.infer<typeof reporterDetailsSchema>;
export type IncidentDescriptionSchema = z.infer<
  typeof incidentDescriptionSchema
>;
export type AiFlawReportSchema = z.infer<typeof aiFlawReportSchema>;

export type StepStatus = (typeof STEP_STATUS)[keyof typeof STEP_STATUS];
export type SaveStatus = (typeof SAVE_STATUS)[keyof typeof SAVE_STATUS];

type BaseFieldConfig = {
  label: string;
  placeholder?: string;
  description?: string;
  showMessage?: boolean;
  required?: boolean;
  tooltipClassName?: string;
};

type InputFieldConfig = BaseFieldConfig & {
  type: "input";
  inputType?: "text" | "email" | "url";
};

type TextareaFieldConfig = BaseFieldConfig & {
  type: "textarea";
  rows?: number;
  maxLength?: number;
};

type SelectFieldConfig = BaseFieldConfig & {
  type: "select";
  options: readonly string[] | string[];
};

type CountrySelectFieldConfig = BaseFieldConfig & {
  type: "country";
};

export type FieldConfig =
  | InputFieldConfig
  | TextareaFieldConfig
  | SelectFieldConfig
  | CountrySelectFieldConfig;
