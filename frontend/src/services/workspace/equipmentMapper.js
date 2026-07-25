/**
 * Mapper for Equipment
 * 
 * @param {import('./workspace.dto').EquipmentDTO} dto 
 * @returns {import('./workspace.types').Equipment}
 */
export const mapEquipment = (dto) => {
    if (!dto) return null;
    return {
        id: String(dto.id),
        name: dto.name || '',
        capacity: dto.capacity || '',
        merk: dto.merk || '',
        condition: dto.condition || '',
        location: dto.location || '',
        ownershipStatus: dto.ownership_status || '',
        evidence: dto.evidence || ''
    };
};

/**
 * Maps a list of Equipment DTOs
 * @param {import('./workspace.dto').EquipmentDTO[]} dtoList 
 * @returns {import('./workspace.types').Equipment[]}
 */
export const mapEquipmentList = (dtoList = []) => {
    return dtoList.map(mapEquipment);
};
