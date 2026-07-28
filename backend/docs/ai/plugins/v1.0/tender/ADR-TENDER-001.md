# ADR-TENDER-001: Tender Plugin Domain Architecture
## Architecture Decision Record — Domain Plugin Standard v1.0

> **ADR Number:** TENDER-001  
> **Sprint:** AI-10A / AI-10B  
> **Status:** 🔒 ACCEPTED  
> **Date:** 2026-07-29  
> **Deciders:** TeamTender Executive Architecture Board  
> **Affected Components:** Tender Plugin, Platform Event Layer, Knowledge Platform

---

## Context

TeamTender Enterprise AI Platform v1.0 telah mencapai status Production-Ready. Tender Plugin adalah domain plugin pertama yang harus membuktikan bahwa platform bersifat scalable tanpa satu pun perubahan pada AI Core Kernel, Runtime Layer, atau Plugin Platform yang telah dibekukan.

Keputusan ini menetapkan standar arsitektur yang akan berlaku untuk **seluruh domain plugin** di masa depan (AI-11 Document, AI-12 RAB, AI-13 RKK, Executive Copilot, dll.).

---

## Decisions

### ADR-TENDER-001-A: Event-Driven Read Model untuk Cross-Plugin Data (OQ-1)

**Decision:** Tender Plugin mengakses data Company Plugin **hanya** melalui `CompanyProfileProjection` — sebuah Read Model yang dibangun oleh Projection Builder dari event `CompanyProfileUpdated`.

**Rationale:**
- Mempertahankan bounded context isolation (Architecture Lock 1)
- Mendukung event replay untuk historical analysis
- Memudahkan versioning projection tanpa mengubah domain plugin lain

**Pattern:**
```
Company Plugin → CompanyProfileUpdated → Event Platform → ProjectionBuilder → CompanyReadModel → Tender Plugin
```

**Consequences:**
- ✅ Zero cross-plugin compile-time dependency
- ✅ Tender Plugin dapat di-deploy tanpa Company Plugin aktif
- ⚠️ Eventual consistency: projection mungkin lag 1-2 event

---

### ADR-TENDER-001-B: Adapter Stub dengan Provider Interface (OQ-2)

**Decision:** AI-10C mengimplementasikan `TenderAuthorityStubProvider` sebagai konkret provider dari interface `ITenderAuthorityProvider`. LPSE/LKPP integration menjadi Program Integration tersendiri.

**Rationale:**
- Platform sedang membuktikan domain architecture, bukan external connectivity
- LPSE/LKPP memiliki autentikasi, rate limiting, dan kebijakan legal yang bersifat independent
- Provider interface memungkinkan swap implementation tanpa mengubah domain core

---

### ADR-TENDER-001-C: Knowledge Refresh via RuntimeScheduler (OQ-3)

**Decision:** Tender Plugin **tidak** memiliki scheduler internal. Plugin hanya menerbitkan event `KnowledgeRefreshRequested`. `RuntimeScheduler` bertanggung jawab atas kapan, prioritas, concurrency, retry, dan backoff.

**Rationale:**
- Konsisten dengan Agent Runtime pattern
- Platform dapat mengelola resource refresh secara global
- Plugin tetap stateless terhadap scheduling

---

### ADR-TENDER-001-D: Architecture Locks 25–34 sebagai Domain Plugin Standard

**Decision:** Architecture Locks 25–34 yang ditetapkan oleh Executive Architecture Board pada AI-10A diadopsi sebagai **Domain Plugin Standard v1.0** berlaku untuk seluruh domain plugin.

| Lock | Rule |
|---|---|
| 25 | Domain Read Models — satu-satunya data yang dapat dibaca antar plugin |
| 26 | External Adapter Isolation — semua external calls melalui Provider Interface |
| 27 | Capability Purity — hanya orchestration, validation, business decision |
| 28 | Workflow Determinism — same input = same output |
| 29 | Agent Independence — komunikasi via Event atau Shared Artifact |
| 30 | Knowledge Package Versioning — version, fingerprint, evidence, freshness, confidence |
| 31 | Decision Reproducibility — evidence, rule, policy, constraint, reasoning path, confidence |
| 32 | Tender Artifact — semua output adalah Platform Artifact |
| 33 | Zero Domain Leakage — static analysis wajib dilakukan sebelum certification |
| 34 | Domain Telemetry — dipisahkan dari Platform Telemetry |

---

## Status
🔒 **ACCEPTED** — Berlaku mulai AI-10C. Seluruh domain plugin berikutnya wajib mengikuti ADR ini.
