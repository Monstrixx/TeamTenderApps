# EPIC-01 Closure Report: Workspace Platform

**Date**: 28 July 2026
**Epic ID**: EPIC-01
**Status**: COMPLETED

## 1. Ringkasan Sprint (W6-S01A – W6-S01E)
Epic-01 berhasil mentransformasi TeamTender dari single-tenant monolithic architecture menjadi Multi-Tenant SaaS Platform yang tangguh.

- **W6-S01A (Refactoring Plan):** Mendefinisikan ulang *Workspace Information Architecture (WIA)* dan merancang migrasi fisik modul frontend tanpa merusak *git history*.
- **W6-S01B (Routing Foundation):** Membangun *Workspace Shell*, navigasi, dan routing berbasis *tenant* (termasuk *wrapper* untuk `Workspace.jsx`).
- **W6-S01C (Domain Enablement):** Mengaktifkan modul-modul resmi TeamTender dan memperbaiki UX pada *Workspace Home Dashboard*.
- **W6-S01D (Members & RBAC):** Implementasi pengelolaan *Members*, *Roles*, dan *Invitations* yang dikawal ketat oleh *Role-Based Access Control* (RBAC) 100% *Full Stack*.
- **W6-S01E (Workspace Runtime & Tenant Isolation):** Sprint puncak yang menetapkan *Zero Cross-Tenant Leakage* menggunakan **TenantRepository** dan Node.js `AsyncLocalStorage`.

## 2. Daftar Deliverable
- [x] **Workspace Information Architecture (WIA)** Dokumentasi lengkap arsitektur UI/UX (Navigation, Tree, Modules, dll).
- [x] **Frontend Workspace Shell:** Sistem layout *sidebar*, *topbar*, *breadcrumb*, *status bar* baru yang responsif dan isolated per *tenant*.
- [x] **Workspace Context & Routing:** Integrasi React Query untuk perpindahan *Workspace* di sisi klien tanpa kebocoran *cache* data.
- [x] **Backend Workspace Runtime:** Middleware `workspace.middleware.ts` untuk validasi keanggotaan dan enkapsulasi otorisasi ke `AsyncLocalStorage`.
- [x] **Tenant Repository Layer:** Base class `TenantRepository` baru yang mengisolasi kueri Prisma secara otomatis agar tidak terjadi *cross-tenant data leakage*.
- [x] **RBAC & Invitation Flow:** Endpoint dan UI lengkap untuk mengelola *role*, mengundang member, dan persetujuan gabung.
- [x] **Cross-Tenant Attack Integration Test:** Skrip pengujian regresi (*regression test*) untuk mencegah *exploit* ID *workspace* silang (W6-S01E).

## 3. Keputusan Arsitektur Penting (Architecture Decisions)
1. **TenantRepository Separation:** Mengganti usulan injeksi langsung di `BaseRepository`. Repositori non-tenant (seperti `UserRepository`, `RoleRepository`) tetap menggunakan `BaseRepository`, sedangkan entitas *tenant-bound* wajib *extend* `TenantRepository` agar `workspaceId` terinjeksi otomatis. Prinsip ini menjaga kohesi dan *Single Responsibility*.
2. **Context via AsyncLocalStorage:** Menyimpan data *context* *Request* secara *Thread-safe* (untuk Express.js / Node.js) lewat `AsyncLocalStorage`. Service layer tidak perlu tahu soal ID dari parameter URL—semuanya ditarik dari *context*.
3. **Soft Navigation Frontend Cache Reset:** Perpindahan *Workspace* tidak me- *reload* halaman, melainkan menjalankan `queryClient.removeQueries()` pada *React Query* yang terikat ke *tenant ID* lama, menjamin performa cepat dengan proteksi kerahasiaan data *tenant*.

## 4. Technical Debt Tersisa
- File `Workspace.jsx` asli masih berada di lokasinya dengan pola *Wrapper*. Diperlukan pemecahan (*refactor*) yang sesungguhnya ke dalam komponen-komponen terpisah di Epic selanjutnya (Tender Execution / Epic-03).
- Pengiriman *Email Invitation* saat ini diasumsikan berjalan, tetapi infrastruktur layanan email riil perlu di-*scale* dan dimonitor.
- *Audit Log* sudah siap secara *context*, namun belum diterapkan trigger universal untuk menangkap semua aktivitas CRUD Prisma.

## 5. Known Limitations
- Beberapa modul di Frontend belum terisi penuh (*placeholder*).
- Jika token JWT kadaluarsa saat peralihan *Workspace*, *error handler* global harus memastikan *user* ter-*redirect* ke *login* tanpa *glitch* UI.

## 6. Lessons Learned
- Menghindari migrasi besar (*Big Bang Refactor*) pada file raksasa terbukti mengamankan *velocity* tim (*Wrapper Pattern* sukses besar).
- Menerapkan *Tenant Context* pada lapisan terbawah (Repository Layer) terbukti lebih *bulletproof* dibandingkan membebankan tanggung jawab *filtering* ke masing-masing *Controller* / *Service*.

## 7. Checklist Kesiapan EPIC-02 (Company Platform)
Semua infrastruktur pondasi kini siap. Di Epic-02:
- [ ] *Backend* sudah aman: `CompanyRepository` dapat langsung *extend* `TenantRepository`.
- [ ] *Frontend* sudah siap: Helper `hasPermission('company.create')` dari `WorkspaceContext` dapat langsung dipakai di modul Company.
- [ ] *Routing* sudah menunjang URL arsitektur perusahaan: `/workspace/:workspaceId/companies`.

**Kesimpulan:** EPIC-01 secara resmi dinyatakan sukses dan tertutup. Siap berekspansi ke EPIC-02.
