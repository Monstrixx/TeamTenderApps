# Role & Permission Model

## Metadata
- **Document ID:** TT-PROD-WS-RBAC-001
- **Version:** 1.0
- **Status:** Approved
- **Owner:** Product Owner
- **Last Updated:** 2026-07-28

## Navigation
- **Previous:** [Layout Standards](./Layout-Standards.md)
- **Next:** [Workspace Lifecycle](./Workspace-LifeCycle.md)
- **Parent:** [Workspace README](./README.md)
- **Related Documents:** None

## Official MVP Roles

### 1. Owner
- **Responsibilities:** Ultimate authority over the workspace, billing, and data retention.
- **Permission Scope:** Universal access. Can delete the workspace.
- **Default Access:** All modules (Read, Write, Delete).

### 2. Administrator
- **Responsibilities:** Manages workspace configurations, users, and overall module settings.
- **Permission Scope:** Can manage Personnel and roles, configure Company settings.
- **Default Access:** All modules (Read, Write, Delete) EXCEPT billing and workspace deletion.

### 3. Manager
- **Responsibilities:** Oversees daily operations within specific domains (e.g., Fleet Manager, Bid Manager).
- **Permission Scope:** Can create and edit Tenders, Equipment, and Personnel (non-admin).
- **Default Access:** Read/Write on operational modules. Cannot modify Workspace settings or global roles.

### 4. Editor
- **Responsibilities:** Contributes data to the platform (e.g., uploading compliance docs, drafting bids).
- **Permission Scope:** Can create and edit records but cannot delete them or change states to "Approved".
- **Default Access:** Read/Write on assigned Tenders or Equipment.

### 5. Viewer
- **Responsibilities:** Requires access to data for reference (e.g., external auditors, C-level read-only).
- **Permission Scope:** Strict Read-Only across allowed modules.
- **Default Access:** Read-Only. Cannot create, update, or delete any record.

## Inheritance Rules
- Permissions are strictly additive. If a user is assigned `Editor` and `Manager`, they receive the union of both permission sets.
- Workspace-level roles supersede resource-level roles (e.g., a Workspace Admin has access to all Tenders automatically).

## Future RBAC Expansion
- Granular Attribute-Based Access Control (ABAC).
- Custom role creation allowing tenants to define their own permission matrices.
- Resource-level locking (e.g., Editor on Tender A, but Viewer on Tender B).
