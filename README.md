# 🤖 AI Flaw Reporting Application

## 📁 Project Structure

```
ai-flaw-reporting-frontend-app/
├── client/          # Next.js Frontend Application
├── server/          # Strapi CMS Backend
└── README.md        # This file
```

This is a monorepo containing two independent applications:

- **[Client](/client)** - Next.js frontend with Tailwind CSS, shadcn/ui, and Storybook
- **[Server](/server)** - Strapi headless CMS for content management

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Yarn package manager

### Installation

```bash
# Install all dependencies (root + client + server)
yarn install

# Or install individually
cd client && yarn install
cd server && yarn install
```

### Development

Run both applications in separate terminals:

```bash
# Terminal 1: Start CMS (http://localhost:1337)
cd server
yarn develop

# Terminal 2: Start frontend (http://localhost:3000)
cd client
yarn dev
```

### Configure Strapi API Permissions

After starting Strapi for the first time, you need to configure API permissions so the frontend can communicate with the backend:

1. Open the Strapi admin panel at **http://localhost:1337/admin**
2. Create your admin account (first-time only)
3. In the left sidebar, click the **Settings** (gear icon)
4. Scroll down in the Settings sidebar to **USERS & PERMISSIONS PLUGIN** section
5. Click **Roles** (under Users & Permissions Plugin, not the one under Administration Panel)
6. Click **Public**
7. Under **Report**, enable the permissions your app needs (e.g. **create**, **find**, **findOne**)
8. Click **Save**

> **Note:** The "USERS & PERMISSIONS PLUGIN" roles are different from "ADMINISTRATION PANEL" roles. The API permissions are managed under the plugin section at the bottom of the Settings sidebar.

### Optional: Storybook

```bash
# Terminal 3: Start Storybook (http://localhost:6006)
cd client
yarn storybook
```

## 📚 Documentation

Each application has its own detailed README:

- **[Client README](./client/README.md)** - Frontend setup, components, design system, Storybook
- **[Server README](./server/README.md)** - CMS setup, content types, API configuration, deployment

## 🛠 Tech Stack

### Frontend

- Next.js 15, TypeScript, Tailwind CSS v4
- shadcn/ui, Radix UI, React Hook Form, Zod
- Storybook for component development

### Backend

- Strapi v5, TypeScript
- SQLite (dev), PostgreSQL (production)

## 🌐 Environment Setup

Create environment files:

**Client (`.env.local`):**

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

**Server (`.env`):**

```env
HOST=0.0.0.0
PORT=1337
```

## 📜 Available Scripts

### Root Level

```bash
yarn install     # Install all dependencies
```

### Client

```bash
cd client
yarn dev         # Start dev server
yarn build       # Build for production
yarn storybook   # Start Storybook
```

### Server

```bash
cd server
yarn develop     # Start CMS with auto-reload
yarn build       # Build admin panel
yarn start       # Start production server
```
