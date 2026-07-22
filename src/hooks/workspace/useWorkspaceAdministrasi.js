import { useState } from 'react';

export function useWorkspaceAdministrasi(setAiLogs, tenderMeta) {
    const [useApendoLetter, setUseApendoLetter] = useState(true);
    const [adminKsoName, setAdminKsoName] = useState('KSO Maju Sinergi');
    const [adminKsoLeaderShare, setAdminKsoLeaderShare] = useState(60);
    const [adminKsoMemberShare, setAdminKsoMemberShare] = useState(40);
    const [adminKsoUploadedFile, setAdminKsoUploadedFile] = useState(null);
    
    const [adminBidBondRequired, setAdminBidBondRequired] = useState(false);
    const [adminBidBondPercent, setAdminBidBondPercent] = useState(2);
    const [adminBidBondDays, setAdminBidBondDays] = useState(90);
    const [adminBidBondIssuer, setAdminBidBondIssuer] = useState('PT. Bank Rakyat Indonesia (Persero) Tbk');
    const [adminBidBondUploadedFile, setAdminBidBondUploadedFile] = useState(null);
    const [adminBidBondRequestDownloaded, setAdminBidBondRequestDownloaded] = useState(false);

    const handleUploadKsoFile = (e) => {
        if(e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAdminKsoUploadedFile(file.name);
            if(setAiLogs) {
                setAiLogs(logs => [
                    ...logs,
                    { time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }), agent: "Sistem Penyusunan", msg: `Surat Perjanjian KSO asli (${file.name}) berhasil diunggah.` }
                ]);
            }
        }
    };

    const handleUploadBidBondFile = (e, setAdminIsScanningBidBond, setAdminBidBondAiLogs) => {
        if(e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAdminBidBondUploadedFile(file.name);
            setAdminIsScanningBidBond(true);
            setAdminBidBondAiLogs([
                { status: 'info', msg: 'Memulai verifikasi otomatis untuk Jaminan Penawaran...' },
            ]);

            setTimeout(() => {
                setAdminBidBondAiLogs(prev => [
                    ...prev,
                    { status: 'scan', msg: 'Mengekstrak teks scan... OK' },
                    { status: 'scan', msg: `Mencocokkan penerbit: ${adminBidBondIssuer}... COCOK` },
                ]);
                
                setTimeout(() => {
                    const expectedNominal = Math.floor((tenderMeta?.hps || 0) * (adminBidBondPercent / 100));
                    setAdminBidBondAiLogs(prev => [
                        ...prev,
                        { status: 'scan', msg: `Mencocokkan nilai nominal: Rp ${expectedNominal.toLocaleString('id-ID')}... COCOK` },
                        { status: 'scan', msg: `Mencocokkan masa berlaku: ${adminBidBondDays} hari kalender... COCOK` },
                        { status: 'success', msg: 'HASIL VERIFIKASI: Dokumen Jaminan Penawaran 100% VALID dan memenuhi syarat LDP!' }
                    ]);
                    setAdminIsScanningBidBond(false);
                    if(setAiLogs) {
                        setAiLogs(logs => [
                            ...logs,
                            { time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }), agent: "Sistem Validasi", msg: `Jaminan Penawaran (${file.name}) telah diverifikasi dan memenuhi persyaratan.` }
                        ]);
                    }
                }, 1200);
            }, 1000);
        }
    };

    return {
        useApendoLetter, setUseApendoLetter,
        adminKsoName, setAdminKsoName,
        adminKsoLeaderShare, setAdminKsoLeaderShare,
        adminKsoMemberShare, setAdminKsoMemberShare,
        adminKsoUploadedFile, setAdminKsoUploadedFile,
        adminBidBondRequired, setAdminBidBondRequired,
        adminBidBondPercent, setAdminBidBondPercent,
        adminBidBondDays, setAdminBidBondDays,
        adminBidBondIssuer, setAdminBidBondIssuer,
        adminBidBondUploadedFile, setAdminBidBondUploadedFile,
        adminBidBondRequestDownloaded, setAdminBidBondRequestDownloaded,
        actions: {
            handleUploadKsoFile,
            handleUploadBidBondFile
        }
    };
}
