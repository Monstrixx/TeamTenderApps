import React from 'react';
import { AlertCircle, Check, Loader2, Sparkles, X } from 'lucide-react';

// Custom Hooks
import { useProfilPerusahaan } from '../hooks/useProfilPerusahaan';

// Layout Components
import ProfileSidebar from '../components/profilPerusahaan/layout/ProfileSidebar';
import ProfileContent from '../components/profilPerusahaan/layout/ProfileContent';

// Sections
import CompanyProfileSection from '../components/profilPerusahaan/sections/CompanyProfileSection';
import IdentitasPenyediaSection from '../components/profilPerusahaan/sections/IdentitasPenyediaSection';
import AktaPendirianSection from '../components/profilPerusahaan/sections/AktaPendirianSection';
import IzinUsahaSection from '../components/profilPerusahaan/sections/IzinUsahaSection';
import DireksiPemilikSection from '../components/profilPerusahaan/sections/DireksiPemilikSection';
import PajakSection from '../components/profilPerusahaan/sections/PajakSection';
import PengurusPerusahaanSection from '../components/profilPerusahaan/sections/PengurusPerusahaanSection';
import TenagaAhliSection from '../components/profilPerusahaan/sections/TenagaAhliSection';
import PeralatanSection from '../components/profilPerusahaan/sections/PeralatanSection';
import PengalamanSection from '../components/profilPerusahaan/sections/PengalamanSection';
import SertifikatSection from '../components/profilPerusahaan/sections/SertifikatSection';

const AiScannerDialog = React.lazy(() => import('../components/profilPerusahaan/components/AiScannerDialog'));

export default function ProfilPerusahaan() {
    const { uiState, domainState, actions } = useProfilPerusahaan();

    // Map active tab to correct component
    const renderSection = () => {
        switch (uiState.activeTab) {
            case 'tab-profil':
                return <CompanyProfileSection 
                    profile={domainState.profileData.profil} 
                    tempProfile={domainState.tempState.tempProfil} 
                    viewMode={uiState.viewMode} 
                    actions={actions.domainActions} 
                    tableActions={actions.tableActions} 
                    uiActions={actions.uiActions} 
                />;
            case 'tab-identitas':
                return <IdentitasPenyediaSection 
                    profile={domainState.profileData.identitas} 
                    tempProfile={domainState.tempState.tempIdentitas} 
                    viewMode={uiState.viewMode} 
                    actions={actions.domainActions} 
                    tableActions={actions.tableActions} 
                    uiActions={actions.uiActions} 
                    aiActions={actions.aiActions}
                />;
            case 'tab-akta':
                return <AktaPendirianSection 
                    profile={domainState.profileData.akta} 
                    tempProfile={domainState.tempState.tempAkta} 
                    viewMode={uiState.viewMode} 
                    actions={actions.domainActions} 
                    tableActions={actions.tableActions} 
                    uiActions={actions.uiActions} 
                    aiActions={actions.aiActions}
                />;
            case 'tab-izin':
                return <IzinUsahaSection 
                    profile={domainState.profileData.izinUsaha} 
                    tempProfile={domainState.tempState.tempIzin} 
                    viewMode={uiState.viewMode} 
                    actions={actions.domainActions} 
                    tableActions={actions.tableActions} 
                    uiActions={actions.uiActions} 
                    aiActions={actions.aiActions}
                />;
            case 'tab-direksi':
                return <DireksiPemilikSection 
                    profile={domainState.profileData.direksi} 
                    tempProfile={domainState.tempState.tempDireksi} 
                    viewMode={uiState.viewMode} 
                    actions={actions.domainActions} 
                    tableActions={actions.tableActions} 
                    uiActions={actions.uiActions} 
                />;
            case 'tab-pajak':
                return <PajakSection 
                    profile={domainState.profileData.pajak} 
                    tempProfile={domainState.tempState.tempPajak} 
                    viewMode={uiState.viewMode} 
                    actions={actions.domainActions} 
                    tableActions={actions.tableActions} 
                    uiActions={actions.uiActions} 
                />;
            case 'tab-pengurus':
                return <PengurusPerusahaanSection 
                    profile={domainState.profileData.pengurus} 
                    tempProfile={domainState.tempState.tempPengurus} 
                    viewMode={uiState.viewMode} 
                    actions={actions.domainActions} 
                    tableActions={actions.tableActions} 
                    uiActions={actions.uiActions} 
                />;
            case 'tab-tenaga':
                return <TenagaAhliSection 
                    profile={domainState.profileData.tenaga} 
                    tempProfile={domainState.tempState.tempTenaga} 
                    viewMode={uiState.viewMode} 
                    actions={actions.domainActions} 
                    tableActions={actions.tableActions} 
                    uiActions={actions.uiActions} 
                    aiActions={actions.aiActions}
                />;
            case 'tab-peralatan':
                return <PeralatanSection 
                    profile={domainState.profileData.peralatan} 
                    tempProfile={domainState.tempState.tempPeralatan} 
                    viewMode={uiState.viewMode} 
                    actions={actions.domainActions} 
                    tableActions={actions.tableActions} 
                    uiActions={actions.uiActions} 
                    aiActions={actions.aiActions}
                />;
            case 'tab-pengalaman':
                return <PengalamanSection 
                    profile={domainState.profileData.pengalaman} 
                    tempProfile={domainState.tempState.tempPengalaman} 
                    viewMode={uiState.viewMode} 
                    actions={actions.domainActions} 
                    tableActions={actions.tableActions} 
                    uiActions={actions.uiActions} 
                    aiActions={actions.aiActions}
                />;
            case 'tab-sertifikat':
                return <SertifikatSection 
                    profile={domainState.profileData.sertifikat} 
                    tempProfile={domainState.tempState.tempSertifikat} 
                    viewMode={uiState.viewMode} 
                    actions={actions.domainActions} 
                    tableActions={actions.tableActions} 
                    uiActions={actions.uiActions} 
                />;
            default:
                return null;
        }
    };

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden">
            <ProfileSidebar activeTab={uiState.activeTab} onTabChange={actions.uiActions.setActiveTab} />
            <ProfileContent>
                {renderSection()}
            </ProfileContent>

            {/* ========== OVERLAY MODAL: AI DOCUMENT SCANNER SIMULATOR ========== */}
            <React.Suspense fallback={null}>
                <AiScannerDialog 
                    isOpen={uiState.isAiModalOpen}
                    onClose={actions.aiActions.closeModal}
                    onApply={actions.aiActions.applyAiAutofill}
                    status={uiState.aiScanStatus}
                    progress={uiState.aiScanProgress}
                    logs={uiState.aiScanLogs}
                    detectedData={uiState.aiDetectedData}
                    warning={uiState.aiWarning}
                />
            </React.Suspense>
        </div>
    );
}
