# DECISION-CATALOG-001: Enterprise Architectural Decision Catalog

> **Program:** PRG-002 Enterprise Architecture Knowledge Base  
> **Status:** 🔒 COMPLETE ARCHITECTURE LOCK CATALOG (Locks 1 – 52)  
> **Date:** 2026-07-29

---

## 1. Summary of Architectural Eras & Lock Evolution

- **Era-1 (AI Core Kernel):** Locks 1–5 (Kernel Immutability, Memory Isolation, Protocol Standard)
- **Era-2 (Runtime Layer):** Locks 6–12 (Cognitive Pipeline, Service Mesh Routing, Agent Process Isolation)
- **Era-3 (Plugin Platform):** Locks 13–24 (Manifest Contract, Self-Test, Certification Scorecard, PBOM)
- **Era-4 (Reference Domains):** Locks 25–52 (Domain Read Models, Capability Purity, Evidence First, Telemetry First, Domain Evolution, Independence)

---

## 2. Complete Architecture Lock Registry (Locks 1 – 52)

### Era-1 & Era-2 Platform Locks (Locks 1 – 12)
1. **Lock 1:** Kernel Core Immutability — Kernel source cannot be edited by application features.
2. **Lock 2:** Memory Broker Single Point of Context — All state exchange via Memory Broker.
3. **Lock 3:** Cognitive OS Policy Enforcer — Policy decisions executed before action dispatch.
4. **Lock 4:** Service Mesh Transparent Proxy — No direct HTTP calls between internal services.
5. **Lock 5:** Event Sourcing Audit Trail — All platform state transitions stored as immutable events.
6. **Lock 6:** Cognitive Pipeline Orchestration — Multi-engine reasoning flow (Reasoning, Decision, Constraint, Planning, Approval).
7. **Lock 7:** Retrieval Fusion Pipeline — Multi-source knowledge synthesis and re-ranking.
8. **Lock 8:** Agent Process Isolation — Agents run in isolated sandboxes managed by ProcessManager.
9. **Lock 9:** Plugin SDK Abstraction Layer — Plugins interact with platform exclusively via PluginSDK.
10. **Lock 10:** Zero Platform Bypass — Domain logic cannot access private platform internals.
11. **Lock 11:** Cryptographic Build Fingerprint — All builds generate SHA256 build checksums.
12. **Lock 12:** Automatic Health Recovery — Platform auto-recovers degraded plugins.

### Era-3 Plugin Platform Locks (Locks 13 – 24)
13. **Lock 13:** Manifest as Runtime Contract — Runtime reads `manifest.json` for discovery, never source code scan.
14. **Lock 14:** Plugin Self Test (`selftest()`) — Automatic health self-check method required.
15. **Lock 15:** Rolling Upgrade Strategy — Zero-downtime plugin version updates.
16. **Lock 16:** Plugin Compliance Scorecard — Mandatory scoring across 6 dimensions.
17. **Lock 17:** Plugin Fingerprint — Manifest Hash, Signature, Build Hash, SDK Version tracking.
18. **Lock 18:** Plugin Bill of Materials (PBOM) — Declarative list of capabilities, tools, policies, knowledge.
19. **Lock 19:** Runtime Compatibility Report — Multi-layer compatibility report required for release.
20. **Lock 20:** Automated Certification Harness — Certification verified via automated harness.
21. **Lock 21:** Repository Governance Rule — Architecture changes require RFC → Review → ADR → Implementation → Certification.
22. **Lock 22:** Plugin Sandbox Boundary — Enforced memory and CPU quotas per container.
23. **Lock 23:** Zero Direct File Writing — Plugins store data as Platform Artifacts.
24. **Lock 24:** Mandatory Telemetry Instrumentation — All plugin executions emit telemetry.

