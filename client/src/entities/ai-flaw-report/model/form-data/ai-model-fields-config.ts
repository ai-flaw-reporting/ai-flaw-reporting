import type { FieldConfig } from "../types";

export type AiModelFieldName =
  | "reporterDetails.system.model"
  | "reporterDetails.system.platformOther";

export type AiModelFieldConfig = FieldConfig & {
  name: AiModelFieldName;
};

export const createAiModelSelectField = (
  options: readonly string[] | string[],
  isRequired: boolean,
): AiModelFieldConfig => ({
  name: "reporterDetails.system.model",
  label: "AI System/Model",
  type: "select",
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
