# EPIC-02: Company

## Metadata
- **Epic ID:** EPIC-02
- **Domain:** Company
- **Status:** Approved
- **Owner:** Product Owner
- **Last Updated:** 2026-07-28

## Navigation
- **Previous:** [EPIC-01: Workspace](./EPIC-01-Workspace.md)
- **Next:** [EPIC-03: Personnel](./EPIC-03-Personnel.md)
- **Parent:** [Product README](../README.md)
- **Related Documents:** None

## Purpose
To represent legal entities and organizational structures within a workspace, allowing the customer to map their real-world corporate structure into TeamTender.

## Business Value
Provides the legal and structural context required for executing tenders, managing compliance, and linking personnel to specific divisions or entities.

## Capabilities
- Company profile creation and management.
- Parent-child entity relationships (subsidiaries).
- Compliance and legal document tracking per entity.

## Dependencies
- **EPIC-01 (Workspace):** Companies exist within a Workspace.

## User Stories
1. **US-CMP-01:** As a Workspace Admin, I want to create a Company profile so that I can represent my legal entity in the system.
2. **US-CMP-02:** As a User, I want to view the organizational hierarchy so I understand the corporate structure of subsidiaries.

## Acceptance Criteria
- Companies are successfully created and linked to the active Workspace.
- Hierarchical company structures (parent/child) are accurately modeled and queried.
- Mandatory legal fields (e.g., Tax ID) are validated.

## Definition of Done
- Code complete and tests passed.
- Database schema migrations successfully applied.
- Deployed to UAT.
- User documentation available.

## Future Enhancements
- Vendor and partner relationship mapping across workspaces.
- Automated ERP integration for financial profiles.
