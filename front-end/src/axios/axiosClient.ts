import axios from 'axios';
import store from '../redux/store';
import { toast } from 'react-toastify';

import { loginSuccess } from '../redux/auth/authSlice';
import { ApiResponse } from '../types';

const baseURL = import.meta.env.VITE_RECRUITMENT_SYSTEM_API_URL;

const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const updateAccessToken = async (refreshToken: string): Promise<ApiResponse> => {
    const response = await axios.post<ApiResponse>(`${baseURL}/auth/refresh-token`, { refreshToken });
    return response.data;
};

axiosClient.interceptors.request.use(
    async (config) => {
        const state = store.getState();
        const { accessToken, refreshToken, expirationTime } = state.auth;

        const currentDate = new Date().toISOString();
        const isExpired = currentDate > expirationTime && expirationTime !== '';

        if (isExpired) {
            try {
                const response = await updateAccessToken(refreshToken);

                const {
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken,
                    expirationTime: newExpirationTime,
                    role,
                    email,
                } = response.data;

                // Update the state with the new tokens and expiration time
                store.dispatch(
                    loginSuccess({
                        accessToken: newAccessToken,
                        refreshToken: newRefreshToken,
                        expirationTime: newExpirationTime,
                        role,
                        email,
                    }),
                );

                // Set the new access token to the config
                config.headers.Authorization = `Bearer ${newAccessToken}`;
            } catch (error) {
                console.error('Error refreshing token: ', error);
                toast.error('Error refreshing token');
                return Promise.reject(error);
            }
        } else if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;
        if (response) {
            const { status, data } = response;
            switch (status) {
                case 400:
                    toast.error(data.message || 'Bad Request');
                    break;
                case 401:
                    toast.error(data.message || 'Unauthorized');
                    break;
                case 403:
                    toast.error(data.message || 'Forbidden');
                    break;
                case 404:
                    toast.error(data.message || 'Not Found');
                    break;
                case 500:
                    toast.error(data.message || 'Internal Server Error');
                    break;
                default:
                    toast.error(data.message || 'An error occurred');
                    break;
            }
        } else {
            toast.error('Network error');
        }
        return Promise.reject(error);
    },
);

export default axiosClient;
