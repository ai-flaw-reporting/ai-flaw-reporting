import type { Meta, StoryObj } from "@storybook/nextjs";
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "./index";
import { Button } from "../button";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
} from "lucide-react";

const meta = {
  title: "UI/ButtonGroup",
  component: ButtonGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Center</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline" size="icon">
        <BoldIcon />
      </Button>
      <Button variant="outline" size="icon">
        <ItalicIcon />
      </Button>
      <Button variant="outline" size="icon">
        <UnderlineIcon />
      </Button>
    </ButtonGroup>
  ),
};

export const WithSeparator: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline" size="icon">
        <BoldIcon />
      </Button>
      <Button variant="outline" size="icon">
        <ItalicIcon />
      </Button>
      <ButtonGroupSeparator />
      <Button variant="outline" size="icon">
        <AlignLeftIcon />
      </Button>
      <Button variant="outline" size="icon">
        <AlignCenterIcon />
      </Button>
      <Button variant="outline" size="icon">
        <AlignRightIcon />
      </Button>
    </ButtonGroup>
  ),
};

export const WithText: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupText>Label:</ButtonGroupText>
      <Button variant="outline">Option 1</Button>
      <Button variant="outline">Option 2</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
  ),
};

export const TextAlignment: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline" size="icon">
        <AlignLeftIcon />
      </Button>
      <Button variant="outline" size="icon">
        <AlignCenterIcon />
      </Button>
      <Button variant="outline" size="icon">
        <AlignRightIcon />
      </Button>
    </ButtonGroup>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium">Horizontal - Text Buttons</p>
        <ButtonGroup>
          <Button variant="outline">One</Button>
          <Button variant="outline">Two</Button>
          <Button variant="outline">Three</Button>
        </ButtonGroup>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Horizontal - Icon Buttons</p>
        <ButtonGroup>
          <Button variant="outline" size="icon">
            <BoldIcon />
          </Button>
          <Button variant="outline" size="icon">
            <ItalicIcon />
          </Button>
          <Button variant="outline" size="icon">
            <UnderlineIcon />
          </Button>
        </ButtonGroup>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">With Separator</p>
        <ButtonGroup>
          <Button variant="outline" size="icon">
            <BoldIcon />
          </Button>
          <Button variant="outline" size="icon">
            <ItalicIcon />
          </Button>
          <ButtonGroupSeparator />
          <Button variant="outline" size="icon">
            <AlignLeftIcon />
          </Button>
          <Button variant="outline" size="icon">
            <AlignCenterIcon />
          </Button>
        </ButtonGroup>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">With Label</p>
        <ButtonGroup>
          <ButtonGroupText>Options:</ButtonGroupText>
          <Button variant="outline">A</Button>
          <Button variant="outline">B</Button>
          <Button variant="outline">C</Button>
        </ButtonGroup>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Vertical</p>
        <ButtonGroup orientation="vertical">
          <Button variant="outline">Top</Button>
          <Button variant="outline">Middle</Button>
          <Button variant="outline">Bottom</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};
