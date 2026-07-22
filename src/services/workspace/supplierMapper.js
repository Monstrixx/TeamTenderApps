/**
 * Mapper for Supplier
 * 
 * @param {import('./workspace.dto').SupplierDTO} dto 
 * @returns {import('./workspace.types').Supplier}
 */
export const mapSupplier = (dto) => {
    if (!dto) return null;
    return {
        id: String(dto.id),
        name: dto.name || '',
        category: dto.category || '',
        rating: dto.rating || 0,
        contactPerson: dto.contact_person || '',
        phone: dto.phone || ''
    };
};

/**
 * Maps a list of Supplier DTOs
 * @param {import('./workspace.dto').SupplierDTO[]} dtoList 
 * @returns {import('./workspace.types').Supplier[]}
 */
export const mapSupplierList = (dtoList = []) => {
    return dtoList.map(mapSupplier);
};
