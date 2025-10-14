import type { Meta, StoryObj } from "@storybook/nextjs";
import { Progress } from "./index";

const meta = {
  title: "UI/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
    className: "w-[300px]",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-[300px] space-y-2">
      <div className="flex justify-between text-sm">
        <label>Uploading...</label>
        <span className="text-gray-500">60%</span>
      </div>
      <Progress value={60} />
    </div>
  ),
};

export const Empty: Story = {
  args: {
    value: 0,
    className: "w-[300px]",
  },
};

export const Quarter: Story = {
  args: {
    value: 25,
    className: "w-[300px]",
  },
};

export const Half: Story = {
  args: {
    value: 50,
    className: "w-[300px]",
  },
};

export const ThreeQuarters: Story = {
  args: {
    value: 75,
    className: "w-[300px]",
  },
};

export const Complete: Story = {
  args: {
    value: 100,
    className: "w-[300px]",
  },
};

export const FileUpload: Story = {
  render: () => (
    <div className="w-[400px] space-y-4 rounded-lg border p-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">document.pdf</span>
          <span className="text-gray-500">2.4 MB</span>
        </div>
        <Progress value={45} />
        <p className="text-xs text-gray-500">Uploading... 45% complete</p>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="w-[400px] space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium">0% Complete</p>
        <Progress value={0} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">25% Complete</p>
        <Progress value={25} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">50% Complete</p>
        <Progress value={50} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">75% Complete</p>
        <Progress value={75} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">100% Complete</p>
        <Progress value={100} />
      </div>
    </div>
  ),
};
