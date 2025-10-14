import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Design System/Typography",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DisplayScales: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs text-gray-500">Display 2XL - 72px / 90px</p>
        <h1
          className="font-bold"
          style={{
            fontSize: "var(--font-size-display-2xl)",
            lineHeight: "var(--font-line-height-display-2xl)",
          }}
        >
          The quick brown fox
        </h1>
      </div>
      <div className="space-y-2">
        <p className="text-xs text-gray-500">Display XL - 60px / 72px</p>
        <h1
          className="font-bold"
          style={{
            fontSize: "var(--font-size-display-xl)",
            lineHeight: "var(--font-line-height-display-xl)",
          }}
        >
          The quick brown fox
        </h1>
      </div>
      <div className="space-y-2">
        <p className="text-xs text-gray-500">Display LG - 48px / 60px</p>
        <h2
          className="font-bold"
          style={{
            fontSize: "var(--font-size-display-lg)",
            lineHeight: "var(--font-line-height-display-lg)",
          }}
        >
          The quick brown fox jumps
        </h2>
      </div>
      <div className="space-y-2">
        <p className="text-xs text-gray-500">Display MD - 36px / 44px</p>
        <h3
          className="font-bold"
          style={{
            fontSize: "var(--font-size-display-md)",
            lineHeight: "var(--font-line-height-display-md)",
          }}
        >
          The quick brown fox jumps over
        </h3>
      </div>
      <div className="space-y-2">
        <p className="text-xs text-gray-500">Display SM - 30px / 38px</p>
        <h4
          className="font-bold"
          style={{
            fontSize: "var(--font-size-display-sm)",
            lineHeight: "var(--font-line-height-display-sm)",
          }}
        >
          The quick brown fox jumps over the lazy dog
        </h4>
      </div>
      <div className="space-y-2">
        <p className="text-xs text-gray-500">Display XS - 24px / 32px</p>
        <h5
          className="font-bold"
          style={{
            fontSize: "var(--font-size-display-xs)",
            lineHeight: "var(--font-line-height-display-xs)",
          }}
        >
          The quick brown fox jumps over the lazy dog
        </h5>
      </div>
    </div>
  ),
};

export const TextScales: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs text-gray-500">Text XL - 20px / 30px</p>
        <p
          style={{
            fontSize: "var(--font-size-text-xl)",
            lineHeight: "var(--font-line-height-text-xl)",
          }}
        >
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
      <div className="space-y-2">
        <p className="text-xs text-gray-500">Text LG - 18px / 28px</p>
        <p
          style={{
            fontSize: "var(--font-size-text-lg)",
            lineHeight: "var(--font-line-height-text-lg)",
          }}
        >
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
      <div className="space-y-2">
        <p className="text-xs text-gray-500">Text MD - 16px / 24px</p>
        <p
          style={{
            fontSize: "var(--font-size-text-md)",
            lineHeight: "var(--font-line-height-text-md)",
          }}
        >
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
      <div className="space-y-2">
        <p className="text-xs text-gray-500">Text SM - 14px / 20px</p>
        <p
          style={{
            fontSize: "var(--font-size-text-sm)",
            lineHeight: "var(--font-line-height-text-sm)",
          }}
        >
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
      <div className="space-y-2">
        <p className="text-xs text-gray-500">Text XS - 12px / 18px</p>
        <p
          style={{
            fontSize: "var(--font-size-text-xs)",
            lineHeight: "var(--font-line-height-text-xs)",
          }}
        >
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
    </div>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-xs text-gray-500">Regular (400)</p>
        <p className="text-lg font-normal">
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
      <div>
        <p className="mb-2 text-xs text-gray-500">Medium (500)</p>
        <p className="text-lg font-medium">
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
      <div>
        <p className="mb-2 text-xs text-gray-500">Semibold (600)</p>
        <p className="text-lg font-semibold">
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
      <div>
        <p className="mb-2 text-xs text-gray-500">Bold (700)</p>
        <p className="text-lg font-bold">
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
    </div>
  ),
};

export const AllTypography: Story = {
  render: () => (
    <div className="space-y-12">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Display Scales</h2>
        <div className="space-y-4">
          <h1
            className="font-bold"
            style={{
              fontSize: "var(--font-size-display-2xl)",
              lineHeight: "var(--font-line-height-display-2xl)",
            }}
          >
            Display 2XL
          </h1>
          <h1
            className="font-bold"
            style={{
              fontSize: "var(--font-size-display-xl)",
              lineHeight: "var(--font-line-height-display-xl)",
            }}
          >
            Display XL
          </h1>
          <h2
            className="font-bold"
            style={{
              fontSize: "var(--font-size-display-lg)",
              lineHeight: "var(--font-line-height-display-lg)",
            }}
          >
            Display LG
          </h2>
          <h3
            className="font-bold"
            style={{
              fontSize: "var(--font-size-display-md)",
              lineHeight: "var(--font-line-height-display-md)",
            }}
          >
            Display MD
          </h3>
          <h4
            className="font-bold"
            style={{
              fontSize: "var(--font-size-display-sm)",
              lineHeight: "var(--font-line-height-display-sm)",
            }}
          >
            Display SM
          </h4>
          <h5
            className="font-bold"
            style={{
              fontSize: "var(--font-size-display-xs)",
              lineHeight: "var(--font-line-height-display-xs)",
            }}
          >
            Display XS
          </h5>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Text Scales</h2>
        <div className="space-y-4">
          <p
            style={{
              fontSize: "var(--font-size-text-xl)",
              lineHeight: "var(--font-line-height-text-xl)",
            }}
          >
            Text XL - The quick brown fox jumps over the lazy dog
          </p>
          <p
            style={{
              fontSize: "var(--font-size-text-lg)",
              lineHeight: "var(--font-line-height-text-lg)",
            }}
          >
            Text LG - The quick brown fox jumps over the lazy dog
          </p>
          <p
            style={{
              fontSize: "var(--font-size-text-md)",
              lineHeight: "var(--font-line-height-text-md)",
            }}
          >
            Text MD - The quick brown fox jumps over the lazy dog
          </p>
          <p
            style={{
              fontSize: "var(--font-size-text-sm)",
              lineHeight: "var(--font-line-height-text-sm)",
            }}
          >
            Text SM - The quick brown fox jumps over the lazy dog
          </p>
          <p
            style={{
              fontSize: "var(--font-size-text-xs)",
              lineHeight: "var(--font-line-height-text-xs)",
            }}
          >
            Text XS - The quick brown fox jumps over the lazy dog
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Font Weights</h2>
        <div className="space-y-4">
          <p className="text-lg font-normal">Regular (400)</p>
          <p className="text-lg font-medium">Medium (500)</p>
          <p className="text-lg font-semibold">Semibold (600)</p>
          <p className="text-lg font-bold">Bold (700)</p>
        </div>
      </div>
    </div>
  ),
};
