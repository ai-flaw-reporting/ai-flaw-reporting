import type { FieldConfig } from "../types";
import { ACCESS_METHODS } from "./reporter-details-data";

export type AccessMethodFieldName =
  | "reporterDetails.system.accessMethod"
  | "reporterDetails.system.accessMethodOther";

export type AccessMethodFieldConfig = FieldConfig & {
  name: AccessMethodFieldName;
};

export const ACCESS_METHOD_SELECT_FIELD: AccessMethodFieldConfig = {
  name: "reporterDetails.system.accessMethod",
  label: "Access Method",
  type: "select",
  placeholder: "How did you access the system?",
  options: ACCESS_METHODS,
  tooltipClassName: "right-[44px] dark:hover:text-gray-500",
};

export const ACCESS_METHOD_INPUT_FIELD: AccessMethodFieldConfig = {
  name: "reporterDetails.system.accessMethodOther",
  label: "Other access method",
  type: "input",
  placeholder: "How did you access the system?",
  tooltipClassName: "right-[44px] dark:hover:text-gray-500",
};
