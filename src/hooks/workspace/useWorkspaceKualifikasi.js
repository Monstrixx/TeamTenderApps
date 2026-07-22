import { useState } from 'react';

export function useWorkspaceKualifikasi() {
    const [selectedKsoPartnerId, setSelectedKsoPartnerId] = useState('');
    const [ksoModalShare, setKsoModalShare] = useState(0); // 0 means not connected, we sync it from admin document
    const [ksoShareStatus, setKsoShareStatus] = useState('Unsynced'); // 'Unsynced' | 'Synced'
    const [simulatedRole, setSimulatedRole] = useState('owner'); // 'owner' | 'estimator' | 'partner'
    const [isKdSkpPrinted, setIsKdSkpPrinted] = useState(false);
    const [isFormulirSaved, setIsFormulirSaved] = useState(false);

    return {
        selectedKsoPartnerId, setSelectedKsoPartnerId,
        ksoModalShare, setKsoModalShare,
        ksoShareStatus, setKsoShareStatus,
        simulatedRole, setSimulatedRole,
        isKdSkpPrinted, setIsKdSkpPrinted,
        isFormulirSaved, setIsFormulirSaved
    };
}
