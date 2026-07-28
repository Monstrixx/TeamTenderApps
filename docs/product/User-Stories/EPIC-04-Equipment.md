# EPIC-04: Equipment

## Metadata
- **Epic ID:** EPIC-04
- **Domain:** Equipment
- **Status:** Approved
- **Owner:** Product Owner
- **Last Updated:** 2026-07-28

## Navigation
- **Previous:** [EPIC-03: Personnel](./EPIC-03-Personnel.md)
- **Next:** [EPIC-05: Tender](./EPIC-05-Tender.md)
- **Parent:** [Product README](../README.md)
- **Related Documents:** None

## Purpose
To provide a centralized registry for all physical and digital assets owned or managed by the company.

## Business Value
Allows organizations to track the availability, condition, and assignment of assets, which is crucial for operational planning and tender fulfillment.

## Capabilities
- Asset registration and categorization.
- Equipment assignment (to personnel or projects).
- Maintenance and lifecycle logging.

## Dependencies
- **EPIC-02 (Company):** Equipment is owned by Companies.
- **EPIC-03 (Personnel):** Equipment can be assigned to Personnel.

## User Stories
1. **US-EQP-01:** As a Fleet Manager, I want to add a new piece of heavy machinery to the system so its usage can be tracked.
2. **US-EQP-02:** As a Worker, I want to see what equipment is currently assigned to me.

## Acceptance Criteria
- Assets can be registered with unique identifiers (e.g., serial numbers).
- Assignments to personnel reflect accurately in real-time.
- Equipment categories are correctly structured and searchable.

## Definition of Done
- Code complete and tests passed.
- Search and filtering performance verified.
- Deployed to UAT.
- User documentation completed.

## Future Enhancements
- IoT integrations for live location tracking.
- Automated maintenance schedules and predictive failure alerts.
