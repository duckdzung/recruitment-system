// src/redux/auth/authThunks.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginSuccess, loginFailure } from './authSlice';
import { login } from '../../services/authService';
import { LoginCredentials, AxiosError } from '../../types';
import { toast } from 'react-toastify';

export const loginThunk = createAsyncThunk('auth/login', async (credentials: LoginCredentials, { dispatch }) => {
    try {
        const response = await login(credentials);
        const { accessToken, refreshToken } = response.data;
        dispatch(loginSuccess({ accessToken, refreshToken }));
        toast.success(response.message);
    } catch (error) {
        const axiosError = error as AxiosError;
        const errorMessage = axiosError.response?.data.message || axiosError.message;
        dispatch(loginFailure(errorMessage));
    }
});
