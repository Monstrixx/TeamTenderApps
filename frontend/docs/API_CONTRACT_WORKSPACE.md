# Workspace API Contract

## 1. Endpoint Catalogue

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/api/v1/health` | Health Check |
| GET | `/api/v1/version` | Version Info |
| GET | `/api/v1/workspaces/{id}` | Metadata Workspace |
| GET | `/api/v1/workspaces/{id}/company` | Profil Perusahaan |
| GET | `/api/v1/workspaces/{id}/equipment` | Daftar Peralatan |
| POST | `/api/v1/workspaces/{id}/equipment` | Tambah Peralatan |
| PUT | `/api/v1/workspaces/{id}/equipment/{equipmentId}` | Update Peralatan |
| DELETE | `/api/v1/workspaces/{id}/equipment/{equipmentId}` | Hapus Peralatan (Soft Delete) |
| GET | `/api/v1/workspaces/{id}/personnel` | Daftar Personel |
| GET | `/api/v1/workspaces/{id}/suppliers` | Daftar Supplier |
| GET | `/api/v1/workspaces/{id}/documents` | Metadata Dokumen |
| POST | `/api/v1/workspaces/{id}/documents` | Upload Dokumen (multipart/form-data) |
| GET | `/api/v1/workspaces/{id}/validation` | Hasil Validasi |

## 2. Standarisasi Header

| Header | Wajib | Fungsi |
|---|---|---|
| `Authorization` | ✅ | `Bearer <JWT>` |
| `X-Request-ID` | ✅ | Correlation ID |
| `Idempotency-Key` | Opsional | Mencegah duplikasi data pada endpoint POST |
| `X-Correlation-ID` | Opsional | Distributed tracing |
| `Accept-Language` | Opsional | i18n |
| `X-Client-Version` | Opsional | Debug frontend |

## 3. Standard Response Envelope
Semua response API dibalut (enveloped) dalam struktur berikut:
```json
{
  "success": true,
  "data": {},
  "meta": {
    "requestId": "...",
    "timestamp": "..."
  },
  "errors": null
}
```

## 4. Standard Error Contract (RFC 7807 Pattern)
```json
{
  "success": false,
  "errors": {
    "code": "WORKSPACE_NOT_FOUND",
    "message": "Workspace tidak ditemukan",
    "details": [],
    "requestId": "...",
    "timestamp": "..."
  }
}
```

## 5. Audit & Soft Delete Convention
Semua resource wajib memiliki field audit:
- `createdAt`
- `updatedAt`
- `createdBy`
- `updatedBy`

Untuk endpoint hapus (misal `DELETE /equipment/{id}`), resource tidak dihapus permanen melainkan menggunakan mekanisme Soft Delete:
- `deletedAt`
- `deletedBy`

## 6. Pagination, Filtering, dan Sorting
- **Pagination**: `?page=1&pageSize=20`
- **Filtering**: Menggunakan query parameter `?category=Heavy&status=Ready&search=Excavator`
- **Sorting**: Menggunakan query parameter `?sort=name&order=asc`

## 7. Flow Data
### Request Flow
UI ➡️ React Query ➡️ WorkspaceService ➡️ Adapter ➡️ Axios ➡️ Backend

### Response Flow
Backend ➡️ DTO ➡️ Mapper ➡️ Domain Model ➡️ React Query ➡️ UI

### Error Flow
Backend ➡️ HTTP Error ➡️ Interceptor ➡️ AppError ➡️ Error Boundary
