import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Role } from '../types';

interface ProtectedRouteProps {
    allowRoutes: Role[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowRoutes }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const role = useSelector((state: RootState) => state.auth.role);

    if (isAuthenticated && allowRoutes.includes(role!)) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
