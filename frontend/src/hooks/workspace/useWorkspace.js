import { useWorkspaceTabs } from './useWorkspaceTabs';
import { useWorkspaceOverview } from './useWorkspaceOverview';
import { useWorkspaceRAB } from './useWorkspaceRAB';
import { useWorkspaceKualifikasi } from './useWorkspaceKualifikasi';
import { useWorkspaceTeknis } from './useWorkspaceTeknis';
import { useWorkspaceAdministrasi } from './useWorkspaceAdministrasi';
import { useWorkspaceAI } from './useWorkspaceAI';
import { useWorkspaceValidation } from './useWorkspaceValidation';
import { TENDER_METADATA, INITIAL_SUPPLIERS } from '../../data/mock/workspace';

import { useWorkspaceQuery } from './../queries/workspace/useWorkspaceQuery';
import { useSuppliersQuery } from './../queries/workspace/useSuppliersQuery';

export function useWorkspace() {
    const { data: tenderMeta, isLoading, error } = useWorkspaceQuery('12345');
    const { data: suppliersData } = useSuppliersQuery('12345');
    const supplierDirectory = suppliersData?.data || [];

    const tabsState = useWorkspaceTabs();
    const rabState = useWorkspaceRAB();
    const kualifikasiState = useWorkspaceKualifikasi();
    const aiState = useWorkspaceAI();
    const teknisState = useWorkspaceTeknis(aiState.setAiLogs);
    const overviewState = useWorkspaceOverview(tenderMeta, supplierDirectory, teknisState.peralatanList);
    const administrasiState = useWorkspaceAdministrasi(aiState.setAiLogs, tenderMeta);
    const validationState = useWorkspaceValidation(aiState.setAiLogs);

    return {
        tenderMeta,
        isLoading,
        error,
        supplierDirectory,
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
