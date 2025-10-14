import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Design System/Colors",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ColorSwatch = ({ name, value }: { name: string; value: string }) => (
  <div className="flex flex-col items-center gap-2">
    <div
      className="h-16 w-16 rounded-lg border shadow-sm"
      style={{ backgroundColor: value }}
    />
    <div className="text-center">
      <p className="text-xs font-medium">{name}</p>
      <p className="text-xs text-gray-500">{value}</p>
    </div>
  </div>
);

const ColorPalette = ({
  title,
  colors,
}: {
  title: string;
  colors: Array<{ name: string; value: string }>;
}) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">{title}</h3>
    <div className="flex flex-wrap gap-4">
      {colors.map((color) => (
        <ColorSwatch key={color.name} name={color.name} value={color.value} />
      ))}
    </div>
  </div>
);

export const Primary: Story = {
  render: () => (
    <ColorPalette
      title="Primary Colors"
      colors={[
        { name: "primary-25", value: "var(--color-primary-25)" },
        { name: "primary-50", value: "var(--color-primary-50)" },
        { name: "primary-100", value: "var(--color-primary-100)" },
        { name: "primary-200", value: "var(--color-primary-200)" },
        { name: "primary-300", value: "var(--color-primary-300)" },
        { name: "primary-400", value: "var(--color-primary-400)" },
        { name: "primary-500", value: "var(--color-primary-500)" },
        { name: "primary-600", value: "var(--color-primary-600)" },
        { name: "primary-700", value: "var(--color-primary-700)" },
        { name: "primary-800", value: "var(--color-primary-800)" },
        { name: "primary-900", value: "var(--color-primary-900)" },
        { name: "primary-950", value: "var(--color-primary-950)" },
      ]}
    />
  ),
};

export const Gray: Story = {
  render: () => (
    <ColorPalette
      title="Gray Colors"
      colors={[
        { name: "gray-25", value: "var(--color-gray-25)" },
        { name: "gray-50", value: "var(--color-gray-50)" },
        { name: "gray-100", value: "var(--color-gray-100)" },
        { name: "gray-200", value: "var(--color-gray-200)" },
        { name: "gray-300", value: "var(--color-gray-300)" },
        { name: "gray-400", value: "var(--color-gray-400)" },
        { name: "gray-500", value: "var(--color-gray-500)" },
        { name: "gray-600", value: "var(--color-gray-600)" },
        { name: "gray-700", value: "var(--color-gray-700)" },
        { name: "gray-800", value: "var(--color-gray-800)" },
        { name: "gray-900", value: "var(--color-gray-900)" },
        { name: "gray-950", value: "var(--color-gray-950)" },
      ]}
    />
  ),
};

export const Error: Story = {
  render: () => (
    <ColorPalette
      title="Error Colors"
      colors={[
        { name: "error-25", value: "var(--color-error-25)" },
        { name: "error-50", value: "var(--color-error-50)" },
        { name: "error-100", value: "var(--color-error-100)" },
        { name: "error-200", value: "var(--color-error-200)" },
        { name: "error-300", value: "var(--color-error-300)" },
        { name: "error-400", value: "var(--color-error-400)" },
        { name: "error-500", value: "var(--color-error-500)" },
        { name: "error-600", value: "var(--color-error-600)" },
        { name: "error-700", value: "var(--color-error-700)" },
        { name: "error-800", value: "var(--color-error-800)" },
        { name: "error-900", value: "var(--color-error-900)" },
        { name: "error-950", value: "var(--color-error-950)" },
      ]}
    />
  ),
};

export const Warning: Story = {
  render: () => (
    <ColorPalette
      title="Warning Colors"
      colors={[
        { name: "warning-25", value: "var(--color-warning-25)" },
        { name: "warning-50", value: "var(--color-warning-50)" },
        { name: "warning-100", value: "var(--color-warning-100)" },
        { name: "warning-200", value: "var(--color-warning-200)" },
        { name: "warning-300", value: "var(--color-warning-300)" },
        { name: "warning-400", value: "var(--color-warning-400)" },
        { name: "warning-500", value: "var(--color-warning-500)" },
        { name: "warning-600", value: "var(--color-warning-600)" },
        { name: "warning-700", value: "var(--color-warning-700)" },
        { name: "warning-800", value: "var(--color-warning-800)" },
        { name: "warning-900", value: "var(--color-warning-900)" },
        { name: "warning-950", value: "var(--color-warning-950)" },
      ]}
    />
  ),
};

