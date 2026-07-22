/**
 * Mappers are pure functions.
 * They take a DTO (raw backend data) and return a Domain Model (frontend standard).
 * They MUST NOT: mutate the DTO, make API calls, read from state, or read from localStorage/env.
 */

/**
 * Maps a TenderWorkspaceDTO to a TenderMeta domain model.
 * 
 * @param {import('./workspace.dto').TenderWorkspaceDTO} dto 
 * @returns {import('./workspace.types').TenderMeta}
 */
export const mapWorkspaceToDomain = (dto) => {
    // Pure transformation, no side effects
    // Handles the snake_case API response
    return {
        id: String(dto.id),
        namaPaket: dto.package_name || 'Unknown',
        hps: dto.hps || 0,
        hpsFormatted: new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(dto.hps || 0),
        status: dto.status || 'Aktif', // Not in new API contract but keeping for backward compatibility
        pokja: dto.agency || '-',
        lokasi: dto.location || '-',
        tglSelesai: dto.schedule?.end_date || '2026-07-25T14:00:00'
    };
};
