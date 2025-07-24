import React from 'react'
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { Navigate } from 'react-router';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        return children
    }

    return (
        <Navigate to="/" replace />
    )
}

export default PublicRoute