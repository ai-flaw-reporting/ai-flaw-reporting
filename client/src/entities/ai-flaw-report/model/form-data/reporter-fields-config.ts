import type { FieldConfig } from "../types";

export type ReporterFieldName =
  | "reporterDetails.reporter.email"
  | "reporterDetails.reporter.org"
  | "reporterDetails.reporter.country";

export type ReporterFieldConfig = FieldConfig & {
  name: ReporterFieldName;
};

export const REPORTER_FIELDS: ReporterFieldConfig[] = [
  {
    name: "reporterDetails.reporter.email",
    label: "Email Address",
    type: "input",
    inputType: "email",
    placeholder: "olivia@gmail.com",
    description: "Required for follow-up and report delivery",
    showMessage: true,
    required: true,
  },
];

export const REPORTER_ROW_FIELDS: ReporterFieldConfig[] = [
  {
    name: "reporterDetails.reporter.org",
    label: "Organization",
    type: "input",
    placeholder: "University, Company, etc.",
  },
  {
    name: "reporterDetails.reporter.country",
    label: "Country",
    type: "country",
    placeholder: "Select a country",
    tooltipClassName: "right-[44px]",
  },
];
