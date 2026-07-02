import type { Meta, StoryObj } from "@storybook/nextjs";
import { Checkbox, CheckboxCard } from "./index";

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

export const CheckboxCardExample: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <CheckboxCard>
        <div>
          <h3 className="font-medium text-gray-900">Option 1</h3>
          <p className="mt-1 text-sm text-gray-600">
            This is a description of the first option with some additional
            details.
          </p>
        </div>
      </CheckboxCard>
      <CheckboxCard defaultChecked>
        <div>
          <h3 className="font-medium text-gray-900">Option 2</h3>
          <p className="mt-1 text-sm text-gray-600">
            This option is pre-selected and shows how it looks when checked.
          </p>
        </div>
      </CheckboxCard>
      <CheckboxCard disabled>
        <div>
          <h3 className="font-medium text-gray-400">Option 3 (Disabled)</h3>
          <p className="mt-1 text-sm text-gray-400">
            This option is disabled and cannot be selected.
          </p>
        </div>
      </CheckboxCard>
    </div>
  ),
};
