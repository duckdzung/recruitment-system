import axios from '../axios/axiosClient';
import { ApiResponse, Credentials } from '../types';

export const login = async (credentials: Credentials): Promise<ApiResponse> => {
    const response = await axios.post<ApiResponse>('/auth/login', credentials);
    return response.data;
};

export const logout = async (): Promise<ApiResponse> => {
    const response = await axios.post<ApiResponse>('/auth/logout');
    return response.data;
};

export const register = async (credentials: Credentials): Promise<ApiResponse> => {
    const response = await axios.post<ApiResponse>('/auth/register', credentials);
    return response.data;
};
