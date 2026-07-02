import type { Meta, StoryObj } from "@storybook/nextjs";
import { Textarea } from "./index";

const meta = {
  title: "UI/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter your message...",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-[400px] space-y-2">
      <label htmlFor="message" className="text-sm font-medium">
        Message
      </label>
      <Textarea id="message" placeholder="Type your message here..." />
    </div>
  ),
};

export const WithValue: Story = {
  args: {
    value:
      "This is a pre-filled textarea with some content that demonstrates how the component looks with text.",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled textarea",
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    placeholder: "Invalid textarea",
    "aria-invalid": true,
  },
};

export const FormExample: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <div className="space-y-2">
        <label htmlFor="feedback" className="text-sm font-medium">
          Feedback
        </label>
        <Textarea id="feedback" placeholder="Tell us what you think..." />
        <p className="text-xs text-gray-500">
          Your feedback helps us improve our service.
        </p>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <Textarea placeholder="Default textarea" />
      <Textarea
        placeholder="With value"
        value="This textarea has some content"
      />
      <Textarea placeholder="Disabled textarea" disabled />
      <Textarea placeholder="Invalid textarea" aria-invalid />
    </div>
  ),
};
