import { useState } from 'react';
import { INITIAL_DOC_VALIDATION } from '../../data/mock/workspace';

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

export function useWorkspaceValidation(setAiLogs) {
    const [docValidation, setDocValidation] = useState(INITIAL_DOC_VALIDATION);
    const [isValidatingAll, setIsValidatingAll] = useState(false);

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
