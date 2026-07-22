import { useWorkspaceTabs } from './useWorkspaceTabs';
import { useWorkspaceOverview } from './useWorkspaceOverview';
import { useWorkspaceRAB } from './useWorkspaceRAB';
import { useWorkspaceKualifikasi } from './useWorkspaceKualifikasi';
import { useWorkspaceTeknis } from './useWorkspaceTeknis';
import { useWorkspaceAdministrasi } from './useWorkspaceAdministrasi';
import { useWorkspaceAI } from './useWorkspaceAI';
import { useWorkspaceValidation } from './useWorkspaceValidation';
import { TENDER_METADATA, INITIAL_SUPPLIERS } from '../../data/mock/workspace';

export function useWorkspace() {
    const tenderMeta = TENDER_METADATA;

    const tabsState = useWorkspaceTabs();
    const rabState = useWorkspaceRAB();
    const kualifikasiState = useWorkspaceKualifikasi();
    const aiState = useWorkspaceAI();
    const teknisState = useWorkspaceTeknis(aiState.setAiLogs);
    const overviewState = useWorkspaceOverview(tenderMeta, INITIAL_SUPPLIERS, teknisState.peralatanList);
    const administrasiState = useWorkspaceAdministrasi(aiState.setAiLogs, tenderMeta);
    const validationState = useWorkspaceValidation(aiState.setAiLogs);

    return {
        tenderMeta,
        supplierDirectory: INITIAL_SUPPLIERS,
        ...tabsState,
        ...overviewState,
        ...rabState,
        ...kualifikasiState,
        ...teknisState,
        ...administrasiState,
        ...aiState,
        ...validationState
    };
}
