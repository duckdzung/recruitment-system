import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../types';
import { toast } from 'react-toastify';

const initialState: AuthState = {
    isAuthenticated: false,
    isUpdatedMember: false,
    accessToken: null,
    refreshToken: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
            state.isAuthenticated = true;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.isAuthenticated = false;
            state.accessToken = null;
            state.refreshToken = null;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.accessToken = null;
            state.refreshToken = null;
            state.error = null;
            toast.info('Logged out successfully.');
        },
        updateMemberSuccess: (state, action: PayloadAction<{ isUpdatedMember: boolean }>) => {
            state.isUpdatedMember = action.payload.isUpdatedMember;
            state.error = null;
        },
    },
});

export const { loginSuccess, loginFailure, logout, updateMemberSuccess } = authSlice.actions;
export default authSlice.reducer;
