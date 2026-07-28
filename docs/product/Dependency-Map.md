# Dependency Map

## Metadata
- **Document ID:** TT-PROD-DEP-001
- **Version:** 1.0
- **Status:** Approved
- **Owner:** Product Owner
- **Last Updated:** 2026-07-28

## Navigation
- **Previous:** [Sprint Plan](./Sprint-Plan.md)
- **Next:** None
- **Parent:** [Product README](./README.md)
- **Related Documents:** [Epic Roadmap](./Epic-Roadmap.md)

## Epic Dependencies
The following diagram illustrates the architectural and product dependencies across the Wave 6 Epics. 

```mermaid
graph TD
    %% Base Layer
    E1[EPIC-01: Workspace]
    
    %% Core Entities Layer
    E2[EPIC-02: Company]
    
    %% Resource Layer
    E3[EPIC-03: Personnel]
    E4[EPIC-04: Equipment]
    
    %% Value Layer
    E5[EPIC-05: Tender]
    
    %% Intelligence Layer
    E6[EPIC-06: AI]

    %% Dependencies
    E1 --> E2
    E2 --> E3
    E2 --> E4
    
    E3 --> E5
    E4 --> E5
    
    E1 -.-> E6
    E2 -.-> E6
    E3 -.-> E6
    E4 -.-> E6
    E5 -.-> E6
```
*Note: Solid lines indicate structural dependencies (e.g., Personnel require a Company). Dotted lines indicate intelligence layer dependencies (AI augments all layers).*
