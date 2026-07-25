/**
 * Workspace Container
 * Application orchestration container for Workspace RBAC, navigation availability,
 * and workspace section authorization.
 * Pure JavaScript - No React components, No JSX, No DOM, No API side-effects.
 */

/**
 * Evaluates whether a given role has permission to access a specific workspace section.
 * 
 * @param {string} role - Simulated role ('owner' | 'estimator' | 'partner')
 * @param {string} sectionId - Workspace section ID ('overview' | 'administrasi' | 'kualifikasi' | 'teknis' | 'rab')
 * @returns {boolean} True if role is authorized to access section
 */
export function canAccessSection(role, sectionId) {
    if (!role || role === 'owner') {
        return true;
    }
    if (role === 'estimator') {
        return sectionId === 'rab';
    }
    if (role === 'partner') {
        return sectionId === 'kualifikasi' || sectionId === 'overview' || sectionId === 'administrasi';
    }
    return true;
}

/**
 * Filters a list of navigation menu definitions based on role authorization rules.
 * 
 * @param {string} role - Active user role ('owner' | 'estimator' | 'partner')
 * @param {Array<{id: string, label: string, icon: any}>} menuList - List of menu objects
 * @returns {Array} Filtered list of allowed menus
 */
export function getAvailableMenus(role, menuList = []) {
    if (!Array.isArray(menuList)) return [];
    return menuList.filter(menu => canAccessSection(role, menu.id));
}

/**
 * Resolves the appropriate workspace subTab route for a user role.
 * If the requested subTab is not permitted for the role, returns the default allowed subTab.
 * 
 * @param {string} role - User role
 * @param {string} currentSubTab - Active subTab request
 * @returns {string} Allowed subTab
 */
export function resolveWorkspaceRoute(role, currentSubTab) {
    if (canAccessSection(role, currentSubTab)) {
        return currentSubTab;
    }
    if (role === 'estimator') {
        return 'rab';
    }
    if (role === 'partner') {
        return 'overview';
    }
    return 'overview';
}
