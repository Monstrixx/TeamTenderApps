/**
 * Centralized query keys for the Workspace domain.
 * This ensures consistency and makes cache invalidation predictable.
 */
export const workspaceKeys = {
    all: ['workspace'],
    detail: (id) => ['workspace', id],
    company: (id) => ['workspace', id, 'company'],
    equipment: (id) => ['workspace', id, 'equipment'],
    suppliers: (id) => ['workspace', id, 'suppliers'],
    documents: (id) => ['workspace', id, 'documents'],
    document: (id, docId) => ['workspace', id, 'documents', docId],
    personnel: (id) => ['workspace', id, 'personnel'],
    ksoPartners: (id) => ['workspace', id, 'ksoPartners'],
    upah: (id) => ['workspace', id, 'upah'],
    bahan: (id) => ['workspace', id, 'bahan'],
    alat: (id) => ['workspace', id, 'alat'],
    ahsp: (id) => ['workspace', id, 'ahsp'],
    boq: (id) => ['workspace', id, 'boq'],
};
