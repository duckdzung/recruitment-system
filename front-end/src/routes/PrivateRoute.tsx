import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { toast } from 'react-toastify';

const PrivateRoute: React.FC = () => {
    const { isAuthenticated, isUpdatedMember } = useAppSelector((state) => state.auth);
    const location = useLocation();

    // If user have not logged in yet, navigate to login page
    if (!isAuthenticated) {
        toast.info('You need to sign in.');
        return <Navigate to="/login" />;
    } else if (isUpdatedMember && location.pathname === '/update-member') {
        //  If user logged in and updated member
        toast.info('You have already updated member.');
        return <Navigate to="/" />;
    } else {
        return <Outlet />;
    }
};

export default PrivateRoute;
