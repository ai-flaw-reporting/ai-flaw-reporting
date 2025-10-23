import type { Meta, StoryObj } from "@storybook/nextjs";
import { RadioGroup, RadioGroupItem } from "./index";

const meta = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <RadioGroupItem value="option1">Option 1</RadioGroupItem>
      <RadioGroupItem value="option2">Option 2</RadioGroupItem>
      <RadioGroupItem value="option3">Option 3</RadioGroupItem>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <RadioGroupItem value="option1">Option 1</RadioGroupItem>
      <RadioGroupItem value="option2" disabled>
        Option 2 (Disabled)
      </RadioGroupItem>
      <RadioGroupItem value="option3">Option 3</RadioGroupItem>
    </RadioGroup>
  ),
};

export const AllDisabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option1" disabled>
      <RadioGroupItem value="option1">Option 1</RadioGroupItem>
      <RadioGroupItem value="option2">Option 2</RadioGroupItem>
      <RadioGroupItem value="option3">Option 3</RadioGroupItem>
    </RadioGroup>
  ),
};

export const YesNo: Story = {
  render: () => (
    <RadioGroup defaultValue="true" className="flex gap-4">
      <RadioGroupItem variant="yesno" value="true">
        Yes
      </RadioGroupItem>
      <RadioGroupItem variant="yesno" value="false">
        No
      </RadioGroupItem>
    </RadioGroup>
  ),
};

export const YesNoDisabled: Story = {
  render: () => (
    <RadioGroup defaultValue="true" className="flex gap-4">
      <RadioGroupItem variant="yesno" value="true">
        Yes
      </RadioGroupItem>
      <RadioGroupItem variant="yesno" value="false" disabled>
        No
      </RadioGroupItem>
    </RadioGroup>
  ),
};

export const YesNoUnselected: Story = {
  render: () => (
    <RadioGroup className="flex gap-4">
      <RadioGroupItem variant="yesno" value="true">
        Yes
      </RadioGroupItem>
      <RadioGroupItem variant="yesno" value="false">
        No
      </RadioGroupItem>
    </RadioGroup>
  ),
};

export const Dots: Story = {
  render: () => (
    <RadioGroup defaultValue="option1" className="flex gap-4">
      <RadioGroupItem variant="dots" value="option1">
        Option 1
      </RadioGroupItem>
      <RadioGroupItem variant="dots" value="option2">
        Option 2
      </RadioGroupItem>
      <RadioGroupItem variant="dots" value="option3">
        Option 3
      </RadioGroupItem>
    </RadioGroup>
  ),
};

export const DotsDisabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option1" className="flex gap-4">
      <RadioGroupItem variant="dots" value="option1">
        Option 1
      </RadioGroupItem>
      <RadioGroupItem variant="dots" value="option2" disabled>
        Option 2 (Disabled)
      </RadioGroupItem>
      <RadioGroupItem variant="dots" value="option3">
        Option 3
      </RadioGroupItem>
    </RadioGroup>
  ),
};
