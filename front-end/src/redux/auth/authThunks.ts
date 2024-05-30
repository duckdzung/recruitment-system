// src/redux/auth/authThunks.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginSuccess, loginFailure } from './authSlice';
import { login } from '../../services/authService';
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
