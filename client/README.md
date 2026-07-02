# AI Flaw Reporting - Client

Next.js frontend application for the AI Flaw Reporting platform.

> For full monorepo setup, installation, and deployment instructions, see the [root README](../README.md).

## Tech Stack

### Core Framework

- **[Next.js 16](https://nextjs.org/)**
- **[React 19](https://react.dev/)**
- **[TypeScript 5.9](https://www.typescriptlang.org/)**

### Styling & UI

- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library

### Forms & Validation

- **[React Hook Form](https://react-hook-form.com/)** - Performant form management
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Validation resolver for React Hook Form

### Data Fetching

- **[TanStack React Query](https://tanstack.com/query)** - Server state management and caching

### Environment & Configuration

- **[@t3-oss/env-nextjs](https://env.t3.gg/)** - Type-safe environment variable validation
- Runtime environment validation with Zod schemas

### Development Tools

- **[Storybook 10](https://storybook.js.org/)** - Component development and documentation
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[TypeScript ESLint](https://typescript-eslint.io/)** - TypeScript-specific linting

---

## Getting Started

### Prerequisites

- Node.js 20.x - 22.x
- Yarn 1.22+

### Setup

1. **Install dependencies** (from the repository root):

```bash
yarn install
```

2. **Set up environment variables:**

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

3. **Run the development server:**

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> For full setup including the Strapi backend, see the [root README](../README.md#local-development).

---

## Environment Variables

Environment variables are validated at build time using `@t3-oss/env-nextjs` and Zod.

### Configuration

Environment validation is configured in `src/env.js`:

```typescript
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
  },
  client: {
    NEXT_PUBLIC_STRAPI_URL: z.string().url(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL,
  },
});
```

### Usage

```typescript
import { env } from "~/env";

// Type-safe access to environment variables
const apiUrl = env.NEXT_PUBLIC_STRAPI_URL;
```

> You can skip env validation during Docker builds by setting `SKIP_ENV_VALIDATION=true`.

---

## Available Scripts

### Development

```bash
yarn dev          # Start Next.js dev server
yarn storybook    # Start Storybook dev server
```

### Component Management

```bash
yarn add-component <name>  # Install shadcn component and organize into folder
```

### Building

```bash
yarn build              # Build Next.js for production
yarn build-storybook    # Build Storybook for production
```

### Running Production

```bash
yarn start        # Start Next.js production server
yarn preview      # Build and start production server
```

### Code Quality

```bash
yarn lint          # Run ESLint
yarn lint:fix      # Fix ESLint errors
yarn typecheck     # Run TypeScript compiler check
yarn check         # Run lint + typecheck
yarn format:check  # Check code formatting
yarn format:write  # Format code with Prettier
yarn format-and-check  # Format + lint + typecheck
```

---

## Design System

The application includes a comprehensive design system with:

### Color Palette

- **Primary** - Brand colors (25-950 shades)
- **Gray** - Neutral colors (25-950 shades)
- **Error** - Error/destructive states
- **Warning** - Warning states
- **Success** - Success states
- **Indigo** - Secondary accent colors

### Typography

- **Font Family**: Inter (primary), Geist Sans (secondary)
- **Display Scales**: 2xl (72px), xl (60px), lg (48px), md (36px), sm (30px), xs (24px)
- **Text Scales**: xl (20px), lg (18px), md (16px), sm (14px), xs (12px)

### Components

All UI components are organized in folders with their Storybook stories:

- `Button`
- `Input`
- `Textarea`
- `Select`
- `Checkbox`
- `Slider`
- `Card`
- `Separator`
- `Progress`
- `Tooltip`
- `ButtonGroup`
- `Item`

---

## Component Development with Storybook

### Run Storybook

```bash
yarn storybook
```

Storybook will start at [http://localhost:6006](http://localhost:6006)

### Build Storybook

```bash
yarn build-storybook
```

### Component Structure

Components are organized in folders:

```
src/components/ui/
  button/
    index.tsx        # Component implementation
    button.stories.tsx  # Storybook stories
  input/
    index.tsx
    input.stories.tsx
  ...
```

---

## Adding New shadcn Components

### One-Command Installation (Recommended)

Use the custom script to install and organize components automatically:

```bash
yarn add-component <component-name>
```

**Example:**

```bash
yarn add-component badge
```

This single command will:

1. Install the shadcn component
2. Create a folder for the component
3. Move it to `src/components/ui/<component-name>/index.tsx`
4. Show you next steps for creating a Storybook story

### Manual Installation (Alternative)

If you prefer to install manually:

```bash
# Install the component
npx shadcn@latest add <component-name>

# Organize into folder structure
./scripts/organize-component.sh <component-name>
```

### Create a Storybook story

After adding a component, create a story file in the component folder:

```bash
touch src/components/ui/badge/badge.stories.tsx
```

**Example story structure:**

```typescript
import type { Meta, StoryObj } from "@storybook/nextjs";
import { Badge } from "./index";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),
};
```

---

## Project Structure

```
client/
├── .storybook/              # Storybook configuration
│   ├── main.ts
│   └── preview.tsx
├── public/                  # Static assets
├── scripts/                 # Utility scripts
│   ├── add-component.sh
│   └── organize-component.sh
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── ui/              # UI components (organized by folder)
│   │       ├── button/
│   │       │   ├── index.tsx
│   │       │   └── button.stories.tsx
│   │       ├── input/
│   │       ├── card/
│   │       └── ...
│   ├── entities/            # Domain entities
│   │   ├── ai-flaw-report/  # Main feature (form, schema, hooks)
│   │   ├── dashboard/       # Dashboard feature
│   │   └── resource/        # Resource management
│   ├── features/            # Shared features
│   ├── widgets/             # Feature-specific components
│   ├── lib/                 # Utility functions
│   ├── stories/             # Design system stories
│   ├── styles/
│   │   └── globals.css      # Global styles & design tokens
│   └── env.js               # Environment variable validation
├── components.json          # shadcn configuration
├── next.config.js           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
├── eslint.config.js         # ESLint configuration
├── prettier.config.js       # Prettier configuration
├── .env.example             # Environment variables template
└── package.json
```

---

## Design Tokens

Design tokens are defined in `src/styles/globals.css`:

### Colors

All colors are available as CSS variables and Tailwind utilities:

```css
/* CSS Variables */
var(--color-primary-600)
var(--color-gray-500)
var(--color-error-600)

/* Tailwind Classes */
bg-primary-600
text-gray-500
border-error-600
```

### Typography

Typography scales are available as CSS variables:

```css
/* Font Sizes */
var(--font-size-display-2xl)  /* 72px */
var(--font-size-text-lg)      /* 18px */

/* Line Heights */
var(--font-line-height-display-2xl)  /* 90px */
var(--font-line-height-text-lg)      /* 28px */
```

### Gradients

Custom gradients are available:

```css
var(--gradient-blue-ai)
```

For gradient buttons, use the `gradient` variant:

```tsx
<Button variant="gradient">Gradient Button</Button>
```

---

## Component Usage Examples

### Button

```tsx
import { Button } from "~/components/ui/button";

<Button variant="default">Click me</Button>
<Button variant="outline" size="sm">Small Button</Button>
<Button variant="destructive">Delete</Button>
```

### Input with Form

```tsx
import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

function MyForm() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("email")} type="email" />
    </form>
  );
}
```

### Card

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>;
```

---

## Maintainability

For guides on adding new form fields, swapping taxonomies, and adding report recipients, see the [Maintainability Guide](./MAINTAINABILITY_GUIDE.md).

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Storybook Documentation](https://storybook.js.org/docs)
- [React Hook Form Documentation](https://react-hook-form.com/get-started)
- [Zod Documentation](https://zod.dev/)
- [Radix UI Documentation](https://www.radix-ui.com/primitives/docs/overview/introduction)
