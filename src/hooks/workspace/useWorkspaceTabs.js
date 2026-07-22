import { useState } from 'react';

export function useWorkspaceTabs() {
    const [subTab, setSubTab] = useState('overview'); // 'overview' | 'permohonan' | 'rab' | 'rkk' | 'schedule'
    const [rabActiveSheet, setRabActiveSheet] = useState('hsd'); // 'hsd' | 'ahsp' | 'boq' | 'rekap'
    const [kualifikasiSubTab, setKualifikasiSubTab] = useState('validation'); // 'validation' | 'kdskp' | 'spse' | 'kso'
    const [teknisSubTab, setTeknisSubTab] = useState('personel'); // 'personel' | 'peralatan' | 'rkk' | 'dukungan' | 'jadwal' | 'metode' | 'rmpk'
    const [adminSubTab, setAdminSubTab] = useState('penawaran'); // 'penawaran' | 'kso' | 'jaminan'

    return {
        subTab, setSubTab,
        rabActiveSheet, setRabActiveSheet,
        kualifikasiSubTab, setKualifikasiSubTab,
        teknisSubTab, setTeknisSubTab,
        adminSubTab, setAdminSubTab
    };
}
