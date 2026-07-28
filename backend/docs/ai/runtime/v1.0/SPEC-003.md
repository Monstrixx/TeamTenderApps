# SPEC-003: Retrieval Specification & Manifest

## Struktur Objek Pusat: Knowledge Package
`KnowledgePackage` bersifat tidak dapat diubah (*immutable*). Sekali dibangun oleh `Context Builder`, objek ini dilarang dimodifikasi di pertengahan jalan.

```json
{
  "packageId": "pkg-a1b2c3d4",
  "version": "1.0",
  "workspaceId": "ws-001",
  "goalId": "goal-998",
  "queryFingerprint": "sha256-hash-of-normalized-query",
  "createdAt": "2026-07-28T20:00:00Z",
  "expiresAt": "2026-07-28T21:00:00Z",
  "confidence": 0.94,
  "facts": [...],
  "evidence": [...],
  "relationships": [...],
  "sources": [...],
  "timeline": [...],
  "metadata": {},
  "hash": "signature-to-validate-integrity"
}
```

## Lifecycle Pengetahuan
1. **CREATED**: Kueri diterima, pemahaman dilakukan.
2. **VALIDATED**: Kueri memenuhi *Policy*, dieksekusi secara asinkron.
3. **PACKAGED**: *Fusion* (Penggabungan) selesai, terbentuknya *KnowledgePackage*.
4. **DELIVERED**: Paket disalurkan kepada `Agent Runtime` atau `Cognitive OS`.
5. **CONSUMED**: Agen selesai membaca paket.
6. **EXPIRED**: Paket usang, *Cache* memanggil evakuasi (*eviction*).
7. **ARCHIVED**: Tersimpan ke *Event Store* sebagai sejarah kognitif (*Replay* material).

## Manifest Registrasi Retrieval
Plugin mendaftarkan indeks atau agen perantara (Reranker) dengan standar:
```yaml
knowledgePackage:
  version: 1.0.0
  producer: TEAM_TENDER_NATIVE_RETRIEVER
  planner: COST_BASED_HEURISTIC
  strategies: [ VECTOR, GRAPH, KEYWORD, HYBRID ]
  sources: [ COMPANY_DOCS, TENDER_WIKI ]
  schema: KNOWLEDGE_PKG_V1
```
