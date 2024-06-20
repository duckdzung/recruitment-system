import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, Role } from '../../types';

const initialState: AuthState = {
    username: '',
    isAuthenticated: false,
    accessToken: '',
    refreshToken: '',
    expirationTime: '',
    role: null,
    error: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (
            state,
            action: PayloadAction<{
                accessToken: string;
                refreshToken: string;
                expirationTime: string;
                role: Role;
                email: string;
            }>,
        ) => {
            state.username = action.payload.email.split('@')[0];
            state.isAuthenticated = true;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.expirationTime = action.payload.expirationTime;
            state.role = action.payload.role;
            state.error = '';
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.username = '';
            state.isAuthenticated = false;
            state.accessToken = '';
            state.refreshToken = '';
            state.expirationTime = '';
            state.role = null;
            state.error = action.payload;
        },
        logoutSuccess: (state) => {
            state.username = '';
            state.isAuthenticated = false;
            state.accessToken = '';
            state.refreshToken = '';
            state.expirationTime = '';
            state.role = null;
            state.error = '';
        },
    },
});

export const { loginSuccess, loginFailure, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
