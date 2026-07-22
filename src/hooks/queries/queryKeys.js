export const queryKeys = {
    workspace: {
        all: ['workspace'],
        details: () => [...queryKeys.workspace.all, 'details'],
    },
    company: {
        all: ['company'],
    },
    dashboard: {
        all: ['dashboard'],
    }
};
