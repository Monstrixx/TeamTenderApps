import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { hasPermission } from '../auth/ability';
import { ProtectedRoute } from './ProtectedRoute';

export const PermissionRoute = ({ children, permission }) => {
    const { currentUser } = useAuth();

    // Check permission
    if (permission && !hasPermission(currentUser, permission)) {
        // Redirect to a 403 page or dashboard
        return <Navigate to="/dashboard" replace />;
    }

    return <ProtectedRoute>{children}</ProtectedRoute>;
};
