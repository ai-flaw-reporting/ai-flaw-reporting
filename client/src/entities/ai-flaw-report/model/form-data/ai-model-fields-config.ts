import type { FieldConfig } from "../types";

export type AiModelFieldName =
  | "reporterDetails.system.models"
  | "reporterDetails.system.platformOther";

export type AiModelFieldConfig = FieldConfig & {
  name: AiModelFieldName;
};

export const createAiModelSelectField = (
  options: string[],
  isRequired: boolean,
): AiModelFieldConfig => ({
  name: "reporterDetails.system.models",
  label: "AI System/Model",
  type: "multi-select",
  placeholder: "Select the AI system",
  options,
  required: isRequired,
  tooltipClassName: "right-[44px] dark:hover:text-gray-500",
});

export const createAiModelInputField = (
  isRequired: boolean,
): AiModelFieldConfig => ({
  name: "reporterDetails.system.platformOther",
  label: "AI System/Model",
  type: "input",
  placeholder: "Type the AI system/model",
  required: isRequired,
  tooltipClassName: "dark:hover:text-gray-500",
});
