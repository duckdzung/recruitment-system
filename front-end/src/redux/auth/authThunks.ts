// src/redux/auth/authThunks.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginSuccess, loginFailure, logoutSuccess } from './authSlice';
import { login, logout } from '../../services/authService';
import { AxiosError, Credentials } from '../../types';
import { toast } from 'react-toastify';

export const loginThunk = createAsyncThunk('auth/login', async (credentials: Credentials, { dispatch }) => {
    try {
        const response = await login(credentials);
        const { accessToken, refreshToken, role } = response.data;
        dispatch(loginSuccess({ accessToken, refreshToken, role }));
        toast.success(response.message);
    } catch (error) {
        const axiosError = error as AxiosError;
        const errorMessage = axiosError.response?.data.message || axiosError.message;
        dispatch(loginFailure(errorMessage));
    }
});

export const logoutThunk = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
    try {
        const response = await logout();
        dispatch(logoutSuccess());
        toast.success(response.message);
    } catch (error) {
        const axiosError = error as AxiosError;
        const errorMessage = axiosError.response?.data.message || axiosError.message;
        toast.error(errorMessage);
    }
});
