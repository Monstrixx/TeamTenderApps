import { FEATURES } from '../../config/features';
import { ApiWorkspaceAdapter } from './adapters/ApiWorkspaceAdapter';
import { MockWorkspaceAdapter } from './adapters/MockWorkspaceAdapter';

export const getWorkspaceAdapter = () => {
    if (FEATURES.useMockApi) {
        return MockWorkspaceAdapter;
    }
    return ApiWorkspaceAdapter;
};
