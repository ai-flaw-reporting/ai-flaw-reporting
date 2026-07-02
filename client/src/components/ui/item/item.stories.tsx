import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemHeader,
  ItemFooter,
} from "./index";
import { Button } from "../button";
import {
  FileIcon,
  MoreVerticalIcon,
  DownloadIcon,
  TrashIcon,
  UserIcon,
} from "lucide-react";

const meta = {
  title: "UI/Item",
  component: Item,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "muted", "danger"],
    },
    size: {
      control: "select",
      options: ["default", "sm"],
    },
  },
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Item className="w-[400px]">
      <ItemMedia variant="icon">
        <FileIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Document.pdf</ItemTitle>
        <ItemDescription>2.4 MB • Modified 2 hours ago</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="ghost" size="icon-sm">
          <MoreVerticalIcon />
        </Button>
      </ItemActions>
    </Item>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Item className="w-[400px]">
      <ItemMedia variant="image">
        <div className="flex size-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
          <UserIcon className="text-white" />
        </div>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>John Doe</ItemTitle>
        <ItemDescription>john.doe@example.com</ItemDescription>
      </ItemContent>
    </Item>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Item className="w-[400px]">
      <ItemMedia variant="icon">
        <FileIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Project Files.zip</ItemTitle>
        <ItemDescription>15.8 MB • Uploaded today</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="ghost" size="icon-sm">
          <DownloadIcon />
        </Button>
        <Button variant="ghost" size="icon-sm">
          <TrashIcon />
        </Button>
      </ItemActions>
    </Item>
  ),
};

export const Outline: Story = {
  render: () => (
    <Item variant="outline" className="w-[400px]">
      <ItemMedia variant="icon">
        <FileIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Outline Item</ItemTitle>
        <ItemDescription>This item has an outline border</ItemDescription>
      </ItemContent>
    </Item>
  ),
};

export const Muted: Story = {
  render: () => (
    <Item variant="muted" className="w-[400px]">
      <ItemMedia variant="icon">
        <FileIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Muted Item</ItemTitle>
        <ItemDescription>This item has a muted background</ItemDescription>
      </ItemContent>
    </Item>
  ),
};

export const Danger: Story = {
  render: () => (
    <Item variant="danger" className="w-[400px]">
      <ItemMedia variant="icon">
        <FileIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Security Alert</ItemTitle>
        <ItemDescription>
          This item indicates a dangerous or critical state
        </ItemDescription>
      </ItemContent>
    </Item>
  ),
};

export const Small: Story = {
  render: () => (
    <Item size="sm" className="w-[400px]">
      <ItemMedia variant="icon">
        <FileIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Small Item</ItemTitle>
        <ItemDescription>This is a smaller size item</ItemDescription>
      </ItemContent>
    </Item>
  ),
};

export const WithHeaderAndFooter: Story = {
  render: () => (
    <Item className="w-[400px]">
      <ItemHeader>
        <ItemContent>
          <ItemTitle>Task Item</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button variant="ghost" size="icon-sm">
            <MoreVerticalIcon />
          </Button>
        </ItemActions>
      </ItemHeader>
      <ItemContent>
        <ItemDescription>
          This item demonstrates the use of header and footer components
        </ItemDescription>
      </ItemContent>
      <ItemFooter>
        <Button variant="ghost" size="sm">
          Cancel
        </Button>
        <Button size="sm">Confirm</Button>
      </ItemFooter>
    </Item>
  ),
};

export const ItemList: Story = {
  render: () => (
    <ItemGroup className="w-[400px]">
      <Item>
        <ItemMedia variant="icon">
          <FileIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Document 1.pdf</ItemTitle>
          <ItemDescription>2.4 MB</ItemDescription>
        </ItemContent>
      </Item>
      <ItemSeparator />
      <Item>
        <ItemMedia variant="icon">
          <FileIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Document 2.pdf</ItemTitle>
          <ItemDescription>1.8 MB</ItemDescription>
        </ItemContent>
      </Item>
      <ItemSeparator />
      <Item>
        <ItemMedia variant="icon">
          <FileIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Document 3.pdf</ItemTitle>
          <ItemDescription>3.2 MB</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium">Default</p>
        <Item className="w-[400px]">
          <ItemMedia variant="icon">
            <FileIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Default Item</ItemTitle>
            <ItemDescription>Standard item appearance</ItemDescription>
          </ItemContent>
        </Item>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Outline</p>
        <Item variant="outline" className="w-[400px]">
          <ItemMedia variant="icon">
            <FileIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Outline Item</ItemTitle>
            <ItemDescription>Item with border</ItemDescription>
          </ItemContent>
        </Item>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Muted</p>
        <Item variant="muted" className="w-[400px]">
          <ItemMedia variant="icon">
            <FileIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Muted Item</ItemTitle>
            <ItemDescription>Item with muted background</ItemDescription>
          </ItemContent>
        </Item>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Danger</p>
        <Item variant="danger" className="w-[400px]">
          <ItemMedia variant="icon">
            <FileIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Danger Item</ItemTitle>
            <ItemDescription>Item indicating critical state</ItemDescription>
          </ItemContent>
        </Item>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Small Size</p>
        <Item size="sm" className="w-[400px]">
          <ItemMedia variant="icon">
            <FileIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Small Item</ItemTitle>
            <ItemDescription>Compact size</ItemDescription>
          </ItemContent>
        </Item>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">With Actions</p>
        <Item className="w-[400px]">
          <ItemMedia variant="icon">
            <FileIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Item with Actions</ItemTitle>
            <ItemDescription>Has action buttons</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="ghost" size="icon-sm">
              <DownloadIcon />
            </Button>
            <Button variant="ghost" size="icon-sm">
              <TrashIcon />
            </Button>
          </ItemActions>
        </Item>
      </div>
    </div>
  ),
};
