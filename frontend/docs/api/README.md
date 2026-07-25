# Workspace API Documentation

Direktori ini berisi Spesifikasi OpenAPI (OAS 3.1) untuk domain Workspace TeamTender. Spesifikasi ini menjadi *Single Source of Truth* untuk implementasi UI dan Backend.

## Struktur Direktori
```
api/
├── README.md               # Panduan struktur API (File ini)
├── workspace.openapi.yaml  # Akar dari Spesifikasi OpenAPI 3.1
├── common.yaml             # Spesifikasi struktur berulang (Response Envelope, Pagination)
├── errors.yaml             # Spesifikasi Error Contract 
├── error-codes.md          # Registry dan mapping HTTP error code 
└── schemas/                # Kumpulan spesifikasi DTO untuk resource 
    ├── Workspace.yaml
    ├── Company.yaml
    ├── Equipment.yaml
    ├── Supplier.yaml
    └── Document.yaml
```

## Cara Membuka di Swagger Editor
1. Kunjungi [Swagger Editor](https://editor.swagger.io/).
2. Salin isi `workspace.openapi.yaml` (pastikan resolver eksternal `schemas/*` bisa diload, atau gunakan bundler OpenAPI seperti `@redocly/cli` jika mengujinya secara lokal).
3. Anda dapat melihat dokumentasi interaktif yang sudah terpisah sesuai *Tags*.

## Postman Collection
Koleksi lengkap Postman (v2.1 format) berada di direktori `../postman/`.
- `workspace.postman_collection.json`
- `workspace.local.environment.json`
- `workspace.dev.environment.json`
- `workspace.staging.environment.json`

Untuk menggunakannya:
1. Buka Postman -> File -> Import.
2. Pilih file *collection* dan salah satu *environment*.
3. Pastikan memilih *environment* yang sesuai di sudut kanan atas Postman.

## Validasi OpenAPI
Untuk memastikan spesifikasi API tidak melanggar standar:
```bash
# Instal Redocly CLI
npm i -g @redocly/cli

# Jalankan validasi linting
redocly lint docs/api/workspace.openapi.yaml
```

## Konvensi Penamaan
- **CamelCase** (`camelCase`) digunakan untuk parameter API (Query Parameter, dll).
- **Snake_Case** (`snake_case`) atau *CamelCase* tergantung konsensus. Dalam Workspace API, *Payload DTO* menggunakan `snake_case` jika sesuai standar lama, atau *camelCase* secara eksklusif. Kita menggunakan **camelCase** sebagai standar API JSON response dan *Domain Model* UI.
- URL Endpoint menggunakan ke-banyak-an (`workspaces`, `documents`, `suppliers`).
