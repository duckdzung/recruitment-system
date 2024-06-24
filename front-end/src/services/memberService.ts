import qs from 'qs';
import axios from '../axios/axiosClient';
import { ApiResponse, MemberDetails } from '../types';

export const updateMember = async (memberDetails: MemberDetails): Promise<ApiResponse> => {
    const response = await axios.post<ApiResponse>('/members', memberDetails);
    return response.data;
};

export const updateMemberByStaff = async (memberId: string, memberDetails: MemberDetails): Promise<ApiResponse> => {
    const response = await axios.put<ApiResponse>(`/members/${memberId}`, memberDetails);
    return response.data;
};

export const getEnterpriseList = async (page: number, size: number): Promise<ApiResponse> => {
    const queryParams = qs.stringify({ page, size });
    const response = await axios.get<ApiResponse>(`enterprises?${queryParams}`);
    return response.data;
};

export const getCandidateList = async (page: number, size: number): Promise<ApiResponse> => {
    const queryParams = qs.stringify({ page, size });
    const response = await axios.get<ApiResponse>(`/members/candidates?${queryParams}`);
    return response.data;
};
