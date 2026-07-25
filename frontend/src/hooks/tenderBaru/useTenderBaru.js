import { useState } from 'react';
import { requirementsDB as initialRequirementsDB } from '../../data/mock/tenderBaru';

export function useTenderBaru() {
    const [requirementsDB, setRequirementsDB] = useState(initialRequirementsDB);
    const [openSections, setOpenSections] = useState({
        kualifikasi: true, administrasi: true, teknis: true, harga: false, dokumen_lain: false
    });
    const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);
    const [isExtracting, setIsExtracting] = useState(false);
    const [extractionProgress, setExtractionProgress] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [targetSection, setTargetSection] = useState('kualifikasi'); 
    const [subType, setSubType] = useState(''); 
    const [modalForm, setModalForm] = useState({
        judul: '', desc: '', ref: 'LDP Hal ',
        jabatan: '', skk: '', pengalaman: 1,
        jenisAlat: '', kapasitasAlat: '', jumlahAlat: 1,
        uraianPekerjaan: '', identifikasiBahaya: ''
    });

    const toggle = (key) => setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
    const deleteItem = (cat, id) => setRequirementsDB(prev => ({ ...prev, [cat]: prev[cat].filter(i => i.id !== id) }));
    
    const handleFormChange = (e) => {
        setModalForm(f => ({ ...f, [e.target.name]: e.target.value }));
    };

    const startExtraction = (e) => {
        e.preventDefault();
        setIsExtracting(true);
        setExtractionProgress(0);
        const interval = setInterval(() => {
            setExtractionProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    setIsExtracting(false);
                    setIsDocumentUploaded(true);
                    return 100;
                }
                return p + 20;
            });
        }, 150);
    };

    const openModalForSection = (section, e) => {
        if (e) e.stopPropagation();
        setTargetSection(section);
        if (section === 'teknis') {
            setSubType('personel');
        } else {
            setSubType('');
        }
        setModalForm({
            judul: '', desc: '',
            ref: section === 'kualifikasi' ? 'LDP Hal 69' : section === 'administrasi' ? 'LDP Hal 23' : section === 'teknis' ? 'LDP Hal 65' : section === 'harga' ? 'IKP 28' : 'LDP Hal 75',
            jabatan: '', skk: '', pengalaman: 1,
            jenisAlat: '', kapasitasAlat: '', jumlahAlat: 1,
            uraianPekerjaan: '', identifikasiBahaya: ''
        });
        setIsModalOpen(true);
    };

    const saveRequirement = () => {
        const id = "id_" + Date.now();
        const db = { ...requirementsDB };

        if (targetSection === 'kualifikasi') {
            db.kualifikasi = [...db.kualifikasi, { id, title: modalForm.judul, desc: modalForm.desc, ref: modalForm.ref }];
        } else if (targetSection === 'administrasi') {
            db.administrasi = [...db.administrasi, { id, title: modalForm.judul, desc: modalForm.desc, ref: modalForm.ref }];
        } else if (targetSection === 'harga') {
            db.harga = [...db.harga, { id, title: modalForm.judul, desc: modalForm.desc, ref: modalForm.ref }];
        } else if (targetSection === 'dokumen_lain') {
            db.dokumen_lain = [...db.dokumen_lain, { id, title: modalForm.judul, desc: modalForm.desc, ref: modalForm.ref }];
        } else if (targetSection === 'teknis') {
            if (subType === 'personel') {
                db.personel = [...db.personel, { id, jabatan: modalForm.jabatan, skk: modalForm.skk, pengalaman: Number(modalForm.pengalaman), ref: modalForm.ref }];
            } else if (subType === 'peralatan') {
                db.peralatan = [...db.peralatan, { id, jenis: modalForm.jenisAlat, kapasitas: modalForm.kapasitasAlat, jumlah: Number(modalForm.jumlahAlat), ref: modalForm.ref }];
            } else if (subType === 'rkk') {
                db.rkk = [...db.rkk, { id, uraian: modalForm.uraianPekerjaan, bahaya: modalForm.identifikasiBahaya, ref: modalForm.ref }];
            } else {
                db.teknis_umum = [...db.teknis_umum, { id, title: modalForm.judul, desc: modalForm.desc, ref: modalForm.ref }];
            }
        }
        setRequirementsDB(db);
        setIsModalOpen(false);
    };

    return {
        requirementsDB, setRequirementsDB,
        openSections, setOpenSections,
        isDocumentUploaded, setIsDocumentUploaded,
        isExtracting, setIsExtracting,
        extractionProgress, setExtractionProgress,
        isModalOpen, setIsModalOpen,
        targetSection, setTargetSection,
        subType, setSubType,
        modalForm, setModalForm,
        actions: {
            toggle,
            deleteItem,
            handleFormChange,
            startExtraction,
            openModalForSection,
            saveRequirement
        }
    };
}
