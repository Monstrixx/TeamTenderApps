# SPEC-DOMAIN-PLUGIN-v1.3: TeamTender Enterprise Domain Plugin Specification

> **Specification Version:** 1.3  
> **Status:** 🔒 OFFICIAL ENTERPRISE SPECIFICATION  
> **Effective Date:** 2026-07-29  
> **Approved By:** TeamTender Executive Architecture Board  
> **Supersedes:** Domain Plugin Standard v1.2 / AI-10D Specification

---

## 1. Executive Summary & Core Principle

This document constitutes the official technical specification for all TeamTender Domain Plugins. Every plugin developed for the TeamTender Enterprise AI Platform MUST strictly comply with this specification to achieve certification and official marketplace listing.

### Core Architectural Principle
> **"Platform evolves slowly. Domains evolve rapidly."**  
> *"Every domain plugin must be independently deployable, independently observable, independently certifiable, and independently evolvable."*

---

## 2. Mandatory Architecture Locks (Locks 25 – 52)

### 2.1 Bounded Context & Cross-Plugin Isolation
- **Lock 25 (Domain Read Models):** 1 Plugin = 1 Bounded Context. Cross-plugin data access MUST occur via Event-Driven Read Model Projections (`CompanyProfileProjection`). Direct SDK or HTTP cross-plugin calls are prohibited.
- **Lock 26 (External Adapter Isolation):** All external I/O (LPSE, LKPP, external APIs) MUST be isolated behind a `Provider Interface` (`ITenderAuthorityProvider`) → `Adapter` → `Transport`. Direct `fetch()` or `axios()` inside business capabilities is prohibited.
- **Lock 33 (Zero Domain Leakage):** Domain plugins must NOT import directly from platform internal kernel source files (`src/ai/kernel/*` or `PluginRuntime` implementation class). Only `PluginSDK` and exposed interfaces are allowed.
- **Lock 51 (Plugin Marketplace Readiness):** Plugins MUST support isolated `install`, `upgrade`, `rollback`, and `uninstall` without side effects on other active plugins.
- **Lock 52 (Domain Independence):** Plugins MUST be executable in standalone mode using mock platform contexts for CI/CD, local testing, and automated verification.

### 2.2 Intelligence & Execution Purity
- **Lock 27 (Capability Purity):** Capabilities contain ONLY business orchestration, validation, and decision logic. No direct database queries or raw transport logic allowed inside capabilities.
- **Lock 28 (Workflow Determinism):** Workflows must follow deterministic execution graphs (DAGs). Same input + same context MUST yield identical execution paths and event sequences.
- **Lock 29 (Agent Independence):** Multi-agent communication MUST occur strictly via Event Platform channels or Shared Platform Artifacts. Direct agent-to-agent method invocations are prohibited.
- **Lock 39 (Evidence First):** Capabilities and workflows MUST execute in strict sequence:
  $$\text{Evidence} \longrightarrow \text{Analysis} \longrightarrow \text{Decision} \longrightarrow \text{Artifact}$$
  Direct LLM recommendation output without prior evidence collection and analysis is forbidden.

### 2.3 Knowledge, Decision & Artifact Lineage
- **Lock 30 (Knowledge Package Versioning):** Knowledge packages must carry `packageVersion`, `knowledgeFingerprint`, `freshness`, and `confidence` metrics.
- **Lock 31 (Decision Reproducibility):** Every AI decision must generate a reproducible `DecisionRecord` detailing applied rules, applied policies, evidence IDs, reasoning paths, and confidence scores.
- **Lock 32 (Domain Artifacts):** All output documents are registered as Platform Artifacts with cryptographic checksums and schema validation.
- **Lock 38 (Artifact Lineage):** Artifacts MUST maintain complete end-to-end lineage links:
  $$\text{Knowledge Package} \longrightarrow \text{Evidence Set} \longrightarrow \text{Capability} \longrightarrow \text{Workflow} \longrightarrow \text{Decision Record} \longrightarrow \text{Artifact}$$
- **Lock 43 (Workflow Replayability):** Workflows must produce a `WorkflowReplayRecord` enabling 100% reconstruction of past executions for audit purposes.
- **Lock 44 (Knowledge Freshness Contract):** Knowledge packages MUST implement a `KnowledgeFreshnessContract` (`generatedAt`, `sourceVersion`, `freshnessScore`, `expirationPolicy`) validated by capabilities prior to execution.
- **Lock 48 (Artifact Backward Compatibility):** Domain artifacts MUST maintain backward compatibility for at least one major schema version ($v_{n-1}$).
- **Lock 50 (Full Explainability):** All AI decisions must be fully traceable back to raw knowledge sources and evidence inputs.

