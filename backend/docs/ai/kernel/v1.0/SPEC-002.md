# SPEC-002: Public API Specification

## Boundary dan Aksesibilitas
Akses ke AI Core Kernel murni disediakan melalui direktori `backend/src/ai/api`. Pemanggilan modul secara internal via `/kernel/` adalah pelanggaran regulasi *Dependency*.

## Gateway & Middleware API
- **Endpoint Utama**: `/api/v1/ai`
- **Tipe Permintaan (Envelope)**: Wajib meneruskan `AIRequest` (berisi *workspaceId*, *payload*, dsb).
- **Tipe Tanggapan**: Selalu membalas dengan `AIResponse` yang dikawal ketat oleh *discriminant union* (Contoh: `Suggestion`, `Plan`, `Report`).

## AI SDK (Frontend / Klien)
Pola pemanggilan dirancang berbasis *Fluent API* (berantai):
```typescript
AI.goal("WIN_TENDER")
  .capability("COMPANY_SEO_AUDIT")
  .withContext({ ... })
  .execute();
```

## Plugin SDK (Backend / Extender)
Plugin dikendalikan berbasis daur hidup (*Lifecycle-compliant*):
```typescript
export interface PluginManifest {
    initialize(): void;
    start(): void;
    stop(): void;
    dispose(): void;
}
```

## Event SDK
Untuk mendorong kebiasaan interaksi asinkron:
```typescript
// Subscribing
AI.events.subscribe("GoalCompleted", handler);

// Publishing (Backend Only)
EventBus.publish(new CognitiveEvent(...));
```
Semua API yang dipublikasikan dalam SPEC-002 akan dijaga oleh garansi kompatibilitas *Level 3 (Stable)*.
