/**
 * Mapper for Company Profile
 * 
 * @param {import('./workspace.dto').CompanyProfileDTO} dto 
 * @returns {import('./workspace.types').CompanyProfile}
 */
export const mapCompanyProfile = (dto) => {
    if (!dto) return null;
    return {
        id: String(dto.id),
        name: dto.name || '',
        address: dto.address || '',
        npwp: dto.npwp || '',
        directorName: dto.director_name || ''
    };
};
