# Workspace Modules

## Metadata
- **Document ID:** TT-PROD-WS-MOD-001
- **Version:** 1.0
- **Status:** Approved
- **Owner:** Product Owner
- **Last Updated:** 2026-07-28

## Navigation
- **Previous:** [Navigation Tree](./Navigation-Tree.md)
- **Next:** [User Flows](./User-Flows.md)
- **Parent:** [Workspace README](./README.md)
- **Related Documents:** None

## 1. Company Module
- **Purpose:** Map the tenant's legal entity and organizational structure.
- **Capabilities:** Create profiles, manage subsidiaries, upload compliance documents.
- **Inputs:** Corporate tax IDs, addresses, legal PDFs.
- **Outputs:** Verified company profile required for Tender submission.
- **Dependencies:** Workspace Foundation.
- **Primary Users:** Workspace Administrators.
- **Future Expansion:** ERP integration for live financial health metrics.

## 2. Personnel Module
- **Purpose:** Manage human capital, access rights, and qualifications.
- **Capabilities:** Invite users, assign roles (RBAC), track certifications.
- **Inputs:** User emails, role assignments, certification PDFs.
- **Outputs:** Authorized users, competency matrix for projects.
- **Dependencies:** Company Module.
- **Primary Users:** Administrators, HR Managers.
- **Future Expansion:** Single Sign-On (SSO), automated skill gap analysis.

## 3. Equipment Module
- **Purpose:** Maintain a registry of physical and digital assets.
- **Capabilities:** Asset registration, assignment, and maintenance logging.
- **Inputs:** Asset IDs, purchase dates, condition reports.
- **Outputs:** Available resource pool for tenders.
- **Dependencies:** Company Module, Personnel (for assignments).
- **Primary Users:** Fleet/Asset Managers.
- **Future Expansion:** IoT live tracking integrations.

## 4. Tender Module
- **Purpose:** Execute the core business value of bidding and procurement.
- **Capabilities:** Draft bids, attach documents, workflow approvals, submission tracking.
- **Inputs:** RFPs, pricing data, compliance docs.
- **Outputs:** Final bid packages.
- **Dependencies:** Company, Personnel, Equipment.
- **Primary Users:** Bid Managers, Estimators, Approvers.
- **Future Expansion:** Smart contract execution, multi-party bidding.

## 5. AI Center
- **Purpose:** Automate administrative toil and augment decision-making.
- **Capabilities:** Document data extraction, semantic search.
- **Inputs:** Raw PDFs, natural language queries.
- **Outputs:** Structured JSON data, ranked search results.
- **Dependencies:** All other modules (for data indexing).
- **Primary Users:** All users.
- **Future Expansion:** Generative proposal drafting, win-rate prediction.
