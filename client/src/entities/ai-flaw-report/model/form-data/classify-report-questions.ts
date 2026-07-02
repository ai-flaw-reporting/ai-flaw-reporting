import type { AiFlawReportSchema } from "../types";

type ClassifyReportField = keyof AiFlawReportSchema["classifyReport"];

export type QuestionConfig = {
  name: `classifyReport.${ClassifyReportField}`;
  label: string;
  description: string;
  yesClassName?: string;
};

export const CLASSIFY_REPORT_QUESTIONS: QuestionConfig[] = [
  {
    name: "classifyReport.real_world_harm",
    label: "Has this flaw already caused an incident of harm?",
    description: "(e.g., harm to people, property, rights, or infrastructure)",
  },
  {
    name: "classifyReport.malicious_use",
    label: "Could this flaw be used by someone with bad intent?",
    description:
      "(e.g., could an attacker use it to gain unauthorized access, spread disinformation, violate privacy, or manipulate outcomes?)",
  },
  {
    name: "classifyReport.csam_involved",
    label: "Does this involve child sexual abuse material (real or synthetic)?",
    description:
      "(e.g., any imagery, audio, or text that depicts or promotes the sexual exploitation of minors)",
    yesClassName:
      "data-[state=checked]:bg-error-500 hover:data-[state=checked]:bg-error-600 data-[state=checked]:border-error-500 hover:data-[state=checked]:border-error-600 dark:data-[state=checked]:border-error-500 dark:hover:data-[state=checked]:border-error-600",
  },
];
