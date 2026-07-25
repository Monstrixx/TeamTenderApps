# Backend Architecture

## Overview
The TeamTender backend is built on Express.js and TypeScript, following a layered architecture pattern:

1. **Controllers**: Handle HTTP requests, parsing parameters and managing responses.
2. **Services**: Contain the core business logic.
3. **Repositories / ORM**: Database interactions (Prisma).

## Tech Stack
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Validation**: Zod (planned for endpoint validation)
- **Logging**: Pino (JSON structured)
- **Testing**: Vitest + Supertest

## Structured Logging
All logs are emitted in JSON format via Pino. 
Each request automatically generates an `X-Request-ID` (UUID) which is injected into the response headers and attached to every log entry for tracing.
