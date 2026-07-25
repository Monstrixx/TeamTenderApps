import { useState, useEffect } from 'react';
import { useDocumentsQuery } from '../queries/workspace/useDocumentsQuery';

// Helper functions for updating document validation statuses
const markDocumentValidating = (docObj, key) => ({
    ...docObj,
    [key]: { ...docObj[key], status: 'validating' }
});

const markDocumentValid = (docObj, key) => ({
    ...docObj,
    [key]: { ...docObj[key], status: 'valid' }
});

const createValidationLog = (key, isValidatingAll) => {
    let docName = "";
    if (key === 'akta') docName = "Akta Perusahaan";
    else if (key === 'npwp') docName = "NPWP Perusahaan";
    else if (key === 'nib') docName = "NIB Perusahaan";
    else if (key === 'sbu') docName = "Sertifikat Badan Usaha (SBU)";
    else docName = key;
    
    return {
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        agent: isValidatingAll ? "Sistem Validasi Massal" : "Sistem Validasi",
        msg: `Dokumen ${docName} telah diverifikasi dan masih berlaku.`
    };
};

export function useWorkspaceValidation(setAiLogs, workspaceId = '12345') {
    const { data: documentsData } = useDocumentsQuery(workspaceId);
    const [docValidation, setDocValidation] = useState({});
    const [isValidatingAll, setIsValidatingAll] = useState(false);

    useEffect(() => {
        if (documentsData && Object.keys(docValidation).length === 0) {
            setDocValidation(documentsData);
        }
    }, [documentsData]);

    const handleValidateDoc = (key) => {
        setDocValidation(prev => markDocumentValidating(prev, key));
        setTimeout(() => {
            setDocValidation(prev => markDocumentValid(prev, key));
            if (setAiLogs) {
                setAiLogs(logs => [...logs, createValidationLog(key, false)]);
            }
        }, 1000);
    };

    const handleValidateAll = () => {
        setIsValidatingAll(true);
        const keys = Object.keys(docValidation);
        keys.forEach((key, index) => {
            setTimeout(() => {
                setDocValidation(prev => markDocumentValidating(prev, key));
                setTimeout(() => {
                    setDocValidation(prev => markDocumentValid(prev, key));
                    if (setAiLogs) {
                        setAiLogs(logs => [...logs, createValidationLog(key, true)]);
                    }
                    if (index === keys.length - 1) {
                        setIsValidatingAll(false);
                    }
                }, 800);
            }, index * 1000);
        });
    };

    return {
        docValidation, setDocValidation,
        isValidatingAll, setIsValidatingAll,
        actions: {
            handleValidateDoc,
            handleValidateAll
        }
    };
}
