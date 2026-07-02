import type { Meta, StoryObj } from "@storybook/nextjs";
import { Slider } from "./index";

const meta = {
  title: "UI/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: [50],
    className: "w-[300px]",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div className="flex justify-between text-sm">
        <label>Volume</label>
        <span className="text-gray-500">50%</span>
      </div>
      <Slider defaultValue={[50]} />
    </div>
  ),
};

export const Range: Story = {
  args: {
    defaultValue: [25, 75],
    className: "w-[300px]",
  },
};

export const CustomMinMax: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div className="flex justify-between text-sm">
        <span>0°C</span>
        <span>100°C</span>
      </div>
      <Slider defaultValue={[37]} min={0} max={100} step={1} />
      <p className="text-center text-sm text-gray-500">Temperature: 37°C</p>
    </div>
  ),
};

export const WithSteps: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <label className="text-sm font-medium">Quality (1-5)</label>
      <Slider defaultValue={[3]} min={1} max={5} step={1} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    disabled: true,
    className: "w-[300px]",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="w-[400px] space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium">Single Value</p>
        <Slider defaultValue={[50]} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Range</p>
        <Slider defaultValue={[25, 75]} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Custom Steps</p>
        <Slider defaultValue={[3]} min={1} max={5} step={1} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Disabled</p>
        <Slider defaultValue={[50]} disabled />
      </div>
    </div>
  ),
};
