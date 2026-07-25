import { MockAuthAdapter } from './adapters/MockAuthAdapter';
import { ApiAuthAdapter } from './adapters/ApiAuthAdapter';
import { FEATURES } from '../../config/features';

export const createAuthAdapter = () => {
    return FEATURES.useMockApi ? MockAuthAdapter : ApiAuthAdapter;
};
