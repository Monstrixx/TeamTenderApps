# SEC-002 — Manifest Validation
## Tender Plugin v1.0 — Lock 35 + Lock 41

> **Date:** 2026-07-29 | **Manifest Version:** 2.2

---

## Schema Validation

| Section | Required (Lock 35) | Present | Valid | Status |
|---|---|---|---|---|
| `domain` | ✅ | ✅ | ✅ | ✅ |
| `capabilities` (×10) | ✅ | ✅ | Each has `semanticId`, `version`, `lifecycle` | ✅ |
| `knowledgeSources` (×5) | ✅ | ✅ | Each has `id`, `type`, `freshness`, `scheduler` | ✅ |
| `workflows` (×7) | ✅ | ✅ | Each has `id`, `version`, `deterministic` | ✅ |
| `agents` (×3) | ✅ | ✅ | Each has `id`, `tools`, `model` | ✅ |
| `policies` (×2) | ✅ | ✅ | Each has `id`, `engine`, `priority` | ✅ |
| `events` | ✅ | ✅ | 17 published + 1 consumed | ✅ |
| `artifacts` (×7) | ✅ | ✅ | Each has `type`, `version`, `lineageTracked` | ✅ |
| `ui` | ✅ | ✅ | 8 pages, 6 widgets | ✅ |
| `telemetry` | ✅ | ✅ | 8 domain KPIs listed | ✅ |
| `dependencies` | ✅ | ✅ | `required: []`, `optional: [company]` | ✅ |
| `compatibility` | ✅ | ✅ | `platformVersion`, `runtimeVersion`, `sdkVersion` | ✅ |
| `sla` | ✅ (Lock 45) | ✅ | 6 SLA metrics declared | ✅ |
| `signature` | ✅ | ✅ | `publisher`, `signature`, `checksum`, `buildHash` | ✅ |

**Section Score: 14/14 (100%)**

## Immutability Check (Lock 41)

| Check | Status |
|---|---|
| No runtime code writes to manifest.json | ✅ |
| Manifest loaded once at plugin discovery | ✅ |
| `manifest.json` not mutable via any capability | ✅ |

## Verdict: ✅ PASS — Manifest v2.2 complete (Lock 35) + immutable at runtime (Lock 41)
