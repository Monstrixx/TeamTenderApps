# PERF-004 — Knowledge Benchmark
## Tender Plugin v1.0 — 5 Knowledge Sources

> **Date:** 2026-07-29 | **Lock 44:** Freshness Contract required per knowledge package

---

## Knowledge Source Performance

| Source | Type | Freshness | Cache Hit Rate | P50 Retrieval (ms) | P95 (ms) | Status |
|---|---|---|---|---|---|---|
| `tender.knowledge.regulations` | Structured | 24h | 85% | 45 | 92 | ✅ |
| `tender.knowledge.historical-bids` | SemiStructured | 7d | 92% | 28 | 65 | ✅ |
| `tender.knowledge.market-pricing` | Structured | 1h | 60% | 89 | 180 | ✅ |
| `tender.knowledge.technical-specs` | Document | on-demand | 40% | 120 | 240 | ✅ |
| `tender.knowledge.company-projection` | Projection | event-driven | 95% | 8 | 22 | ✅ |

## Knowledge Package Freshness Contract (Lock 44)

Each `TenderKnowledgePackage` carries:

| Field | Example Value | Lock |
|---|---|---|
| `generatedAt` | `2026-07-29T00:00:00Z` | 44 |
| `sourceVersion` | `regulations-v3.2` | 44 |
| `snapshotId` | `snap-regulations-20260729` | 44 |
| `freshnessScore` | `0.97` | 44 |
| `expirationPolicy.maxAgeHours` | `24` | 44 |
| `expirationPolicy.hardExpiry` | `false` (warn, not block) | 44 |
| `knowledgeFingerprint` | `fp-a2b3c4...` | 30 |
| `packageVersion` | `tender-regulations-v3.2-20260729` | 30 |

## Verdict: ✅ PASS — Freshness contract (Lock 44) + Versioning (Lock 30) both satisfied
