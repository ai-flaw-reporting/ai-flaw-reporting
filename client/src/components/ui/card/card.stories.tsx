import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "./index";
import { Button } from "../button";
import { MoreHorizontalIcon } from "lucide-react";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          This is the card content. You can put any content here.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Card with Action</CardTitle>
        <CardDescription>
          This card has an action button in the header
        </CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-sm">
            <MoreHorizontalIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Notice the action button in the top-right corner of the card header.
        </p>
      </CardContent>
    </Card>
  ),
};

export const SimpleCard: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardContent>
        <p className="text-sm">
          A simple card with just content, no header or footer.
        </p>
      </CardContent>
    </Card>
  ),
};

export const WithFooterButtons: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Confirm Action</CardTitle>
        <CardDescription>Are you sure you want to continue?</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">This action cannot be undone.</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button variant="destructive" className="flex-1">
          Confirm
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Basic Card</CardTitle>
          <CardDescription>A simple card example</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Card content here</p>
        </CardContent>
      </Card>

      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>With Footer</CardTitle>
          <CardDescription>Card with action buttons</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Card content here</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Action</Button>
        </CardFooter>
      </Card>

      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>With Action</CardTitle>
          <CardDescription>Card with header action</CardDescription>
          <CardAction>
            <Button variant="ghost" size="icon-sm">
              <MoreHorizontalIcon />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Card content here</p>
        </CardContent>
      </Card>
    </div>
  ),
};
