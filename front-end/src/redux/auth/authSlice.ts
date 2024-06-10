import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, Role } from '../../types';

const initialState: AuthState = {
    username: null,
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
        loginSuccess: (
            state,
            action: PayloadAction<{ accessToken: string; refreshToken: string; role: Role; email: string }>,
        ) => {
            state.username = action.payload.email.split('@')[0];
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
        logoutSuccess: (state) => {
            state.isAuthenticated = false;
            state.accessToken = null;
            state.refreshToken = null;
            state.role = null;
            state.error = null;
        },
    },
});

export const { loginSuccess, loginFailure, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