### 2.4 Manifest, Versioning & Telemetry
- **Lock 35 (Domain Manifest Completeness):** Manifest `manifest.json` (schema v2.2+) is the single source of truth containing 12 mandatory sections: Metadata, Capabilities, Knowledge Sources, Workflows, Agents, Policies, Events, Artifacts, UI Contracts, Telemetry, Dependencies, and Compatibility/SLA.
- **Lock 36 (Capability Versioning):** Each capability declares an independent semantic version and lifecycle state (`ACTIVE`, `DRAFT`, `DEPRECATED`, `RETIRED`).
- **Lock 37 (Workflow Versioning):** Workflows carry independent version identifiers allowing runtime selection.
- **Lock 40 (Domain KPI):** Business domain KPIs (e.g., Accuracy, Acceptance Rate, Completion Rate) are first-class metrics managed by a `DomainTelemetryCollector`.
- **Lock 41 (Manifest Immutability):** `manifest.json` is immutable at runtime and can only be altered via deployment, upgrade, or migration.
- **Lock 42 (Capability Observability):** Capabilities MUST track individual telemetry (execution time, success rate, evidence count, artifact count).
- **Lock 45 (Domain SLA):** Every plugin must declare SLA metrics (`startupTimeMs`, `healthCheckTimeMs`, `maxMemoryMb`, `maxCpuTimeMs`, `maxConcurrentAgents`, `expectedResponseTimeMs`).
- **Lock 46 (Domain Certification Gate):** Plugins must pass 10 mandatory certification gates before receiving official listing status.
- **Lock 47 (Domain Evolution):** Plugins evolve exclusively through Capabilities, Workflows, Knowledge Sources, and Policies — NEVER via platform kernel modifications.
- **Lock 49 (Telemetry First):** No new capability may be merged without accompanying telemetry instrumentation.

---

## 3. Domain Manifest Schema v2.2 (Reference Template)

```json
{
  "id": "teamtender.plugin.<domain>",
  "version": "1.0.0",
  "manifestVersion": "2.2",
  "type": "Domain",
  "domain": "<Domain Name>",
  "owner": "TeamTender Enterprise",
  "capabilities": [
    { "semanticId": "<domain>.<capability>", "version": "1.0.0", "lifecycle": "ACTIVE", "enabled": true, "sla": { "maxLatencyMs": 1000, "availability": 0.999 } }
  ],
  "knowledgeSources": [
    { "id": "<domain>.knowledge.<source>", "name": "<Source Name>", "type": "Structured", "freshness": "24h", "scheduler": "RuntimeScheduler" }
  ],
  "workflows": [
    { "id": "<domain>.workflow.<name>", "version": "1.0.0", "deterministic": true, "trigger": "event" }
  ],
  "agents": [
    { "id": "agent.<domain>.<role>", "model": "cognitive-v1", "tools": ["Tool1"] }
  ],
  "policies": [
    { "id": "<domain>.policy.<name>", "engine": "PolicyEngine", "priority": 1 }
  ],
  "events": {
    "published": ["<DomainEvent1>"],
    "consumed": ["<ExternalProjectionUpdated>"]
  },
  "artifacts": [
    { "type": "<DomainArtifact>", "version": "1.0.0", "lineageTracked": true }
  ],
  "ui": {
    "navigation": { "label": "<Domain Label>", "path": "/workspace/<domain>", "icon": "icon" },
    "pages": [],
    "widgets": [],
    "commandPalette": []
  },
  "telemetry": {
    "domainKPIs": ["accuracy", "completionRate"]
  },
  "sla": {
    "startupTimeMs": 100,
    "healthCheckTimeMs": 10,
    "maxMemoryMb": 512,
    "maxCpuTimeMs": 10000,
    "maxConcurrentAgents": 3,
    "expectedResponseTimeMs": 500
  },
  "compatibility": {
    "platformVersion": ">=1.0.0",
    "runtimeVersion": ">=1.0.0",
    "kernelVersion": ">=1.0.0",
    "sdkVersion": ">=1.0.0",
    "manifestVersion": "2.2"
  }
}
```

---

## 4. Certification Gates (10 Mandatory Gates)

1. **Architecture Gate:** 100% compliance with Locks 25–52.
2. **Runtime Gate:** Successful lifecycle transitions (`start`, `stop`, `suspend`, `resume`, `health`, `selftest`).
3. **SDK Gate:** Zero direct platform kernel imports; 100% SDK compliance.
4. **Performance Gate:** Startup $<100\text{ ms}$, Capability latency $<500\text{ ms}$, Memory $<512\text{ MB}$.
5. **Security Gate:** Zero secret leaks, sandboxing enforced, least-privilege permissions.
6. **Knowledge Gate:** Knowledge Package versioning, Freshness Contract, and Replayability verified.
7. **Workflow Gate:** 100% deterministic graphs with end-to-end replay records.
8. **Capability Gate:** Capability Purity verified; Evidence-First pattern enforced.
9. **Telemetry Gate:** Domain KPIs instrumented separately from platform metrics.
10. **Documentation Gate:** 15 mandatory artifacts complete (Blueprint, ER, Class, Sequence, State, Matrices, ADR, RFC, Certification).

---

## 5. Certification Status Standard

- **🔒 GOLDEN REFERENCE DOMAIN PLUGIN:** Achieved when a plugin passes all 10 Certification Gates with a score $\ge 99.0\%$ and serves as the benchmark for subsequent domain plugins.
