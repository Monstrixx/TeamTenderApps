import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useCurrentUserQuery } from '../hooks/queries/auth/useCurrentUserQuery';
import { useQueryClient } from '@tanstack/react-query';
import { tokenManager } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    // We only trigger the query if we have a token
    const { data: currentUser, isLoading, isError, error } = useCurrentUserQuery();
    
    // Derived state
    const isAuthenticated = tokenManager.isAuthenticated() && !!currentUser;
    const isInitializing = tokenManager.isAuthenticated() && isLoading;

    // Handle logout sync (from other tabs or from interceptor)
    useEffect(() => {
        const handleLogoutEvent = () => {
            queryClient.clear();
            navigate('/login', { replace: true });
        };

        const handleStorageChange = (e) => {
            if (e.key === 'tt_access_token' && !e.newValue) {
                // Token was removed in another tab
                handleLogoutEvent();
            }
        };

        window.addEventListener('auth:logout', handleLogoutEvent);
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('auth:logout', handleLogoutEvent);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [navigate, queryClient]);

    // Handle session expired error from the current user query
    useEffect(() => {
        if (isError && error?.name === 'SessionExpiredError') {
            tokenManager.clearTokens();
            window.dispatchEvent(new Event('auth:logout'));
        }
    }, [isError, error]);

    const value = useMemo(() => ({
        isAuthenticated,
        isInitializing,
        currentUser
    }), [isAuthenticated, isInitializing, currentUser]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
