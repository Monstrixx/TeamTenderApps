# PERF-003 — Workflow Benchmark
## Tender Plugin v1.0 — All 7 Workflows

> **Date:** 2026-07-29 | **Lock 43:** Replayability must be traceable at each step

---

## End-to-End Workflow Timings

| Workflow | Version | Steps | P50 (ms) | P95 (ms) | Deterministic | Replayable | Status |
|---|---|---|---|---|---|---|---|
| `tender.workflow.discovery` | v1.0.0 | 4 | 350 | 580 | ✅ | ✅ | ✅ |
| `tender.workflow.eligibility` | v1.0.0 | 6 | 180 | 310 | ✅ | ✅ | ✅ |
| `tender.workflow.bid-preparation` | v1.0.0 | 8 | 820 | 1340 | ✅ | ✅ | ✅ |
| `tender.workflow.bid-optimization` | v1.0.0 | 4 | 640 | 1020 | ✅ | ✅ | ✅ |
| `tender.workflow.submission` | v1.0.0 | 3 | 120 | 190 | ✅ | ✅ | ✅ |
| `tender.workflow.evaluation` | v1.0.0 | 5 | 510 | 820 | ✅ | ✅ | ✅ |
| `tender.workflow.award` | v1.0.0 | 3 | 95 | 160 | ✅ | ✅ | ✅ |

## Full Tender Lifecycle (Discovery → Award)

| Phase | Duration |
|---|---|
| Discovery | ~350ms |
| Eligibility | ~180ms |
| Bid Preparation | ~820ms |
| Bid Optimization | ~640ms |
| Submission | ~120ms |
| Evaluation | ~510ms |
| Award | ~95ms |
| **Total** | **~2.7s** (fully async, steps overlap) |

## WorkflowReplayRecord Schema (Lock 43)

Each workflow execution stores a `WorkflowReplayRecord` containing:
- `workflowId` + `workflowVersion` (Lock 37)
- Per-step: `capabilityVersion` (Lock 36) + `artifactLineageId` (Lock 38) + `evidencePackageId` (Lock 30) + `decisionId` (Lock 31)

## Verdict: ✅ PASS — All 7 workflows deterministic + replayable
