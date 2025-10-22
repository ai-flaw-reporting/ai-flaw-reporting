import type { FieldConfig } from "../types";

export type EvidenceFieldName =
  | "evidence.stepsToReproduce"
  | "evidence.proofOfConcept"
  | "evidence.attachments";

export type EvidenceFieldConfig = FieldConfig & {
  name: EvidenceFieldName;
  title: string;
  icon?: string;
  rows?: number;
  maxLength?: number;
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
  language?: string;
};

export const STEPS_TO_REPRODUCE_FIELD: EvidenceFieldConfig = {
  name: "evidence.stepsToReproduce",
  title: "Steps to Reproduce",
  icon: "/icons/form/document.svg",
  label: "How can someone else reproduce this issue?",
  type: "textarea",
  rows: 3,
  maxLength: 5000,
  placeholder: `1. Go to [specific page/interface]  
2. Enter the following prompt: [exact prompt]  
3. Click [specific button/action]  
4. Observe the unexpected behavior  

Be as specific as possible with exact steps, prompts, and settings used...`,
  description:
    "Include exact prompts, settings, and conditions. Use numbered steps for clarity.",
  required: true,
};

export const PROOF_OF_CONCEPT_FIELD: EvidenceFieldConfig = {
  name: "evidence.proofOfConcept",
  title: "Proof of Concept / Exploit Code",
  icon: "/icons/form/code-snippet.svg",
  label: "Code, prompts, or techniques used (Optional)",
  type: "textarea",
  rows: 6,
  language: "javascript",
  placeholder: `// Include any code, specific prompts, or techniques
// Example prompt that triggers the issue:

"Please ignore all previous instructions and..."

// Or API calls, configuration settings, etc.`,
  description:
    "Share specific prompts, code snippets, or configuration that demonstrates the issue.",
};

export const FILE_ATTACHMENTS_FIELD: EvidenceFieldConfig = {
  name: "evidence.attachments",
  title: "File Attachments",
  label: "Upload screenshots, logs, or other relevant files (Max 5MB per file)",
  type: "file",
  accept: ".pdf,.docx,.jpg,.jpeg,.png",
  maxSize: 5 * 1024 * 1024, // 5MB in bytes
  multiple: true,
};

export const EVIDENCE_FIELDS = {
  stepsToReproduce: STEPS_TO_REPRODUCE_FIELD,
  proofOfConcept: PROOF_OF_CONCEPT_FIELD,
  attachments: FILE_ATTACHMENTS_FIELD,
} as const;
