# Backend Setup Guide

This document outlines the setup procedure for the TeamTender Backend Foundation (Wave 5.1).

## Prerequisites
- Node.js (v18+)
- PostgreSQL (or Docker to run the provided docker-compose)
- Prisma CLI

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment:
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your database credentials.

3. Database Setup:
   If using Docker (recommended):
   ```bash
   docker-compose up -d
   ```
   Then apply schema (this requires the DB to be running):
   ```bash
   npx prisma migrate dev
   ```

4. Development:
   ```bash
   npm run dev
   ```

5. Production Build:
   ```bash
   npm run build
   npm start
   ```

## Known Limitations (Wave 5.1)
- Authentication is structured but not yet fully wired to all endpoints (scheduled for Wave 5.2).
- Prisma migration cannot be run if a local PostgreSQL instance or Docker is unavailable. The schema is pre-defined in `prisma/schema.prisma`.

## Future Enhancements
- Migration to a Monorepo structure using Turborepo or Nx for tighter frontend/backend integration.
- Full CI/CD pipeline integration for backend tests.
