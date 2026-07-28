# Frontend Routing Plan

## Metadata
- **Document ID:** TT-PROD-WS-FRP-001
- **Version:** 1.0
- **Status:** Review
- **Owner:** Frontend Lead
- **Last Updated:** 2026-07-28

## Routing Hierarchy

```mermaid
graph TD
    Root[/] --> Login[/login]
    Root --> Selector[/workspace-selector]
    Root --> Workspace[/:workspaceId]
    
    Workspace --> Home[/home]
    Workspace --> Company[/company]
    Workspace --> Personnel[/personnel]
    Workspace --> Equipment[/equipment]
    Workspace --> Supplier[/supplier]
    Workspace --> Tender[/tender]
    Workspace --> Documents[/documents]
    Workspace --> Analytics[/analytics]
    Workspace --> AI[/ai]
    Workspace --> Settings[/settings]
    
    Tender --> TenderDetail[/tender/:tenderId]
```

## Route Definitions
- **`/workspace-selector`**: Dashboard to view and select available workspaces for users belonging to multiple tenants.
- **`/:workspaceId`**: The root of the WorkspaceLayout. Extracts the `workspaceId` parameter and sets the context for all child routes.
- **`/:workspaceId/[module]`**: Domain-specific landing pages (e.g., `/acme-corp/tender`). All API calls made under these routes must include the `workspaceId` header.
