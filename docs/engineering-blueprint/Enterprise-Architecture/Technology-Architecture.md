# Technology Architecture

This document describes the current and approved technology stack for TeamTender. 

*(Note: Specific tool choices may evolve; significant changes require an [ADR](../ADR/README.md)).*

## Environments

### Development Environment
- **Local Runtime**: Node.js, Docker Desktop
- **IDE**: VS Code (Recommended)
- **Local Services**: Docker Compose (running local instances of PostgreSQL, Redis, Event Bus)
- **Tooling**: ESLint, Prettier, Jest, Husky (pre-commit hooks)

### Production Environment
- **Runtime**: Node.js running inside optimized Alpine Linux Docker containers
- **Orchestration**: Kubernetes
- **Monitoring**: OpenTelemetry, Prometheus, Grafana
- **Secret Management**: Cloud Key Management Service (KMS) or HashiCorp Vault

### Cloud Deployment
- **Cloud Provider**: TBD (AWS / GCP / Azure)
- **Infrastructure as Code (IaC)**: Terraform
- **CI/CD Pipeline**: GitHub Actions
- **CDN**: Cloudflare or CloudFront (for frontend assets)

## Technology Stack Overview

- **Frontend**: React.js, Next.js, Tailwind CSS
- **Backend API**: Node.js, TypeScript, Express / NestJS
- **Database**: PostgreSQL (Primary via Prisma), Redis (Cache), Vector DB (pgvector / Pinecone)
- **AI**: LangChain / LlamaIndex (connected via LLM Gateway)
