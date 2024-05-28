import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

interface PublicRouteProps {
    restricted: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ restricted }) => {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    return isAuthenticated && restricted ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;
