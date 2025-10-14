import type { Meta, StoryObj } from "@storybook/nextjs";
import { Checkbox } from "./index";

const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Checkbox id="checkbox-1" defaultChecked />
        <label htmlFor="checkbox-1" className="text-sm">
          Email notifications
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="checkbox-2" />
        <label htmlFor="checkbox-2" className="text-sm">
          Marketing emails
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="checkbox-3" disabled />
        <label htmlFor="checkbox-3" className="text-sm text-gray-400">
          System updates (disabled)
        </label>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Checkbox />
        <span className="text-sm">Unchecked</span>
      </div>
      <div className="flex items-center gap-4">
        <Checkbox defaultChecked />
        <span className="text-sm">Checked</span>
      </div>
      <div className="flex items-center gap-4">
        <Checkbox disabled />
        <span className="text-sm">Disabled</span>
      </div>
      <div className="flex items-center gap-4">
        <Checkbox disabled defaultChecked />
        <span className="text-sm">Disabled Checked</span>
      </div>
      <div className="flex items-center gap-4">
        <Checkbox aria-invalid />
        <span className="text-sm">Invalid</span>
      </div>
    </div>
  ),
};