export const Success: Story = {
  render: () => (
    <ColorPalette
      title="Success Colors"
      colors={[
        { name: "success-25", value: "var(--color-success-25)" },
        { name: "success-50", value: "var(--color-success-50)" },
        { name: "success-100", value: "var(--color-success-100)" },
        { name: "success-200", value: "var(--color-success-200)" },
        { name: "success-300", value: "var(--color-success-300)" },
        { name: "success-400", value: "var(--color-success-400)" },
        { name: "success-500", value: "var(--color-success-500)" },
        { name: "success-600", value: "var(--color-success-600)" },
        { name: "success-700", value: "var(--color-success-700)" },
        { name: "success-800", value: "var(--color-success-800)" },
        { name: "success-900", value: "var(--color-success-900)" },
        { name: "success-950", value: "var(--color-success-950)" },
      ]}
    />
  ),
};

export const AllColors: Story = {
  render: () => (
    <div className="space-y-8">
      <ColorPalette
        title="Primary"
        colors={[
          { name: "25", value: "var(--color-primary-25)" },
          { name: "50", value: "var(--color-primary-50)" },
          { name: "100", value: "var(--color-primary-100)" },
          { name: "200", value: "var(--color-primary-200)" },
          { name: "300", value: "var(--color-primary-300)" },
          { name: "400", value: "var(--color-primary-400)" },
          { name: "500", value: "var(--color-primary-500)" },
          { name: "600", value: "var(--color-primary-600)" },
          { name: "700", value: "var(--color-primary-700)" },
          { name: "800", value: "var(--color-primary-800)" },
          { name: "900", value: "var(--color-primary-900)" },
        ]}
      />
      <ColorPalette
        title="Gray"
        colors={[
          { name: "25", value: "var(--color-gray-25)" },
          { name: "50", value: "var(--color-gray-50)" },
          { name: "100", value: "var(--color-gray-100)" },
          { name: "200", value: "var(--color-gray-200)" },
          { name: "300", value: "var(--color-gray-300)" },
          { name: "400", value: "var(--color-gray-400)" },
          { name: "500", value: "var(--color-gray-500)" },
          { name: "600", value: "var(--color-gray-600)" },
          { name: "700", value: "var(--color-gray-700)" },
          { name: "800", value: "var(--color-gray-800)" },
          { name: "900", value: "var(--color-gray-900)" },
        ]}
      />
      <ColorPalette
        title="Error"
        colors={[
          { name: "25", value: "var(--color-error-25)" },
          { name: "50", value: "var(--color-error-50)" },
          { name: "100", value: "var(--color-error-100)" },
          { name: "200", value: "var(--color-error-200)" },
          { name: "300", value: "var(--color-error-300)" },
          { name: "400", value: "var(--color-error-400)" },
          { name: "500", value: "var(--color-error-500)" },
          { name: "600", value: "var(--color-error-600)" },
          { name: "700", value: "var(--color-error-700)" },
          { name: "800", value: "var(--color-error-800)" },
          { name: "900", value: "var(--color-error-900)" },
        ]}
      />
      <ColorPalette
        title="Warning"
        colors={[
          { name: "25", value: "var(--color-warning-25)" },
          { name: "50", value: "var(--color-warning-50)" },
          { name: "100", value: "var(--color-warning-100)" },
          { name: "200", value: "var(--color-warning-200)" },
          { name: "300", value: "var(--color-warning-300)" },
          { name: "400", value: "var(--color-warning-400)" },
          { name: "500", value: "var(--color-warning-500)" },
          { name: "600", value: "var(--color-warning-600)" },
          { name: "700", value: "var(--color-warning-700)" },
          { name: "800", value: "var(--color-warning-800)" },
          { name: "900", value: "var(--color-warning-900)" },
        ]}
      />
      <ColorPalette
        title="Success"
        colors={[
          { name: "25", value: "var(--color-success-25)" },
          { name: "50", value: "var(--color-success-50)" },
          { name: "100", value: "var(--color-success-100)" },
          { name: "200", value: "var(--color-success-200)" },
          { name: "300", value: "var(--color-success-300)" },
          { name: "400", value: "var(--color-success-400)" },
          { name: "500", value: "var(--color-success-500)" },
          { name: "600", value: "var(--color-success-600)" },
          { name: "700", value: "var(--color-success-700)" },
          { name: "800", value: "var(--color-success-800)" },
          { name: "900", value: "var(--color-success-900)" },
        ]}
      />
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Accent</h3>
        <div className="flex gap-4">
          <ColorSwatch name="indigo-500" value="var(--color-indigo-500)" />
        </div>
      </div>
    </div>
  ),
};
