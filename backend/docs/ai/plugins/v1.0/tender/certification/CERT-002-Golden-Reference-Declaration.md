# CERT-002 — Golden Reference Declaration
## Tender Plugin v1.0

> **Declaration ID:** GOLDEN-REF-TENDER-001  
> **Date:** 2026-07-29  
> **Status:** 🔒 DECLARED — GOLDEN REFERENCE DOMAIN PLUGIN  
> **Declaring Authority:** TeamTender Executive Architecture Board

---

## Declaration

By virtue of completing AI-10A, AI-10B, AI-10C, and AI-10D in full accordance with Domain Plugin Standard v1.2:

**Tender Plugin v1.0 is hereby declared the Golden Reference Domain Plugin.**

---

## What This Means

### For the Platform
- Tender Plugin proves the TeamTender Enterprise AI Platform v1.0 is capable of hosting enterprise domain logic without any modification to frozen platform components.
- The platform's scalability claim is validated by real implementation, not design assumption.

### For Future Domain Plugins
Every future domain plugin (AI-11 Document, AI-12 RAB, AI-13 RKK, AI-14 Executive Copilot) **MUST** reference Tender Plugin v1.0 as the gold standard for:

| Domain Component | Reference Implementation |
|---|---|
| Manifest structure | `src/ai/plugins/tender/manifest.json` (v2.2) |
| Domain models | `models/TenderModels.ts` (Locks 36-45) |
| Capability pattern | `TenderEligibilityCapability.ts` (Lock 27, 36, 39) |
| Evidence First flow | `TenderRecommendationCapability.ts` (Lock 39) |
| Artifact lineage | `ArtifactLineage` interface (Lock 38) |
| Read Model isolation | `CompanyProfileReadModel.ts` (Lock 25) |
| External adapter | `TenderAuthorityAdapter.ts` (Lock 26) |
| Workflow versioning | `EligibilityWorkflow.ts` (Lock 37) |
| Agent independence | `TenderAgentOrchestrator.ts` (Lock 29) |
| Domain KPI | `TenderTelemetryCollector.ts` (Lock 40) |

### For Governance
- PRG-001 Repository Governance confirmed: no PR-level changes to platform
- ADR-TENDER-001 formalizes Lock 25–34 as Domain Plugin Standard v1.0
- This declaration extends the standard to v1.2 (Lock 35–46)

---

## Successor Programs

| Program | Inherits From | Status |
|---|---|---|
| AI-11 Document Plugin | Tender Plugin v1.0 (Golden Reference) | Ready |
| AI-12 RAB Plugin | Tender Plugin v1.0 (Golden Reference) | Ready |
| AI-13 RKK Plugin | Tender Plugin v1.0 (Golden Reference) | Ready |
| AI-14 Executive Copilot | Tender Plugin v1.0 (Golden Reference) | Ready |

---

## Declaration Signature

**Declared by:** TeamTender Executive Architecture Board  
**Effective Date:** 2026-07-29  
**Valid Until:** Next major platform version (v2.0.0)  
**Reference Standard:** Domain Plugin Standard v1.2
