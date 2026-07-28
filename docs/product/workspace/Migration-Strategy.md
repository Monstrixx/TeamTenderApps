# Migration Strategy

## Metadata
- **Document ID:** TT-PROD-WS-MIG-001
- **Version:** 1.0
- **Status:** Review
- **Owner:** Frontend Lead
- **Last Updated:** 2026-07-28

## Current State
The existing application uses `Workspace.jsx` as a massive monolithic page encompassing all Tender execution details (BOQ, RAB, Compliance, AI Extraction). It lacks a true SaaS Tenant shell.

## New Workspace Shell
We will introduce a new `WorkspaceLayout` that wraps the `react-router` Outlet. This layout establishes the multi-tenant context (extracting `:workspaceId` from the URL) and provides the global Sidebar and Topbar.

## Tender Module Extraction
1. **Rename:** The current `Workspace.jsx` file will be renamed to `TenderExecutionWorkspace.jsx` (or similar) to free up the term "Workspace".
2. **Relocate:** Move this massive component into the new `src/modules/tender/pages/` directory.
3. **Route Update:** Map `/workspace/:id/tender/:tenderId` to this relocated component.

## Backward Compatibility
To prevent breaking existing API calls or bookmarks, the legacy route `/workspace` will be temporarily redirected to a default workspace's tender list, or aliased in the router until all backend APIs strictly enforce the `:workspaceId` header.

## Migration Phases
1. **Phase 1: Shell Construction:** Build the `WorkspaceLayout`, Sidebar, Topbar, and standard UI components in isolation (without hooking into the main router).
2. **Phase 2: Route Restructuring:** Update `AppRouter.jsx` to introduce the `/:workspaceId` base path.
3. **Phase 3: Module Porting:** Move existing pages (Tender, Company Profile) into the new directory structure (`src/modules/*`).
4. **Phase 4: Context Injection:** Update global state/hooks to consume the active `workspaceId` and pass it to API calls.

## Risk Mitigation
- **Feature Flags:** Introduce the new routing structure behind a local developer flag first.
- **Gradual Porting:** Move one module (e.g., Company) into the shell first to validate the layout before porting the massive Tender module.
- **Testing:** Run end-to-end integration tests to ensure data isolation (Tenant A cannot see Tenant B's tenders).
