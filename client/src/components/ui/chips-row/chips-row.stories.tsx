import type { Meta, StoryObj } from "@storybook/nextjs";
import { ChipsRow } from "./index";
import { Link } from "lucide-react";

const meta = {
  title: "UI/ChipsRow",
  component: ChipsRow,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    maxVisible: {
      control: { type: "number", min: 0, max: 50 },
      description: "Maximum number of characters to show in badge text",
    },
    placeholder: {
      control: "text",
    },
  },
} satisfies Meta<typeof ChipsRow>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = [
  {
    name: "OpenAI Policies",
    value: "https://openai.com/policies/usage-policies/",
  },
  {
    name: "Anthropic Policies",
    value: "https://www.anthropic.com/research/policy",
  },
  { name: "Google AI Principles", value: "https://ai.google/principles/" },
  {
    name: "Microsoft Responsible AI",
    value: "https://www.microsoft.com/ai/responsible-ai",
  },
  { name: "Meta AI Principles", value: "https://ai.meta.com/responsible-use/" },
];

export const Default: Story = {
  args: {
    data: sampleData,
    placeholder: "Type to search...",
  },
};

export const WithInitialValues: Story = {
  args: {
    data: sampleData,
    defaultValue: ["OpenAI Policies", "Anthropic Policies"],
    placeholder: "Type to search...",
  },
};

export const WithIcon: Story = {
  args: {
    data: sampleData,
    placeholder: "Enter URL or search by name",
    icon: <Link className="h-5 w-5 text-gray-500" aria-hidden="true" />,
  },
};

export const WithMaxVisible: Story = {
  args: {
    data: sampleData,
    defaultValue: [
      "OpenAI Policies",
      "Anthropic Policies",
      "Google AI Principles",
    ],
    placeholder: "Type to search...",
    maxVisible: 12,
  },
};
