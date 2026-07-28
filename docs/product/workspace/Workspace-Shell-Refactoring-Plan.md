# Workspace Shell Refactoring Plan

## Metadata
- **Document ID:** TT-PROD-WS-REF-001
- **Version:** 1.0
- **Status:** Review
- **Owner:** Chief Software Architect
- **Last Updated:** 2026-07-28

## Current Frontend Structure
Currently, `Workspace.jsx` is acting as a monolithic "Tender Execution Workspace". It handles pricing, BOQ, RAB, and compliance within a single file. The actual SaaS tenant boundary (Workspace) is missing an administrative shell.

## Target Structure
We are migrating to an Enterprise SaaS Shell pattern. The `WorkspaceLayout` will serve as the master wrapper for all authenticated tenant activity, isolating modules like Company, Personnel, Equipment, and Tender into their respective domain routes.

## Modules
- **Workspace:** Selection, settings, and member management.
- **Company:** Profile and compliance.
- **Personnel:** Directory and roles.
- **Equipment:** Asset registry.
- **Supplier:** Vendor directory.
- **Tender:** Bidding and project execution.
- **Document:** Global document storage.
- **Analytics:** Dashboards.
- **AI:** Data extraction and validation.
- **Settings:** General configurations.

## Layout Hierarchy
The application will wrap all protected routes in the `WorkspaceLayout`.
`AppRouter -> WorkspaceLayout -> [Domain Module Route] -> Page Components`

## Shell Architecture
The shell provides cross-cutting concerns:
- **State:** Active `workspaceId`, user permissions (RBAC context).
- **Navigation:** Primary Sidebar, Topbar.
- **Feedback:** Global Error Boundaries, Notification Toasts.

## Benefits
- Resolves the naming collision (Tenant Workspace vs. Tender Workspace).
- Enables lazy loading per domain module, drastically reducing the initial bundle size.
- Prepares the foundation for strict Multi-Tenant API enforcement (injecting `workspaceId` into all queries).

## Migration Risks
- Breaking the existing Tender bidding flow inside `Workspace.jsx` if routing changes are not handled carefully.
- Loss of unsaved state in the current monolithic component when migrating to route-based modules.

## Rollback Strategy
1. Maintain the existing `Workspace.jsx` intact as `/legacy-workspace`.
2. Map the new Tender flow to `/workspace/:id/tender`.
3. If critical bugs arise, fallback routing immediately points users to the legacy route without requiring a redeployment of backend services.
