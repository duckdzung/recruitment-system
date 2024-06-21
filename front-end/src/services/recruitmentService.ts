import qs from 'qs';
import axios from '../axios/axiosClient';
import { ApiResponse, RecruitmentDetails, AdvertisingForm } from '../types';

export const createRecruitmentForm = async (
    recruitmentDetails: RecruitmentDetails,
    advertisingForm: AdvertisingForm,
): Promise<ApiResponse> => {
    const response = await axios.post<ApiResponse>('/recruitments', { recruitmentDetails, advertisingForm });
    return response.data;
};

export const getAllRecruitmentForms = async (
    page: number,
    size: number,
    position: string,
    address: string,
): Promise<ApiResponse> => {
    const queryParams = qs.stringify({ position, address, page, size });
    const response = await axios.get<ApiResponse>(`recruitments/search?${queryParams}`);
    return response.data;
};

export const getRecruitmentFormById = async (id: string): Promise<ApiResponse> => {
    const response = await axios.get<ApiResponse>(`recruitments/${id}`);
    return response.data;
};
