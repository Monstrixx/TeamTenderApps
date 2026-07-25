# Workspace Domain Documentation

## Overview

The `Workspace` domain serves as the Aggregate Root for the entire TeamTender platform. It represents a primary tenant environment containing other entities like Companies, Suppliers, and Documents.

## Schema Details

The `Workspace` model is implemented in `prisma/schema.prisma` using standard PostgreSQL data types and Prisma's ORM capabilities.

**Fields:**
- `id`: UUID (Primary Key)
- `code`: String (Unique, e.g. `WS-000001`)
- `name`: String (length 3-100)
- `description`: String? (length up to 1000)
- `status`: Enum `WorkspaceStatus` (`ACTIVE`, `INACTIVE`, `SUSPENDED`)
- `ownerId`: String (References `User.id`)
- `settings`: JSON? (Nullable)
- `createdAt`, `updatedAt`, `deletedAt`: DateTime (for soft delete)
- `createdBy`, `updatedBy`, `deletedBy`: String? (Audit Trails)

## Architecture

The implementation strictly follows the Layered Architecture approach to ensure maintainability, testability, and clear separation of concerns.

### 1. Route Layer (`workspace.routes.ts`)
- Manages HTTP endpoint definitions.
- Applies RBAC checking using `requirePermissions` middleware.
- Injects Zod validation rules via `validate` middleware.
- Example route: `GET /api/v1/workspaces` requires `workspace.read` permission.

### 2. Controller Layer (`WorkspaceController.ts`)
- Responsible for parsing requests and mapping to Service methods.
- Extracts `req.query`, `req.params`, and `req.body`.
- Ensures standard JSON responses encapsulating success states and metadata (RequestId, Timestamp, Pagination).
- Passes any thrown exceptions to the global `errorHandler`.

### 3. Service Layer (`WorkspaceService.ts`)
- Implements core business logic rules.
- **Code Generation**: Generates incremental sequence `code` formatted as `WS-XXXXXX` using locking logic.
- **Immutability**: Rejects any attempts to mutate the `code` field through update operations.
- Enforces strict soft delete rules:
  - Cannot update a deleted workspace.
  - Cannot delete an already deleted workspace.
  - Cannot restore a non-deleted workspace.

### 4. Repository Layer (`WorkspaceRepository.ts`)
- Abstracts the Prisma ORM implementation.
- Exposes standard data access methods (`findAll`, `findById`, `create`, `update`, `softDelete`, `restore`).
- Handles complex filtering, sorting, and pagination logic on the database side using Prisma query parameters.

### 5. Validation (`workspace.schema.ts`)
- Utilizes Zod for strict type checking and constraint enforcement on both incoming request bodies and query parameters.

## OpenAPI Contract

OpenAPI specs for this domain have been split for modularity according to standard conventions:
- `docs/api/schemas/Workspace.yaml` for data representations.
- `docs/api/workspace.openapi.yaml` for route definitions.
- These are rolled up into the master API contract in `docs/api/openapi.yaml`.

## Decisions

- **Code Generation**: Moved to the backend to ensure data integrity and guarantee format constraints.
- **Code Immutability**: The code acts as a resilient business identifier. It cannot be altered once created.
- **JSON Nullability**: The `settings` property is defined as nullable rather than `{}` default to avoid implicit DB casting issues.
- **Enum Adoption**: Standardizing Workspace Status through database native ENUMs via Prisma (`WorkspaceStatus`) to maintain data integrity.

## Tests

Integration and Service tests have been written (`tests/workspace.service.test.ts`, `tests/workspace.integration.test.ts`) covering:
- Authentication & RBAC authorization.
- Validating missing and incorrect payloads (producing standardized HTTP 400 structures).
- Verification of code immutability.
- Pagination mechanics.
- Soft deletion flows.
