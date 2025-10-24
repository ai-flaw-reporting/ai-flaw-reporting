import type { FieldConfig } from "../types";
import dynamic from "next/dynamic";

const DynamicWorldIcon = dynamic(() =>
  import("~/components/icons/world-icon").then((mod) => mod.WorldIcon),
);

const DynamicDocumentIcon = dynamic(() =>
  import("~/components/icons/document-icon").then((mod) => mod.DocumentIcon),
);

const DynamicClockIcon = dynamic(() =>
  import("~/components/icons/clock-icon").then((mod) => mod.ClockIcon),
);

export const PUBLIC_DISCLOSURE_INTENT_VALUES = {
  YES: "yes",
  NO: "no",
  UNDECIDED: "undecided",
  ALREADY: "already",
} as const;

export type DisclosurePlanFieldName =
  | "disclosurePlan.publicDisclosureIntent"
  | "disclosurePlan.embargoDetails"
  | "disclosurePlan.disclosureTimeline"
  | "disclosurePlan.disclosureDatepicker";

export type DisclosurePlanFieldConfig = FieldConfig & {
  name: string;
  title?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | string;
  rows?: number;
  maxLength?: number;
  options?: {
    value: string;
    label: string;
    description?: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }[];
};

export const PUBLIC_DISCLOSURE_INTENT_FIELD = {
  name: "disclosurePlan.publicDisclosureIntent",
  title: "Public Disclosure Intent",
  icon: DynamicWorldIcon,
  label: "Do you plan to disclose this issue publicly?",
  type: "radio",
  options: [
    {
      value: PUBLIC_DISCLOSURE_INTENT_VALUES.YES,
      label: "Yes, I plan to disclose publicly",
      icon: DynamicWorldIcon,
    },
    {
      value: PUBLIC_DISCLOSURE_INTENT_VALUES.NO,
      label: "No, I prefer private reporting only",
      icon: DynamicDocumentIcon,
    },
    {
      value: PUBLIC_DISCLOSURE_INTENT_VALUES.UNDECIDED,
      label: "I'm undecided",
      icon: DynamicClockIcon,
    },
    {
      value: PUBLIC_DISCLOSURE_INTENT_VALUES.ALREADY,
      label: "Already publicly disclosed",
      icon: DynamicWorldIcon,
    },
  ] as const,
};

export const EMBARGO_DETAILS_FIELD = {
  name: "disclosurePlan.embargoDetails",
  title: "Embargo Details",
  icon: DynamicClockIcon,
  label: "Any embargo or coordination requirements?",
  placeholder:
    "Describe any coordination with vendors, embargo periods, or special disclosure requirements....",
  description:
    "This helps coordinate responsible disclosure with affected parties",
  type: "textarea",
  rows: 4,
  maxLength: 2000,
};

export const DISCLOSURE_TIMELINE_FIELD = {
  name: "disclosurePlan.disclosureTimeline",
  title: "Disclosure Details",
  icon: "icons/form/building.svg",
  label: "Where did you plan or already disclose this issue?",
  placeholder: "Enter timeline",
  type: "input",
};

export const DISCLOSURE_DATEPICKER_FIELD = {
  name: "disclosurePlan.disclosureDatepicker",
  label: "When was / will it be disclosed?",
  placeholder: "Pick a date",
  type: "datepicker",
};

export const DISCLOSURE_GUIDANCE_FIELD = {
  title: "Disclosure Guidance",
  label: "Consider these factors when deciding on disclosure:",
  items: [
    "Severity and scope of the issue",
    "Vendor response and timeline for fixes",
    "Public interest and safety considerations",
    "Legal and ethical implications",
    "Your organization's disclosure policies",
  ],
  description:
    "We recommend coordinating with affected vendors before public disclosure.",
};
