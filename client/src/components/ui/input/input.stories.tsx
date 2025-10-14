import type { Meta, StoryObj } from "@storybook/nextjs";
import { Input } from "./index";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url"],
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-[300px] space-y-2">
      <label htmlFor="email" className="text-sm font-medium">
        Email
      </label>
      <Input id="email" type="email" placeholder="email@example.com" />
    </div>
  ),
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "email@example.com",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
  },
};

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "Enter number",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    value: "Pre-filled value",
  },
};

export const Invalid: Story = {
  args: {
    placeholder: "Invalid input",
    "aria-invalid": true,
  },
};

export const FormExample: Story = {
  render: () => (
    <form className="w-[400px] space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <Input id="name" placeholder="John Doe" />
      </div>
      <div className="space-y-2">
        <label htmlFor="email-form" className="text-sm font-medium">
          Email
        </label>
        <Input id="email-form" type="email" placeholder="john@example.com" />
      </div>
      <div className="space-y-2">
        <label htmlFor="password-form" className="text-sm font-medium">
          Password
        </label>
        <Input id="password-form" type="password" placeholder="••••••••" />
      </div>
    </form>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <Input placeholder="Default input" />
      <Input placeholder="With value" value="Some text" />
      <Input type="email" placeholder="Email input" />
      <Input type="password" placeholder="Password input" />
      <Input type="number" placeholder="Number input" />
      <Input placeholder="Disabled input" disabled />
      <Input placeholder="Invalid input" aria-invalid />
    </div>
  ),
};
