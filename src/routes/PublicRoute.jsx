import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PageSkeleton } from '../components/ui/skeleton';

export const PublicRoute = ({ children, restricted = false }) => {
    const { isAuthenticated, isInitializing } = useAuth();
    const location = useLocation();

    if (isInitializing) {
        return <PageSkeleton />;
    }

    // If restricted is true, authenticated users can't access this route
    if (isAuthenticated && restricted) {
        const from = location.state?.from?.pathname || '/dashboard';
        return <Navigate to={from} replace />;
    }

    return children;
};
