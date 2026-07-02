import type { Meta, StoryObj } from "@storybook/nextjs";
import { Calendar } from "./index";

const meta = {
  title: "UI/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: "select",
      options: ["single", "multiple", "range"],
    },
    buttonVariant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    showOutsideDays: {
      control: "boolean",
    },
    captionLayout: {
      control: "select",
      options: ["label", "dropdown"],
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mode: "single",
    showOutsideDays: true,
    captionLayout: "label",
  },
};

export const Multiple: Story = {
  args: {
    mode: "multiple",
    showOutsideDays: true,
    captionLayout: "label",
  },
};

export const Range: Story = {
  args: {
    mode: "range",
    showOutsideDays: true,
    captionLayout: "label",
  },
};

export const WithDropdown: Story = {
  args: {
    mode: "single",
    showOutsideDays: true,
    captionLayout: "dropdown",
  },
};

export const WithoutOutsideDays: Story = {
  args: {
    mode: "single",
    showOutsideDays: false,
    captionLayout: "label",
  },
};
