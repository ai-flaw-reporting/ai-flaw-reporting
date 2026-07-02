# AI Flaw Reporting Application

## Project Structure

```
ai-flaw-reporting/
├── client/          # Next.js Frontend Application
├── server/          # Strapi CMS Backend
└── README.md        # This file
```

This is a monorepo (Yarn workspaces) containing two applications:

- **[Client](./client/README.md)** - Next.js frontend with Tailwind CSS, shadcn/ui, and Storybook
- **[Server](./server/README.md)** - Strapi v5 headless CMS for content management and report processing

## Tech Stack

### Frontend

- Next.js 16, React 19, TypeScript 5.9
- Tailwind CSS v4, shadcn/ui, Radix UI
- React Hook Form, Zod
- TanStack React Query
- Storybook 10

### Backend

- Strapi v5, TypeScript
- PostgreSQL
- SendGrid (email), CERT/VINCE integration, HuggingFace Hub

## Prerequisites

- **Node.js** 20.x - 22.x
- **Yarn** 1.22+
- **PostgreSQL** 16+ (or use Docker - see [Database Setup](./server/README.md#database-setup))

## Installation

```bash
# Clone the repository
git clone https://github.com/ai-flaw-reporting/ai-flaw-reporting.git
cd ai-flaw-reporting

# Install all dependencies (root + client + server)
yarn install
```

## Environment Setup

### Client (`client/.env.local`)

```bash
cp client/.env.example client/.env.local
```

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

### Server (`server/.env`)

```bash
cp server/.env.example server/.env
```

Generate secrets and replace placeholder values:

```bash
openssl rand -base64 32  # Run once per secret below
```

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS="generated-key-1,generated-key-2"
API_TOKEN_SALT=generated-key
ADMIN_JWT_SECRET=generated-key
TRANSFER_TOKEN_SALT=generated-key
JWT_SECRET=generated-key
ENCRYPTION_KEY=generated-key

# Email (SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_DEFAULT_FROM=noreply@aiflawreport.com
EMAIL_DEFAULT_REPLY_TO=noreply@aiflawreport.com

# CERT/VINCE (optional)
VINCE_API_URL=
VINCE_API_KEY=

NODE_ENV=development
IS_TEST_ENV=true
```

> See the [Server README](./server/README.md#environment-variables) for a full description of each variable.

## Local Development

### Start PostgreSQL

The server requires PostgreSQL. Start it using Docker before running the app:

```bash
cd server
docker compose up postgres -d
```

This starts PostgreSQL 16 on port 5432 with default credentials (`strapi`/`strapi`).

### Quick Start

Run both applications concurrently from the root:

```bash
yarn dev
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Strapi Admin: [http://localhost:1337/admin](http://localhost:1337/admin)

### Running Individually

```bash
# Terminal 1: Start CMS (http://localhost:1337)
cd server
yarn develop

# Terminal 2: Start frontend (http://localhost:3000)
cd client
yarn dev
```

### Strapi Admin Setup (first-time)

After starting Strapi for the first time, configure API permissions so the frontend can communicate with the backend:

1. Open the Strapi admin panel at **http://localhost:1337/admin**
2. Create your admin account (first-time only)
3. In the left sidebar, click **Settings** (gear icon)
4. Scroll down to **USERS & PERMISSIONS PLUGIN** section
5. Click **Roles** (under Users & Permissions Plugin, not the one under Administration Panel)
6. Click **Public**
7. Under **Report**, enable the permissions your app needs (e.g., **create**, **find**, **findOne**)
8. Click **Save**

> **Note:** The "USERS & PERMISSIONS PLUGIN" roles are different from "ADMINISTRATION PANEL" roles. API permissions are managed under the plugin section at the bottom of the Settings sidebar.

### Storybook (optional)

```bash
cd client
yarn storybook
```

Storybook will start at [http://localhost:6006](http://localhost:6006).

## Available Scripts

### Root Level

```bash
yarn dev              # Run client + server concurrently
yarn build            # Build both client and server
yarn lint             # Lint client code
```

### Workspace Aliases (from root)

```bash
yarn client:dev       # Start frontend dev server
yarn client:build     # Build frontend for production
yarn client:lint      # Lint frontend code
yarn client:format    # Format frontend code with Prettier
yarn client:storybook # Start Storybook

yarn server:dev       # Start CMS with auto-reload
yarn server:build     # Build CMS admin panel
```

### Client

```bash
cd client
yarn dev              # Start dev server
yarn build            # Build for production
yarn start            # Start production server
yarn lint             # Run ESLint
yarn lint:fix         # Fix ESLint errors
yarn typecheck        # Run TypeScript compiler check
yarn check            # Run lint + typecheck
yarn format:check     # Check formatting
yarn format:write     # Format with Prettier
yarn storybook        # Start Storybook
yarn build-storybook  # Build static Storybook
yarn add-component    # Install shadcn component
```

### Server

```bash
cd server
yarn develop          # Start CMS with auto-reload
yarn build            # Build admin panel
yarn start            # Start production server
yarn seed:example     # Seed example data
yarn deploy           # Deploy to Strapi Cloud
yarn console          # Open Strapi console
```

## Deployment

### Client on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import your repository
2. Configure:
   - **Root Directory:** `client`
   - **Framework Preset:** Next.js (auto-detected)
   - **Build Command:** `yarn build`
   - **Install Command:** `yarn install`
   - **Environment Variable:** `NEXT_PUBLIC_STRAPI_URL` = your production Strapi URL
3. Deploy

Vercel auto-deploys on every push to main.

### Server on Strapi Cloud

1. Log in to Strapi Cloud:

```bash
cd server
yarn strapi cloud:login
```

2. Deploy:

```bash
yarn deploy
```

3. Set all required environment variables in the Strapi Cloud dashboard (see [Server Environment Variables](./server/README.md#environment-variables))

### Server with Docker (self-hosted)

The server includes a `Dockerfile` and `docker-compose.yaml` for self-hosted deployment:

```bash
cd server

# Start PostgreSQL + Strapi
docker compose up -d
```

This starts:

- PostgreSQL 16 on port 5432
- Strapi on port 1337

See the [Server README](./server/README.md#docker-self-hosted) for detailed Docker configuration.

### Connecting Client to Server

After deploying both applications:

1. **Set the Strapi URL** in Vercel environment variables:
   - `NEXT_PUBLIC_STRAPI_URL` = `https://your-strapi-url` (e.g., from Strapi Cloud)
   - Redeploy the client

2. **Configure CORS** in `server/config/middlewares.ts` to allow your Vercel domain:

```typescript
{
  name: 'strapi::cors',
  config: {
    origin: ['https://your-frontend.vercel.app'],
  },
},
```

3. **Redeploy the server** to apply CORS changes

4. **Configure API permissions** in Strapi admin (see [Strapi Admin Setup](#strapi-admin-setup-first-time))

## Pre-push Hook

This project uses [Husky](https://typicode.github.io/husky/) to run quality checks before every push:

```bash
cd client && yarn lint && yarn typecheck && yarn build
```

Ensure all checks pass locally before pushing.

## Documentation

- **[Client README](./client/README.md)** - Frontend setup, design system, Storybook, component patterns
- **[Server README](./server/README.md)** - CMS setup, APIs, database, deployment
- **[Maintainability Guide](./client/MAINTAINABILITY_GUIDE.md)** - Adding fields, swapping taxonomies, adding report recipients
