import { TENDER_METADATA } from '../../../data/mock/workspace/metadata';
import { mockCompanyProfile } from '../../../data/mock/companyProfile';
import { INITIAL_PERALATAN_LIST as peralatanList, INITIAL_SUPPLIERS as supplierDirectory, INITIAL_PERSONEL_LIST, INITIAL_KSO_PARTNERS, INITIAL_UPAH_LIST, INITIAL_BAHAN_LIST, INITIAL_ALAT_LIST, INITIAL_AHSP_ITEMS, INITIAL_BOQ_LIST } from '../../../data/mock/workspace/options';
import { INITIAL_DOC_VALIDATION as documentTemplates } from '../../../data/mock/workspace/fields';

// Internal state to simulate DB for equipment (enables CRUD mock)
let mockEquipmentDB = [...peralatanList];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const createEnvelope = (data, meta = null) => ({
    success: true,
    data,
    meta,
    errors: null
});

export const MockWorkspaceAdapter = {
    getWorkspace: async (workspaceId) => {
        await delay(500);
        return createEnvelope({
            id: workspaceId || '12345',
            package_name: TENDER_METADATA.namaPaket,
            hps: TENDER_METADATA.hps,
            location: TENDER_METADATA.lokasi,
            agency: TENDER_METADATA.pokja,
            status: 'Aktif',
            schedule: {
                start_date: "2026-07-01T00:00:00Z",
                end_date: "2026-07-30T00:00:00Z"
            }
        });
    },

    getCompanyProfile: async (workspaceId) => {
        await delay(500);
        return createEnvelope({
            id: mockCompanyProfile.id,
            name: mockCompanyProfile.nama,
            address: mockCompanyProfile.alamat,
            npwp: mockCompanyProfile.npwp,
            director_name: mockCompanyProfile.direktur
        });
    },

    getEquipment: async (workspaceId, params = {}) => {
        await delay(500);
        // Map UI mock data to DTO
        const dtos = mockEquipmentDB.map(eq => ({
            id: String(eq.id),
            name: eq.nama,
            capacity: eq.kapasitas,
            merk: eq.merk,
            condition: eq.kondisi,
            location: eq.lokasi,
            ownership_status: eq.kepemilikan,
            evidence: eq.bukti
        }));
        
        // Simulating pagination meta
        return createEnvelope(dtos, {
            page: params.page || 1,
            page_size: params.pageSize || 10,
            total_items: dtos.length,
            total_pages: 1
        });
    },

    createEquipment: async (workspaceId, data) => {
        await delay(500);
        const newId = `eq_${Date.now()}`;
        const newEquipment = {
            id: newId,
            nama: data.name,
            kapasitas: data.capacity,
            merk: data.merk,
            kondisi: data.condition,
            lokasi: data.location,
            kepemilikan: data.ownership_status,
            bukti: data.evidence
        };
        mockEquipmentDB.push(newEquipment);
        return createEnvelope({ ...data, id: newId });
    },

    updateEquipment: async (workspaceId, equipmentId, data) => {
        await delay(500);
        const index = mockEquipmentDB.findIndex(eq => String(eq.id) === String(equipmentId));
        if (index !== -1) {
            mockEquipmentDB[index] = {
                id: equipmentId,
                nama: data.name,
                kapasitas: data.capacity,
                merk: data.merk,
                kondisi: data.condition,
                lokasi: data.location,
                kepemilikan: data.ownership_status,
                bukti: data.evidence
            };
        }
        return createEnvelope({ ...data, id: equipmentId });
    },

    deleteEquipment: async (workspaceId, equipmentId) => {
        await delay(500);
        mockEquipmentDB = mockEquipmentDB.filter(eq => String(eq.id) !== String(equipmentId));
        return createEnvelope(null);
    },

    getSuppliers: async (workspaceId, params = {}) => {
        await delay(500);
        const dtos = supplierDirectory.map(sup => ({
            id: String(sup.id),
            name: sup.nama,
            category: sup.kategori,
            rating: sup.rating,
            contact_person: sup.kontak,
            phone: sup.telepon
        }));
        return createEnvelope(dtos, {
            page: params.page || 1,
            page_size: params.pageSize || 10,
            total_items: dtos.length,
            total_pages: 1
        });
    },
    
    getPersonnel: async (workspaceId) => {
        await delay(500);
        const dtos = INITIAL_PERSONEL_LIST.map(p => ({
            id: p.id,
            name: p.nama,
            role: p.jabatan,
            birth_place: p.tempatLahir,
            birth_date: p.tglLahir,
            education: p.pendidikan,
            experience: p.pengalaman.map(exp => ({
                year: exp.tahun,
                project_name: exp.nama,
                location: exp.lokasi,
                client: exp.pemberi,
                company: exp.perusahaan,
                task: exp.tugas,
                duration: exp.waktu,
                position: exp.posisi
            }))
        }));
        return createEnvelope(dtos);
    },

    getKsoPartners: async (workspaceId) => {
        await delay(500);
        const dtos = INITIAL_KSO_PARTNERS.map(kso => ({
            id: kso.id,
            name: kso.nama,
            email: kso.email,
            sbu: kso.SBU,
            kd_individual: kso.KD_Individual,
            skp_individual: kso.SKP_Individual
        }));
        return createEnvelope(dtos);
    },

    getUpah: async (workspaceId) => {
        await delay(500);
        const dtos = INITIAL_UPAH_LIST.map(u => ({ id: u.id, name: u.nama, price: u.harga }));
        return createEnvelope(dtos);
    },

    getBahan: async (workspaceId) => {
        await delay(500);
        const dtos = INITIAL_BAHAN_LIST.map(b => ({ id: b.id, name: b.nama, price: b.harga }));
        return createEnvelope(dtos);
    },

    getAlat: async (workspaceId) => {
        await delay(500);
        const dtos = INITIAL_ALAT_LIST.map(a => ({ id: a.id, name: a.nama, price: a.harga }));
        return createEnvelope(dtos);
    },

    getAhsp: async (workspaceId) => {
        await delay(500);
        const dtos = INITIAL_AHSP_ITEMS.map(a => ({
            id: a.id,
            name: a.nama,
            labor: (a.upah || []).map(u => ({ item_id: u.item, coefficient: u.koef })),
            material: (a.bahan || []).map(b => ({ item_id: b.item, coefficient: b.koef })),
            equipment: (a.alat || []).map(e => ({ item_id: e.item, coefficient: e.koef }))
        }));
        return createEnvelope(dtos);
    },

    getBoq: async (workspaceId) => {
        await delay(500);
        const dtos = INITIAL_BOQ_LIST.map(b => ({
            id: b.id,
            name: b.nama,
            volume: b.vol,
            unit: b.sat,
            ahsp_id: b.ahspId,
            is_lumpsum: b.isLumpsum || false,
            base_price: b.basePrice || 0
        }));
        return createEnvelope(dtos);
    },

    getDocuments: async (workspaceId) => {
        await delay(500);
        const dtos = Object.entries(documentTemplates).map(([key, doc]) => ({
            id: key,
            type: key, // using id as type for simplicity
            title: doc.name,
            status: doc.status === 'valid' ? 'VALID' : 'UNVALIDATED',
            value: doc.value,
            detail: doc.detail,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }));
        return createEnvelope(dtos);
    }
};
