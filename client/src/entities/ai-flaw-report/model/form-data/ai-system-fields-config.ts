import type { FieldConfig } from "../types";
import { AI_PLATFORMS } from "./reporter-details-data";

export type AiSystemFieldName =
  | "reporterDetails.system.platforms"
  | "reporterDetails.system.version";

export type AiSystemFieldConfig = FieldConfig & {
  name: AiSystemFieldName;
};

export const AI_SYSTEM_PLATFORM_FIELD: AiSystemFieldConfig = {
  name: "reporterDetails.system.platforms",
  label: "AI Product/Platform",
  type: "multi-select",
  placeholder: "Select the product or platform",
  options: AI_PLATFORMS,
  required: true,
  tooltipClassName: "right-[44px] dark:hover:text-gray-500",
};

export const createVersionFieldConfig = (
  isRequired: boolean,
): AiSystemFieldConfig => ({
  name: "reporterDetails.system.version",
  label: isRequired
    ? "Version/Endpoint Details"
    : "Version/Endpoint Details (Optional)",
  type: "input",
  placeholder: "e.g., gpt-t-0125-preview, specific URL, version number",
  tooltipClassName: "dark:hover:text-gray-500",
  required: isRequired,
});
