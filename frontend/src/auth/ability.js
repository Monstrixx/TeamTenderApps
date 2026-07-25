import { ROLES } from './roles';
import { PERMISSIONS } from './permissions';

/**
 * Defines which permissions belong to which roles.
 */
const ROLE_PERMISSIONS = {
    [ROLES.ADMIN]: Object.values(PERMISSIONS), // Admin has all permissions
    [ROLES.PPK]: [
        PERMISSIONS.VIEW_WORKSPACE,
        PERMISSIONS.VIEW_TENDERS
    ],
    [ROLES.POKJA]: [
        PERMISSIONS.VIEW_WORKSPACE,
        PERMISSIONS.VIEW_TENDERS,
        PERMISSIONS.MANAGE_TENDERS
    ],
    [ROLES.DIREKTUR]: [
        PERMISSIONS.VIEW_WORKSPACE,
        PERMISSIONS.VIEW_TENDERS,
        PERMISSIONS.VIEW_LETTERS
    ],
    [ROLES.ESTIMATOR]: [
        PERMISSIONS.VIEW_WORKSPACE,
        PERMISSIONS.VIEW_TENDERS,
        PERMISSIONS.CREATE_LETTERS
    ]
};

/**
 * Checks if a user has a specific permission.
 * 
 * @param {import('../services/auth/auth.types').CurrentUser} user 
 * @param {string} permission 
 * @returns {boolean}
 */
export const hasPermission = (user, permission) => {
    if (!user || !user.role) return false;
    
    const rolePermissions = ROLE_PERMISSIONS[user.role] || [];
    return rolePermissions.includes(permission);
};
