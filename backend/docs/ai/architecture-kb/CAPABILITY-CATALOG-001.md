# CAPABILITY-CATALOG-001: Enterprise Capability Catalog

> **Program:** PRG-002 Enterprise Architecture Knowledge Base  
> **Status:** 🔒 CERTIFIED ENTERPRISE CATALOG  
> **Date:** 2026-07-29

---

## 1. Platform Core Capabilities

### AI Core Kernel Capabilities
- `kernel.memory.read`: Read memory key-value pair from Memory Broker.
- `kernel.memory.write`: Store context memory with lease and eviction policy.
- `kernel.event.publish`: Dispatch kernel-level system events.
- `kernel.event.subscribe`: Register listener for system events.

### Cognitive OS Capabilities
- `cognitive.policy.evaluate`: Execute rule-based policy check.
- `cognitive.reasoning.solve`: Goal-oriented reasoning and decision tree execution.
- `cognitive.plan.generate`: Create multi-step execution graph.
- `cognitive.approval.request`: Gate action for human approval.

### Retrieval & Knowledge Capabilities
- `retrieval.pipeline.execute`: Multi-stage knowledge retrieval and re-ranking.
- `retrieval.cache.get`: Fetch cached knowledge package by fingerprint.
- `retrieval.evidence.score`: Validate and score raw evidence confidence.

### Agent Runtime Capabilities
- `agent.process.spawn`: Launch sandboxed agent process.
- `agent.process.join`: Link child agent process to parent task.
- `agent.process.cancel`: Terminate agent execution safely.

---

## 2. Company Plugin Capabilities (Reference Implementation v1.0)

- `company.profile.read`: Fetch verified company profile data.
- `company.certification.verify`: Verify corporate license and ISO certifications.
- `company.financial.assess`: Calculate financial capacity and liquidity ratio.
- `company.experience.audit`: Evaluate past project history and performance score.

---

## 3. Tender Plugin Capabilities (Enterprise Domain Reference v1.0)

| Semantic ID | Version | Lifecycle | SLA (Max Latency) | Purity (Lock 27) | Telemetry (Lock 42) |
|---|---|---|---|---|---|
| `tender.document.parse` | v1.0.0 | `ACTIVE` | 2000 ms | ✅ Pure Orchestration | ✅ Tracked |
| `tender.requirement.extract` | v1.0.0 | `ACTIVE` | 1500 ms | ✅ Pure Orchestration | ✅ Tracked |
| `tender.eligibility.check` | v1.0.0 | `ACTIVE` | 500 ms | ✅ Pure Orchestration | ✅ Tracked |
| `tender.bid.analyze` | v1.0.0 | `ACTIVE` | 3000 ms | ✅ Pure Orchestration | ✅ Tracked |
| `tender.bid.score` | v1.0.0 | `ACTIVE` | 1000 ms | ✅ Pure Orchestration | ✅ Tracked |
| `tender.bid.optimize` | v1.0.0 | `ACTIVE` | 5000 ms | ✅ Pure Orchestration | ✅ Tracked |
| `tender.compliance.review` | v1.0.0 | `ACTIVE` | 2000 ms | ✅ Pure Orchestration | ✅ Tracked |
| `tender.recommendation.generate` | v1.0.0 | `ACTIVE` | 4000 ms | ✅ Pure Orchestration | ✅ Tracked |
| `tender.award.predict` | v1.0.0 | `ACTIVE` | 2000 ms | ✅ Pure Orchestration | ✅ Tracked |
| `tender.workspace.manage` | v1.0.0 | `ACTIVE` | 200 ms | ✅ Pure Orchestration | ✅ Tracked |

---

## 4. Planned Capabilities (Era-5 Domain Intelligence)

### Document Intelligence (AI-11)
- `document.ocr.extract`: Advanced OCR and document layout analysis.
- `document.classifier.classify`: Automatic document categorization.
- `document.compliance.scan`: Automated regulatory document scan.

### Construction Intelligence (AI-13)
- `construction.rab.calculate`: Bill of quantities and RAB calculation.
- `construction.rkk.generate`: Health, safety, and environmental (RKK) plan generation.
- `construction.schedule.optimize`: CPM project timeline optimization.
