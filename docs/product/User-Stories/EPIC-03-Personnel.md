# EPIC-03: Personnel

## Metadata
- **Epic ID:** EPIC-03
- **Domain:** Personnel
- **Status:** Approved
- **Owner:** Product Owner
- **Last Updated:** 2026-07-28

## Navigation
- **Previous:** [EPIC-02: Company](./EPIC-02-Company.md)
- **Next:** [EPIC-04: Equipment](./EPIC-04-Equipment.md)
- **Parent:** [Product README](../README.md)
- **Related Documents:** None

## Purpose
To manage employees, users, their roles, permissions, and professional profiles within the organization.

## Business Value
Ensures that the right people have the right access (Security) and allows the business to track its human capital effectively for tender resourcing.

## Capabilities
- User and employee directory management.
- Role-Based Access Control (RBAC).
- Skill and certification tracking.

## Dependencies
- **EPIC-02 (Company):** Personnel belong to Companies.

## User Stories
1. **US-PER-01:** As an Admin, I want to invite a user to the platform and assign them a role, so they can access necessary tools.
2. **US-PER-02:** As an HR Manager, I want to record an employee's certifications so they can be assigned to specialized tasks.

## Acceptance Criteria
- Users can be invited, accept invitations, and securely log in.
- RBAC correctly enforces permissions across the application based on the user's role.
- Employee profiles display accurate organizational alignment (Manager, Department).

## Definition of Done
- Code complete and tested (including strict authorization tests).
- RBAC matrix verified against architecture design.
- Deployed to UAT.
- Security sign-off achieved.

## Future Enhancements
- Active Directory / SSO integrations.
- Advanced competency matrices and AI-driven skill gap analysis.
