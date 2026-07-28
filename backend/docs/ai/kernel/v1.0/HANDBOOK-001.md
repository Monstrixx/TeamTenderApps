# HANDBOOK-001: AI Platform Handbook v1.0

## Selamat Datang di Pengembangan TeamTender AI
Handbook ini diperuntukkan bagi anggota *engineering* yang berkontribusi pada pengembangan Ekosistem TeamTender. Mulai fase Era-2 (Runtime) dan Era-3 (Domain Intelligence), pengembang diwajibkan menjunjung pola-pola konvensi yang direstui oleh CTO dan Architecture Board.

## Standard Development Lifecycle (AI Program)
Tidak ada pergerakan atau pembuatan arsitektur yang mengandalkan intuisi liar (*cowboy coding*). Semua tim mengikuti *Pipeline* standar:
1. **Blueprint** (Riset awal, *drafting*)
2. **Architecture Review** (Konsensus dengan dewan arsitek)
3. **Implementation Plan** (Penulisan persetujuan tugas definitif)
4. **Implementation** (Kompilasi kode)
5. **Walkthrough** (Laporan visual / dokumentatif)
6. **Executive Review** (Approval CTO)
7. **Certification** (Bila itu adalah *Platform Layer*)
8. **Roadmap Adjustment** (Perbaikan orientasi peta jalan ke depan)

## Penulisan Manifest Declarative
Daripada membangun entitas secara manual pada file TypeScript (Hardcoding), seluruh *Capability, Workflow, Tool*, dan *Event* didaftarkan menggunakan standar **JSON/YAML Manifests**. Kernel memegang kendali via `UnifiedManifestLoader` dan mengonversi manifest tersebut menjadi *Runtime Assets*.

### Contoh Capability Manifest
```yaml
id: COMPANY_SEO_AUDIT
version: 1.0.0
domain: company
inputSchema: 
  type: object
  properties: ...
outputSchema: ...
workflow: COMPANY_SEO_AUDIT_WF
requiredTools: [ "web_search", "seo_analyzer" ]
requiredKnowledge: [ "competitor_graph" ]
requiredPolicies: [ "ALLOW_PUBLIC_SCRAPE" ]
```

### Panduan Kode: The Kernel API
Ingat, jika Anda menulis modul domain (seperti Tender AI):
- Anda hanya dapat berinteraksi dengan API pada `backend/src/ai/api`.
- Jangan mencoba menerobos batas `backend/src/ai/kernel`.
- Kesalahan pengikatan pustaka (*Import violation*) akan terdeteksi langsung oleh Linter dan diputus pembangunannya.
