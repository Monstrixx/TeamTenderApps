import { useState, useMemo } from 'react';
import { mockCompanyProfile } from '../../data/mock/companyProfile';
import { generateRequestLetterText } from '../../shared/helpers/requestLetterGenerator';

export function useWorkspaceOverview(tenderMeta, supplierDirectory, peralatanList) {
    const [selectedSupplier, setSelectedSupplier] = useState('s1');
    const [requestLetterNo, setRequestLetterNo] = useState("015/PM-MK/VII/2026");

    // Derived preview text from company profile, supplier, and tender data
    const requestPreviewText = useMemo(() => {
        const activeSupplier = supplierDirectory?.find(s => s.id === selectedSupplier) || supplierDirectory?.[0];
        
        const mappedEquipment = peralatanList?.map(p => ({
            name: p.nama || p.jenis,
            quantity: p.jumlah || 1,
            unit: 'Unit'
        })) || [];

        return generateRequestLetterText({
            company: {
                name: mockCompanyProfile.companyName,
                requestLetterNo: requestLetterNo,
                date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
            },
            supplier: { name: activeSupplier?.nama },
            tender: {
                packageName: tenderMeta?.namaPaket,
                hpsValue: tenderMeta?.hps ? `Rp ${tenderMeta.hps.toLocaleString('id-ID')}` : '',
                pokjaName: tenderMeta?.pokja,
                pokjaAddress: tenderMeta?.lokasi
            },
            equipment: mappedEquipment,
            signatory: mockCompanyProfile.signatory
        });
    }, [selectedSupplier, requestLetterNo, tenderMeta, supplierDirectory, peralatanList]);

    return {
        selectedSupplier, setSelectedSupplier,
        requestLetterNo, setRequestLetterNo,
        requestPreviewText,
        company: mockCompanyProfile // Exposing for orchestrator usage if needed
    };
}
