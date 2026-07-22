import { useState } from 'react';
import { INITIAL_AI_LOGS } from '../../data/mock/workspace';

export function useWorkspaceAI() {
    const [aiLogs, setAiLogs] = useState(INITIAL_AI_LOGS);
    const [adminIsScanningBidBond, setAdminIsScanningBidBond] = useState(false);
    const [adminBidBondAiLogs, setAdminBidBondAiLogs] = useState([]);

    return {
        aiLogs, setAiLogs,
        adminIsScanningBidBond, setAdminIsScanningBidBond,
        adminBidBondAiLogs, setAdminBidBondAiLogs
    };
}
