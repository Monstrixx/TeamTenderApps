# Workspace Lifecycle

## Metadata
- **Document ID:** TT-PROD-WS-LIFE-001
- **Version:** 1.0
- **Status:** Approved
- **Owner:** Product Owner
- **Last Updated:** 2026-07-28

## Navigation
- **Previous:** [Role & Permission Model](./Role-Permission-Model.md)
- **Next:** [Workspace State Model](./Workspace-State-Model.md)
- **Parent:** [Workspace README](./README.md)
- **Related Documents:** None

## Lifecycle Stages

### 1. Create
- Triggered by a user signing up or an admin provisioning a new tenant.
- System allocates database space, generates a unique `workspaceId`, and creates the initial Owner record.
- Default settings (timezone, currency) are applied.

### 2. Configure
- The Owner or Administrator inputs Company details (Legal Entity, Tax ID).
- Setup of custom branding, notification preferences, and integration endpoints if applicable.

### 3. Invite Members
- Personnel module is populated.
- Email invitations dispatched containing secure, single-use tokens tied to the specific workspace.

### 4. Operate
- The continuous, daily state of the Workspace.
- Users create Tenders, manage Equipment, and utilize AI services.
- Billing metrics are continuously tracked based on usage and member counts.

### 5. Archive
- Triggered by subscription pause or manual admin action.
- The workspace enters a read-only state. No new records can be created, but historical data remains accessible.

### 6. Restore
- Reversing the Archive or Soft-Delete state.
- Restores full Read/Write capabilities.

### 7. Delete
- **Soft Delete:** Marks the workspace as deleted. Access is immediately revoked, but data is retained for a 30-day grace period.
- **Hard Delete (Purge):** Irreversible destruction of all tenant data to comply with GDPR/data privacy laws after the grace period expires.
