import qs from 'qs';
import axios from '../axios/axiosClient';
import { ApiResponse } from '../types';

export const getAllReports = async (month: number, year: number, page: number, size: number): Promise<ApiResponse> => {
    const queryParams = qs.stringify({ month, year, page, size });
    const response = await axios.get<ApiResponse>(`reports?${queryParams}`);
    return response.data;
};

export const updateReportByStaff = async (reportDetails: any): Promise<ApiResponse> => {
    const response = await axios.put<ApiResponse>(`/reports`, reportDetails);
    return response.data;
};
