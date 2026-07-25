# Backend Handoff Checklist

Dokumen ini berisi standar implementasi yang harus dipenuhi oleh tim Backend untuk Workspace API.

## Mandatory Conventions

- [ ] **JWT Authentication**: Semua private endpoints memvalidasi Bearer Token. Me-return `401 Unauthorized` atau `419 Session Expired`.
- [ ] **Standard Headers**: Endpoint mendukung dan mem-parsing `X-Request-ID`, `X-Correlation-ID`, `Accept-Language`, `X-Client-Version`.
- [ ] **Pagination**: Semua *list endpoints* mengembalikan pagination metadata (`page`, `pageSize`, `total`, `totalPages`) dalam Envelope `meta`.
- [ ] **Filtering & Sorting**: Parameter URL untuk filtering (`?category=x&search=y`) dan sorting (`?sort=x&order=asc`) diimplementasikan tanpa membuat endpoint terpisah.
- [ ] **Error Contract**: Kesalahan me-return standar error contract JSON dengan `code`, `message`, `details`.
- [ ] **Validation Status**: `400 Validation Error`, `404 Not Found`, `409 Conflict`, `422 Business Validation`, `429 Rate Limit`, dan `500 Internal Error`.
- [ ] **Request ID & Timestamp**: Di-inject dalam setiap `meta` response dan `errors` response (jika gagal).
- [ ] **Audit Logging**: Semua schema menyimpan `createdAt`, `updatedAt`, `createdBy`, `updatedBy`.
- [ ] **Soft Delete**: `DELETE` tidak menghilangkan data secara permanen, tapi mengisi `deletedAt` dan `deletedBy`.
- [ ] **Idempotency**: Endpoint yang memanipulasi data (terutama POST) memvalidasi header `Idempotency-Key` untuk mencegah duplikasi eksekusi.

## Roadmap & Placeholder (Future Scopes)

### Webhook / Event Integrations
Untuk persiapan integrasi notifikasi dan proses Background AI, arsitektur harus mengakomodir *event-driven architecture* untuk menembak webhook/event:
- `WorkspaceUpdated`
- `DocumentValidated`
- `TenderStatusChanged`
- `EquipmentAdded`

### File Uploads (Persiapan)
- File akan diunggah dengan `multipart/form-data` melalui `POST /api/v1/workspaces/{id}/documents`.
- Payload menerima berbagai tipe file: RKK, AHSP, PDF, Excel, Gambar, Dokumen Administrasi.
