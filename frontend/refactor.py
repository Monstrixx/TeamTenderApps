import re

with open('src/pages/Workspace.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = "    const [subTab, setSubTab] = useState('overview');"
end_pattern = r'    const triggerRkkGenerate = \(\) => \{.*?\n    \};\n'

start_idx = content.find(start_marker)
match = re.search(end_pattern, content[start_idx:], re.DOTALL)
if match and start_idx != -1:
    end_idx = start_idx + match.end()
    
    new_state_block = '''    const workspaceState = useWorkspace();
    const {
        subTab, setSubTab,
        tenderMeta, aiLogs, setAiLogs, supplierDirectory,
        requestLetterNo, setRequestLetterNo, requestPreviewText, setRequestPreviewText,
        selectedSupplier, setSelectedSupplier,
        kualifikasiSubTab, setKualifikasiSubTab, simulatedRole, setSimulatedRole,
        isKdSkpPrinted, setIsKdSkpPrinted, isFormulirSaved, setIsFormulirSaved,
        selectedKsoPartnerId, setSelectedKsoPartnerId, ksoModalShare, setKsoModalShare,
        ksoShareStatus, setKsoShareStatus, ksoPartnersList,
        teknisSubTab, setTeknisSubTab,
        personelList, setPersonelList, selectedPersonelId, setSelectedPersonelId,
        peralatanList, setPeralatanList,
        rkkMenu, setRkkMenu, isRkkGenerating, rkkProgress, rkkContent,
        rmpkMenu, setRmpkMenu, isRmpkProcessing, rmpkProgress,
        docValidation, isValidatingAll,
        adminSubTab, setAdminSubTab, useApendoLetter, setUseApendoLetter,
        adminKsoName, setAdminKsoName, adminKsoLeaderShare, setAdminKsoLeaderShare,
        adminKsoMemberShare, setAdminKsoMemberShare, adminKsoUploadedFile,
        adminBidBondRequired, setAdminBidBondRequired, adminBidBondPercent, setAdminBidBondPercent,
        adminBidBondDays, setAdminBidBondDays, adminBidBondIssuer, setAdminBidBondIssuer,
        adminBidBondRequestDownloaded, setAdminBidBondRequestDownloaded,
        adminBidBondUploadedFile, adminBidBondAiLogs, adminIsScanningBidBond,
        upahList, bahanList, alatList, boqList, ahspItems,
        pricingStrategy, setPricingStrategy, targetPercentage, setTargetPercentage,
        targetNominal, setTargetNominal, useLumpsumOverride, setUseLumpsumOverride,
        profitMargin, setProfitMargin, rabActiveSheet, setRabActiveSheet,
        actions
    } = workspaceState;
    
    const { getGrandTotal } = actions || {};
    const { handleValidateDoc, handleValidateAll } = actions || {};
    const { triggerRkkGenerate, triggerRmpkGenerate } = actions || {};
    const { handleUploadKsoFile, handleUploadBidBondFile } = actions || {};
'''
    new_content = content[:start_idx] + new_state_block + content[end_idx:]
    with open('src/pages/Workspace.jsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Replaced successfully')
else:
    print('Failed to find start or end')