### Era-4 Domain Plugin Standard v1.0, v1.1, v1.2, v1.3 (Locks 25 – 52)
25. **Lock 25:** Domain Read Models — Cross-plugin data access via Event-Driven Projections ONLY.
26. **Lock 26:** External Adapter Isolation — External APIs isolated behind `Provider Interface` → `Adapter`.
27. **Lock 27:** Capability Purity — Capabilities contain ONLY orchestration, validation, decision.
28. **Lock 28:** Workflow Determinism — Same input = same steps = same output.
29. **Lock 29:** Agent Independence — Multi-agent communication strictly via Events or Shared Artifacts.
30. **Lock 30:** Knowledge Package Versioning — `packageVersion`, `knowledgeFingerprint`, `freshness`, `confidence`.
31. **Lock 31:** Decision Reproducibility — `DecisionRecord` detailing reasoning path and evidence.
32. **Lock 32:** Tender/Domain Artifact — All outputs registered as Platform Artifacts with lineage.
33. **Lock 33:** Zero Domain Leakage — Domain plugins must not import internal platform kernel files.
34. **Lock 34:** Domain Telemetry Separation — Business KPIs separated from platform metrics.
35. **Lock 35:** Domain Manifest Completeness — Manifest v2.2 with 12 mandatory sections.
36. **Lock 36:** Capability Versioning — Independent semantic versioning per capability.
37. **Lock 37:** Workflow Versioning — Independent semantic versioning per workflow.
38. **Lock 38:** Artifact Lineage — End-to-end lineage tracking ($\text{Knowledge} \rightarrow \text{Evidence} \rightarrow \text{Decision} \rightarrow \text{Artifact}$).
39. **Lock 39:** Evidence First — Strict sequence: $\text{Evidence} \rightarrow \text{Analysis} \rightarrow \text{Decision} \rightarrow \text{Artifact}$.
40. **Lock 40:** Domain KPI — Business KPIs managed as first-class citizens.
41. **Lock 41:** Domain Manifest Immutability — `manifest.json` read-only at runtime.
42. **Lock 42:** Capability Observability — Capabilities track individual telemetry metrics.
43. **Lock 43:** Workflow Replayability — `WorkflowReplayRecord` generated for 100% audit replay.
44. **Lock 44:** Knowledge Freshness Contract — Capabilities validate `KnowledgeFreshnessContract` prior to execution.
45. **Lock 45:** Domain SLA — Plugin declares SLA parameters in manifest.
46. **Lock 46:** Domain Certification Gate — 10 mandatory certification gates required for official status.
47. **Lock 47:** Domain Evolution — Plugins evolve ONLY via Capability, Workflow, Knowledge, Policy. No Kernel edits.
48. **Lock 48:** Artifact Backward Compatibility — Artifacts backward compatible for $\ge 1$ major version.
49. **Lock 49:** Telemetry First — No capability merged without telemetry.
50. **Lock 50:** Full Explainability — All AI decisions traceable to raw evidence inputs.
51. **Lock 51:** Plugin Marketplace Readiness — Isolated `install`, `upgrade`, `rollback`, `uninstall`.
52. **Lock 52:** Domain Independence — Plugin executable in standalone mode via mock platform context.

### Era-5 Advanced Domain Intelligence Locks (Locks 59 – 64)
53. **Lock 53:** Document Lineage — $\text{Knowledge Node} \rightarrow \text{Document} \rightarrow \text{Page} \rightarrow \text{Block} \rightarrow \text{Bounding Box} \rightarrow \text{OCR Version}$.
54. **Lock 54:** Multi-modal Evidence — Evidence supports text, image region, table, signature, stamp, QR/barcode, handwriting.
55. **Lock 55:** Layout Preservation — Chunks preserve heading hierarchy, page number, section, table position, bounding box.
56. **Lock 56:** Confidence Propagation — Pipeline confidence flows ($\text{OCR} \rightarrow \text{Table} \rightarrow \text{Clause} \rightarrow \text{Node}$).
57. **Lock 57:** Document Fingerprint — SHA256, Version, MIME, Page Count, Language, Encoding, Producer.
58. **Lock 58:** Semantic Citation — Verifiable citations ($\text{Clause}, \text{Page}, \text{Coordinates}, \text{Confidence}$).
59. **Lock 59:** Universal Document Identity — Global identity ($\text{DocumentID}, \text{Fingerprint}, \text{KnowledgeID}, \text{Version}, \text{Workspace}, \text{Owner}, \text{Retention}, \text{Classification}$).
60. **Lock 60:** Cross-document Relationship — Graph tracing ($\text{Tender Doc} \rightarrow \text{Addendum} \rightarrow \text{Clarification} \rightarrow \text{Contract} \rightarrow \text{Variation Order}$).
61. **Lock 61:** Citation Integrity — Citation points to original evidence even if knowledge evolves.
62. **Lock 62:** Document Provenance — Full origin tracking ($\text{Origin} \rightarrow \text{Uploader} \rightarrow \text{Import Method} \rightarrow \text{Pipeline} \rightarrow \text{Validation Result}$).
63. **Lock 63:** Knowledge Confidence Aggregation — Confidence aggregated across Document, Section, Chapter, Package levels.
64. **Lock 64:** Enterprise Knowledge Package — Output artifact containing Metadata, Evidence, Citations, Nodes, Relationships, Confidence, Compliance, Fingerprint.
