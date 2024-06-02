import axios from 'axios';
import store from '../redux/store';
import { toast } from 'react-toastify';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const { accessToken } = state.auth;

        if (accessToken) {
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
