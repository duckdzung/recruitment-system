import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { toast } from 'react-toastify';
import { Role } from '../types';

const AdminRoute: React.FC = () => {
    const { isAuthenticated, role } = useAppSelector((state) => state.auth);

    if (!isAuthenticated) {
        toast.info('You need to log in');
        return <Navigate to="/login" />;
    } else if (role !== Role.ADMIN) {
        toast.info(`You don't have permission`);
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default AdminRoute;
