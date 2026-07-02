import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "./index";
import { PlusIcon, DownloadIcon, MailIcon } from "lucide-react";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "indigo-default",
        "outline",
        "secondary",
        "ghost",
        "ghost-primary",
        "link",
        "link-gray",
        "destructive",
        "gradient",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"],
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
  },
};

export const IndigoDefault: Story = {
  args: {
    children: "Indigo Button",
    variant: "indigo-default",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
  },
};

export const GhostPrimary: Story = {
  args: {
    children: "Ghost Primary",
    variant: "ghost-primary",
  },
};

export const Link: Story = {
  args: {
    children: "Link Button",
    variant: "link",
  },
};

export const LinkGray: Story = {
  args: {
    children: "Link Gray",
    variant: "link-gray",
  },
};

export const Destructive: Story = {
  args: {
    children: "Delete",
    variant: "destructive",
  },
};

export const Gradient: Story = {
  args: {
    children: "Gradient Button",
    variant: "gradient",
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <PlusIcon />
        Add Item
      </>
    ),
  },
};

export const IconOnly: Story = {
  args: {
    children: <PlusIcon />,
    size: "icon",
  },
};

export const Small: Story = {
  args: {
    children: "Small Button",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    children: "Large Button",
    size: "lg",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <Button variant="default">Default</Button>
        <Button variant="indigo-default">Indigo</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="ghost-primary">Ghost Primary</Button>
        <Button variant="link">Link</Button>
        <Button variant="link-gray">Link Gray</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="gradient">Gradient</Button>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button size="icon-sm">
          <PlusIcon />
        </Button>
        <Button size="icon">
          <PlusIcon />
        </Button>
        <Button size="icon-lg">
          <PlusIcon />
        </Button>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button>
          <DownloadIcon />
          Download
        </Button>
        <Button variant="outline">
          <MailIcon />
          Email
        </Button>
      </div>
    </div>
  ),
};
