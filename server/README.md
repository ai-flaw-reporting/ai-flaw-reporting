# AI Flaw Reporting - Server

Strapi v5 headless CMS backend for the AI Flaw Reporting application. Handles report submission, email notifications (SendGrid), CERT/VINCE integration, and HuggingFace dataset mirroring.

## Tech Stack

- **[Strapi v5](https://strapi.io/)** - Headless CMS
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[PostgreSQL](https://www.postgresql.org/)** - Database
- **[SendGrid](https://sendgrid.com/)** - Email notifications
- **[HuggingFace Hub](https://huggingface.co/)** - Dataset mirroring
- **[Sharp](https://sharp.pixelplumbing.com/)** - Image processing

## Prerequisites

- Node.js 20.x - 22.x
- Yarn 1.22+
- PostgreSQL 16+ (or use Docker)

> For full monorepo setup instructions, see the [root README](../README.md).

## Getting Started

1. **Install dependencies** (from the repository root):

```bash
yarn install
```

2. **Set up environment variables:**

```bash
cp .env.example .env
```

3. **Generate secrets** (replace placeholder values in `.env`):

```bash
openssl rand -base64 32  # Generate a value for each secret
```

4. **Start the development server:**

```bash
yarn develop
```

Strapi admin panel will be available at [http://localhost:1337/admin](http://localhost:1337/admin). Create your admin account on first launch.

## Environment Variables

Copy `.env.example` to `.env` and configure:

### Required

| Variable | Description |
|---|---|
| `HOST` | Server host (default: `0.0.0.0`) |
| `PORT` | Server port (default: `1337`) |
| `APP_KEYS` | Application keys (comma-separated) |
| `API_TOKEN_SALT` | Salt for API tokens |
| `ADMIN_JWT_SECRET` | Secret for admin JWT authentication |
| `TRANSFER_TOKEN_SALT` | Salt for transfer tokens |
| `JWT_SECRET` | Secret for JWT authentication |
| `ENCRYPTION_KEY` | Encryption key for secrets |

### Email (SendGrid)

| Variable | Description |
|---|---|
| `SENDGRID_API_KEY` | SendGrid API key for sending emails |
| `EMAIL_DEFAULT_FROM` | Default sender email address |
| `EMAIL_DEFAULT_REPLY_TO` | Default reply-to email address |

### CERT/VINCE Integration (optional)

| Variable | Description |
|---|---|
| `VINCE_API_URL` | CERT/VINCE API endpoint URL |
| `VINCE_API_KEY` | CERT/VINCE API authentication key |

### Database (production)

When deploying, configure PostgreSQL connection via individual variables or a connection string:

| Variable | Description |
|---|---|
| `DATABASE_URL` | Full PostgreSQL connection string (alternative to individual vars) |
| `DATABASE_HOST` | Database host (default: `localhost`) |
| `DATABASE_PORT` | Database port (default: `5432`) |
| `DATABASE_NAME` | Database name (default: `strapi`) |
| `DATABASE_USERNAME` | Database user (default: `strapi`) |
| `DATABASE_PASSWORD` | Database password (default: `strapi`) |
| `DATABASE_SSL` | Enable SSL connection (default: `false`) |

### Other

| Variable | Description |
|---|---|
| `NODE_ENV` | Environment: `development`, `staging`, or `production` |
| `IS_TEST_ENV` | Set to `true` for test environments |

## Database Setup

### Option A: Local PostgreSQL

```bash
# Create database
createdb strapi

# Default connection uses:
# Host: localhost, Port: 5432, Database: strapi, User: strapi, Password: strapi
```

### Option B: Docker (recommended for local dev)

Use the included `docker-compose.yaml` to start PostgreSQL:

```bash
docker compose up postgres -d
```

This starts PostgreSQL 16 with default credentials (`strapi`/`strapi`) on port 5432.

## Available Scripts

```bash
yarn develop       # Start with auto-reload (development)
yarn dev           # Alias for develop
yarn build         # Build the admin panel
yarn start         # Start production server (no auto-reload)
yarn seed:example  # Seed example data
yarn deploy        # Deploy to Strapi Cloud
yarn console       # Open Strapi interactive console
```

## Custom APIs

### Report API (`/api/reports`)

Core flaw reporting endpoint with the following services:

- **report** - Report CRUD operations and data processing
- **email** - Email notifications via SendGrid
- **cert** - CERT/VINCE vulnerability submission
- **huggingface** - Dataset mirroring to HuggingFace
- **n8n** - Webhook integration for workflow automation

### FLARE API (`/api/flare`)

Public submissions endpoint for external integrations.

## Configuration

| File | Description |
|---|---|
| `config/database.ts` | PostgreSQL connection (supports `DATABASE_URL` or individual params) |
| `config/server.ts` | Host and port settings |
| `config/admin.ts` | Admin JWT, API token salt, transfer token salt, encryption key |
| `config/plugins.ts` | SendGrid email provider configuration |
| `config/middlewares.ts` | Rate limiting (50 req), CORS, security headers |
| `config/api.ts` | API settings |

## Deployment

### Strapi Cloud

1. Install the Strapi Cloud CLI (if not already available):

```bash
yarn strapi cloud:login
```

2. Deploy:

```bash
yarn deploy
```

3. Set environment variables in the Strapi Cloud dashboard (all variables from the [Required](#required) and [Email](#email-sendgrid) sections above).

4. Configure CORS to allow your frontend domain in `config/middlewares.ts`:

```typescript
{
  name: 'strapi::cors',
  config: {
    origin: ['https://your-frontend.vercel.app'],
  },
},
```

### Docker (self-hosted)

Build and run using the included `Dockerfile` and `docker-compose.yaml`:

```bash
# Start PostgreSQL + Strapi
docker compose up -d

# Or build and run manually
docker build -t ai-flaw-reporting-server .
docker run -p 1337:1337 --env-file .env ai-flaw-reporting-server
```

The Docker setup includes:
- Multi-stage build (Node.js 20 Alpine)
- PostgreSQL 16 with persistent volume
- Upload storage via `strapi_uploads` volume
- Runs as non-root `node` user

## Project Structure

```
server/
├── config/
│   ├── admin.ts           # Admin panel configuration
│   ├── api.ts             # API settings
│   ├── database.ts        # PostgreSQL connection
│   ├── middlewares.ts      # Rate limiting, CORS, security
│   ├── plugins.ts         # SendGrid email provider
│   └── server.ts          # Host and port
├── src/
│   └── api/
│       ├── report/        # Report API
│       │   ├── content-types/
│       │   ├── controllers/
│       │   ├── routes/
│       │   ├── services/
│       │   │   ├── report.ts
│       │   │   ├── email.ts
│       │   │   ├── cert.ts
│       │   │   ├── huggingface.ts
│       │   │   └── n8n.ts
│       │   └── utils/
│       └── flare/         # FLARE public API
│           ├── controllers/
│           ├── routes/
│           ├── services/
│           └── utils/
├── scripts/
│   └── seed.js            # Example data seeder
├── Dockerfile
├── docker-compose.yaml
├── .env.example
└── package.json
```

## Resources

- [Strapi v5 Documentation](https://docs.strapi.io)
- [Strapi CLI Reference](https://docs.strapi.io/dev-docs/cli)
- [Strapi Cloud Deployment](https://docs.strapi.io/cloud/getting-started/deployment)
