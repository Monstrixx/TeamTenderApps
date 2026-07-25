import { useState, useMemo } from 'react';
import { generateRequestLetterText } from '../../shared/helpers/requestLetterGenerator';
import { useCompanyProfileQuery } from '../queries/workspace/useCompanyProfileQuery';

export function useWorkspaceOverview(tenderMeta, supplierDirectory, peralatanList, workspaceId = '12345') {
    const [selectedSupplier, setSelectedSupplier] = useState('s1');
    const [requestLetterNo, setRequestLetterNo] = useState("015/PM-MK/VII/2026");

    const { data: companyProfileData } = useCompanyProfileQuery(workspaceId);
    const company = companyProfileData?.data || { name: 'Loading...', directorName: 'Loading...' };

    // Derived preview text from company profile, supplier, and tender data
    const requestPreviewText = useMemo(() => {
        const activeSupplier = supplierDirectory?.find(s => s.id === selectedSupplier) || supplierDirectory?.[0];
        
        const mappedEquipment = peralatanList?.map(p => ({
            name: p.nama || p.jenis || p.name,
            quantity: p.jumlah || 1,
            unit: 'Unit'
        })) || [];

        return generateRequestLetterText({
            company: {
                name: company.name,
                requestLetterNo: requestLetterNo,
                date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
            },
            supplier: { name: activeSupplier?.name || activeSupplier?.nama },
            tender: {
                packageName: tenderMeta?.namaPaket,
                hpsValue: tenderMeta?.hps ? `Rp ${tenderMeta.hps.toLocaleString('id-ID')}` : '',
                pokjaName: tenderMeta?.pokja,
                pokjaAddress: tenderMeta?.lokasi
            },
            equipment: mappedEquipment,
            signatory: company.directorName
        });
    }, [selectedSupplier, requestLetterNo, tenderMeta, supplierDirectory, peralatanList, company]);

    return {
        selectedSupplier, setSelectedSupplier,
        requestLetterNo, setRequestLetterNo,
        requestPreviewText,
        company
    };
}
