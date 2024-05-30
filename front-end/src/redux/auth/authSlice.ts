import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../types';
import { toast } from 'react-toastify';

const initialState: AuthState = {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    role: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ accessToken: string; refreshToken: string; role: string }>) => {
            state.isAuthenticated = true;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.role = action.payload.role;
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.isAuthenticated = false;
            state.accessToken = null;
            state.refreshToken = null;
            state.role = null;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.accessToken = null;
            state.refreshToken = null;
            state.role = null;
            state.error = null;
            toast.info('Logged out successfully.');
        },
    },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
