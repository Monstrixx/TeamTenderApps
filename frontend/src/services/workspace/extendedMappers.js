export const mapPersonnelList = (dtos) => dtos.map(mapPersonnel);

export const mapPersonnel = (dto) => ({
    id: String(dto.id),
    nama: dto.name || '',
    jabatan: dto.role || '',
    tempatLahir: dto.birth_place || '',
    tglLahir: dto.birth_date || '',
    pendidikan: dto.education || '',
    pengalaman: (dto.experience || []).map(exp => ({
        tahun: exp.year,
        nama: exp.project_name,
        lokasi: exp.location,
        pemberi: exp.client,
        perusahaan: exp.company,
        tugas: exp.task,
        waktu: exp.duration,
        posisi: exp.position
    }))
});

export const mapKsoPartnersList = (dtos) => dtos.map(dto => ({
    id: String(dto.id),
    nama: dto.name,
    email: dto.email,
    SBU: dto.sbu,
    KD_Individual: dto.kd_individual,
    SKP_Individual: dto.skp_individual
}));

export const mapUpahList = (dtos) => dtos.map(dto => ({
    id: String(dto.id),
    nama: dto.name,
    harga: dto.price
}));

export const mapBahanList = (dtos) => dtos.map(dto => ({
    id: String(dto.id),
    nama: dto.name,
    harga: dto.price
}));

export const mapAlatList = (dtos) => dtos.map(dto => ({
    id: String(dto.id),
    nama: dto.name,
    harga: dto.price
}));

export const mapAhspItems = (dtos) => dtos.map(dto => ({
    id: String(dto.id),
    nama: dto.name,
    upah: (dto.labor || []).map(l => ({ item: l.item_id, koef: l.coefficient })),
    bahan: (dto.material || []).map(m => ({ item: m.item_id, koef: m.coefficient })),
    alat: (dto.equipment || []).map(e => ({ item: e.item_id, koef: e.coefficient }))
}));

export const mapBoqList = (dtos) => dtos.map(dto => ({
    id: String(dto.id),
    nama: dto.name,
    vol: dto.volume || 1,
    sat: dto.unit || 'LS',
    ahspId: dto.ahsp_id || '',
    isLumpsum: !!dto.is_lumpsum,
    basePrice: dto.base_price || 0
}));

// We map doc validation from flat array of DTOs into the dictionary structure expected by the UI
export const mapDocValidation = (dtos) => {
    const result = {};
    dtos.forEach(dto => {
        result[dto.type] = {
            name: dto.title,
            status: dto.status === 'VALID' ? 'valid' : 'unvalidated',
            value: dto.value || '',
            detail: dto.detail || ''
        };
    });
    return result;
};
