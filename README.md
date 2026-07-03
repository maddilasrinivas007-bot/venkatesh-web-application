# NyayaAI – India's Intelligent Legal Ecosystem

> *Empowering Every Citizen with Trusted Legal Intelligence.*

NyayaAI is a production-ready, enterprise-scale AI-powered legal technology platform for India. It provides legal research, AI-assisted guidance, document generation, advocate marketplace, and comprehensive case management.

## Features

- **AI Legal Assistant** — ChatGPT-style assistant with constitutional citations, statutory references, and case law precedents
- **Judicial Research** — Search Supreme Court and High Court judgments with advanced filters and AI summaries
- **Constitution Explorer** — Interactive exploration of all articles, amendments, and fundamental rights
- **Document Generator** — AI-powered legal notices, agreements, affidavits, and court petitions
- **Advocate Marketplace** — Verified advocate profiles with online booking and consultations
- **Client & Advocate Workspaces** — Case management, appointments, billing, and document sharing
- **Admin Portal** — User management, advocate verification, audit logs, and analytics

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express, Prisma ORM |
| Database | PostgreSQL with pgvector |
| AI | OpenAI GPT-4, Google Gemini, LangChain, RAG |
| Auth | JWT, Google OAuth, OTP, RBAC |
| Infra | Docker, Redis, AWS S3, GitHub Actions |

## Project Structure

```
nyayaai/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # Express REST API
├── packages/
│   ├── shared/       # Shared types, constants, validators
│   └── database/     # Prisma schema & migrations
├── docker/           # Dockerfiles
├── .github/          # CI/CD workflows
└── docs/             # Architecture documentation
```

## Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL 16+ (with pgvector extension)
- Redis (optional, for rate limiting)

### Setup

```bash
# Clone and install
npm install

# Configure environment
cp .env.example .env
# Edit .env with your database URL and API keys

# Start PostgreSQL (Docker)
docker compose up postgres redis -d

# Setup database
npm run db:generate
npm run db:push
npm run db:seed

# Start development servers
npm run dev
```

- **Frontend**: http://localhost:3000
- **API**: http://localhost:4000
- **API Docs**: http://localhost:4000/api/docs

### Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@nyayaai.in | Admin@123456 |
| Advocate | advocate@nyayaai.in | Advocate@123 |
| Citizen | citizen@nyayaai.in | Citizen@123 |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | User registration |
| POST | `/api/v1/auth/login` | User login |
| POST | `/api/v1/ai/chat` | AI legal assistant (auth required) |
| POST | `/api/v1/ai/public-chat` | Public AI query (landing page) |
| GET | `/api/v1/legal/judgments` | Search judgments |
| GET | `/api/v1/legal/constitution` | Constitution articles |
| GET | `/api/v1/legal/advocates` | Advocate marketplace |
| GET | `/api/v1/admin/stats` | Admin dashboard stats |

## Docker Deployment

```bash
# Full stack with Docker Compose
docker compose up -d

# Individual services
docker compose up postgres redis -d  # Infrastructure only
docker compose up api web -d         # Application services
```

## Environment Variables

See [`.env.example`](.env.example) for all configuration options. Key variables:

- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` / `JWT_REFRESH_SECRET` — Authentication secrets
- `OPENAI_API_KEY` / `GEMINI_API_KEY` — AI provider keys
- `NEXT_PUBLIC_API_URL` — API URL for frontend

## Legal Disclaimer

NyayaAI provides legal information for educational purposes only. It does not constitute legal advice and should not be relied upon as a substitute for consultation with a qualified advocate licensed to practice in India.

## License

Proprietary — NyayaAI Technologies Pvt. Ltd.
