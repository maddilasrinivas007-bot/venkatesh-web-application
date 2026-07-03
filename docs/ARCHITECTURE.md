# NyayaAI Architecture

## Overview

NyayaAI follows **Clean Architecture** with a monorepo structure, separating concerns across frontend, backend, shared packages, and database layers.

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                          │
│  Next.js 15 (SSR/SSG) · React 19 · Tailwind · Motion  │
└─────────────────────┬───────────────────────────────────┘
                      │ HTTPS / REST API v1
┌─────────────────────▼───────────────────────────────────┐
│                   API Gateway                          │
│  Express · Helmet · CORS · Rate Limiting · JWT Auth     │
└──────┬──────────┬──────────┬──────────┬───────────────┘
       │          │          │          │
┌──────▼──┐ ┌────▼────┐ ┌──▼──────┐ ┌─▼──────────┐
│  Auth   │ │   AI    │ │  Legal  │ │   Admin    │
│ Service │ │ Service │ │ Service │ │  Service   │
└──────┬──┘ └────┬────┘ └──┬──────┘ └─┬──────────┘
       │         │          │          │
┌──────▼─────────▼──────────▼──────────▼───────────────┐
│              Data Access Layer (Prisma ORM)            │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│  PostgreSQL + pgvector  │  Redis  │  AWS S3  │  AI APIs  │
└─────────────────────────────────────────────────────────┘
```

## Domain Models

### Core Entities
- **User** — Multi-role (Citizen, Advocate, Admin) with RBAC
- **Case** — Legal case management with timeline and notes
- **Document** — AI-generated and user-uploaded legal documents
- **Conversation** — AI chat sessions with citation metadata
- **Judgment** — Supreme Court and High Court case law
- **Legislation** — Indian statutes and acts
- **ConstitutionArticle** — Constitutional provisions with vector embeddings
- **AdvocateProfile** — Verified advocate marketplace profiles
- **Appointment** — Consultation booking and scheduling

## AI Pipeline

1. **Query Processing** — Natural language understanding of legal queries
2. **RAG Retrieval** — Semantic search across legal knowledge base using pgvector
3. **LLM Generation** — OpenAI GPT-4 / Gemini with structured JSON output
4. **Citation Assembly** — Constitutional, statutory, and case law references
5. **Response Formatting** — Structured legal guidance with disclaimers

## Security

- JWT access + refresh token rotation
- bcrypt password hashing (12 rounds)
- Helmet security headers
- Rate limiting (100 req/15min)
- RBAC with role-based route guards
- Audit logging for admin actions
- Input validation with Zod schemas

## Scalability

- Stateless API servers (horizontal scaling)
- PostgreSQL read replicas for research queries
- Redis for session caching and rate limiting
- CDN for static assets (Vercel)
- S3 for document storage
- Vector database for semantic legal search

## Deployment

| Environment | Frontend | Backend | Database |
|------------|----------|---------|----------|
| Development | localhost:3000 | localhost:4000 | Docker PostgreSQL |
| Staging | Vercel Preview | AWS ECS | RDS PostgreSQL |
| Production | Vercel | AWS ECS/EKS | RDS + Read Replicas |
