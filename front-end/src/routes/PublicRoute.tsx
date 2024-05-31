import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

interface PublicRouteProps {
    restricted: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ restricted }) => {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    // Handle navigate from register to update-member
    if (location.pathname === '/update-member' && isAuthenticated) {
        return <Outlet />;
    }

    return isAuthenticated && restricted ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
