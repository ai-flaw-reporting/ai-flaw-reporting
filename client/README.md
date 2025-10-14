# AI Flaw Reporting Frontend App

## 🚀 Tech Stack

### Core Framework

- **[Next.js 15](https://nextjs.org/)**
- **[React 19](https://react.dev/)**
- **[TypeScript 5.8](https://www.typescriptlang.org/)**

### Styling & UI

- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework with latest features
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library

### Forms & Validation

- **[React Hook Form](https://react-hook-form.com/)** - Performant form management
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Validation resolver for React Hook Form

### Environment & Configuration

- **[@t3-oss/env-nextjs](https://env.t3.gg/)** - Type-safe environment variable validation
- Runtime environment validation with Zod schemas

### Development Tools

- **[Storybook 9](https://storybook.js.org/)** - Component development and documentation
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[TypeScript ESLint](https://typescript-eslint.io/)** - TypeScript-specific linting

### CMS

- **[Strapi](https://strapi.io/)** - Headless CMS for content management (located in `/cms` directory)

---

## 📦 Installation

### Prerequisites

- Node.js 20+
- Yarn 1.22+

### Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd ai-flaw-reporting-frontend-app
```

2. **Install dependencies**

```bash
yarn install
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

Edit `.env` and add your environment variables:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
# Add other environment variables as needed
```

4. **Run the development server**

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎨 Design System

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

## 📚 Component Development with Storybook

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

## 🧩 Adding New shadcn Components

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

1. ✅ Install the shadcn component
2. ✅ Create a folder for the component
3. ✅ Move it to `src/components/ui/<component-name>/index.tsx`
4. ✅ Show you next steps for creating a Storybook story

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

## 🗄️ CMS Setup

The project includes a Strapi CMS in the `/cms` directory for content management.

### Run Strapi

1. **Navigate to CMS directory**

```bash
cd cms
```

2. **Install dependencies**

```bash
npm install
```

3. **Start Strapi**

```bash
npm run develop
```

Strapi admin will be available at [http://localhost:1337/admin](http://localhost:1337/admin)

### Configure Strapi

1. Create an admin account on first launch
2. Set up your content types in the Content-Type Builder
3. Configure permissions in Settings > Roles
4. Enable public access for GET requests if needed

### Connect Frontend to Strapi

Update your `.env` file:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

---

## 📜 Available Scripts

### Development

```bash
yarn dev          # Start Next.js dev server (with Turbopack)
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
yarn lint         # Run ESLint
yarn lint:fix     # Fix ESLint errors
yarn typecheck    # Run TypeScript compiler check
yarn check        # Run lint + typecheck
```

### Formatting

```bash
yarn format:check  # Check code formatting
yarn format:write  # Format code with Prettier
```

---

## 📁 Project Structure

```
ai-flaw-reporting-frontend-app/
├── .storybook/              # Storybook configuration
│   ├── main.ts
│   └── preview.tsx
├── cms/                     # Strapi CMS (optional)
│   ├── src/
│   └── package.json
├── public/                  # Static assets
│   └── favicon.ico
├── scripts/                 # Utility scripts
│   ├── add-component.sh
│   └── organize-component.sh
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── ui/            # UI components (organized by folder)
│   │       ├── button/
│   │       │   ├── index.tsx
│   │       │   └── button.stories.tsx
│   │       ├── input/
│   │       ├── card/
│   │       └── ...
│   ├── lib/               # Utility functions
│   │   └── utils.ts
│   ├── stories/
│   │   ├── Colors.stories.tsx
│   │   └── Typography.stories.tsx
│   ├── styles/
│   │   └── globals.css    # Global styles & design tokens
│   └── env.js             # Environment variable validation
├── components.json        # shadcn configuration
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
├── eslint.config.js       # ESLint configuration
├── prettier.config.js     # Prettier configuration
└── package.json
```

---

## 🔐 Environment Variables

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

---

## 🎯 Design Tokens

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

## 🧪 Component Usage Examples

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

## 🚀 Deployment

Your project consists of two separate applications that need to be deployed independently:

### 1. Frontend (Next.js) Deployment

#### Vercel (Recommended)

1. **Push to GitHub** (if not already)
2. **Go to [vercel.com/new](https://vercel.com/new)**
3. **Import your repository**
4. **Configure:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `.` (default)
   - Build Command: `yarn build`
   - Environment Variable: `NEXT_PUBLIC_STRAPI_URL=your-cms-url`
5. **Deploy!**

Vercel auto-deploys on every push to main.

#### Alternative Platforms

- **Netlify**: Same process, auto-detects Next.js
- **Railway**: Add from GitHub, set environment variables
- **Render**: Add Web Service, set build command to `yarn build`, start command to `yarn start`

### 2. CMS (Strapi) Deployment

#### Railway (Recommended)

1. **Go to [railway.app](https://railway.app)**
2. **New Project → Deploy from GitHub**
3. **Important: Set Root Directory to `/cms`**
4. **Add PostgreSQL database:**
   - New → Database → PostgreSQL
   - Railway auto-connects it to Strapi
5. **Add environment variables:**

   ```
   NODE_ENV=production
   HOST=0.0.0.0
   PORT=1337
   ```

   Generate and add these secrets:

   ```bash
   # Run these commands locally to generate
   openssl rand -base64 32  # Use for APP_KEYS
   openssl rand -base64 32  # Use for API_TOKEN_SALT
   openssl rand -base64 32  # Use for ADMIN_JWT_SECRET
   openssl rand -base64 32  # Use for TRANSFER_TOKEN_SALT
   openssl rand -base64 32  # Use for JWT_SECRET
   ```

   Add to Railway:

   ```
   APP_KEYS=generated-key
   API_TOKEN_SALT=generated-key
   ADMIN_JWT_SECRET=generated-key
   TRANSFER_TOKEN_SALT=generated-key
   JWT_SECRET=generated-key
   ```

6. **Deploy** - Railway generates a public URL

#### Heroku

```bash
cd cms
heroku create your-cms-name
heroku addons:create heroku-postgresql:mini
heroku config:set NODE_ENV=production
heroku config:set APP_KEYS=$(openssl rand -base64 32)
heroku config:set API_TOKEN_SALT=$(openssl rand -base64 32)
heroku config:set ADMIN_JWT_SECRET=$(openssl rand -base64 32)
heroku config:set TRANSFER_TOKEN_SALT=$(openssl rand -base64 32)
heroku config:set JWT_SECRET=$(openssl rand -base64 32)

# Deploy from CMS directory
git subtree push --prefix cms heroku main
```

### 3. Connect Frontend to CMS

Once both are deployed:

1. **Copy your Strapi URL** from Railway/Heroku (e.g., `https://your-cms.railway.app`)

2. **Update Frontend Environment Variables** in Vercel:

   - Go to Project Settings → Environment Variables
   - Update `NEXT_PUBLIC_STRAPI_URL` with your production Strapi URL
   - Redeploy

3. **Configure CORS in Strapi** (in `cms/config/middlewares.ts`):

   ```typescript
   {
     name: 'strapi::cors',
     config: {
       origin: ['https://your-frontend.vercel.app'],
       credentials: true,
     },
   },
   ```

4. **Redeploy CMS** to apply CORS changes

### Deployment Checklist

**Frontend:**

- ✅ Deployed to Vercel/Netlify
- ✅ Environment variable `NEXT_PUBLIC_STRAPI_URL` set
- ✅ Build succeeds
- ✅ Can access at your domain

**CMS:**

- ✅ Deployed to Railway/Heroku
- ✅ PostgreSQL database connected
- ✅ All environment variables set (APP_KEYS, secrets, etc.)
- ✅ Can access Strapi admin at `https://your-cms.railway.app/admin`
- ✅ CORS configured for frontend domain
- ✅ Content types created and published
- ✅ API permissions configured (Settings → Roles)

---

## 📄 License

[Your License Here]

---

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Storybook Documentation](https://storybook.js.org/docs)
- [React Hook Form Documentation](https://react-hook-form.com/get-started)
- [Zod Documentation](https://zod.dev/)
- [Radix UI Documentation](https://www.radix-ui.com/primitives/docs/overview/introduction)
- [Strapi Documentation](https://docs.strapi.io/)
