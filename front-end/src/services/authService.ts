import axios from '../axios/axiosClient';
import { ApiResponse, LoginCredentials, RegisterCredentials } from '../types';

export const login = async (credentials: LoginCredentials): Promise<ApiResponse> => {
    const response = await axios.post<ApiResponse>('/auth/login', credentials);
    return response.data;
};

export const register = async (credentials: RegisterCredentials): Promise<ApiResponse> => {
    const response = await axios.post<ApiResponse>('/auth/register', credentials);
    return response.data;
};
