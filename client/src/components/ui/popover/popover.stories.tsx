import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "~/components/ui/button";
import { Settings, User, HelpCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./index";

const meta = {
  title: "UI/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="leading-none font-medium">Dimensions</h4>
          <p className="text-muted-foreground text-sm">
            Set the dimensions for the layer.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Edit Settings</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Dimensions</h4>
            <p className="text-muted-foreground text-sm">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="width" className="text-sm">
                Width
              </label>
              <input
                id="width"
                defaultValue="100%"
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring col-span-2 flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="maxWidth" className="text-sm">
                Max. width
              </label>
              <input
                id="maxWidth"
                defaultValue="300px"
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring col-span-2 flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="height" className="text-sm">
                Height
              </label>
              <input
                id="height"
                defaultValue="25px"
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring col-span-2 flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <span className="text-sm">Hover for help</span>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <p className="text-sm">
            This is a helpful tooltip that provides additional context about
            this feature.
          </p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const DifferentSides: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-20">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Top</Button>
        </PopoverTrigger>
        <PopoverContent side="top">
          <p className="text-sm">This popover appears on top</p>
        </PopoverContent>
      </Popover>

      <div className="flex items-center gap-20">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Left</Button>
          </PopoverTrigger>
          <PopoverContent side="left">
            <p className="text-sm">This popover appears on left</p>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Right</Button>
          </PopoverTrigger>
          <PopoverContent side="right">
            <p className="text-sm">This popover appears on right</p>
          </PopoverContent>
        </Popover>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </PopoverTrigger>
        <PopoverContent side="bottom">
          <p className="text-sm">This popover appears on bottom</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground text-sm">
            Popover is {open ? "open" : "closed"}
          </span>
          <Button size="sm" variant="secondary" onClick={() => setOpen(!open)}>
            {open ? "Close" : "Open"} Programmatically
          </Button>
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline">Toggle Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="space-y-2">
              <h4 className="leading-none font-medium">Controlled Popover</h4>
              <p className="text-muted-foreground text-sm">
                This popover's state is controlled externally.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};

export const WithMenu: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          User Menu
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="space-y-1">
          <button className="hover:bg-accent hover:text-accent-foreground flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm">
            <User className="h-4 w-4" />
            Profile
          </button>
          <button className="hover:bg-accent hover:text-accent-foreground flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm">
            <Settings className="h-4 w-4" />
            Settings
          </button>
          <div className="bg-border my-1 h-px" />
          <button className="text-destructive hover:bg-destructive hover:text-destructive-foreground flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm">
            Logout
          </button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
