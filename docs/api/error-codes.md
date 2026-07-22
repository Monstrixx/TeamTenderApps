# Error Code Registry

Kumpulan kode error spesifik yang akan direturn melalui Standar Error Contract API.
Hal ini mempermudah frontend (UI AppError) untuk mendeteksi *edge case* tertentu dibandingkan mengandalkan status HTTP semata.

| Code | HTTP Status | Keterangan |
|---|---|---|
| `AUTH_001` | 401 | Token invalid / gagal diverifikasi |
| `AUTH_002` | 419 | Session expired (perlu token refresh) |
| `AUTH_003` | 403 | Tidak memiliki permission untuk aksi ini |
| `WS_001` | 404 | Workspace dengan ID tersebut tidak ditemukan |
| `WS_002` | 400 | Data Workspace gagal tervalidasi |
| `EQ_001` | 409 | Equipment duplikat |
| `EQ_002` | 404 | Equipment tidak ditemukan |
| `SYS_500`| 500 | Internal Server Error |
| `VAL_001`| 422 | Business Validation Exception (Misal: tender kadaluarsa) |
| `RATE_001`| 429| Request melebih batas limit API |
